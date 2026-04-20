# Agentic SDLC

> A practical course on AI-driven software development lifecycles.

**Live site:** https://nboitout.github.io/agentic-sdlc/

## What is this?

Agentic SDLC is a bilingual (EN/FR) course and resource library covering the engineering discipline of building software with AI coding agents. It covers loop design, context engineering, harness primitives, multi-agent coordination, and governance.

Built with [VitePress](https://vitepress.dev/), deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173/agentic-sdlc/en/

## Build

```bash
npm run build
npm run preview
```

## Structure

```
docs/
├── .vitepress/
│   ├── config.ts          # Nav, sidebar, i18n
│   └── theme/
│       ├── index.ts       # Theme entry
│       └── custom.css     # Brand colors (indigo #6366f1)
├── en/                    # English content
│   ├── index.md           # Homepage
│   ├── lectures/          # 8 lectures
│   ├── projects/          # 3 projects
│   └── resources/         # Templates + guides
├── fr/                    # French content
│   ├── index.md
│   ├── lectures/
│   ├── projects/
│   └── resources/
└── public/
    └── favicon.svg
```

## Deployment

Push to `main` — GitHub Actions builds and deploys automatically.

First-time setup:
1. Go to repo Settings → Pages → Source → **GitHub Actions**
2. Push to `main`

Sympa !!

## License

MIT © 2026 Nicolas Boitout
