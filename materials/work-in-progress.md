# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `feat/lab-game-theory` (from main 4a06ff5). Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Previous jobs (lab pages, home visuals, SEO, GA4 events, research under review, icons, PDF purge) are merged and deployed.

## The owner's request (2026-10-21)
New elements for the hidden lab about game theory. First help the owner decide what to build, then build it.

## Status
| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Design workflow: 5 proposal angles, merge, 3 judges, critic, synthesis | done | result in materials/game-theory-design.json: 14 candidates; recommended penalty minimax, Braess/Wardrop, core LP, security patrols (critic corrections included) |
| 1b | Owner added: a basics track (principles, notions, classic examples) and a second hidden door in the lab to a study section on Loe Schlicher's published research (cooperative games, spare parts pooling) | done | basics track (4 pages) in materials/game-theory-basics.json. Study section design and bibliography kept OUT of the public repo (scratchpad gt-dossier.json): no primary source could be opened (arXiv and publishers blocked), so paper content needs the PDFs from the owner, kept local only (.gitignore) |
| 2 | Owner chooses which pages to build (basics, advanced, study section scope, languages, PDFs) | todo | asked 2026-10-21 |
| 3 | Build the chosen pages (builder + independent reviewer each) | todo | |
| 4 | Final check, report, ask for merge | todo | |

## Decisions already taken
- The study section is public (public repo, reachable by URL): only published, verified sources; no personal statements of any kind.
- The second door goes on site/lab/index.html, same invisible style and position as the home page door.
- Existing game theory on the site: Price Wars (level 5: Cournot best responses, Stackelberg leader). Do not duplicate it.
- Lab pages follow materials/briefs/lab-page.md; every number computed live; four languages; GA4 tag and icon links as in resources/_template.html; noindex (hidden lab).
