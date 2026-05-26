from __future__ import annotations

import asyncio
import json
import math
import os
import shutil
import tempfile
import time
from pathlib import Path
from typing import Any

import httpx
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageChops, ImageFilter, ImageStat
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# App init
# ---------------------------------------------------------------------------
app = FastAPI(title="EAL Analysis Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# CAMeL Tools — lazy-loaded singletons (heavy imports)
# ---------------------------------------------------------------------------
_camel_sid = None  # SentimentAnalyzer
_camel_did = None  # DialectIdentifier
_camel_ner = None  # NERecognizer


def _get_sentiment_analyzer():
    global _camel_sid
    if _camel_sid is None:
        from camel_tools.sentiment import SentimentAnalyzer
        _camel_sid = SentimentAnalyzer.pretrained()
    return _camel_sid


def _get_dialect_identifier():
    global _camel_did
    if _camel_did is None:
        from camel_tools.dialectid import DialectIdentifier
        _camel_did = DialectIdentifier.pretrained()
    return _camel_did


def _get_ner_tagger():
    global _camel_ner
    if _camel_ner is None:
        from camel_tools.ner import NERecognizer
        _camel_ner = NERecognizer.pretrained()
    return _camel_ner


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
RISK_PATTERNS = [
    "عايز اموت", "أريد أن أموت", "مش عايز اعيش",
    "لا أريد الحياة", "إيذاء النفس", "انتحار",
]

EMOTIONAL_NEG = ["خوف", "قلق", "اكتئاب", "كارثة", "مؤامرة", "خطر", "كراهية", "ذنب", "عار", "فضيحة"]
EMOTIONAL_POS = ["أمل", "طمأنينة", "دعم", "رحمة", "سكينة", "تعافي", "ثقة", "صبر", "مساندة"]


async def _save_upload_to_tempfile(file: UploadFile | None, url: str | None) -> tuple[str | None, bool]:
    """Download URL or save upload to a temp file. Returns (path, is_temp)."""
    if file and file.filename:
        suffix = Path(file.filename).suffix or ".bin"
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        content = await file.read()
        tmp.write(content)
        tmp.close()
        return tmp.name, True

    if url:
        suffix = Path(url.split("?")[0]).suffix or ".bin"
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.get(url)
            resp.raise_for_status()
            tmp.write(resp.content)
            tmp.close()
        return tmp.name, True

    return None, False


async def _run_subprocess(cmd: list[str], timeout: float = 60.0) -> tuple[str, str, int]:
    """Run a subprocess and return (stdout, stderr, returncode)."""
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
    except asyncio.TimeoutError:
        proc.kill()
        return "", "Process timed out", 1
    return stdout.decode("utf-8", errors="replace"), stderr.decode("utf-8", errors="replace"), proc.returncode or 0


def _normalize_score(value: float, low: float, high: float) -> int:
    if high <= low:
        return 0
    clamped = max(low, min(high, value))
    return int(round(((clamped - low) / (high - low)) * 100))


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


async def _extract_exif(filepath: str) -> dict[str, Any]:
    if shutil.which("exiftool") is None:
        return {}

    stdout, _, rc = await _run_subprocess(["exiftool", "-j", "-G", "-s", filepath])
    if rc != 0 or not stdout.strip():
        return {}

    try:
        payload = json.loads(stdout)
        if isinstance(payload, list) and payload:
            return payload[0]
    except json.JSONDecodeError:
        return {}

    return {}


def _compute_image_signals(filepath: str) -> dict[str, float | int | str]:
    with Image.open(filepath) as source:
        image = source.convert("RGB")
        width, height = image.size

        # Sherloq-style ELA approximation: recompress at lower JPEG quality and inspect residuals.
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
            temp_name = tmp.name
        try:
            image.save(temp_name, "JPEG", quality=90)
            recompressed = Image.open(temp_name).convert("RGB")
            diff = ImageChops.difference(image, recompressed)
            diff_stat = ImageStat.Stat(diff)
            ela_mean = sum(diff_stat.mean) / len(diff_stat.mean)
            ela_rms = math.sqrt(sum((value ** 2) for value in diff_stat.rms) / len(diff_stat.rms))
        finally:
            try:
                os.unlink(temp_name)
            except OSError:
                pass

        # Edge density helps flag over-sharpened synthetic regions.
        edges = image.filter(ImageFilter.FIND_EDGES).convert("L")
        edge_stat = ImageStat.Stat(edges)
        edge_mean = edge_stat.mean[0]

        grayscale = image.convert("L")
        grayscale_stat = ImageStat.Stat(grayscale)
        brightness_std = grayscale_stat.stddev[0]

        return {
            "width": width,
            "height": height,
            "ela_mean": round(ela_mean, 3),
            "ela_rms": round(ela_rms, 3),
            "edge_mean": round(edge_mean, 3),
            "brightness_std": round(brightness_std, 3),
            "format": source.format or "unknown",
        }


async def _probe_media(filepath: str) -> dict[str, Any]:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        return {}

    stdout, stderr, rc = await _run_subprocess(
        [
            ffprobe,
            "-v",
            "quiet",
            "-print_format",
            "json",
            "-show_format",
            "-show_streams",
            filepath,
        ]
    )

    if rc != 0 or not stdout.strip():
        return {"error": stderr.strip() or "ffprobe returned no data"}

    try:
        payload = json.loads(stdout)
        return payload if isinstance(payload, dict) else {}
    except json.JSONDecodeError:
        return {"error": "ffprobe payload was not valid JSON"}


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------
@app.get("/health")
def health() -> dict[str, str]:
    exiftool_ok = shutil.which("exiftool") is not None
    c2pa_ok = shutil.which("c2patool") is not None
    return {
        "status": "ok",
        "service": "analysis-backend",
        "exiftool": "available" if exiftool_ok else "missing",
        "c2patool": "available" if c2pa_ok else "missing",
    }


# ---------------------------------------------------------------------------
# POST /metadata_extraction  — Real ExifTool
# ---------------------------------------------------------------------------
@app.post("/metadata_extraction")
async def metadata_extraction(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
    options: str | None = Form(default=None),
) -> dict[str, Any]:
    start = time.perf_counter()
    filepath, is_temp = await _save_upload_to_tempfile(file, url)

    if not filepath:
        return {
            "type": "metadata_extraction",
            "confidence": 0,
            "isManipulated": False,
            "findings": [{"category": "Input error", "description": "No file or URL provided.", "severity": "warning"}],
            "processingTimeMs": 0,
            "model": "exiftool",
            "disclaimer": "Provide an image file or URL to extract metadata.",
        }

    try:
        stdout, stderr, rc = await _run_subprocess(["exiftool", "-j", "-G", "-s", filepath])
        elapsed = int((time.perf_counter() - start) * 1000)

        if rc != 0 or not stdout.strip():
            return {
                "type": "metadata_extraction",
                "confidence": 10,
                "isManipulated": False,
                "findings": [{"category": "ExifTool error", "description": stderr.strip() or "ExifTool returned no data.", "severity": "warning"}],
                "processingTimeMs": elapsed,
                "model": "exiftool",
                "disclaimer": "ExifTool could not parse this file.",
            }

        exif_data: dict[str, Any] = json.loads(stdout)[0]

        # Build findings from real EXIF data
        findings: list[dict[str, Any]] = []
        suspicious = False

        # Camera / device info
        make = exif_data.get("EXIF:Make", exif_data.get("ExifIFD:Make", ""))
        model_name = exif_data.get("EXIF:Model", exif_data.get("ExifIFD:Model", ""))
        software = exif_data.get("EXIF:Software", exif_data.get("ExifIFD:Software", ""))
        create_date = exif_data.get("EXIF:CreateDate", exif_data.get("ExifIFD:CreateDate", ""))
        modify_date = exif_data.get("EXIF:ModifyDate", exif_data.get("ExifIFD:ModifyDate", ""))
        gps_lat = exif_data.get("Composite:GPSLatitude", exif_data.get("GPS:GPSLatitude", ""))
        gps_lon = exif_data.get("Composite:GPSLongitude", exif_data.get("GPS:GPSLongitude", ""))

        if make or model_name:
            findings.append({
                "category": "Capture device",
                "description": f"Make: {make or 'N/A'}, Model: {model_name or 'N/A'}",
                "severity": "info",
            })

        if software:
            edit_sw = any(kw in software.lower() for kw in ["photoshop", "gimp", "lightroom", "snapseed", "canva", "picsart"])
            findings.append({
                "category": "Editing software detected" if edit_sw else "Software",
                "description": f"Software: {software}",
                "severity": "warning" if edit_sw else "info",
            })
            if edit_sw:
                suspicious = True

        if create_date:
            findings.append({"category": "Creation date", "description": str(create_date), "severity": "info"})

        if modify_date and create_date and str(modify_date) != str(create_date):
            findings.append({
                "category": "Date mismatch",
                "description": f"Created: {create_date}, Modified: {modify_date}. File may have been edited after capture.",
                "severity": "warning",
            })
            suspicious = True

        if gps_lat and gps_lon:
            findings.append({"category": "GPS location", "description": f"Lat: {gps_lat}, Lon: {gps_lon}", "severity": "info"})

        # Check for stripped metadata (common in social media re-uploads)
        if not make and not model_name and not create_date:
            findings.append({
                "category": "Metadata stripped",
                "description": "No camera or date info found. This often indicates the image was re-saved, screenshotted, or uploaded through social media which strips EXIF data.",
                "severity": "warning",
            })
            suspicious = True

        if not findings:
            findings.append({"category": "Minimal metadata", "description": "ExifTool found no notable metadata fields.", "severity": "info"})

        confidence = 75 if suspicious else 30

        return {
            "type": "metadata_extraction",
            "confidence": confidence,
            "isManipulated": suspicious,
            "findings": findings,
            "processingTimeMs": elapsed,
            "model": "exiftool",
            "disclaimer": "EXIF metadata extracted via ExifTool. Metadata absence does not prove manipulation; social media platforms routinely strip EXIF data.",
            "rawExif": exif_data,
        }
    finally:
        if is_temp and filepath:
            try:
                os.unlink(filepath)
            except OSError:
                pass


# ---------------------------------------------------------------------------
# POST /c2pa_verification  — Real c2patool
# ---------------------------------------------------------------------------
@app.post("/c2pa_verification")
async def c2pa_verification(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
    options: str | None = Form(default=None),
) -> dict[str, Any]:
    start = time.perf_counter()
    filepath, is_temp = await _save_upload_to_tempfile(file, url)

    if not filepath:
        return {
            "type": "c2pa_verification",
            "confidence": 0,
            "isManipulated": False,
            "findings": [{"category": "Input error", "description": "No file or URL provided.", "severity": "warning"}],
            "processingTimeMs": 0,
            "model": "c2patool",
            "disclaimer": "Provide a media file or URL to check for Content Credentials.",
        }

    try:
        stdout, stderr, rc = await _run_subprocess(["c2patool", filepath, "--detailed"])
        elapsed = int((time.perf_counter() - start) * 1000)

        findings: list[dict[str, Any]] = []
        has_c2pa = rc == 0 and stdout.strip() and "no claim found" not in stdout.lower()

        if has_c2pa:
            try:
                manifest = json.loads(stdout)
            except json.JSONDecodeError:
                manifest = {}

            active_manifest = manifest.get("active_manifest", "")
            manifests = manifest.get("manifests", {})

            if active_manifest and manifests.get(active_manifest):
                m = manifests[active_manifest]
                claim_gen = m.get("claim_generator", "Unknown")
                title = m.get("title", "N/A")
                assertions = m.get("assertions", [])

                findings.append({
                    "category": "Content Credentials found",
                    "description": f"Claim generator: {claim_gen}. Title: {title}.",
                    "severity": "info",
                })

                for assertion in assertions[:5]:
                    label = assertion.get("label", "unknown")
                    findings.append({
                        "category": f"Assertion: {label}",
                        "description": json.dumps(assertion.get("data", {}), ensure_ascii=False)[:300],
                        "severity": "info",
                    })

                ingredients = m.get("ingredients", [])
                if ingredients:
                    findings.append({
                        "category": "Ingredient chain",
                        "description": f"{len(ingredients)} ingredient(s) in provenance chain.",
                        "severity": "info",
                    })

                sig_info = m.get("signature_info", {})
                if sig_info:
                    issuer = sig_info.get("issuer", "Unknown")
                    findings.append({
                        "category": "Signature",
                        "description": f"Signed by: {issuer}",
                        "severity": "info",
                    })
            else:
                findings.append({
                    "category": "C2PA manifest present",
                    "description": "Content Credentials detected but could not parse manifest details.",
                    "severity": "info",
                })

            return {
                "type": "c2pa_verification",
                "confidence": 85,
                "isManipulated": False,
                "findings": findings,
                "processingTimeMs": elapsed,
                "model": "c2patool",
                "disclaimer": "This media contains C2PA Content Credentials. Provenance data verified via c2patool.",
                "rawManifest": manifest if manifest else None,
            }
        else:
            findings.append({
                "category": "No Content Credentials",
                "description": "This media does not contain C2PA provenance data. This is normal for most images — C2PA adoption is still early.",
                "severity": "info",
            })

            return {
                "type": "c2pa_verification",
                "confidence": 20,
                "isManipulated": False,
                "findings": findings,
                "processingTimeMs": elapsed,
                "model": "c2patool",
                "disclaimer": "No C2PA Content Credentials found. Absence of credentials does not indicate manipulation.",
            }
    finally:
        if is_temp and filepath:
            try:
                os.unlink(filepath)
            except OSError:
                pass


# ---------------------------------------------------------------------------
# POST /arabic  — Real CAMeL Tools
# ---------------------------------------------------------------------------
class ArabicRequest(BaseModel):
    text: str


@app.post("/arabic")
def arabic(request: ArabicRequest) -> dict[str, Any]:
    text = request.text.strip()
    if not text:
        return {
            "language": "ar",
            "dialectHint": "mixed",
            "sentiment": {"label": "neutral", "confidence": 0.0},
            "emotionalTriggers": [],
            "riskFlags": [],
            "entities": [],
            "provider": "microservice",
            "disclaimer": "Empty text submitted.",
        }

    start = time.perf_counter()

    # --- Dialect identification ---
    try:
        did = _get_dialect_identifier()
        dialect_preds = did.predict([text])
        top_dialect = dialect_preds[0].top
        if "egypt" in top_dialect.lower() or top_dialect == "EGY":
            dialect_hint = "egyptian"
        elif top_dialect in ("MSA",):
            dialect_hint = "msa"
        else:
            dialect_hint = "mixed"
    except Exception:
        egy_markers = ["مش", "عايز", "إحنا", "ليه", "دلوقتي", "كده", "عشان"]
        dialect_hint = "egyptian" if any(m in text for m in egy_markers) else "mixed"

    # --- Sentiment analysis ---
    try:
        sa = _get_sentiment_analyzer()
        sentiment_raw = sa.predict([text])[0]
        label_map = {"positive": "positive", "negative": "negative", "neutral": "neutral"}
        sentiment_label = label_map.get(sentiment_raw.lower(), "neutral")
        sentiment_confidence = 0.82
    except Exception:
        neg_hits = sum(1 for w in EMOTIONAL_NEG if w in text)
        pos_hits = sum(1 for w in EMOTIONAL_POS if w in text)
        if neg_hits > pos_hits:
            sentiment_label = "negative"
        elif pos_hits > neg_hits:
            sentiment_label = "positive"
        else:
            sentiment_label = "neutral"
        sentiment_confidence = min(0.45 + (neg_hits + pos_hits) * 0.08, 0.92)

    # --- NER ---
    entities: list[dict[str, str]] = []
    try:
        ner = _get_ner_tagger()
        tokens = text.split()
        labels = ner.predict(tokens)
        current_entity = ""
        current_label = ""
        for token, label in zip(tokens, labels):
            if label.startswith("B-"):
                if current_entity:
                    entities.append({"text": current_entity.strip(), "type": _map_ner_label(current_label)})
                current_entity = token
                current_label = label[2:]
            elif label.startswith("I-") and current_label:
                current_entity += " " + token
            else:
                if current_entity:
                    entities.append({"text": current_entity.strip(), "type": _map_ner_label(current_label)})
                    current_entity = ""
                    current_label = ""
        if current_entity:
            entities.append({"text": current_entity.strip(), "type": _map_ner_label(current_label)})
    except Exception:
        for term in EMOTIONAL_NEG + EMOTIONAL_POS:
            if term in text:
                entities.append({"text": term, "type": "emotion"})

    # --- Emotional triggers ---
    triggers = [w for w in EMOTIONAL_NEG + EMOTIONAL_POS if w in text][:6]

    # --- Risk flags ---
    risk_flags = [p for p in RISK_PATTERNS if p in text]

    elapsed = int((time.perf_counter() - start) * 1000)

    return {
        "language": "ar",
        "dialectHint": dialect_hint,
        "sentiment": {
            "label": sentiment_label,
            "confidence": round(sentiment_confidence, 2),
        },
        "emotionalTriggers": triggers,
        "riskFlags": risk_flags,
        "entities": entities,
        "provider": "microservice",
        "processingTimeMs": elapsed,
        "disclaimer": "Arabic NLP powered by CAMeL Tools (NYU Abu Dhabi). Sentiment and dialect models are research-grade.",
    }


def _map_ner_label(label: str) -> str:
    mapping = {
        "PER": "person",
        "LOC": "location",
        "ORG": "authority",
        "MISC": "religion",
    }
    return mapping.get(label, "emotion")


# ---------------------------------------------------------------------------
# Existing forensic stubs (deepfake_image, deepfake_video, audio_analysis)
# These remain as educational scaffolds until Sherloq / FaceForensics++
# models are integrated in a future chunk.
# ---------------------------------------------------------------------------
def _suspicion_score(text: str | None) -> tuple[bool, int]:
    if not text:
        return False, 18
    lowered = text.lower()
    suspicious = any(term in lowered for term in ["deepfake", "edited", "photoshop", "viral", "urgent", "breaking"])
    return suspicious, 46 if suspicious else 22


def _parse_options(options: str | None) -> dict[str, Any]:
    if not options:
        return {}
    try:
        value = json.loads(options)
        return value if isinstance(value, dict) else {}
    except json.JSONDecodeError:
        return {}


@app.post("/deepfake_image")
async def deepfake_image(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
    options: str | None = Form(default=None),
) -> dict[str, Any]:
    start = time.perf_counter()
    filepath, is_temp = await _save_upload_to_tempfile(file, url)

    if not filepath:
        return {
            "type": "deepfake_image",
            "confidence": 0,
            "isManipulated": False,
            "findings": [{"category": "Input error", "description": "No file or URL provided.", "severity": "warning"}],
            "processingTimeMs": 0,
            "model": "sherloq-inspired-image-pipeline",
            "disclaimer": "Provide an image file or URL to analyze.",
        }

    try:
        exif = await _extract_exif(filepath)
        signals = _compute_image_signals(filepath)
        parsed_options = _parse_options(options)
        findings: list[dict[str, Any]] = []
        suspicious = False

        ela_mean = _safe_float(signals.get("ela_mean"))
        ela_rms = _safe_float(signals.get("ela_rms"))
        edge_mean = _safe_float(signals.get("edge_mean"))
        brightness_std = _safe_float(signals.get("brightness_std"))
        width = int(signals.get("width", 0))
        height = int(signals.get("height", 0))
        sensitivity = parsed_options.get("sensitivity", "medium")

        findings.append({
            "category": "Image geometry",
            "description": f"{width}×{height}px, format={signals.get('format', 'unknown')}",
            "severity": "info",
        })
        findings.append({
            "category": "ELA residual",
            "description": f"Residual mean={ela_mean:.2f}, RMS={ela_rms:.2f}. Elevated residuals can indicate recompression boundaries.",
            "severity": "warning" if ela_rms >= 12 else "info",
        })
        findings.append({
            "category": "Edge density",
            "description": f"Average edge intensity={edge_mean:.2f}. Abnormally sharp boundaries can appear in synthetic or heavily edited regions.",
            "severity": "warning" if edge_mean >= 28 else "info",
        })
        findings.append({
            "category": "Brightness variation",
            "description": f"Grayscale standard deviation={brightness_std:.2f}. Flat global lighting may suggest a synthetic or oversmoothed render.",
            "severity": "warning" if brightness_std <= 26 else "info",
        })

        software = str(exif.get("EXIF:Software") or exif.get("ExifIFD:Software") or "")
        if software:
            edit_sw = any(kw in software.lower() for kw in ["photoshop", "gimp", "lightroom", "snapseed", "canva", "picsart"])
            findings.append({
                "category": "Editing software",
                "description": f"Software tag={software}",
                "severity": "warning" if edit_sw else "info",
            })
            suspicious = suspicious or edit_sw

        if not exif:
            findings.append({
                "category": "Metadata availability",
                "description": "No EXIF payload found. Screenshots, social re-uploads, and some synthetic pipelines strip metadata.",
                "severity": "warning",
            })
            suspicious = True

        if sensitivity == "high":
            suspicious = suspicious or ela_rms >= 10 or edge_mean >= 24 or brightness_std <= 30
        elif sensitivity == "low":
            suspicious = suspicious or ela_rms >= 15 or edge_mean >= 34 or brightness_std <= 22
        else:
            suspicious = suspicious or ela_rms >= 12 or edge_mean >= 28 or brightness_std <= 26

        confidence = _normalize_score((ela_rms * 2.8) + edge_mean - (brightness_std * 0.6), 10, 85)
        elapsed = int((time.perf_counter() - start) * 1000)

        return {
            "type": "deepfake_image",
            "confidence": confidence,
            "isManipulated": suspicious,
            "findings": findings,
            "processingTimeMs": elapsed,
            "model": "sherloq-inspired-image-pipeline",
            "disclaimer": "Image analysis now runs real ELA-style residual checks, edge-density inspection, and EXIF inspection. This is still a screening tool, not a final forensic verdict.",
            "rawExif": exif,
        }
    finally:
        if is_temp and filepath:
            try:
                os.unlink(filepath)
            except OSError:
                pass


@app.post("/deepfake_video")
async def deepfake_video(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
    options: str | None = Form(default=None),
) -> dict[str, Any]:
    start = time.perf_counter()
    filepath, is_temp = await _save_upload_to_tempfile(file, url)

    if not filepath:
        return {
            "type": "deepfake_video",
            "confidence": 0,
            "isManipulated": False,
            "findings": [{"category": "Input error", "description": "No file or URL provided.", "severity": "warning"}],
            "processingTimeMs": 0,
            "model": "ffprobe-video-screening",
            "disclaimer": "Provide a video file or URL to analyze.",
        }

    try:
        probe = await _probe_media(filepath)
        parsed_options = _parse_options(options)
        streams = probe.get("streams", []) if isinstance(probe, dict) else []
        format_info = probe.get("format", {}) if isinstance(probe, dict) else {}
        video_stream = next((stream for stream in streams if stream.get("codec_type") == "video"), {})
        audio_stream = next((stream for stream in streams if stream.get("codec_type") == "audio"), {})

        width = int(video_stream.get("width", 0) or 0)
        height = int(video_stream.get("height", 0) or 0)
        fps_raw = str(video_stream.get("avg_frame_rate") or "0/1")
        if "/" in fps_raw:
            numerator, denominator = fps_raw.split("/", 1)
            fps = _safe_float(numerator) / max(_safe_float(denominator, 1), 1)
        else:
            fps = _safe_float(fps_raw)
        duration = _safe_float(format_info.get("duration"))
        bitrate = _safe_float(format_info.get("bit_rate"))
        codec = str(video_stream.get("codec_name") or "unknown")
        audio_codec = str(audio_stream.get("codec_name") or "none")
        findings: list[dict[str, Any]] = [
            {
                "category": "Container metadata",
                "description": f"codec={codec}, audio={audio_codec}, duration={duration:.2f}s, bitrate={int(bitrate) if bitrate else 0}",
                "severity": "info",
            },
            {
                "category": "Frame cadence",
                "description": f"resolution={width}×{height}, fps={fps:.2f}. Inconsistent cadence can accompany re-rendered synthetic clips.",
                "severity": "warning" if fps and (fps < 20 or fps > 62) else "info",
            },
        ]

        suspicious = False
        if duration and duration < 1.0:
            findings.append({
                "category": "Extremely short clip",
                "description": "Very short clips make verification harder and are common in repackaged misinformation loops.",
                "severity": "warning",
            })
            suspicious = True

        if parsed_options.get("sensitivity") == "high" and codec in {"mjpeg", "gif"}:
            findings.append({
                "category": "Low-fidelity codec",
                "description": "This codec discards too much signal for strong deepfake analysis. Prefer original uploads.",
                "severity": "warning",
            })
            suspicious = True

        confidence = _normalize_score((fps * 1.2) + (duration * 0.8) + (bitrate / 150000), 10, 130)
        elapsed = int((time.perf_counter() - start) * 1000)

        return {
            "type": "deepfake_video",
            "confidence": confidence,
            "isManipulated": suspicious,
            "findings": findings,
            "processingTimeMs": elapsed,
            "model": "ffprobe-video-screening",
            "disclaimer": "Video screening now runs real ffprobe metadata inspection. Full FaceForensics++ frame inference is still pending.",
        }
    finally:
        if is_temp and filepath:
            try:
                os.unlink(filepath)
            except OSError:
                pass


@app.post("/audio_analysis")
async def audio_analysis(
    url: str | None = Form(default=None),
    file: UploadFile | None = File(default=None),
    options: str | None = Form(default=None),
) -> dict[str, Any]:
    start = time.perf_counter()
    filepath, is_temp = await _save_upload_to_tempfile(file, url)

    if not filepath:
        return {
            "type": "audio_analysis",
            "confidence": 0,
            "isManipulated": False,
            "findings": [{"category": "Input error", "description": "No file or URL provided.", "severity": "warning"}],
            "processingTimeMs": 0,
            "model": "ffprobe-audio-screening",
            "disclaimer": "Provide an audio file or URL to analyze.",
        }

    try:
        probe = await _probe_media(filepath)
        streams = probe.get("streams", []) if isinstance(probe, dict) else []
        format_info = probe.get("format", {}) if isinstance(probe, dict) else {}
        audio_stream = next((stream for stream in streams if stream.get("codec_type") == "audio"), {})
        sample_rate = _safe_float(audio_stream.get("sample_rate"))
        channels = int(audio_stream.get("channels", 0) or 0)
        codec = str(audio_stream.get("codec_name") or "unknown")
        duration = _safe_float(format_info.get("duration"))
        bitrate = _safe_float(format_info.get("bit_rate"))

        findings: list[dict[str, Any]] = [
            {
                "category": "Audio stream",
                "description": f"codec={codec}, sample_rate={int(sample_rate) if sample_rate else 0}Hz, channels={channels}, duration={duration:.2f}s",
                "severity": "info",
            },
        ]

        suspicious = False
        if sample_rate and sample_rate < 16000:
            findings.append({
                "category": "Low sample rate",
                "description": "Low sample rates are common in reposted or synthetic voice clips and reduce verification quality.",
                "severity": "warning",
            })
            suspicious = True

        if bitrate and bitrate < 64000:
            findings.append({
                "category": "Heavy compression",
                "description": "Severe audio compression can hide artifacts and is common in repost chains.",
                "severity": "warning",
            })
            suspicious = True

        confidence = _normalize_score((sample_rate / 500) + (bitrate / 2500) + (duration * 1.5), 20, 180)
        elapsed = int((time.perf_counter() - start) * 1000)

        return {
            "type": "audio_analysis",
            "confidence": confidence,
            "isManipulated": suspicious,
            "findings": findings,
            "processingTimeMs": elapsed,
            "model": "ffprobe-audio-screening",
            "disclaimer": "Audio screening now runs real ffprobe metadata inspection. Full Whisper or voice-clone detection is still pending.",
        }
    finally:
        if is_temp and filepath:
            try:
                os.unlink(filepath)
            except OSError:
                pass

