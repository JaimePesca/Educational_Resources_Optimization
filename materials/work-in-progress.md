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
| 2a | lab-svm-dual "SVM, Level 2: The Dual Street" (animation) | done | site/lab/dual-street.html, prefix svmd., section 2.1. Review: all numbers match quadprog/sklearn/LP (C 0.1/1/10: D=P 0.418/1.090/1.092, width 3.318/1.373/1.353, SV 7/4/3, at C 5/1/0; steps 5/237/192 reproduced by a literal port, count is run-specific and now said so); fixed wording (step count, gap bound, KKT one-way, odd lot), phone chart tick, pt chip; ready to commit |
| 2b | lab-svm-kernel "SVM, Level 3: The Kernel Trick" (animation) | done | site/lab/kernel-trick.html, prefix kern., section 2.1. Review: every number matches sklearn SVC + scipy QP on the ported data; 7 overstated sentences and 5 truncated phone chips fixed in the 4 bundles (html untouched); ready to commit. |
| 2c | lab-fahp "AHP, Fuzzy Sets and Fuzzy AHP" (simulation) | done | site/lab/fuzzy-ahp.html, prefix fahp., section 2.8. Review: 2472 shown numbers match numpy eig/scipy LLS/own Buckley+Chang in 7 states (en, es); fixed Chang V vs overlap claim when m_b >= m_a (split wide), "overstates" limits wording, reciprocal called approximation, TeX decimal commas, zero-error product note, phone/desktop dropdown clipping (per-pair shorter option labels); ready to commit. |
| 3 | Home page visuals (hero art, level glyphs, research thumbnails) | done | assets/home-art.js + index.html (CSS and 5 hook lines, no text changes): five-level band under the facts (spotlight per level, phones pan one at a time with 1 to 5 buttons, links to each level), a glyph per level row (replays on hover), type icons on resource cards, SVG banner on each research card, faint dot grid in the hero. Checked 4 languages x 1200/700/400 x light/dark x reduced motion: no errors, no horizontal scroll. Waiting for the owner's approval of the preview. Owner approved the design and asked to publish (2026-09-28). |
| 4 | Final check, preview to the owner (screenshots + recording), ask for approval and merge | done | 48 loads of the new lab pages, lab index and home (4 languages, 1200 light and 400 dark): 0 problems; lab index shows 9 built cards. Previews sent (home GIF and screenshots; lab screenshots). Waiting for the owner's approval of the home visuals and for the merge decision. Owner approved the design and asked to publish (2026-09-28). |

Status values: todo, building, review, done. For each lab page: build agent, then an independent review agent, then commit, then set `href` on its entry in `catalog.js` → `lab`.

## Decisions already taken
- Lab pages live in `site/lab/<file>.html` with bundles `site/locales/lab/<id>.<lang>.js`, noindex, back link to the lab, Further reading line.
- The two SVM pages continue The Widest Street (lab/widest-street.html): level 2 uses the same 24 coffee lots and shows the dual, SMO and complementary slackness; level 3 uses coffee lots in drying (moisture, temperature near an ideal point), the lift to 3D, kernels and the RBF width. They may link to the previous SVM page in the lab.
- Books from MIT Press are cited without the publisher (the site never mentions MIT).
- Fuzzy AHP page: roaster in Medellín, three suppliers, four criteria; AHP by principal eigenvector with CR; triangular fuzzy numbers; Buckley's geometric mean; illustrative data. Independent from the research page on street markets (no links to research).
- Home visuals: drawn in code (canvas/SVG) with the site palette, theme aware (light and dark), light weight, respect reduced motion, no external images; text and layout of the content stay the same.
- Build in batches of at most 3 agents at a time.
