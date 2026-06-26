# Iteration 0 — Astro-Fundament Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine leere, aber deploybare markuskollers.de-Seite auf Astro aufsetzen — mit TypeScript, Tailwind v4, selbstgehosteten Fonts, DE/EN-i18n-Routing, getypten Content Collections und einer Netlify-Deploy-Pipeline.

**Architecture:** Astro im Static-Site-Generation-Modus (kein Adapter, statisches `dist/`). Tailwind v4 über das Vite-Plugin (CSS-first, kein `tailwind.config.js`). Fonts via Fontsource selbst gehostet. i18n über Astros natives Routing (`/` = de ohne Prefix, `/en/`). Content Collections über die Astro-5-Content-Layer-API (`glob()`/`file()`-Loader + Zod-Schemas) als Single Source of Truth. Kein Client-seitiges Framework-JS.

**Tech Stack:** Astro 5, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/vite`), Fontsource (Fraunces / Geist / Geist Mono), Vitest (Unit-Tests für reine Helfer), Prettier (`prettier-plugin-astro`), `@astrojs/sitemap`, Netlify (statisch).

## Global Constraints

Diese gelten implizit für **jede** Task:

- **Node ≥ 20** (lokal und auf Netlify; via `.nvmrc` + `netlify.toml`).
- **Astro 5**, **Tailwind v4** — CSS-first-Konfiguration, **kein** `tailwind.config.js`, **nicht** die alte `@astrojs/tailwind`-Integration.
- **TypeScript strict** (`astro/tsconfigs/strict`).
- **Fonts selbst gehostet** über Fontsource — **kein** Google-Fonts-CDN, kein externer Font-Request.
- **Kein Client-Framework-JS** — keine React/Vue/Svelte-Islands in Iteration 0.
- **Code-Stil** (aus `.editorconfig` + altem Repo): 2-Space-Indent, Single Quotes, max. Zeilenlänge 140, keine Trailing Commas, finaler Newline, kein Trailing Whitespace.
- **Deutsche Copy mit echten Umlauten** (ä, ö, ü, ß), kein ae/oe/ue/ss.
- **Farben verbatim** (Light / Dark): Akzent `#EA6A12` / `#FB923C`; Akzent-Text/Links `#B5470B` / `#FDBA74`; Ink `#1A1714` / `#F5F2EC`; Background `#FAF8F4` / `#15120E`.
- **Fonts verbatim:** Fraunces (Display) + Geist Sans (Text) + Geist Mono (Mono/Labels).

## Prerequisites

- PR #38 (Angular-Reset) ist gemerged; `origin/master` enthält nur noch `.claude/`, `docs/`, `CLAUDE.md`, `README.md`, `.editorconfig`, `.gitignore`, `.deepsource.toml`.
- **Vor Task 1:** frischen Branch von aktuellem `origin/master` abzweigen, z. B. `feat/astro-foundation` (`git fetch origin master && git checkout -b feat/astro-foundation origin/master`). Nicht auf `master` arbeiten.

## Bewusst NICHT in Iteration 0

- Theme-Toggle (JS-Insel) — Dark Mode läuft hier rein über `prefers-color-scheme`. Toggle kommt in einer späteren Iteration.
- Echte CV-/Case-Inhalte — Seeds sind klar markierte Platzhalter; Inhalte kommen in Iteration 1/2.
- `/fuer/<slug>/`-Routen — nur das `targets`-Schema wird hier angelegt, noch keine generierten Seiten (Iteration 3).

## File Structure

| Datei | Verantwortung |
|---|---|
| `package.json` | Scripts + Dependencies |
| `astro.config.mjs` | Astro-Konfiguration: `site`, Tailwind-Vite-Plugin, i18n, Sitemap |
| `tsconfig.json` | TypeScript strict + Astro-Typen |
| `src/pages/index.astro` | Landing (de, `/`) — Platzhalter-Hero |
| `src/pages/en/index.astro` | Landing (en, `/en/`) — Platzhalter-Hero |
| `src/layouts/BaseLayout.astro` | HTML-Hülle: `<html lang>`, `<head>`, Global-CSS, `<slot/>` |
| `src/styles/global.css` | Tailwind-Import, Font-Imports, Design-Tokens (Light/Dark), Base-Styles |
| `src/i18n/ui.ts` | Sprachregister + Übersetzungs-Strings |
| `src/i18n/utils.ts` | `getLangFromUrl`, `useTranslations` (reine Funktionen) |
| `src/i18n/utils.test.ts` | Vitest-Unit-Tests für die i18n-Helfer |
| `src/content.config.ts` | Content-Collections + Zod-Schemas (cv, projects, skills, targets) |
| `src/content/cv/*.md` | CV-Stationen (Seed-Platzhalter) |
| `src/content/projects/*.md` | Cases (Seed-Platzhalter) |
| `src/content/skills.json` | Skills (Seed-Platzhalter) |
| `src/content/targets/*.md` | Personalisierte Ziele (Seed-Platzhalter) |
| `netlify.toml` / `.nvmrc` | Netlify-Build + Node-Version |
| `.prettierrc` | Formatierungsregeln (passend zu `.editorconfig`) |
| `README.md` / `CLAUDE.md` | Projekt-Doku auf neuen Stack aktualisiert |

---

## Task 1: Astro-Grundgerüst mit grünem Build

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/pages/index.astro`
- Modify: `.gitignore`

**Interfaces:**
- Produces: lauffähiges Astro-Projekt mit `npm run build` → `dist/index.html`; npm-Scripts `dev`, `build`, `preview`, `check`.

- [ ] **Step 1: `.gitignore` um Astro/Node-Artefakte ergänzen**

Vorhandene `.gitignore` lesen und sicherstellen, dass diese Einträge enthalten sind (fehlende anhängen, nicht duplizieren):

```gitignore
node_modules/
dist/
.astro/
.DS_Store
*.log
```

- [ ] **Step 2: `package.json` anlegen**

```json
{
  "name": "markuskollers-de",
  "type": "module",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 3: Astro + Check-Toolchain installieren**

Run:
```bash
npm install astro
npm install -D @astrojs/check typescript
```
Expected: installiert ohne Fehler; `node_modules/` entsteht (durch `.gitignore` ignoriert), `package-lock.json` wird geschrieben.

- [ ] **Step 4: `tsconfig.json` anlegen**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: `astro.config.mjs` anlegen**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://markuskollers.de'
});
```

- [ ] **Step 6: Platzhalter-Seite `src/pages/index.astro` anlegen**

```astro
---
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Markus Kollers</title>
  </head>
  <body>
    <main>
      <h1>Markus Kollers</h1>
      <p>Relaunch in Arbeit.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 7: Build ausführen und Output prüfen**

Run:
```bash
npm run build && grep -q 'Relaunch in Arbeit.' dist/index.html && echo OK
```
Expected: Build endet ohne Fehler, gibt `OK` aus (Datei `dist/index.html` existiert und enthält den Marker-Text).

- [ ] **Step 8: Commit**

```bash
git add .gitignore package.json package-lock.json astro.config.mjs tsconfig.json src/pages/index.astro
git commit -m "feat: scaffold Astro project with TypeScript strict"
```

---

## Task 2: Tailwind v4, selbstgehostete Fonts und Design-Tokens

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `astro.config.mjs`, `src/pages/index.astro` aus Task 1.
- Produces: `BaseLayout.astro` mit `Props { title: string; lang?: string; description?: string }`; Tailwind-Utilities für Tokens: `bg-bg`, `text-ink`, `bg-accent`, `text-accent-text`, `font-display`, `font-mono`.

- [ ] **Step 1: Tailwind v4 und Fonts installieren**

Run:
```bash
npm install tailwindcss @tailwindcss/vite
npm install @fontsource-variable/fraunces @fontsource-variable/geist @fontsource-variable/geist-mono
```
Expected: installiert ohne Fehler.

- [ ] **Step 2: Tailwind-Vite-Plugin in `astro.config.mjs` einhängen**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://markuskollers.de',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: `src/styles/global.css` mit Tokens und Fonts anlegen**

```css
@import 'tailwindcss';
@import '@fontsource-variable/fraunces';
@import '@fontsource-variable/geist';
@import '@fontsource-variable/geist-mono';

@theme {
  --font-display: 'Fraunces Variable', Georgia, serif;
  --font-sans: 'Geist Variable', system-ui, sans-serif;
  --font-mono: 'Geist Mono Variable', ui-monospace, monospace;

  --color-bg: var(--bg);
  --color-ink: var(--ink);
  --color-accent: var(--accent);
  --color-accent-text: var(--accent-text);
}

:root {
  --bg: #faf8f4;
  --ink: #1a1714;
  --accent: #ea6a12;
  --accent-text: #b5470b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #15120e;
    --ink: #f5f2ec;
    --accent: #fb923c;
    --accent-text: #fdba74;
  }
}

@layer base {
  body {
    background-color: var(--bg);
    color: var(--ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
}
```

- [ ] **Step 4: `src/layouts/BaseLayout.astro` anlegen**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  lang?: string;
  description?: string;
}

const { title, lang = 'de', description = '' } = Astro.props;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 5: `src/pages/index.astro` auf BaseLayout + Tokens umstellen**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Markus Kollers" lang="de" description="Lebendiger Lebenslauf von Markus Kollers.">
  <main class="mx-auto max-w-2xl px-6 py-24">
    <h1 class="font-display text-4xl">Markus Kollers</h1>
    <p class="mt-4 font-mono text-accent-text">Relaunch in Arbeit.</p>
  </main>
</BaseLayout>
```

- [ ] **Step 6: Build ausführen und Fonts + Tokens im Output prüfen**

Run:
```bash
npm run build && grep -rq 'Fraunces' dist && grep -rq 'accent-text' dist && echo OK
```
Expected: Build ohne Fehler, `OK` (Fontsource-`@font-face` mit „Fraunces" und die Akzent-Token-Utility landen im generierten CSS).

- [ ] **Step 7: Commit**

```bash
git add astro.config.mjs src/styles/global.css src/layouts/BaseLayout.astro src/pages/index.astro package.json package-lock.json
git commit -m "feat: add Tailwind v4, self-hosted fonts and design tokens"
```

---

## Task 3: DE/EN-i18n-Routing und Übersetzungs-Helfer

**Files:**
- Modify: `astro.config.mjs`
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/utils.ts`
- Create: `src/i18n/utils.test.ts`
- Create: `src/pages/en/index.astro`
- Modify: `src/pages/index.astro`
- Modify: `package.json`

**Interfaces:**
- Consumes: `BaseLayout.astro` aus Task 2.
- Produces:
  - `src/i18n/ui.ts` exportiert `ui`, `defaultLang` (`'de'`), `languages`.
  - `src/i18n/utils.ts` exportiert `getLangFromUrl(url: URL): 'de' | 'en'` und `useTranslations(lang): (key) => string`.
  - Routen `/` (lang=de) und `/en/` (lang=en).

- [ ] **Step 1: Vitest installieren und `test`-Script ergänzen**

Run:
```bash
npm install -D vitest
```
Dann in `package.json` das `scripts`-Objekt um `test` ergänzen:

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  }
```

- [ ] **Step 2: i18n-Konfiguration in `astro.config.mjs` ergänzen**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://markuskollers.de',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: `src/i18n/ui.ts` anlegen**

```ts
export const languages = {
  de: 'Deutsch',
  en: 'English'
} as const;

export const defaultLang = 'de';

export const ui = {
  de: {
    'hero.tagline': 'Relaunch in Arbeit.'
  },
  en: {
    'hero.tagline': 'Relaunch in progress.'
  }
} as const;
```

- [ ] **Step 4: `src/i18n/utils.ts` anlegen**

```ts
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
```

- [ ] **Step 5: Failing Test `src/i18n/utils.test.ts` schreiben**

```ts
import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations } from './utils';

describe('getLangFromUrl', () => {
  it('returns "en" for /en/ paths', () => {
    expect(getLangFromUrl(new URL('https://markuskollers.de/en/'))).toBe('en');
  });

  it('falls back to "de" for the default route', () => {
    expect(getLangFromUrl(new URL('https://markuskollers.de/'))).toBe('de');
  });
});

describe('useTranslations', () => {
  it('translates a known key for en', () => {
    const t = useTranslations('en');
    expect(t('hero.tagline')).toBe('Relaunch in progress.');
  });

  it('translates a known key for de', () => {
    const t = useTranslations('de');
    expect(t('hero.tagline')).toBe('Relaunch in Arbeit.');
  });
});
```

- [ ] **Step 6: Test laufen lassen (muss zuerst grün sein, da reine Funktionen)**

Run:
```bash
npm test
```
Expected: 4 Tests grün. (Bei rotem Lauf: `utils.ts`/`ui.ts` gegen Steps 3–4 prüfen, bevor es weitergeht.)

- [ ] **Step 7: `src/pages/index.astro` auf den Helfer umstellen**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { useTranslations } from '../i18n/utils';

const t = useTranslations('de');
---
<BaseLayout title="Markus Kollers" lang="de" description="Lebendiger Lebenslauf von Markus Kollers.">
  <main class="mx-auto max-w-2xl px-6 py-24">
    <h1 class="font-display text-4xl">Markus Kollers</h1>
    <p class="mt-4 font-mono text-accent-text">{t('hero.tagline')}</p>
    <p class="mt-8"><a class="text-accent-text underline" href="/en/">English</a></p>
  </main>
</BaseLayout>
```

- [ ] **Step 8: `src/pages/en/index.astro` anlegen**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { useTranslations } from '../../i18n/utils';

const t = useTranslations('en');
---
<BaseLayout title="Markus Kollers" lang="en" description="Markus Kollers' living CV.">
  <main class="mx-auto max-w-2xl px-6 py-24">
    <h1 class="font-display text-4xl">Markus Kollers</h1>
    <p class="mt-4 font-mono text-accent-text">{t('hero.tagline')}</p>
    <p class="mt-8"><a class="text-accent-text underline" href="/">Deutsch</a></p>
  </main>
</BaseLayout>
```

- [ ] **Step 9: Build ausführen und beide Locale-Routen prüfen**

Run:
```bash
npm run build \
  && grep -q 'lang="de"' dist/index.html \
  && grep -q 'lang="en"' dist/en/index.html \
  && echo OK
```
Expected: `OK` — `dist/index.html` (de) und `dist/en/index.html` (en) existieren mit korrektem `lang`-Attribut.

- [ ] **Step 10: Commit**

```bash
git add astro.config.mjs src/i18n src/pages/index.astro src/pages/en/index.astro package.json package-lock.json
git commit -m "feat: add DE/EN i18n routing and translation helper"
```

---

## Task 4: Content Collections für cv, projects, skills, targets

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/cv/qrafto.md`
- Create: `src/content/projects/qrafto.md`
- Create: `src/content/skills.json`
- Create: `src/content/targets/sample.md`

**Interfaces:**
- Consumes: Astro-Setup aus Task 1.
- Produces: Collections `cv`, `projects`, `skills`, `targets` mit getypten Zod-Schemas (Single Source of Truth für spätere Iterationen). Validierung über `astro check` (führt `astro sync` aus und prüft alle Seeds gegen ihr Schema).

- [ ] **Step 1: `src/content.config.ts` mit Schemas anlegen**

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const cv = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/cv' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    start: z.string(),
    end: z.string().nullable().default(null),
    location: z.string().optional(),
    summary: z.string(),
    order: z.number()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    url: z.string().url().optional(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    order: z.number()
  })
});

const skills = defineCollection({
  loader: file('./src/content/skills.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['language', 'framework', 'cloud', 'practice']),
    level: z.number().min(1).max(5)
  })
});

const targets = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/targets' }),
  schema: z.object({
    company: z.string(),
    lang: z.enum(['de', 'en']).default('de'),
    greeting: z.string(),
    intro: z.string(),
    noindex: z.boolean().default(true)
  })
});

export const collections = { cv, projects, skills, targets };
```

- [ ] **Step 2: Seed `src/content/cv/qrafto.md` anlegen**

```md
---
role: Gründer & Geschäftsführer
org: Qrafto UG
start: 2026-01
end: null
location: Remote
summary: Platzhalter — echter Inhalt folgt in Iteration 1.
order: 1
---
```

- [ ] **Step 3: Seed `src/content/projects/qrafto.md` anlegen**

```md
---
title: Qrafto
tagline: Platzhalter — folgt in Iteration 2.
problem: Platzhalter.
solution: Platzhalter.
result: Platzhalter.
order: 1
---
```

- [ ] **Step 4: Seed `src/content/skills.json` anlegen**

```json
[
  { "id": "typescript", "name": "TypeScript", "category": "language", "level": 5 }
]
```

- [ ] **Step 5: Seed `src/content/targets/sample.md` anlegen**

```md
---
company: Beispiel GmbH
lang: de
greeting: Hallo Beispiel GmbH 👋
intro: Platzhalter — personalisierte Ziel-Seiten kommen in Iteration 3.
noindex: true
---
```

- [ ] **Step 6: Content-Schemas gegen die Seeds validieren**

Run:
```bash
npm run check
```
Expected: `astro check` führt zuerst `astro sync` aus (lädt alle vier Collections, validiert jedes Frontmatter/JSON gegen sein Schema) und meldet anschließend `0 errors`. Schlägt ein Seed gegen sein Schema fehl, bricht `check` hier ab.

- [ ] **Step 7: Build prüfen (Collections brechen den Build nicht)**

Run:
```bash
npm run build && echo OK
```
Expected: Build ohne Fehler, `OK`.

- [ ] **Step 8: Commit**

```bash
git add src/content.config.ts src/content
git commit -m "feat: add content collections for cv, projects, skills, targets"
```

---

## Task 5: Netlify-Deploy-Pipeline, Prettier und Projekt-Doku

**Files:**
- Create: `netlify.toml`
- Create: `.nvmrc`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `README.md`
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: alles aus Tasks 1–4.
- Produces: Netlify-Build-Definition (statisch, `dist`), `lint`/`format`-Scripts, Sitemap-Integration, aktualisierte Projekt-Doku.

- [ ] **Step 1: Sitemap-Integration installieren**

Run:
```bash
npm install @astrojs/sitemap
```
Expected: installiert ohne Fehler.

- [ ] **Step 2: Sitemap in `astro.config.mjs` einhängen**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://markuskollers.de',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: `.nvmrc` anlegen**

```
20
```

- [ ] **Step 4: `netlify.toml` anlegen**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

- [ ] **Step 5: Prettier installieren**

Run:
```bash
npm install -D prettier prettier-plugin-astro
```
Expected: installiert ohne Fehler.

- [ ] **Step 6: `.prettierrc` anlegen (passend zu `.editorconfig`)**

```json
{
  "printWidth": 140,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "none",
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

- [ ] **Step 7: `.prettierignore` anlegen**

```
dist/
.astro/
node_modules/
package-lock.json
```

- [ ] **Step 8: `lint`/`format`-Scripts in `package.json` ergänzen**

Das `scripts`-Objekt um `format` und `lint` erweitern (vorhandene Einträge behalten):

```json
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "format": "prettier --write .",
    "lint": "prettier --check . && astro check"
  }
```

- [ ] **Step 9: Repo einmal formatieren**

Run:
```bash
npm run format
```
Expected: Prettier formatiert die neuen Dateien; Lauf endet ohne Fehler.

- [ ] **Step 10: `README.md` auf den neuen Stack aktualisieren**

```md
# markuskollers.de

Persönliche Homepage von Markus Kollers — als „lebendiger Lebenslauf".

Astro (Static Site Generation) + TypeScript + Tailwind CSS v4, zweisprachig
(DE/EN), Content Collections als Single Source of Truth, Deploy auf Netlify.

## Entwicklung

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Dev-Server auf http://localhost:4321
npm run build      # Produktions-Build nach dist/
npm run preview    # gebauten Build lokal ansehen
npm test           # Unit-Tests (Vitest)
npm run check      # Typen + Content-Schemas prüfen (astro check)
npm run lint       # Prettier-Check + astro check
npm run format     # Code formatieren
```

## Vorhaben & Fahrplan

Design & Iterationen: [`docs/superpowers/specs/2026-06-24-markuskollers-de-relaunch-design.md`](docs/superpowers/specs/2026-06-24-markuskollers-de-relaunch-design.md).

## Alte Seite (Angular)

Die bisherige Angular-11-Seite ist über das Git-Tag
[`angular-archive`](https://github.com/mkollers/markuskollers.de/tree/angular-archive)
archiviert.

```bash
git checkout angular-archive
```
```

- [ ] **Step 11: `CLAUDE.md` auf den neuen Stack umschreiben**

`CLAUDE.md` so ersetzen, dass es den Astro-Stack beschreibt (die Angular-spezifischen Abschnitte sind veraltet). Mindestinhalt:

```md
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

Netlify, static (`netlify.toml`: `npm run build` → `dist`, Node 20). Deploy on Git push.

## Roadmap

Design & iterations: `docs/superpowers/specs/2026-06-24-markuskollers-de-relaunch-design.md`. Plans live in `docs/superpowers/plans/`.
```

- [ ] **Step 12: Gesamte Qualitäts-Pipeline ausführen**

Run:
```bash
npm run lint && npm test && npm run build && test -f dist/sitemap-index.xml && echo OK
```
Expected: `lint` (Prettier-Check + astro check) sauber, Tests grün, Build ohne Fehler, Sitemap erzeugt, `OK`.

- [ ] **Step 13: Commit**

```bash
git add netlify.toml .nvmrc .prettierrc .prettierignore astro.config.mjs package.json package-lock.json README.md CLAUDE.md
git commit -m "chore: add Netlify deploy config, Prettier and project docs"
```

---

## Self-Review (vom Plan-Autor durchgeführt)

**Spec-Abdeckung** (Iteration 0: „Astro + TS + Tailwind + i18n + Content-Collections aufsetzen; Netlify-Deploy-Pipeline; Ergebnis: leere, deploybare Seite"):

- Astro + TS strict → Task 1 ✅
- Tailwind v4 (CSS-first) + selbstgehostete Fonts + Farb-Tokens (Light/Dark, verbatim) → Task 2 ✅
- i18n DE (default, kein Prefix) + EN (`/en/`) → Task 3 ✅
- Content Collections (cv, projects, skills, targets) mit Zod → Task 4 ✅
- Netlify-Deploy-Pipeline (statisch, Node 20) → Task 5 ✅
- Leere, deploybare Seite (Platzhalter-Hero, beide Sprachen, Sitemap) → Tasks 1–5 ✅
- Zero Client-Framework-JS → durchgehend eingehalten ✅
- Theme-Toggle bewusst deferred (Dark via `prefers-color-scheme`) → dokumentiert ✅

**Typ-Konsistenz:** `useTranslations`/`getLangFromUrl` in Task 3 definiert und in Tasks 3 (Pages) konsumiert; `BaseLayout`-Props in Task 2 definiert und in Tasks 2–3 konsumiert; Collection-Namen (`cv`, `projects`, `skills`, `targets`) in Task 4 konsistent. Keine Platzhalter („TBD"/„TODO") in Schritten.

**Scope:** Ein zusammenhängendes Subsystem (Fundament) — ein Plan, korrekt.
