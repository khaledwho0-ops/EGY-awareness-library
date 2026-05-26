/**
 * URL Extractor Worker
 * Uses the free Jina Reader API (https://r.jina.ai) to extract plain-text
 * content from any public URL — no API key required.
 */

const JINA_BASE = "https://r.jina.ai/";
const MAX_CONTENT_CHARS = 8000;

/** Regex-based URL detector. Matches http/https URLs. */
export function isUrl(text: string): boolean {
  const trimmed = text.trim();
  return /^https?:\/\/[^\s]{2,}$/i.test(trimmed);
}

export interface UrlExtractionResult {
  content: string;
  title: string;
  sourceUrl: string;
}

/**
 * Fetches and extracts plain-text content from the given URL via Jina Reader.
 * If Jina fails for any reason, falls back to returning the original URL string
 * as the content so downstream processing is never blocked.
 */
export async function extractUrlContent(url: string): Promise<UrlExtractionResult> {
  const sourceUrl = url.trim();

  try {
    const jinaUrl = `${JINA_BASE}${sourceUrl}`;

    const res = await fetch(jinaUrl, {
      headers: { Accept: "text/plain" },
    });

    if (!res.ok) {
      throw new Error(`Jina Reader returned HTTP ${res.status}`);
    }

    const rawText = await res.text();

    // Trim to max chars to avoid Gemini token limits
    const content = rawText.slice(0, MAX_CONTENT_CHARS);

    // Best-effort title extraction: Jina often includes "Title: ..." on first line
    let title = "";
    const firstLine = rawText.split("\n")[0] ?? "";
    if (firstLine.toLowerCase().startsWith("title:")) {
      title = firstLine.replace(/^title:\s*/i, "").trim();
    }

    if (!title) {
      // Derive a readable title from the URL hostname + pathname
      try {
        const parsed = new URL(sourceUrl);
        title = `${parsed.hostname}${parsed.pathname}`.replace(/\/$/, "") || sourceUrl;
      } catch {
        title = sourceUrl;
      }
    }

    return { content, title, sourceUrl };
  } catch (err) {
    console.warn("[url-extractor] Jina Reader failed, falling back to raw URL as content:", err);

    // Graceful fallback — still usable by the downstream pipeline
    return {
      content: sourceUrl,
      title: sourceUrl,
      sourceUrl,
    };
  }
}
