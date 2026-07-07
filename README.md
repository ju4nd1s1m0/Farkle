# Farkle

A 3D Farkle dice game that runs entirely in the browser — one HTML file, no build step, no dependencies to install. Optimized for iPhone and playable at:

**https://ju4nd1s1m0.github.io/Farkle/**

Add it to your Home Screen on iOS and it launches fullscreen like a native app.

## Features

- **True 3D dice** — three.js rendering with tumbling physics-style rolls, real shadows, and a tilted table-seat camera. Your opponent's dice fly in from across the table.
- **Play vs. Hans (AI) or pass-and-play** — the AI evaluates every keep/reroll decision by expected value, with three personalities (Cautious / Balanced / Reckless) and a little table talk.
- **Full Farkle rules** — singles, triples, multiples, straights, partial straights, three pairs, two triples, four-of-a-kind + pair, hot dice, and an optional Last Chance rebuttal turn.
- **Custom scoring** — a Classic Rules toggle locks standard scoring; turn it off to change point values or disable the non-standard combos entirely. Multiples can score flat (1000/2000/3000) or double per extra die. Changing rules mid-game starts a fresh game.
- **Tables & dice** — light oak (default), dark wood, green felt, and black tables; white casino, ivory, crimson, and obsidian dice. Table surfaces use real photo textures when present (see below) and fall back to procedural textures otherwise.
- **Quality of life** — shake to roll, sound effects, dramatic or quick roll speed, per-roll set-aside history, adjustable goal (1,000–10,000), lifetime stats vs. the AI, and a win celebration worth seeing.

## Repository layout

| File | Purpose |
|---|---|
| `index.html` | The entire game — HTML, CSS, and JS in one file |
| `table-oak.jpeg` / `table-wood.jpeg` / `table-felt.jpeg` | Photo textures for the table surfaces (licensed via Adobe Stock) |
| `apple-touch-icon.png`, `favicon.png`, `icon-192.png`, `icon-512.png` | App icons |
| `manifest.webmanifest` | PWA manifest (standalone display, Android install) |

## Custom table textures

On load, each table theme looks for a photo named `table-<theme>.jpg` or `.jpeg` (`oak`, `wood`, `felt`, `black`) next to `index.html`. If found, it's used as the table surface with seamless mirrored tiling; if not, the game generates a procedural texture instead. Swap in any roughly square photo (1024px+ recommended) to reskin a table — no code changes needed.

## Running locally

Any static server works:

```
python3 -m http.server
```

then open `http://localhost:8000`. Opening `index.html` directly from disk also works, though photo textures may be blocked by the browser's file:// policies — use a server for the full experience.

three.js is loaded from a CDN at runtime, so an internet connection is required on first load.

## Notes

- Settings, scoring rules, and stats persist in `localStorage`.
- Shake to Roll uses iOS motion permissions — enable it from Settings in-game and accept the prompt.
- Table photos are Adobe Stock assets #283289853, #179198912, and #662240994, licensed under the Adobe Stock free-tier standard license.
