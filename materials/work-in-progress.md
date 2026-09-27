# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `feat/lab-build-nav` (from main e6624d0). Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Briefs for agents: `materials/briefs/` (resource build, independent review).

## The owner's request (2026-09-27)
1. Bug: in the Level 3 game "Say It with Constraints" (resources/logic-constraints.html) the correct answer shows as soon as you enter. Cause: progress is saved in localStorage and a solved card was shown with its right option marked and its explanation. Fix: a solved card starts neutral, with its stars, a note and a "Show the answer" button.
2. Navigation dropdown next to the language selector, on every page: browse the learning path by level and by resource type (not research).
3. Build the 6 lab proposals as real pages inside the hidden lab (site/lab/), linked from the lab cards. Not added to the home page or the main menu yet (labInNav stays false).

## Status
| # | Task | Status | Commit / notes |
|---|---|---|---|
| 1 | Logic game answer leak | done | see git log "Say It with Constraints" |
| 2 | Navigation dropdown | done | Browse menu in site.js + site.css, keys nav.menu etc.; 96 checks passed |
| 3a | lab-solver "Inside the Solver" (animation) | done | site/lab/inside-the-solver.html; reviewed (every node LP, cut and counts match; chapter 4 paced); href in catalog.lab; card text in present tense, no product log claim |
| 3b | lab-cvar "Beyond VaR: CVaR" (animation) | done | site/lab/beyond-var.html; reviewed (numbers match, LP solves moved to a Web Worker); href in catalog.lab; card text in present tense |
| 3c | lab-linearization (animation) | done | site/lab/linearizing-markets.html; reviewed (numbers match; exactness condition and notation note fixed); href in catalog.lab; card text in present tense |
| 3d | lab-ml-methods "Learning Is Optimizing" (animation) | building | site/lab/learning-is-optimizing.html, prefix learn. |
| 3e | lab-svm "The Widest Street" (animation) | building | site/lab/widest-street.html, prefix svm. |
| 3f | lab-ml-ai-cases "ML + AI in Optimization" (simulation) | todo | |
| 4 | Final site-wide check, report to the owner, ask for merge | todo | |

Status values: todo, building, review, done. For each lab page: build agent, then an independent review agent (numbers recomputed separately, four languages, 1200/700/400 px, light and dark, screenshots), then commit, then set `href` on its entry in `catalog.js` → `lab`.

## Planned files for the next batches
- 3c lab-linearization → site/lab/linearizing-markets.html, prefix lin.
- 3d lab-ml-methods → site/lab/learning-is-optimizing.html, prefix learn.
- 3e lab-svm → site/lab/widest-street.html, prefix svm.
- 3f lab-ml-ai-cases → site/lab/ml-ai-optimization.html, prefix mlai.

## Decisions already taken
- Lab pages live in `site/lab/<file>.html` with bundles `site/locales/lab/<id>.<lang>.js`, keep `noindex, nofollow`, back link to the lab (not the home page), same player and tex.js as the learning resources, Further reading line (`data-further`) like the resources.
- Section of Petropoulos et al. (2024) per lab page: solver 2.15 (Mixed-integer programming), cvar 2.18 (Risk analysis), linearization 2.15, ml-methods 2.1, svm 2.1, ml-ai-cases 2.1.
- When a lab page is built, its card text (lab.<id>.desc in site/locales/lab/lab.<lang>.js) moves from the conditional ("would show") to the present and must describe what the page really shows. Done for lab-linearization; do it for each other page when it is committed.
- Build in batches of at most 3 agents at a time (13 at once exhausted the session limit before).
