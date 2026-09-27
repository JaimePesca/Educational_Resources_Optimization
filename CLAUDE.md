# Optimization in Action: working conventions

Static website (no build) in `site/`, published to https://learn-optimization.jaimepesca.com by `.github/workflows/pages.yml` on every push to `main` that touches `site/`. Author: Jaime Pesca (https://jaimepesca.com). The owner communicates in Spanish; reply in Spanish.

## Always
- **Languages:** every visible string lives in locale files: English is the reference, plus Spanish (Colombian, "tú"), Portuguese (Brazil, "você") and French ("vous"). Shared strings in `site/locales/<lang>.js`; page strings in bundles `site/locales/<research|resources>/<id>.<lang>.js`, declared with `data-i18n-bundles` on `<html>`. Use `I18N.t()` / `I18N.fmt()` in scripts. New keys go to all four languages.
- **Design:** MIT core palette and type through the tokens in `site/assets/site.css` (MIT Red `--accent`, Bright Red `--mit-bright`, Silver Gray `--mit-silver`, black/white ink; `var(--font-sans)` = Neue Haas Grotesk / Helvetica / Arimo). Light and dark mode, 400 px phones, square-ish corners. Never mention MIT on the site and never use its logo.
- **Text:** no em dashes or en dashes anywhere visible. Plain, direct sentences.
- **Asset links:** local CSS/JS links carry `?v=__BUILD__` (the deploy stamps the commit id). Every page loads `assets/i18n.js`, then `assets/site.js` (author and copyright footer), then its locale files.
- **Do not remove or change existing content** when adding something new unless the owner asks; prefer additive changes.
- **Education vs research are independent:** learning resources (`site/resources/`, `assets/catalog.js` → `education`) never link to research cases; research pages (`site/research/`) show the real studies from `materials/manuscripts/`.
- **Git flow:** work on a feature branch, push it, and merge to `main` only when the owner says so (then wait for the "Deploy website" run to succeed).

## Animations: the standard format (use it for every future animation)
The four research animations ("See it in motion", placed right before "The model") are the reference. Reuse this format:
- **Player:** `site/assets/anim.js` (`Anim.create`, `Anim.canvas`, `Anim.colors`, `Anim.seg`, `Anim.ease`, `Anim.rng`) with styles in `site/assets/research.css` (`.anim`, `.anim-stage`, `.anim-hud`, `.chip-stat`, `.anim-legend`, `.anim-controls`). Do not fork it; extend it if needed.
- **Behaviour:** autoplay when the stage is 35% visible, pause when it leaves; controls for play/pause, restart, speed 0.5x/1x/2x, draggable timeline and named chapter buttons. Reduced motion shows the final frame, so the last frame must summarize the result.
- **Length and text:** 40 to 60 seconds, 4 to 6 chapters with 2 to 5 word names, almost no text: short scene labels plus a few live counters (DOM chips in `.anim-hud`) with the real numbers.
- **One scenario control** (`.seg` buttons with `aria-pressed`) that changes what the animation shows, for example budget, distance, radius or feedback on/off.
- **Rendering:** `render(t)` is a pure function of time and scenario (scrubbing works in both directions); canvas 2D, layout precomputed in `layout()` and on resize, deterministic randomness via `Anim.rng(seed)`, 16:9 desktop and 4:5 phone stage, about 60 fps.
- **Visual language:** MIT red for the model's decisions, bright red for urgency/new, ink for structure, silver gray for context; smooth easing, staggered entrances, particles/trails, pulses and camera-like zooms where they help.
- **Honesty:** numbers come from the manuscript/page bundle; anything the paper does not publish (positions, shapes, a sample day) is illustrative but plausible, and the report to the owner says what is illustrative.
- **Verification before publishing:** all four languages, 1200 px and 400 px, light and dark; no page errors, no raw keys, no horizontal scroll; look at screenshots of several chapters and the final frame.

## Shared tools for learning resources
- `site/assets/lp.js`: small two-phase simplex solver (`LP.solve` returns x, z, duals/shadow prices, slack, binding; `LP.steps` returns tableaux pivot by pivot). Use it so simulations re-solve live when the user changes data, instead of hard-coding optima. Verified on Giapetto (z = 180, duals 1, 1, 0), the pig diet (60.43) and the inventory Problem 10 (400).
- `site/assets/tex.js`: every formula on a learning resource is typeset with MathJax, never plain monospace text. Static: `<div class="formula" data-tex="<key>.tex" data-i18n="<key>.formula">` (the plain-text key is only the fallback). Built by a script: `TeX.set(el, texString, fallbackText)`. Models use `\begin{aligned}` with the columns `\max\;& expression && \text{(comment)}` / `\text{ST}\;& constraint && \forall ...`; wrap a leading minus after `&` as `{-3x}`; write sets as `\{0, 1\}`. Research pages keep their `.math` blocks (assets/research.js).
- The Level 1 source problems are the owner's "Problemas para Modelar" (PL); the Spanish wording of a statement goes verbatim into the Spanish bundle.

## Local checks
`cd site && python3 -m http.server 8000`. External CDNs (MathJax on cdnjs, Plotly on jsDelivr) may be blocked in sandboxes; route them to local npm copies when testing with Playwright.
