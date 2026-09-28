# Work in progress (not published)

Read this first after any interruption (credits, context reset). It is the single source of truth for the current job. Update the status table and commit it after every step.

- Branch: `seo/technical-seo` (from main e12744a). Owner approved the merge on 2026-09-28: merged and published.
- Local server for checks: `cd site && python3 -m http.server 8765`.
- Previous jobs (lab pages, home visuals) are merged and deployed (main e12744a).

## The owner's request (2026-09-28)
Apply these recommendations of SEO_REPORT.md section 6 (the others not yet):
- 3: an "About the author" page (bio, affiliation, research lines, courses, links) and complete `sameAs`.
- 12: accessible descriptions for canvas/SVG graphics, only if nothing visual changes.
- 13: speed (preconnect, MathJax loaded lazily, measure).
- 14: a custom 404 page with links to the learning path.
- 15: outreach (backlinks): what can be done from the repo plus a ready kit for the owner.

## Status
| # | Task | Status | Notes |
|---|---|---|---|
| 12 | Accessible names for canvas and SVG charts (site.js, from existing headings, no visual change) | done | site.js: role="img" + aria-label from page title and nearest heading; 0 unnamed canvases after (was 40 of 47); pixel-identical screenshots on 7 pages; follows language; page labels win |
| 13 | Speed: preconnect hints, MathJax deferred until a formula is near or the page is idle | done | tex.js + research.js: MathJax after texts load, when a formula is within 300 px or at idle after load; load event 673->115 ms (big-m), 694->64 (lab), 829->157 (contours), 812->166 (wildfire); preconnect fonts, dns-prefetch CDNs on 65 pages via tools/seo_gen.py; 8 Level 1 pages keep their own inline MathJax loader |
| 14 | 404.html (absolute asset paths, 4 languages, noindex, links to levels) | done | site/404.html + nf.* keys in 4 locales; absolute paths; noindex; tested at a deep address in 4 languages, 1200/400, light/dark |
| 3 | about.html from materials/cv (no MIT, no phone or email), footer link, Person JSON-LD | done | site/about.html + locales/about (4 languages) from the CV; footer link on every page; ProfilePage + Person JSON-LD with ORCID, LinkedIn and GitHub in sameAs; owner confirmed Universidad Externado de Colombia; published 2026-09-28 |
| 15 | CITATION.cff, README link, outreach kit (materials/outreach.md) | done | CITATION.cff, README link, materials/outreach (kit es/en, APA and BibTeX, 12 places, level link list, QR png/svg with utm) |
| F | Update SEO_REPORT.md, verify 4 languages x 1200/400 x light/dark, commit, push, report | done | 396 page loads (66 pages x en, es, pt, fr at 1200 light + es, fr at 400 dark): 0 problems (errors, raw keys, dashes, MIT, scroll, formulas, lang, canonical, GA, unnamed canvas) |

## Decisions already taken
- CV facts only; everything about MIT is left out (site rule); no phone or email on the site.
- About page in first person, like the home page ("my research").
