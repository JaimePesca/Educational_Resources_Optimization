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
| 2 | Owner chooses which pages to build | done | all 7: basics lab-gtb-table (read-the-table.html, gtt), lab-gtb-mix (be-unpredictable.html, gtm), lab-gtb-moves (move-by-move.html, gts), lab-gtb-share (share-the-savings.html, gtc); advanced lab-braess (braess.html, brs), lab-patrols (rangers-move-first.html, pat), lab-tolls (pricing-the-road.html, toll). Study section: es, en and Dutch (nl); named by topic; owner will upload the PDFs |
| 3a | Build and review the 7 game theory pages (workflow) | building | workflow run wf_3599bd72-1cc (cards, builder + reviewer per page, card alignment); specs: materials/game-theory-basics.json and materials/game-theory-design.json (with critic corrections). If interrupted: resume with the scriptPath in that run, then commit the pages and set href in catalog.lab |
| 3b | Study section: nl language support, second door on lab/index.html, chronological hub, one page per paper, glossary, reading plan | building | 11 PDFs uploaded (local only in materials/study/papers, gitignored). Reading workflows: group 1 wf_b240ae8f-fe0 (5 papers), group 2 wf_9c0025d0-f0c (6 papers); verified notes go to materials/study/notes/<slug>.json. Chronology (available online, else accepted): 2020 vaccination (POM, accepted Mar 2020); 2021-04-18 production-protection (EJOR); 2021-04-30 3D printing (C&OR); 2022-01-31 choice-based pricing (EJOR); 2023-12-09 pickpocketing (EJOR); 2023-12-12 rapid response teams (NRL, accepted); 2023-12-19 streaming platforms (Omega); 2024-07-01 freight consolidation (ORL, accepted); 2025-03-13 protection location (ORL); 2025-07-02 bodyguards (NRL, accepted); 2026-06-04 parcel lockers (IJPE). Not uploaded: the spare parts and resource pooling papers (2017 to 2020) and the thesis |
| 4 | Final check, report, ask for merge | todo | |

## Decisions already taken
- Study section languages: es, en, nl (Dutch), via a per-page language list in assets/i18n.js (data-i18n-langs on <html>); the rest of the site keeps en, es, pt, fr. Papers listed in chronological order so the owner sees how the research evolves.
- Braess page stays on congestion, Wardrop, price of anarchy and marginal-cost or least-revenue tolls; Pricing the Road is the revenue-maximizing concessionaire (bilevel). Basics page 1 uses Pigou's two roads only. The penalty minimax idea lives in basics page 2, the core LP idea in basics page 4.
- The study section is public (public repo, reachable by URL): only published, verified sources; no personal statements of any kind.
- The second door goes on site/lab/index.html, same invisible style and position as the home page door.
- Existing game theory on the site: Price Wars (level 5: Cournot best responses, Stackelberg leader). Do not duplicate it.
- Lab pages follow materials/briefs/lab-page.md; every number computed live; four languages; GA4 tag and icon links as in resources/_template.html; noindex (hidden lab).
