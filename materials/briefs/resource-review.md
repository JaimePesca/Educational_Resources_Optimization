# Brief: independent review of one learning resource

You are an independent, skeptical reviewer. Work in the git worktree `/home/user/repo` (read its CLAUDE.md). Do not commit, push, checkout or stash. Default to reporting a problem when unsure.

## Two jobs
1. Review (read-only): find every problem.
2. Fix: then fix the real problems yourself, touching ONLY the resource's own page `site/resources/<FILE>.html` and its bundles `site/locales/resources/<ID>.<lang>.js` (never shared files: assets/*, site/locales/<lang>.js, catalog.js, other pages; if a shared file needs a change, report it). Re-check after fixing.

## What to check
- **Numbers:** extract the model data from the page script and recompute EVERY number the page shows with your own independent code (Python preferred, a different method from the page when possible: numeric optimizer, brute force, simulation with many seeds, closed form). Read the numbers from the page with Playwright in en and es (decimal comma), in every scenario and at several states or times, and compare at the displayed precision. No result may be hard-coded in the bundles. Every text claim in the four languages must agree with the math.
- **Format (animations):** CLAUDE.md "Animations: the standard format": Anim.create, 40 to 60 s, 4 to 6 chapters with 2 to 5 word names in every language, one `.seg` scenario control with aria-pressed, HUD chips with live values, render(t) pure (canvas hash identical after jumping away and back), autoplay at 35% visibility, reduced motion shows a final frame that summarizes the result, 16:9 at 1200 px and 4:5 at 400 px. Simulations and games: live controls, immediate re-solve, comparison with the optimum.
- **Everything:** four languages x 1200/700/400 px x light/dark: no page errors, no raw keys, no untranslated English, no em/en dash characters, no MIT mention, no horizontal scroll, formulas typeset (`.formula.tex-on`, no `mjx-merror`), Further reading line present (`data-further` with the right section, `data-refs` rendering), footer note says what is illustrative, `?v=__BUILD__` on local links. LOOK at screenshots of several chapters/states and the final frame: label collisions, clipped text, contrast in dark mode, readability on phones, palette (MIT red for decisions, bright red for new/urgent, ink for structure, silver for context).

## Tools
Server: `curl -s localhost:8765 >/dev/null || (cd /home/user/repo/site && setsid nohup python3 -m http.server 8765 >/dev/null 2>&1 &)`. Playwright scripts in `/tmp/claude-0/-home-user-repo/c29c830a-c0ee-54bb-9a58-8c9f26c80fec/scratchpad/lab/review-<ID>/`, executablePath `/opt/pw-browsers/chromium`; route `/cdnjs\.cloudflare\.com\/ajax\/libs\/mathjax\/3\.2\.2\/es5\/(.*)/` to `/tmp/claude-0/-home-user-repo/c29c830a-c0ee-54bb-9a58-8c9f26c80fec/scratchpad/node_modules/mathjax/es5/<rest>`. Google Fonts ERR_CERT is expected.

## Report (under 250 words)
Problems found (with evidence), what you fixed, what remains, the key numbers you verified and against what (method), and what is illustrative.
