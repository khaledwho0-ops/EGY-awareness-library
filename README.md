# Egyptian Awareness Library

A Next.js 16 platform delivering three evidence-based awareness engines targeting misinformation defense, mental health literacy, and religious moderation for Egyptian university students (18–30).

## Overview

The Egyptian Awareness Library (EAL) is a research-driven web application designed as part of a quasi-experimental study (N = 84, pre/post with control). It integrates validated psychometric instruments, AI-powered claim verification, and culturally adapted content across three core modules:

| Module | Focus | Key Instruments |
|--------|-------|-----------------|
| **DeepReal** | Misinformation & media forensics | MIST-20 (α = .77) |
| **Mental Health** | Literacy, stigma reduction, help-seeking | MHLS (α = .873), GHSQ (r = .86) |
| **Religion Hub** | Positive coping, moderation, fatwa verification | Brief RCOPE (α = .90/.81) |

Cross-cutting measures: SUS (α = .91) for usability, MC-SDS (α = .75) as covariate.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4, Framer Motion, Three.js / React Three Fiber
- **AI Integration:** Vercel AI SDK, Google Generative AI, Groq, LangChain, LangGraph
- **Data Visualization:** Recharts, Nivo, D3.js
- **NLP:** wink-nlp, natural, VADER sentiment
- **Internationalization:** i18next, react-i18next (EN ↔ AR with full RTL)
- **Auth:** jose (JWT), bcryptjs
- **Testing:** Vitest, Playwright, Testing Library
- **Deployment:** Vercel / Firebase Hosting, Docker Compose

## Quick Start

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/khaledwho0-ops/EGY-awareness-library.git
cd EGY-awareness-library
npm install
```

### Environment

Copy the example environment file and fill in any API keys you wish to enable:

```bash
cp .env.example .env.local
```

See [`.env.example`](.env.example) for the full list of supported integrations.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages (55+ routes)
│   ├── angry-debunkers/    # AI-powered claim debunking
│   ├── deepreal/           # DeepReal MVP — verification engine
│   ├── mental-health/      # Mental Health MVP — literacy & support
│   ├── religion-hub/       # Religion Hub MVP — moderation & coping
│   ├── dashboard/          # User progress & analytics
│   ├── assessment/         # Psychometric assessments (MIST-20, MHLS, Brief RCOPE)
│   ├── api/                # API routes (chat, debunking, analysis)
│   └── ...
├── components/             # Reusable UI components
│   ├── shared/             # Layout, navbar, footer, RTL provider
│   ├── exercises/          # Exercise engine & verification console
│   ├── science/            # Research visualization components
│   └── six-layers/         # 8-layer deception anatomy
├── data/                   # Static data & research content
│   ├── research/           # Cognitive knowledge, module libraries
│   ├── i18n/               # Bilingual string constants
│   ├── exercises/          # Exercise content per module
│   └── defense/            # Defense plans & page maps
├── lib/                    # Core business logic
│   ├── debunking/          # Claim classifier, API swarm, LLM rotator
│   ├── ai/                 # AI provider configuration
│   └── auth.ts             # JWT authentication
├── features/               # Feature-specific modules
└── types/                  # TypeScript type definitions
```

## Analysis Backend

An optional FastAPI scaffold lives in `services/analysis-backend`, exposing:

- `POST /deepfake_image` — Image forensics
- `POST /metadata_extraction` — EXIF/metadata analysis
- `POST /c2pa_verification` — Content authenticity verification
- `POST /deepfake_video` — Video analysis
- `POST /audio_analysis` — Audio deepfake detection
- `POST /arabic` — Arabic NLP processing
- `GET /health` — Health check

## Docker Compose

```bash
docker compose up --build
```

Starts the Next.js app (`:3000`), FastAPI backend (`:8000`), and Redis (`:6379`).

## Testing

```bash
npm run lint          # ESLint
npm run build         # TypeScript & build verification
```

## Research Documentation

The `RESEARCH_VAULT/` directory contains the project's research foundation:

- Implementation plans and conversation analysis
- Layer-specific research prompts
- Scientific methodology documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'feat: add your feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## Author

**Khalid Sayed** — [khalidsayed459@gmail.com](mailto:khalidsayed459@gmail.com)
