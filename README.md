# Egyptian Awareness Library

Next.js platform for three linked awareness engines:

- `DeepReal`: misinformation, source verification, media forensics
- `Mental Health`: literacy, stigma reduction, support routing
- `Religion Hub`: positive coping, moderation, formal-guidance boundaries

## Local Web App

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill in the integrations you want to enable.

Core keys:

- `GOOGLE_FACTCHECK_API_KEY`
- `CLAIMBUSTER_API_KEY`
- `VERACITY_BACKEND_URL` and optional `VERACITY_BACKEND_TOKEN`
- `HADITH_API_KEY` or `SUNNAH_API_KEY` + `SUNNAH_HADITH_SEARCH_URL`
- `KALIMAT_API_URL` and optional `KALIMAT_API_KEY`
- `TINEYE_API_URL`, `TINEYE_API_USERNAME`, `TINEYE_API_KEY`
- `FORENSIC_BACKEND_URL`
- `ARABIC_NLP_BACKEND_URL`

## Analysis Backend

A FastAPI scaffold now lives in `services/analysis-backend`.

It exposes:

- `POST /deepfake_image`
- `POST /metadata_extraction`
- `POST /c2pa_verification`
- `POST /deepfake_video`
- `POST /audio_analysis`
- `POST /arabic`
- `GET /health`

This backend is a runtime scaffold for the plan's large integrations. It currently returns safe stub analysis and is ready to be replaced with real tooling such as Sherloq, ExifTool, CAMeL Tools, AraBERT, or other Python services.

## Docker Compose

```bash
docker compose up --build
```

This starts:

- the Next.js app on `http://localhost:3000`
- the FastAPI analysis backend on `http://localhost:8000`
- Redis on `localhost:6379`

## CI

GitHub Actions is configured in `.github/workflows/ci.yml` to run:

- `npm run lint`
- `npm run build`
