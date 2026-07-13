# Case-Brief: Alpha Meeting Rooms

> **Status:** Rohmaterial aus Interview (2026-07). Wird in **Iteration 2** zum
> `projects`-Content-Collection-Eintrag + gerenderter Case-Card. Noch nicht final
> getextet — das editoriale Finish (warmer, minimaler Ton) passiert in Iteration 2.
> Markus: No-Gos / Vertrauliches hier markieren.

## Fakten (Mapping auf `projects`-Schema)

| Feld | Wert |
|---|---|
| `title` | Alpha Meeting Rooms |
| `url` | https://booking.alpha-mr.de |
| Kunde | ALPHA Gebäudemanagement GmbH (Marke: Alpha Meeting Rooms) — **namentlich nennbar** (mit dem Kunden abgestimmt) |
| Rolle | Freelance: fachliche Konzeption, Architektur, Technik — alles solo (mit Agentic Coding) |
| Zeitraum / Umfang | angeboten ~160 h, knapp 4 Wochen |
| Status | live in Produktion seit ~Mitte 2026 (ca. 2,5 Wochen zum Interview-Zeitpunkt) |
| Domäne | B2B, Buchung von Konferenz-/Meetingräumen, Frankfurt (2 Standorte: Herriot's Niederrad, WestendSky Westend; 1–220 Personen) |
| Stack | Next.js · Netlify · PostgreSQL (DigitalOcean) · Auth selbst mit better-auth · iCal-Generierung aus der App · Resend (Mailversand) |

## Tagline (Lead = A)

**Stoßrichtung:** Agentic-Engineering-Beweis.
Arbeitsformulierung (Iteration 2 final texten):

> „Ein Buchungssystem, das früher ein Team brauchte — solo mit Agentic
> Engineering in ~160 h neu gebaut."

## Story — Problem → Lösung → Ergebnis

Erzählbogen: **C (Setup) → A (Punch) → B (Tiefe).**

### Setup / Kontext (C — Glaubwürdigkeit)

Markus hat das ursprüngliche System vor ~8 Jahren mit seinem damaligen Team
(in Anstellung) gebaut und danach durchgehend allein weiterbetreut, nachdem
sein früherer Arbeitgeber es an ihn abgegeben hatte. Er kennt Fachlichkeit und
Code in- und auswendig — der Remake kommt nicht von außen, sondern von jemandem
mit 8 Jahren Kontext.

### Problem

- **Veraltetes Fundament:** alte Plattform technisch überholt (z. B. Node 12 auf
  Firebase), nie für das inzwischen erreichte Buchungsvolumen konzipiert; dazu
  Alt-Themen wie fehlende DSGVO-Konformität und Stabilitätsprobleme.
  *(Editorial bewusst auf „veraltet & nicht für die Last gebaut" framen — keine
  einzelnen Bug-Details.)*
- **Überholte Hypothesen:** Software entsteht auf Annahmen; über 8 Jahre haben
  sich manche bestätigt, andere als Quatsch erwiesen. Der reale Ablauf des Kunden
  **und dessen Kunden** passte nicht mehr zum alten Modell.
- **Proaktiv erkannter Hebel (statt gefühltem Schmerz):** Markus hat dem Kunden
  von sich aus vorgeschlagen — „wenn wir eh umbauen, nutzen wir es, um über
  weniger Reibung Auslastung/Umsatz zu erhöhen." Der Kunde hatte diesen Schmerz
  vorher nicht artikuliert.

Ziele des Remakes: **moderneres Auftreten · weniger operativer Aufwand beim
Kunden · technische Stabilität.**

### Lösung (A — der Punch)

- **Neu aufgesetztes, offenes Buchungssystem ohne Pflicht-Registrierung** —
  bewusste Reibungsreduktion: Verfügbarkeit sehen → Raum wählen → Zeitslot →
  Kontaktdaten → Bestätigung, **ohne Account**.
- **Selbstverwaltung per Magic-Link:** Bestätigung kommt per Mail; Bearbeiten
  und Stornieren laufen über Links in der Mail — kein Login nötig. Nimmt dem
  Kunden manuelle Nacharbeit ab.
- **Stack:** Next.js, gehostet auf Netlify, PostgreSQL bei DigitalOcean, Auth
  selbst mit better-auth implementiert, iCal-Generierung direkt aus der App,
  Mailversand über Resend. Verlässliche Buchungslogik (keine „überholenden
  Nummern"/Doppelbuchungen mehr), DSGVO-konform.
- **Wie gebaut:** solo, End-to-End (Konzeption → Architektur → Umsetzung →
  Deployment) mit Agentic Coding.

### Ergebnis

- **Live in Produktion** seit ~2,5 Wochen (Interview-Zeitpunkt), läuft echt.
- **Harte Kennzahlen noch zu früh** (Auslastung/Conversion) — bewusst **nicht**
  erfinden. Später nachtragen, sobald Daten vorliegen.
- **Kernaussage (nutzbar, vom Kunden freigegeben):** solo in ~160 h neu gebaut,
  was ursprünglich ein Team gebraucht hat — konkreter, verifizierbarer Beleg für
  „solo auf Team-Niveau dank agentischem Engineering".

### Substanz-Layer (B — für die längere Card / Detailtext)

Nicht nur umgesetzt, sondern proaktiv beraten: die Reibungsreduktion war Markus'
Vorschlag zur Auslastungssteigerung, nicht eine abgearbeitete Anforderung —
Produkt-Owner-Denke statt reiner Umsetzung.

## Offene Punkte / To-do für Iteration 2

- [ ] Markus: No-Gos / Vertrauliches in diesem Brief markieren.
- [ ] Metriken nachtragen, sobald verfügbar (Auslastung, Buchungen, Conversion).
- [ ] Finales editoriales Texten der Card (Ton: warm, minimal, kein Tech-Dump).
- [ ] Entscheiden, ob `projects`-Schema in Iteration 2 um Felder wie `role`,
      `client`, `timeframe`, `stack`, `status` erweitert wird (dieser Brief
      liefert die Werte schon).
