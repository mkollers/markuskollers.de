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
