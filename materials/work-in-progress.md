# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `feat/lab-mcda-svm-home` (from main e2ab24e). Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Briefs for agents: `materials/briefs/` (resource build, independent review, lab page addendum).
- Previous job (logic game fix, Browse menu, six lab pages) is merged and deployed (main e2ab24e).

## The owner's request (2026-09-28)
1. Lab: a simulation of AHP, fuzzy set theory and both combined (Fuzzy AHP).
2. Lab: two more SVM animations, one "level 2" and one "level 3", more complex than The Widest Street, above all the kernel trick.
3. Home page (index.html): it looks flat. Add images/animated visuals: a first glance that makes people want to explore, clear about what the site is, inviting to play; then visual objects along the page. Do not change any text, only decorate. Keep the top bar and language selector as they are.
4. At the end, give the owner a preview of the visual objects to approve or adjust (screenshots and a short recording). No merge until approved.

## Status
| # | Task | Status | Commit / notes |
|---|---|---|---|
| 1 | Lab cards and catalog entries for the three new pages | done | lab-svm-dual and lab-svm-kernel after lab-svm; lab-fahp last; card texts in 4 languages, present tense |
| 2a | lab-svm-dual "SVM, Level 2: The Dual Street" (animation) | review | site/lab/dual-street.html, prefix svmd., section 2.1 |
| 2b | lab-svm-kernel "SVM, Level 3: The Kernel Trick" (animation) | review | site/lab/kernel-trick.html, prefix kern., section 2.1 |
| 2c | lab-fahp "AHP, Fuzzy Sets and Fuzzy AHP" (simulation) | review | site/lab/fuzzy-ahp.html, prefix fahp., section 2.8 |
| 3 | Home page visuals (hero art, level glyphs, research thumbnails) | review | assets/home-art.js + index.html (CSS and 5 hook lines, no text changes): five-level band under the facts (spotlight per level, phones pan one at a time with 1 to 5 buttons, links to each level), a glyph per level row (replays on hover), type icons on resource cards, SVG banner on each research card, faint dot grid in the hero. Checked 4 languages x 1200/700/400 x light/dark x reduced motion: no errors, no horizontal scroll. Waiting for the owner's approval of the preview. |
| 4 | Final check, preview to the owner (screenshots + recording), ask for approval and merge | todo | |

Status values: todo, building, review, done. For each lab page: build agent, then an independent review agent, then commit, then set `href` on its entry in `catalog.js` → `lab`.

## Decisions already taken
- Lab pages live in `site/lab/<file>.html` with bundles `site/locales/lab/<id>.<lang>.js`, noindex, back link to the lab, Further reading line.
- The two SVM pages continue The Widest Street (lab/widest-street.html): level 2 uses the same 24 coffee lots and shows the dual, SMO and complementary slackness; level 3 uses coffee lots in drying (moisture, temperature near an ideal point), the lift to 3D, kernels and the RBF width. They may link to the previous SVM page in the lab.
- Books from MIT Press are cited without the publisher (the site never mentions MIT).
- Fuzzy AHP page: roaster in Medellín, three suppliers, four criteria; AHP by principal eigenvector with CR; triangular fuzzy numbers; Buckley's geometric mean; illustrative data. Independent from the research page on street markets (no links to research).
- Home visuals: drawn in code (canvas/SVG) with the site palette, theme aware (light and dark), light weight, respect reduced motion, no external images; text and layout of the content stay the same.
- Build in batches of at most 3 agents at a time.
