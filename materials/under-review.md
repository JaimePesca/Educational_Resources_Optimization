# Research pages under review (temporary changes, 2026-09-28)

The owner asked to hide, until the articles are published, anything that identifies the three working papers under
double-blind review or in preparation: street markets (in revision), wildfire (in revision) and flower pallets (in
preparation). The published nanostores chapter is unchanged.

What changed, and how to undo it when a paper is accepted (per page):

1. **Citation and footer note.** `r.<id>.cite` and `r.<id>.note` in `site/locales/research/<id>.{en,es,pt,fr}.js` now say
   "Working paper under peer review / in preparation; the title and the authors will appear here once the article is
   published". The original texts (exact title and authors) are in git history: `git show main~1:site/locales/research/<id>.en.js`
   from before the commit "Research under review: hide titles, authors...". Put the published reference (with DOI) instead.
2. **Search engines.** `<meta name="robots" content="noindex">` in `site/research/<id>.html`. Remove it, then run
   `python3 tools/seo_gen.py`: the page gets back its description, hreflang, social cards, ScholarlyArticle data, its place
   in the home page's research list and in `sitemap.xml`.
3. **Markets only: code repository link.** Removed from `site/research/markets.html` (the repository name is the paper
   title). Restore this paragraph right after `<p class="cite" data-i18n-html="r.markets.cite"></p>`:

```html
    <p class="repo"><a href="https://github.com/JaimePesca/Locating-street-markets-Using-a-discrete-choice-model-MINLP-and-fuzzy-AHP" rel="noopener" data-ga-event="github_click" data-ga-location="research_page" data-i18n="r.markets.repo"></a></p>
```

   Also restore "from the study's public repository" in `r.markets.map.note` (4 languages) and in the note.
4. **Pallets only: company hint.** In `r.pallets.case.intro` (4 languages) "a vertically integrated grower with farms in
   Colombia, Ecuador and Kenya" became "a flower exporter". Keep it generic unless the sponsor agrees to more detail.
