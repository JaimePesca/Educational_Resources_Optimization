# Brief: build one Level 4 or Level 5 learning resource

Site: static, no build, in the git worktree `/home/user/repo` (branch feat/lab-build-nav).
- Work only in the files named for your task. Other agents may be editing other pages at the same time.
- Do NOT commit, push, checkout, reset or stash. The lead commits.
- Read `CLAUDE.md` in the worktree first and follow it to the letter: four languages (en reference; es Colombian "tú"; pt Brazil "você"; fr "vous"), no em dash or en dash characters anywhere visible (use hyphens in page ranges), never mention MIT (the paper's beer game sentence names it: do not copy it), tokens from `site/assets/site.css`, `?v=__BUILD__` on local CSS/JS, formulas with `site/assets/tex.js` (never monospace text), animations in the standard format with `site/assets/anim.js` + `site/assets/research.css`.

## The reference: the approved pilot
`site/resources/where-contours-touch.html` with `site/locales/resources/nlp-kkt.<lang>.js` (Level 4 animation, approved by the owner). Copy its page structure, player use, HUD chips, scenario `.seg`, model card with tex.js formulas, live solution, "What to notice" details, Further reading line and footer note. Also look at `site/resources/shadow-prices.html` for a simulation and `site/resources/search-tree.html` for step controls. Start the HTML from `site/resources/_template.html`.

## Files you create (only these)
- `site/resources/<FILE>.html`
- `site/locales/resources/<ID>.{en,es,pt,fr}.js`, registered as `I18N.register("<lang>", {...}, "resources/<ID>")`, with `<html data-i18n-bundles="resources/<ID>" data-title-key="<PREFIX>.title">`.
Do NOT edit shared files (assets/*, site/locales/<lang>.js, catalog.js, other pages). The catalog entry and `resource.<ID>.title/summary` already exist. If a shared file truly needs a change, do not make it: describe it in your report.

## Rules for content
- Animations: `Anim.create`, 40 to 60 s, 4 to 6 chapters with 2 to 5 word names in every language, ONE scenario control (`.seg` with `aria-pressed`), `render(t)` a pure function of time and scenario, layout precomputed in `layout()` and on resize, `Anim.rng(seed)` for randomness, 16:9 desktop / 4:5 phone stage, about 60 fps, almost no text on the canvas, live HUD chips with the real numbers, and a final frame that summarizes the result on its own (reduced motion shows only it).
- Simulations and games: live controls, immediate re-solve, comparison with the optimum (like the published resources).
- Every number shown is computed in the browser from the real model (iterations, optima, lambda, VSS, efficiencies, waiting times...). Nothing typed by hand. Use `LP.solve` (site/assets/lp.js) when the problem is linear.
- Data not from a source are illustrative but plausible; use Colombian contexts when they fit. The footer note says what is illustrative.
- Last line before the footer note: `<p class="note further" data-further="<SECTION>" data-refs="<PREFIX>.refs"></p>` (site.js renders the citation of Petropoulos, Laporte et al. (2024), with the given section). `<PREFIX>.refs` holds the classic references for the resource in all four languages (same citations, only "and" translated).
- Masthead eyebrow like the pilot: "Level N · <level name> · <b>Type</b>" (translated).

## Verification (required before you finish)
- Server: `curl -s localhost:8765 >/dev/null || (cd /home/user/repo/site && setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &)`.
- Playwright scripts in `/tmp/claude-0/-home-user-repo/c29c830a-c0ee-54bb-9a58-8c9f26c80fec/scratchpad/lab/<ID>/` (require('playwright') resolves from the scratchpad node_modules), executablePath `/opt/pw-browsers/chromium`; route `/cdnjs\.cloudflare\.com\/ajax\/libs\/mathjax\/3\.2\.2\/es5\/(.*)/` to `/tmp/claude-0/-home-user-repo/c29c830a-c0ee-54bb-9a58-8c9f26c80fec/scratchpad/node_modules/mathjax/es5/<rest>`. Google Fonts ERR_CERT is expected.
- Four languages x 1200 px and 400 px x light and dark (and 700 px once): no page errors, no raw keys, no horizontal scroll, no dash characters, formulas `.formula.tex-on` without `mjx-merror`; for animations: canvas hash identical after jumping away and back, scenario switch updates drawing and HUD, reduced motion (`reducedMotion:'reduce'`) shows the final frame. LOOK at screenshots of several chapters/states and the final frame and iterate until it is polished (no label collisions, readable on phones, dark mode contrast).
- Independent numeric check: write your own Python (or Node without reusing the page code) that recomputes every number the page shows, and compare with the values read from the page in en and es (decimal comma).

## Report (under 250 words)
What the resource shows, chapter names (en) or controls, the key numbers you verified and against what, what is illustrative, and anything odd or not finished.
