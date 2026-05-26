# Bad News — Feature Module

A faithful 1:1 clone of the open-source "Bad News" inoculation game, integrated into
the Egyptian Awareness Library as a self-contained educational feature.

## Attribution & License

**Bad News was created by DROG and the University of Cambridge.**

- Original Game: [https://www.getbadnews.com](https://www.getbadnews.com)
- About: [https://www.aboutbadnews.com](https://www.aboutbadnews.com)
- Source Repository: [https://github.com/DROGTeam](https://github.com/DROGTeam)

The Bad News game is an open-source, freely available educational tool released
under a permissive license by DROG. All scenario text, badge descriptions, and
game mechanics in this module are reproduced verbatim from the official
open-source repository. No content has been paraphrased, shortened, or altered.

## Data

- **369 scenario nodes** extracted verbatim from the official source
- **6 badges**: IMPERSONATION, EMOTION, POLARIZATION, CONSPIRACY, DISCREDIT, TROLLING
- **8 layout types**: text, social-post, headline, image, newspaper, dropdown, multiplechoice, avatar-picker
- **44 slider nodes** where users swipe between content options
- **60+ dynamic variables** for template interpolation (player name, tweet reactions, conspiracy topics, etc.)

## Architecture

```
src/features/badnews/
├── badnews.css              # Self-contained stylesheet (bn-* namespace)
├── utils.ts                 # interpolate() and stripHtml() helpers
├── README.md                # This file
├── data/
│   ├── badges.ts            # 6 badges with verbatim descriptions + icon URLs
│   └── scenarios.ts         # 369 scenario nodes with full type definitions
└── components/
    ├── BadNewsGame.tsx       # Root state machine (useReducer)
    ├── IntroScreen.tsx       # Name input + game intro
    ├── ScenarioCard.tsx      # Universal renderer for all 8 layout types + sliders
    ├── StatsBar.tsx          # Followers count + Credibility meter
    ├── BadgeTray.tsx         # 6 badge slots with earned/locked states
    ├── BadgeUnlockModal.tsx  # Animated badge reveal modal
    └── GameOverScreen.tsx    # Final stats + share + restart
```

## Game States

`INTRO → PLAYING → BADGE_UNLOCK → GAME_OVER`

Progress is persisted to `localStorage` under key `"badnews_progress"`.
