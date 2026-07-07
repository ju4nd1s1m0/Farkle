# Farkle

A 3D Farkle dice game that runs entirely in the browser — one HTML file plus a small service worker, no build step. Optimized for iPhone and playable at:

**https://ju4nd1s1m0.github.io/Farkle/**

Add it to your Home Screen on iOS and it launches fullscreen as a standalone app, works offline, and picks up unfinished games where you left off.

## Features

- **True 3D dice** — three.js rendering with tumbling rolls, real shadows, rotation-aware floor contact, and a tilted table-seat camera. Your opponent's dice fly in from across the table.
- **Play vs. Hans (AI) or pass-and-play** — the AI evaluates every keep/reroll decision by expected value, with three personalities (Cautious / Balanced / Reckless) and a little table talk.
- **Full Farkle rules** — singles, triples, multiples, straights, partial straights, three pairs, two triples, four-of-a-kind + pair, hot dice, and an optional Last Chance rebuttal turn.
- **Custom scoring** — a Classic Rules toggle locks standard scoring; turn it off to change point values or disable the non-standard combos. The in-game Help chart is rendered from the active rules, so it always matches the game you're playing.
- **Visual Help chart** — scoring reference drawn with mini dice (including "?" wildcards), not a wall of text.
- **Tables & dice** — light oak (default), dark wood, green felt, and black tables using real photo textures; white casino, ivory, crimson, and obsidian dice. The status bar tint follows the selected table.
- **App-grade behavior** — installable PWA (manifest + icons), offline play via service worker (three.js and textures cached), portrait lock, and automatic game snapshots each turn: if iOS evicts the app mid-game, Resume Game restores it.
- **Quality of life** — shake to roll, sound effects, dramatic or quick roll speed, per-roll set-aside history, adjustable goal (1,000–10,000), score pop-ups, lifetime stats vs. the AI, and a win celebration worth seeing.

## Repository layout

| File | Purpose |
|---|---|
| `index.html` | The entire game — HTML, CSS, and JS in one file |
| `sw.js` | Service worker: offline caching (network-first for the page, cache-first for CDN/textures) |
| `manifest.webmanifest` | PWA manifest — standalone display, portrait lock, theme color |
| `apple-touch-icon.png`, `favicon.png`, `icon-192.png`, `icon-512.png` | App icons |
| `table-oak.jpeg` / `table-wood.jpeg` / `table-felt.jpeg` | Photo textures for the table surfaces (licensed via Adobe Stock) |

## Custom table textures

Each table theme looks for a photo named `table-<theme>.jpg` or `.jpeg` (`oak`, `wood`, `felt`, `black`) next to `index.html`. If found, it's used as the table surface with seamless mirrored tiling; otherwise the game generates a procedural texture. Swap in any roughly square photo (1024px+ recommended) to reskin a table — no code changes needed. The same photo doubles as the page's root background.

## Updating a deployed build

- After changing `sw.js`, bump the cache name (`farkle-v6` → `farkle-v7`) so installed clients purge old assets.
- `index.html` itself is fetched network-first, so ordinary page updates deploy immediately.
- iOS caches the Home Screen wrapper aggressively: after changes to the manifest or meta tags, delete the Home Screen icon and re-add it.

## Known iOS limitation

iOS sizes standalone web-app windows one status-bar-height shorter than the physical screen. This build uses the immersive mode (content under the status bar), which leaves a thin strip at the very bottom that page elements cannot paint; it's rendered with the table photo via the root background so it blends with the scene. This is a platform constraint, not a bug in the game.

## Running locally

Any static server works:

```
python3 -m http.server
```

then open `http://localhost:8000`. three.js loads from a CDN on first run; after that the service worker keeps everything available offline.

## Notes

- Settings, scoring rules, stats, and the turn-boundary game snapshot persist in `localStorage`.
- Shake to Roll uses iOS motion permissions — enable it from Settings in-game and accept the prompt.
- Table photos are Adobe Stock assets #283289853, #179198912, and #662240994, licensed under the Adobe Stock free-tier standard license.
