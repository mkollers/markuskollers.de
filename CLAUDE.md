# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal homepage (markuskollers.de) — a static Astro site as a „living CV". Bilingual (DE/EN), built with TypeScript, Tailwind CSS v4 and Astro Content Collections. Deployed statically to Netlify.

## Commands

- `npm run dev` — dev server at http://localhost:4321, live reload.
- `npm run build` — static production build to `dist/`.
- `npm run preview` — serve the built `dist/` locally.
- `npm test` — unit tests (Vitest), single run.
- `npm run check` — type-check + validate content collection schemas (`astro check`, runs `astro sync` first).
- `npm run lint` — Prettier check + `astro check`.
- `npm run format` — format with Prettier.

## Architecture

- **Astro SSG**: no adapter, output is static `dist/`. Pages live in `src/pages/*` (`index.astro` = `/` = de, `src/pages/en/*` = `/en/`).
- **i18n**: native Astro routing, `defaultLocale: 'de'` without prefix, `en` under `/en/`. Strings in `src/i18n/ui.ts`; helpers `getLangFromUrl` / `useTranslations` in `src/i18n/utils.ts`.
- **Content Collections** (`src/content.config.ts`): `cv`, `projects`, `skills`, `targets` with Zod schemas — the Single Source of Truth for CV, cases, skills and personalized targets. Content lives under `src/content/`.
- **Styling**: Tailwind v4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`). Design tokens + self-hosted Fontsource fonts (Fraunces / Geist / Geist Mono) in `src/styles/global.css`. Dark mode via `prefers-color-scheme`.
- **No client framework JS** — interactivity only as isolated islands when needed.

## Conventions

- 2-space indent, single quotes, max line length 140, no trailing commas, final newline (`.editorconfig` + `.prettierrc`).
- German copy uses real umlauts (ä, ö, ü, ß).

## Deploy

Netlify, static (`netlify.toml`: `npm run build` → `dist`, Node 22 — Astro 7 requires >=22.12). Deploy on Git push.

## Roadmap

Design & iterations: `docs/superpowers/specs/2026-06-24-markuskollers-de-relaunch-design.md`. Plans live in `docs/superpowers/plans/`.
