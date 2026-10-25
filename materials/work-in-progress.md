# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `feat/dutch` (from main 96bd88e). Do not merge to main until the owner says so.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Previous job (game theory lab pages and the hidden study section) is merged and deployed (main 31dbfb9, Deploy website run 39837121966).

## The owner's request (2026-10-23)
"Procedamos con el nuevo idioma en dutch para el sitio base": add Dutch to the public site (home, the five levels, research, about, 404). The hidden lab stays in en, es, pt, fr (pinned with data-i18n-langs); its study section is already en, es, nl. Ask the owner at the end whether to add the lab too.

Measured volume (English bundles): levels 49 pages, about 56,000 words; research 4 pages, about 6,600 words; about page 600 words; shared en.js 400 keys, 3,600 words (home, nav, footer, catalog titles and summaries, plus the feas, knap and tsp page strings).

## Status
| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Infrastructure | done | assets/i18n.js SITE_LANGS += nl (Dutch is stored like the other site languages); the 17 lab pages pinned with data-i18n-langs="en es pt fr"; tools/seo_gen.py LANGS += nl, og:locale nl_NL (run it only when every base page has its nl bundle); CLAUDE.md language rule (five languages, Dutch "je", glossary path, exceptions) |
| 2 | Pilot: glossary, shared strings (locales/nl.js, all keys of en.js), Level 1 (10 pages: feasible-region via shared keys, two-stories, feasible-region-3d, compacta, lp-inventory, edu-diet, edu-simplex, lp-shadow, lp-machines, lp-workforce) | done | workflow run wf_85646c4d-405 (script dutch-pilot-wf_85646c4d-405.js): glossary + critic, then translator + independent reviewer per bundle, then a consistency pass. Shared checker: scratchpad nl/check-bundle.js (copy kept in materials/i18n/check-bundle.js). If interrupted: resume the run from its scriptPath. 2026-10-24: done (23 agents); my own re-run of the checker on all 10 bundles: 0 failures; Compacta home label changed to "Home" (was "Start", too close to "Beginnen"); "Frutal B.V." kept (es/fr/pt also localize the legal form); lowercase month names in labels kept (normal Dutch). Open for the owner: English source says "violet constraint" (feas.d4.p1, drawn red) and "blue curve" (tsp.d2.p3, drawn black/white) in every language |
| 3 | Owner reviews the pilot (screenshots; ideally a Dutch speaker) | done | 7 screenshots sent 2026-10-24; owner: "Si, sigamos con las otras páginas" (also yes to the colour fix: feas.d4.p1 now names the flight hours constraint and tsp.d2.p3 the current route curve, in all five languages; no other wrong colour words in the English bundles) |
| 4 | Rest: levels 2 to 5 (39 bundles), research (4, anonymized and noindex: keep them anonymous in Dutch too), about | done | two workflows from one script (dutch-rest-wf_73a12ef3-72c.js) with args materials/i18n/nl-groupA.json (levels 2 and 3, research, about: run wf_73a12ef3-72c) and nl-groupB.json (levels 4 and 5: run wf_04a35365-b5b); translator + reviewer per bundle, consistency pass per group (only those agents append rows to the glossary). If interrupted: resume each run with its scriptPath, the same args (the JSON file content) and resumeFromRunId. 2026-10-25: group B done (47 agents, consistency fixed 19 items, 58 glossary rows; it extended the checker to skip \text{word} groups, copied to materials/i18n). Group A: all 21 bundles translated and reviewed; its consistency agent hit the session limit and was resumed at 17:20 UTC. My check: research nl bundles add no names, titles or links beyond the English. Noted for the owner: critical-load in dark mode shows the "your load" bar white with a white value label (all languages). Group A consistency done (1 more fix, 11 glossary rows). Code fixes (all languages): research/markets.html KPIs 10.370, 0.041, 0.028 now formatted per language via data-num; research/wildfire.html cliff axis labels (0.1 ha, 1.5 L/m²) formatted per language. Left as is: pallets "US$0,942" built without space; lot-sizing "81,7 %" with space (all languages) |
| 5 | Final QA, seo_gen.py, SEO_REPORT.md (nl), final sweep (5 languages, 1200/400, light/dark), report, ask for merge | building | final QA workflow wf_da02f491-d4c (script dutch-final-qa-wf_da02f491-d4c.js): 3 readers on sample pages + a global cross-group consistency pass. Then python3 tools/seo_gen.py and the sweep script scratchpad nl/sweep.js |

## Decisions already taken
- Scope "sitio base" = the public site, not the hidden lab (owner asked after the previous job; confirm the lab at the end).
- Dutch register "je" (informal), as in the study section; Dutch number format comes from I18N.fmt (nl-NL: decimal comma, dot for thousands).
- Translate from the English reference; for Level 1 statements check the Spanish original too.
- Pilot first (glossary + shared + Level 1), owner review, then the rest.
