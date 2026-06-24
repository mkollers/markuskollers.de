---
description: Änderungen verschiffen — Branch anlegen, selektiv committen, rebasen, verifizieren, pushen und einen PR mit Release Note + Confidence erstellen. Nutze diesen Skill immer, wenn der User seine Arbeit committen, pushen, "shippen", einen PR/Pull Request öffnen oder Änderungen abschließen/abgeben will — auch wenn er nur "mach nen PR", "push das", "commit & ship" o.Ä. sagt.
allowed-tools: Bash, Read, Grep, Glob
---

## Your Task

Bringe die aktuellen Änderungen sauber auf GitHub: passenden Branch wählen, relevante Dateien committen, auf den Default-Branch rebasen, verifizieren, pushen und einen PR mit Release Note und Confidence öffnen. Am Ende die PR-URL ausgeben.

Arbeite die Schritte der Reihe nach ab, aber denk mit: Wenn ein Schritt nicht zutrifft (z.B. nichts zu committen, PR existiert schon), erkläre kurz warum du ihn überspringst, statt blind weiterzumachen.

### 1. Änderungen analysieren
- `git status` – untracked und geänderte Dateien
- `git diff` und `git diff --staged` – was sich inhaltlich ändert (brauchst du gleich für Commit-Message, Branch-Name und Release Note)
- `git log --oneline -5` – Commit-Stil des Repos übernehmen (Sprache, Prefix-Konvention)

Wenn es nichts zu committen gibt **und** der lokale Branch nicht ungepusht ist: sag das dem User und brich ab — es gibt nichts zu shippen.

### 2. Branch-Strategie
Ermittle zuerst den Default-Branch, statt `main` anzunehmen (Repos heißen oft `master`, `develop` o.Ä.):
```bash
DEFAULT=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@')
# Fallback, falls origin/HEAD nicht gesetzt ist:
[ -z "$DEFAULT" ] && DEFAULT=$(git remote show origin | sed -n 's/.*HEAD branch: //p')
```
- **Auf dem Default-Branch?** → neuen Branch abzweigen. Name aus dem Inhalt der Änderungen ableiten, Konvention `feat/…`, `fix/…`, `refactor/…`, `chore/…`. `git checkout -b <branch-name>`
- **Schon auf einem Feature-Branch?** → dort weiterarbeiten, **keinen** neuen Branch anlegen. So landen zusammengehörige Commits auf demselben Branch/PR.

### 3. Staging & Commit
- **Selektiv stagen**, nicht `git add -A`/`.`. Jede Datei bewusst hinzufügen — so committest du nichts versehentlich (Secrets, lokale Configs, Debug-Artefakte). Sichte vorher, was die Änderung wirklich umfasst.
- Keine `.env`, Credentials oder großen Binaries.
- Commit-Message: kurz, **Englisch**, mit Prefix (`feat:`, `fix:`, `refactor:`, `chore:` …), passend zum Repo-Stil.
- Co-Author-Tag des **aktuell aktiven** Claude-Modells anhängen (nicht hartkodiert lassen — Modellversionen veralten). Format:
  ```
  Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
  ```
  Falls die Session/das Repo eine andere Co-Author-Konvention vorgibt, diese verwenden.

### 4. Rebase auf den Default-Branch
Vor dem Push aktuellen Stand holen, damit der PR konfliktfrei mergebar ist:
- `git fetch origin "$DEFAULT"`
- `git rebase "origin/$DEFAULT"`
- **Konflikte** → anzeigen und User fragen, **nicht** automatisch auflösen. Du kennst die fachliche Intention beider Seiten nicht sicher; eine falsche Auflösung ist schwer zu entdecken.
- Clean → weiter.

### 5. Verifizieren (vor dem Push)
Lass die schnellen Checks des Projekts laufen, damit der PR nicht direkt rot wird. Ermittle die Befehle aus `package.json` (`scripts.lint`, `scripts.test`) bzw. den Feedback-Loops in `CLAUDE.md`:
- Lint und Unit-Tests ausführen (z.B. `npm run lint`, `npm test`).
- Langsame Full-/SSR-Builds nur, wenn der User es will oder es keine Tests gibt — sie kosten Minuten.
- **Schlägt ein Check fehl** → stoppen, Fehler zeigen, mit dem User klären (Fix vor dem PR ist billiger als Rework danach). Nicht stillschweigend pushen.
- Keine Checks im Projekt gefunden → kurz erwähnen und überspringen.

### 6. Pushen
- `git push -u origin <branch-name>`
- War der Branch schon gepusht und es gab einen Rebase: vor `--force-with-lease` den User fragen.

### 7. PR erstellen via `gh pr create`
Prüfe bei Bedarf `gh auth status`; existiert für den Branch schon ein PR (`gh pr view`), aktualisiere/verweise statt einen zweiten zu öffnen.

- Titel: kurz, unter 70 Zeichen.
- **Body auf Deutsch** (Projektsprache), mit Summary, **Release Note (Pflicht)**, Test Plan und **Confidence (Pflicht)**:
  ```
  ## Summary
  - …

  ## Release Note
  **Kategorie:** <Neue Funktion | Fehlerbehebung | Optimierung | intern>

  <Bei „intern": ein Satz Begründung, warum nicht kundenrelevant (z.B. „Test-Stabilisierung", „CI-Konfiguration", „internes Refactoring ohne UI-/API-Wirkung"). Damit endet die Sektion.>

  <Sonst: 1 bis 4 Sätze in Sie-Form, kundennah, ohne interne Begriffe. Beschreibt, was der Kunde nun kann/sieht, nicht was technisch geändert wurde.>

  ## Test plan
  - [ ] …

  ## Confidence
  **<0-100>/100** – 1-2 Sätze: Selbsteinschätzung, wie robust/korrekt die Änderung ist (kommt der PR ohne Rework durch?). Was zieht runter (ungeprüfter Pfad, fehlende Tests, fragwürdige Annahme, externes System nicht getestet)? Rein informativ, nicht blockierend.

  🤖 Generated with [Claude Code](https://claude.com/claude-code)
  ```

**Kategorisierungs-Heuristik** (Default; User kann überschreiben):
- `feat:`/`feature:` → meist „Neue Funktion"
- `fix:`/`bug:`/`hotfix:` → meist „Fehlerbehebung"
- `perf:`/`ux:`/`style:` (UI) → meist „Optimierung"
- `chore:`/`test:`/`ci:`/`build:`/`docs:`/`refactor:` ohne UI-/API-Wirkung → „intern"
- Unsicher? Geänderte Dateien prüfen: nur `tests/`, `.github/`, `infrastructure/`, `docs/` betroffen → „intern".

**Schreibstil Release Note** (Quelle der Wahrheit ist der `/release-notes`-Skill — bei Abweichungen dort nachsehen). Diese Regeln existieren, weil die Note direkt bei B2B-Kunden im Handwerk/Bau landet:
- Sie-Form.
- Echte Umlaute (ä, ö, ü, ß), kein ae/oe/ue/ss.
- Kein Em-Dash (U+2014); nur Halbgeviertstrich (U+2013) oder Bindestrich.
- Domain-Wording aus den i18n-Locales übernehmen (`frontend/src/locales/de.json` u.a.), nicht selbst übersetzen — sonst weicht die Note vom Produkt-Vokabular ab.
- Keine Beträge/Zahlen/Prozentsätze, die nicht aus dem Code stammen.
- Keine Aussagen über zukünftige Releases („folgt später").
- Kein externes Marketing-/Rechtswissen ohne klaren Code-/PR-Beleg.
- Keine internen Begriffe (Service-/Branch-/Tabellen-/Hook-Namen) — die sagen dem Kunden nichts.

### 8. PR-URL ausgeben

## Guardrails
- **Keine Secrets committen.** Deshalb selektiv stagen (Schritt 3) und vor dem Commit sichten — ein versehentlich committetes Credential ist in der Historie schwer zu tilgen.
- **Kein `--force`.** Es überschreibt fremde Commits unwiderruflich. `--force-with-lease` ist sicherer (bricht ab, wenn jemand anderes gepusht hat) und nur nach Rebase mit User-Bestätigung erlaubt.
- **Kein `--no-verify`.** Pre-commit/-push-Hooks sind die Qualitäts-/Sicherheitsnetze des Repos; sie zu umgehen verschiebt Probleme nur in den PR.
