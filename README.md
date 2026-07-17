# Farkle

A polished 3D Farkle dice game that runs entirely in the browser — one self-contained
HTML file, installable as an iPhone home-screen app.

**Play it:** https://ju4nd1s1m0.github.io/Farkle/

![Made with three.js](https://img.shields.io/badge/three.js-r160-black) ![PWA](https://img.shields.io/badge/PWA-installable-blue) ![No build](https://img.shields.io/badge/build-none-brightgreen)

## Features

### The table
- Real 3D dice with physics-styled throws, bounce audio, tap-to-select, and hot-dice re-rolls
- Photo-textured tables (oak, dark wood, casino felt, black) and four dice finishes
  (white, ivory, crimson, obsidian) — switchable live from the menu or in-game settings
- Shake-to-roll, sound effects that respect the mute switch, reduced-motion support

### Game modes
- **Hans (AI)** — a computer opponent with three personalities: Cautious, Balanced, Reckless
- **Multiplayer, 2–4 players** — pass-and-play with per-player names and a scoreboard
  that adapts its layout to the roster
- **Pass-and-play multiplayer** — a floating hand-off card announces whose turn it is;
  tap anywhere to take the phone and roll
- **Online play (two phones, real time)** — create a game, share the 4-letter code,
  and a friend joins from anywhere; rolls, selections, and banks sync live

### Rules
- **Standard scoring** follows the official Farkle table: singles 100/50, triples at
  face × 100 (three 1s = 1,000), straight 3,000, three pairs 1,500 (optionally including
  4-of-a-kind + a pair), and 4/5/6-of-a-kind as triple ×2/×3/×4
- **Custom scoring** — the How-to-Play chart doubles as the editor: adjustable values are
  swipeable inline picker wheels. Variants include pocket farkle, partial straights
  (1–5 or 2–6), two triplets, six 1s, flat or high multipliers, no-points-for-5s,
  opening-score thresholds, and the three-farkle penalty
- **Last Chance** — when someone reaches the goal, everyone else gets one final turn
- Goals from 1,000 to 10,000; rules apply live with mid-game changes starting a fresh game

### Quality of life
- Beginner-friendly How to Play: three steps, a visual scoring chart, active house rules
- **Live odds** — every scoring group in the Help chart shows its exact probability,
  recomputed for the dice remaining in your hand mid-turn (press-your-luck math, built in)
- Game saves automatically every turn — resume from the menu after closing the app
- Win/loss/streak/best-turn stats for games against Hans
- Installable PWA with offline support (service-worker cached)

## Repo layout

```
index.html            the entire game (markup, styles, logic)
sw.js                 service worker — bump CACHE on every deploy
manifest.webmanifest  PWA manifest
icons/                app icons (home screen, favicon, splash)
table-*.jpeg          table surface photo textures
```

No build step, no dependencies to install. three.js loads from a CDN via import map.

## Enabling online play

Online mode syncs through Firebase Realtime Database (free tier is plenty):

1. Create a project at https://console.firebase.google.com (any name, Analytics off is fine)
2. Build → Realtime Database → Create database → **test mode** (or lock it down later with
   rules allowing read/write only under `/rooms`)
3. Project settings → Your apps → Web app → copy the config object
4. In `index.html`, find `const FIREBASE_CONFIG = null;` and replace `null` with your config
5. Push — the Online option on the mode wheel lights up

Until a config is present, Online mode shows a setup note and everything else works normally.
The host's goal, Last Chance setting, and scoring rules apply to both players.

## Deploying

GitHub Pages from `main` / root. When updating, push `index.html` **and** `sw.js`
together — the cache name bump in `sw.js` is what tells installed apps to fetch the
new version (network-first for the page, cache-first for CDN assets and textures).

## Development notes

- The 3D scene prewarms shader pipelines and texture uploads at game start, so the
  first throw is hitch-free on mobile GPUs
- One shared `RoundedBoxGeometry` and six face materials drive all dice, selection
  rings, and the win-celebration rain
- Scoring uses an exhaustive combo decomposition (`bp`) so the engine always finds the
  best interpretation of a selection under the active ruleset
- Combo probabilities are exact: all outcomes for 1–6 dice (~56k) are enumerated once
  at load, not sampled or approximated
