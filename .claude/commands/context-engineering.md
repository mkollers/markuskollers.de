# Context Engineering: Struktur einrichten & regelmäßig optimieren

Richte die Claude-Code-Kontextstruktur im aktuellen Projekt ein **oder** optimiere die bestehende. Dieses Command ist **wiederholbar gedacht**: bei jedem Lauf prüfst du, was existiert, verbesserst es und hältst es aktuell. Passe alle Inhalte an den erkannten Projektkontext an (Sprache, Tech-Stack, Domäne). Template, kein starres Schema.

**Leitprinzip (aus Anthropic Best-Practices):** CLAUDE.md & Rules sind Kontext, keine erzwungene Konfiguration. Je spezifischer und schlanker, desto zuverlässiger befolgt. Für jede Zeile gilt: *„Würde ihr Entfernen Claude Fehler machen lassen?"* Wenn nein → löschen oder in Hook/Skill verschieben. Behandle CLAUDE.md wie Code: regelmäßig reviewen und prunen.

---

## PHASE 0: BESTANDSAUFNAHME & MODUS-ERKENNUNG

Verschaffe dir zuerst einen Überblick, dann entscheide den Lauf-Modus:

```
ls CLAUDE.md .claude/CLAUDE.md CLAUDE.local.md AGENTS.md 2>/dev/null
ls .claude/rules/ .claude/skills/ .claude/agents/ .claude/settings.json 2>/dev/null
wc -l CLAUDE.md 2>/dev/null   # Größe prüfen (Ziel < 200)
```
Auto-Memory: Verzeichnis `~/.claude/projects/<project>/memory/` existiert bereits (von Claude selbst verwaltet) — nur Konvention kennen, bei Bedarf pflegen.

**Modus bestimmen:**
- **Erstlauf (Bootstrap):** keine CLAUDE.md und kein `.claude/rules/` → gehe primär durch Phase 1.
- **Wartungslauf (Audit & Optimize):** Struktur existiert → Phase 1 nur als Lückenfüller, Schwerpunkt auf **Phase 2 (Audit)**.

Beide Modi durchlaufen am Ende Phase 3 (Research) und Phase 4 (Validierung).

---

## PHASE 1: STRUKTUR EINRICHTEN / VERVOLLSTÄNDIGEN

### 1.1 Verzeichnisse
Stelle sicher, dass existieren (nur was gebraucht wird):
```
.claude/
  rules/      # Modulare, path-scoped Regeln
  commands/   # Custom Slash-Commands (= Skills)
```
Optional je nach Bedarf: `.claude/skills/`, `.claude/agents/`.

### 1.2 CLAUDE.md (Projekt-Root oder `.claude/CLAUDE.md`)
Erstelle/aktualisiere; Ziel **unter 200 Zeilen** (kürzer = bessere Adherence). Tipp: `/init` generiert einen Startpunkt aus dem Code (bzw. interaktiv mit `CLAUDE_CODE_NEW_INIT=1`); existiert CLAUDE.md, schlägt `/init` Verbesserungen vor statt zu überschreiben.

```markdown
# [Projektname] - Projektregeln

## Projekt-Kontext
[1-3 Sätze: Domäne, Tech-Stack, Besonderheit]

## Feedback-Loops   ← höchster ROI
[Exakte Build-/Test-/Lint-/Run-Commands, die Claude nicht erraten kann]

## Konventionen
[Nur was vom Default abweicht — was ein Linter erzwingt, NICHT hierher]

## Arbeitsweise
- Plan first bei nicht-trivialen Aufgaben; einfachste Lösung; Root-Cause statt Pflaster
- Nur ändern was angefragt wurde; bei Unsicherheit nachfragen
- Erfolg mit Evidenz belegen (Testausgabe/Screenshot), nicht behaupten

## Kontext-Management
- >70% Kontext: /compact (mit Fokus-Instruktion); zwischen Tasks /clear
- Recherche über Subagenten (eigener Kontext, nur Summary zurück)

## Kompaktierung
Beim Kompaktieren immer beibehalten: Entscheidungen + Begründungen,
offene Fragen, geänderte Dateien, Test-Commands, aktueller Task-Kontext
```
Nützliche CLAUDE.md-Features:
- **`@path`-Imports**: `@README.md`, `@package.json`, `@docs/x.md` referenzieren statt duplizieren (laden mit; in Backticks = kein Import).
- **HTML-Kommentare** `<!-- Maintainer-Notiz -->` werden vor dem Laden entfernt → Notizen ohne Token-Kosten.
- **Ladehierarchie** (additiv, spezifisch gewinnt): managed policy → user `~/.claude/CLAUDE.md` → project `./CLAUDE.md`/`.claude/CLAUDE.md` → `CLAUDE.local.md`. Subdir-CLAUDE.md laden on-demand.
- **AGENTS.md** vorhanden? → `@AGENTS.md` importieren oder symlinken statt duplizieren.

### 1.3 Modulare Rules (`.claude/rules/`)
Ein Thema pro Datei (`testing.md`, `api-design.md`); rekursiv inkl. Unterordnern entdeckt; Symlinks zum Teilen über Projekte; User-Level `~/.claude/rules/` für persönliche Defaults.

**Immer (ohne `paths` = immer aktiv, Priorität wie CLAUDE.md):**
1. `vertraulichkeit.md` — keine sensiblen Daten an externe Dienste. ⚠️ Advisory! Harte Sperre → **Hook/Permission** (siehe 1.5).
2. `output-format.md` — Antwortsprache, Formatierung, Quellverweis-Format.

**Path-scoped (lädt nur bei passenden Dateien — spart Kontext):**
```yaml
---
paths:
  - "src/**/*.{ts,tsx}"   # Brace-Expansion & mehrere Muster erlaubt
  - "tests/**/*.test.ts"
---
# TypeScript-Regeln
```
⚠️ **Limitation:** Path-Rules triggern beim **Read** passender Dateien, **nicht beim Write/Neuanlegen**. Für neu erzeugte Dateien greifen sie evtl. nicht.

### 1.4 Memory-System
Auto-Memory ist seit **v2.1.59** nativ & standardmäßig an. Claude pflegt `~/.claude/projects/<project>/memory/` selbst (per Repo, über Worktrees geteilt, maschinen-lokal). Kein manueller Init nötig.
- **Laden:** nur erste **200 Zeilen oder 25 KB** von `MEMORY.md` (was zuerst greift) → schlank halten, Details in Topic-Files.
- **`MEMORY.md`** = Index (eine Zeile/Memory). **Topic-Files** = ein Fakt/Datei, on-demand gelesen.
- **Konvention dieses Setups** (über den offiziellen „plain markdown"-Standard hinaus): Frontmatter `name` / `description` / `metadata.type` mit Typen `user | feedback | project | reference`; bei `feedback`/`project` zusätzlich `**Why:**` + `**How to apply:**`; Verlinkung mit `[[name]]`.
- Vor dem Speichern Duplikate prüfen, lieber aktualisieren; nichts speichern was Repo/Git/CLAUDE.md schon abdecken.
- Konfig bei Bedarf: `autoMemoryEnabled`, `autoMemoryDirectory` (settings.json), `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Audit/Editieren live mit **`/memory`**.

### 1.5 Enforcement vs. Advisory (wichtig)
CLAUDE.md & Rules formen Verhalten, **garantieren** es aber nicht. Muss eine Regel *immer* halten:
- **Hook** (`.claude/settings.json`, z.B. `PreToolUse` blockt, `PostToolUse` lintet) — deterministisch.
- **Permissions/Sandbox** — `permissions.deny` für Tools/Pfade.
Beispiel: „nie `.env` editieren", „kein Push auf main", „Secrets nicht raussenden" → Hook, nicht nur Rule.

### 1.6 CLAUDE.local.md (optional, nicht committen)
Persönliche Session-Notizen; in `.gitignore`. Für Worktree-übergreifend stattdessen `@~/.claude/...` importieren.

---

## PHASE 2: AUDIT & OPTIMIERUNG  ← Kern des wiederkehrenden Laufs

Gehe bestehende Struktur kritisch durch und verbessere aktiv:

**CLAUDE.md prunen** (Faustregel: *würde Entfernen Fehler verursachen?*):
| ✅ behalten | ❌ entfernen |
|---|---|
| Commands, die Claude nicht erraten kann | Was Claude aus dem Code liest |
| Konventionen, die vom Default abweichen | Standard-Sprachkonventionen |
| Test-Runner/-Anweisungen | Detaillierte API-Doku (→ Skill/Link) |
| Repo-Etikette (Branch/PR) | Häufig ändernde Infos |
| Architektur-Entscheidungen, Gotchas | Datei-für-Datei-Beschreibungen |
| Env-Quirks | Selbstverständliches („sauberen Code schreiben") |
| Was ein **Linter erzwingt** → raus | Aspirationen statt verifizierbarer Regeln |

**Weitere Audit-Checks:**
- **Größe:** CLAUDE.md > 200 Zeilen? → in `.claude/rules/` (path-scoped) aufteilen oder Reference-Inhalt in Skills auslagern.
- **Konflikte/Duplikate:** widersprüchliche Regeln über CLAUDE.md / nested CLAUDE.md / `.claude/rules/` entfernen (Claude wählt sonst willkürlich). Keine Doppelung CLAUDE.md ↔ Rules ↔ Skills.
- **Richtiges Mechanismus-Fit** (Entscheidungsmatrix, siehe Referenz): Reference-Wissen/Workflows → **Skill**; immer-aktiv & broad → **CLAUDE.md**; pfad-/dateispezifisch → **Rule**; muss-immer-passieren → **Hook**; viel-Datei-Recherche → **Subagent**; externe Systeme → **MCP**.
- **Advisory, das hart sein sollte** → in Hook/Permission überführen.
- **Memory-Hygiene:** `MEMORY.md` schlank? Veraltete/falsche Topic-Files löschen.
- **Monorepo:** irrelevante Vorfahren-CLAUDE.md via `claudeMdExcludes` (settings.local.json) ausschließen.
- **Debugging:** unklar was lädt? `InstructionsLoaded`-Hook oder `/memory` nutzen.

---

## PHASE 3: RESEARCH LOOP — AKTUALITÄTSPRÜFUNG

Da Claude Code sich schnell ändert: **vor** dem Übernehmen offizielle Docs prüfen statt aus dem Gedächtnis. Web-Suchen parallel (Jahr im Query an aktuelles Jahr anpassen):
1. `"Claude Code CLAUDE.md best practices <Jahr>"`
2. `"Claude Code context engineering update <Jahr>"`
3. `"Claude Code .claude/rules new features <Jahr>"`
4. `"Anthropic Claude Code skills agents memory update <Jahr>"`

Dann **kanonische Quellen** (unten) gegenchecken auf: neue CLAUDE.md/Rules-Features (Frontmatter-Felder), Memory-Änderungen (Typen/Limits), neue Mechanismen, neue Versionen.
- Änderungen gefunden → Struktur **und dieses Command** aktualisieren.
- Keine → bestätigen, dass die Struktur aktuell ist (mit Datum/Version notieren).

*Beobachtungshorizont (Preview, vor Nutzung verifizieren):* „Dreaming" (Research Preview) & Managed-Agents-Memory (Beta); bekannter Bug — User-Level `~/.claude/rules/` mit `paths:` wird teils ignoriert.

---

## PHASE 4: VALIDIERUNG

- [ ] CLAUDE.md existiert, < 200 Zeilen, führt mit Feedback-Loops/Commands
- [ ] Keine Duplikation/Konflikte zwischen CLAUDE.md, Rules, Skills
- [ ] Keine Regel drin, die ein Linter erzwingt; nichts Aspirationales
- [ ] `.claude/rules/` ≥ 2 Files, ≥ 1 mit `paths`-Scoping
- [ ] Harte Sicherheits-/Schutzregeln als Hook/Permission, nicht nur Advisory
- [ ] `MEMORY.md` schlank, ≥ 1 korrektes Topic-File (Konvention dieses Setups)
- [ ] Reference-/Workflow-Inhalt liegt in Skills, nicht in CLAUDE.md
- [ ] Research-Datum/CC-Version notiert

---

## REFERENZ

### Mechanismus-Entscheidungsmatrix (offiziell)
| Mechanismus | Lädt | Am besten für |
|---|---|---|
| **CLAUDE.md** | jede Session, voll | „Immer X"-Regeln, Commands, Architektur |
| **.claude/rules/** | jede Session **oder** bei passenden Files (`paths`) | Sprach-/Verzeichnis-spezifische Regeln |
| **Skill** (`.claude/skills/<n>/SKILL.md`) | on-demand (auto oder `/name`) | Reference-Wissen, wiederholbare Workflows |
| **Subagent** (`.claude/agents/`) | bei Spawn, isolierter Kontext | viel-Datei-Recherche, parallele Spezialisten |
| **Hook** (settings.json) | bei Lifecycle-Event | Erzwingen (Lint, Block, Log) — deterministisch |
| **MCP** | Session-Start (Tool-Namen) | externe Systeme/Daten |

„Build over time"-Trigger: Convention 2× falsch → CLAUDE.md · gleiches Prompt wiederholt → Skill · soll immer passieren → Hook · Output flutet Kontext → Subagent · externes System → MCP.

### Context-Window-Budget
| Füllstand | Aktion |
|---|---|
| 0-50% | frei arbeiten |
| 50-70% | aufmerksam |
| 70-90% | `/compact <fokus>` |
| 90%+ | `/clear` / neue Session |
Nach 2 erfolglosen Korrekturen am selben Punkt: `/clear` + besseres Initial-Prompt.

### Progressive Disclosure
MEMORY.md-Index & CLAUDE.md = immer geladen · Rules path-scoped & Topic-Files & Skills = on-demand · Subagenten = isolierter Kontext.

---

## QUELLEN (kanonisch, vor Antwort prüfen statt aus Gedächtnis)
- https://code.claude.com/docs/en/memory — CLAUDE.md, `.claude/rules/`, Auto-Memory
- https://code.claude.com/docs/en/best-practices — Kontext, Verifikation, CLAUDE.md-Pflege
- https://code.claude.com/docs/en/features-overview — Entscheidungsmatrix Skills/Hooks/Subagents/MCP
- https://code.claude.com/docs/en/skills — Skills
- https://code.claude.com/docs/en/hooks-guide — Hooks (Enforcement)
- https://code.claude.com/docs/en/sub-agents — Subagenten (+ persistente Memory)
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents — Hintergrund

*Letzte Aktualitätsprüfung: 2026-06-24 (Claude Code Auto-Memory v2.1.59).*

---

**ANWEISUNG:** Phase 0 (Modus erkennen) → Phase 1 (einrichten/vervollständigen) → Phase 2 (Audit & Optimierung) → Phase 3 (Research) → Phase 4 (Validierung). Im Wartungslauf liegt der Schwerpunkt auf Phase 2. Starte sofort mit Phase 0.
