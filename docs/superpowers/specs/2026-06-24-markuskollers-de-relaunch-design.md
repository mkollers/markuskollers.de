# markuskollers.de — Relaunch als „lebendiger Lebenslauf"

**Datum:** 2026-06-24
**Status:** Design / Spec (zur Umsetzung freigegeben nach Review)

---

## Mission (North Star)

> **markuskollers.de ist mein lebendiger Lebenslauf: eine Seite, die nicht nur
> behauptet, was ich kann, sondern es vorführt. Open Source, modern gebaut, in
> unter 10 Sekunden verstanden — sodass ein Recruiter oder Kunde nach einem
> Scroll weiß: *mit dem will ich reden.***

### Leitprinzipien (Entscheidungsmaßstab)

1. **Show, don't tell** — die Seite *ist* der Kompetenzbeweis: moderner Stack,
   Top-Performance, öffentlicher Code.
2. **Substanz über Effekt** — Klarheit schlägt Spektakel; Persönlichkeit kommt
   über Inhalt, Ton und Foto, nicht über Effekte.
3. **In <10 s zur Botschaft** — wer ist er, was kann er, was tun (Kontakt/CV).

### Positionierung (ein Satz)

> *Tech-Leader & Solo-Founder, der dank agentischem Engineering solo auf
> Team-Niveau liefert — von der Architektur über K8s/DevOps bis zur Gründung.*

### Zielgruppe

- **Recruiter / Arbeitgeber** (Festanstellung): seriös, schnell scannbar.
- **Kunden / Auftraggeber** (Freelance/Fractional): Angebot & Cases, Kontakt.

Tech-Publikum/Peers sind willkommenes Nebenpublikum (Code ist öffentlich),
aber nicht der primäre Treiber.

---

## Profil-Kern (Quelle: Lebenslauf 2026)

Roter Faden über 10+ Jahre: digitale Produkte, Teams und Abteilungen aufbauen —
vom Konzern (Basalt, Helaba) über Mittelstand (vertical) bis Start-up.

- **Qrafto UG** (2026–): Gründer & Geschäftsführer, B2B-SaaS Handwerk/Bau, solo
  von der ersten Codezeile zum zahlenden Kunden; K8s/Helm, CI/CD, DSGVO,
  EU-LLM. **Differenzierer:** agentisches Coding (Claude Code, bis 8 parallele
  Agenten in Git-Worktrees, Builder-Critic, MCP) → Durchsatz auf Team-Niveau.
- **kolula solutions UG** (2024–): Fractional CTO, Führungsteam, bis 12 Devs.
- **Basalt AG** (2022–2024): Software Architect, Dev-Abteilung im Konzern.
- **vertical GmbH** (2017–2021): Head of Product/Digital Transformation/Architect.
- Weitere: VP Verbund Pflegehilfe (Head of Dev), Dozent DHBW.
- Skills: TS, C#, Go, Python; Angular/React/Next; GCP/Azure/AWS, K8s, DevOps.

---

## Tech-Stack & Architektur

- **Astro** (Static Site Generation, statisch ausgeliefert).
- **TypeScript**, **Tailwind CSS**.
- **Content Collections** — typisierte Markdown/MDX/Daten als *Single Source of
  Truth*: CV-Stationen, Projekte/Cases, Skills, und personalisierte Ziele.
- **i18n** über Astros natives Routing: `/` (de, default) + `/en/`.
- **Interaktivität nur als Insel** (z. B. Theme-Toggle) — sonst kein
  Framework-JS auf der Seite.
- **Clean Rebuild** im bestehenden Repo: gesamte Angular-Altlast entfernen,
  Git-History bleibt erhalten.
- **Hosting/Deploy:** **Netlify** (bestehende Heimat), Astro-SSG, Deploy per
  Git-Push; `@astrojs/netlify` nur falls später SSR/Edge nötig.

### Warum Astro

Content-first (CV+Cases sind Content), nahezu null Client-JS, Top
SEO/Performance — die Seite belegt ihren eigenen Pitch. Werkzeugwahl nach
Eignung statt nach Größe ist selbst ein Signal.

---

## Informationsarchitektur

**One-Pager mit Anker-Sektionen**, pro Sprache, plus Legal-Subpages und
optionale personalisierte Ziel-Seiten.

### Generische Hauptseite (`/`, `/en/`)

| Sektion | Inhalt |
|---|---|
| **Hero / Pitch** | Name, Foto, Ein-Satz-Positionierung, CTAs (Kontakt, CV-PDF ↓). Warmer, direkter Ton. |
| **Werdegang** | CV-Timeline (Qrafto → kolula → Basalt → vertical …) + Skill-/Tech-Matrix. |
| **Projekte / Cases** | 3 kuratierte Cases — **Qrafto, Eschomat, Alpha Rooms** — als Problem → Lösung → Ergebnis; Live-Links erlaubt. |
| **Wie ich ticke** | Arbeitsweise/Werte — macht nahbar (Personality-Sektion). |
| **Abseits des Jobs** | Mensch hinter dem CV (kurz, sympathisch). |
| **Kontakt** | mailto + LinkedIn/GitHub/StackOverflow; niedrigschwelliger CTA („gerne kurz & unverbindlich"). Kein Backend im MVP. |

### Legal (Pflicht)

`/impressum`, `/datenschutz` (+ `/en/...`). Neu aufgebaut.

### Personalisierte Ziel-Seiten (`/fuer/<slug>/`, `/en/for/<slug>/`)

Aus einer `targets`-Content-Collection generiert Astro pro Ziel
(Firma/Recruiter/Kunde) eine eigene Landing-Variante:

- **Personalisierte Begrüßung** (z. B. „Hallo [Firma] 👋").
- **Zugeschnittenes Intro** auf die konkrete Rolle/Gelegenheit.
- **Priorisierte Cases/Skills** (welche zuerst, welche ausgeblendet).
- Fällt auf die generischen Sektionen als Default zurück.

Eine Datenquelle, beliebig viele maßgeschneiderte Bewerbungs-/Pitch-Landings.
Nicht in Navigation/Sitemap verlinkt (per Direktlink geteilt; `noindex`).

### Content-Modell (Single Source of Truth)

Jede CV-Station / jedes Projekt / jedes Ziel = ein typisierter
Collection-Eintrag (Zod-Schema). Inhalte als Daten gepflegt, nicht im Markup.
Das CV-PDF wird später aus denselben Daten generiert.

---

## Design-System

- **Editorial / Minimal:** typografie-getrieben, großzügiger Weißraum, Zeilen
  ~70 Zeichen. Warm-neutrale Basis (kein kühles Grau).
- **Komponenten klein & isoliert:** Section-Wrapper, Timeline-Item,
  Skill-Badge/-Matrix, Project-Card, Button, Language-Switcher, Theme-Toggle.
- **A11y & Performance als Feature:** Ziel WCAG 2.1 AA, Lighthouse ~100. Das
  ist Teil des Pitches, kein Nice-to-have.
- **Ton:** warm, direkt, conversational — nicht Corporate.

### Farbpalette

Monochrome, warm-neutrale Basis + **ein** Akzent (Burnt/Amber-Orange als
Wiedererkennung zum bestehenden CV). Light & Dark.

| Token | Light | Dark | Zweck |
|---|---|---|---|
| Akzent (Signature) | `#EA6A12` | `#FB923C` | Große Akzente, Hover, Detail |
| Akzent-Text/Links | `#B5470B` | `#FDBA74` | Links/Text auf BG (WCAG AA) |
| Ink (Schrift) | `#1A1714` | `#F5F2EC` | warmes Fast-Schwarz / Fast-Weiß |
| Background | `#FAF8F4` | `#15120E` | warmes Off-White / warmes Dunkel |

### Typografie

Alle Schriften **frei lizenziert, selbst gehostet** (Fontsource) → Performance,
kein FOUT, DSGVO-konform (kein Google-Fonts-CDN).

- **Display/Headlines:** **Fraunces** (variable old-style Serif) — editorial,
  premium, charaktervoll.
- **Text/UI:** **Geist Sans** (variable) — clean, modern, „Web-Engineer".
- **Mono:** **Geist Mono** — Timeline-Jahre, Skill-Badges, Code-Akzente.

---

## Iterativer Fahrplan

Jede Iteration ist am Ende deploybar und durchläuft einen eigenen
Spec → Plan → Umsetzungs-Zyklus.

- **Iteration 0 — Fundament:** Repo von Angular-Altlast leeren; Astro + TS +
  Tailwind + i18n + Content-Collections aufsetzen; Netlify-Deploy-Pipeline.
  Ergebnis: leere, deploybare Seite.
- **Iteration 1 — CV-Kern (MVP):** Hero + Werdegang-Timeline + Skill-Matrix +
  „Wie ich ticke" + „Abseits des Jobs" + Kontakt + Legal. **DE zuerst, EN
  direkt danach.** Ergebnis: erste teilbare Version.
- **Iteration 2 — Cases:** Projekt-Sektion mit 3–4 Cases (Problem → Lösung →
  Ergebnis).
- **Iteration 3 — Personalisierung:** `targets`-Collection + `/fuer/<slug>/`-
  Generierung; erste reale Ziel-Seite.
- **Iteration 4 — Politur:** CV-PDF-Generierung aus Daten, Dark-Mode-Feinschliff,
  OG-Images/SEO, Performance/A11y-Audit.
- **Später (optional):** Blog zurückbringen; „Built with Claude Code"-Colophon
  als Agentic-Proof.

---

## Bewusst nicht im Scope (YAGNI)

- **Blog** im MVP (kommt ggf. als spätere Iteration zurück).
- **Kontaktformular mit Backend** — mailto + Social-Links genügen.
- **Öffentliche Zeugnis-/Proof-Galerie** (Arbeitszeugnisse) — bewusst weggelassen.
- **CMS** — Content lebt als versionierte Dateien im Repo.

---

## Entschiedene Detailfragen

- **Akzentfarbe:** Burnt/Amber-Orange `#EA6A12` (Light) / `#FB923C` (Dark) —
  siehe Farbpalette.
- **Typografie:** Fraunces (Display) + Geist Sans (Text) + Geist Mono — siehe
  Typografie.
- **Cases:** Qrafto, Eschomat, Alpha Rooms.
- **CV-PDF:** automatisch aus den Content-Collection-Daten generiert (Single
  Source of Truth), nicht statisch gepflegt. Umsetzung in Iteration 4, sobald
  Daten vollständig sind.

## Offene Detailfragen (für Plan-/Umsetzungsphase)

- Case-Texte: Inhalte zu **Alpha Rooms** folgen von Markus; Qrafto/Eschomat
  aus CV + öffentlichen Quellen.
- Workflow der PDF-Generierung (z. B. Astro-Route → Playwright/print-CSS vs.
  dedizierte PDF-Lib).
