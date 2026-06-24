# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal homepage (markuskollers.de) — an Angular 11 app with server-side rendering (Angular Universal / Express) and a PWA service worker. Deployed to Google App Engine.

## Commands

- `ng serve` — dev server (client-side only) at http://localhost:4200, live reload.
- `npm run dev:ssr` — dev server with SSR (`ng run markuskollers-de:serve-ssr`); use this to test SSR-specific behavior.
- `npm run build` — production client build (`ng build -c production`).
- `npm run build:ssr` — full production build of both client and server bundles (slow, several minutes); output in `dist/browser` and `dist/server`.
- `npm start` / `npm run serve:ssr` — run the built SSR server (`node dist/server/main.js`).
- `npm test` — single-run unit tests with coverage (Karma + Jasmine, headless, no watch). Use `ng test` for watch mode during development.
- `ng test --include='**/some.component.spec.ts'` — run a single spec file.
- `npm run lint` — TSLint (`ng lint`).
- `npm run e2e` — Protractor end-to-end tests.
- `npm run deploy` — deploy to GCP App Engine (`markuskollers-de` project). Normally done by CI, not manually.
- `npm run bundle-report` — build with stats and open webpack-bundle-analyzer.

## Architecture

**SSR rendering pipeline.** Three bootstrap entry points: `src/main.ts` (browser), `src/main.server.ts` (server platform), and `server.ts` (Express host). At runtime the Express app (`server.ts`) renders routes via `ngExpressEngine` using `AppServerModule`. The server redirects `www.` → apex domain and serves static assets from `dist/browser` with 1y cache before falling back to Universal rendering. Code that touches browser-only globals (`window`, `ga`, etc.) must be guarded with `isPlatformBrowser(PLATFORM_ID)` — see `analytics.service.ts` for the pattern.

**Module/page structure.** `AppModule` (`app.module.ts`) is the root; `AppServerModule` (`app.server.module.ts`) wraps it for SSR and adds the `UniversalInterceptor`. Each route under `src/app/pages/*` is a lazy-loaded feature module with its own `*-routing.module.ts` (see `app-routing.module.ts`). Routes: `''` (landing), `blog`, `imprint`, `privacy`. Shared layout (header, footer) and helpers live in `src/app/shared/`.

**UniversalInterceptor** (`shared/helper/interceptors/universal-interceptor.ts`) rewrites relative HTTP request URLs to absolute ones during SSR, because the server has no implicit origin. Registered only in `AppServerModule`.

**Styling/theming.** Angular Material with a custom SCSS theme in `src/styles/theme.scss`. Per-component theme partials are named `_<component>-theme.scss` and composed into the global theme (not loaded via the component's `styleUrls`). Shared SCSS variables: `src/styles/breakpoints.scss` (`$mat-xs/sm/md/lg`) and `src/styles/constants.scss` (`$width`, `$padding`).

## Conventions (enforced by TSLint)

- Component selectors: element, kebab-case, prefix `mk-` (e.g. `mk-header`). Directive selectors: attribute, camelCase, prefix `mk`.
- Single quotes; max line length 140; no trailing commas; leading underscore allowed for variable names (e.g. private `_router`).
- `lodash` and `rxjs/Rx` imports are blacklisted.
- 2-space indentation, final newline, no trailing whitespace (`.editorconfig`).

## CI/CD

CircleCI (`.circleci/config.yml`) on every branch: install → `build:ssr` → `npm test` → upload coverage to Code Climate. Deploy to GCP App Engine runs only on `master`. Note the runtime targets Node 10 (`app.yaml`, CI image).
