#!/usr/bin/env python3
"""Technical SEO for the static site: GA4 tag, meta description, hreflang, Open Graph, Twitter Card,
JSON-LD, sitemap.xml and robots.txt. Only invisible head elements and config files are written.
Texts come from the existing English locale files (site/locales/en.js and page bundles).

Run it again after adding or renaming a page (python3 tools/seo_gen.py): it refreshes the SEO block of every
indexable page, the GA tag where missing, sitemap.xml and robots.txt. Pages with a robots noindex meta
(the hidden lab) only get the GA tag. SEO_REPORT.md describes the result."""
import json, os, re, subprocess, sys, html

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site")
BASE = "https://learn-optimization.jaimepesca.com/"
LANGS = ["en", "es", "pt", "fr"]
OG_LOCALE = {"en": "en_US", "es": "es_CO", "pt": "pt_BR", "fr": "fr_FR"}
PERSON_ID = "https://jaimepesca.com/#person"
SITE_NAME = None  # from site.name

GA = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1HT57WJW6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L1HT57WJW6');
</script>
"""


def load_en():
    js = r"""
    global.window = {}; const out = {};
    global.I18N = { register: (l, d, b) => { if (l === 'en') Object.assign(out, d); } };
    const fs = require('fs'), path = require('path');
    require(path.join(process.argv[1], 'assets/catalog.js'));
    const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p); else if (/\.en\.js$|\/en\.js$/.test(p)) require(p);
    });
    walk(path.join(process.argv[1], 'locales'));
    console.log(JSON.stringify({ dict: out, catalog: window.CATALOG }));
    """
    r = subprocess.run(["node", "-e", js, ROOT], capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


def plain(s):
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def meta_desc(text):
    # same rule as metaDesc() in assets/i18n.js
    text = plain(text)
    if len(text) <= 200:
        return text
    cut = text.rfind(". ", 0, 200)
    return text[:cut + 1] if cut > 60 else text


def page_url(rel):
    if rel == "index.html":
        return BASE
    if rel.endswith("/index.html"):
        return BASE + rel[: -len("index.html")]
    return BASE + rel


def lang_url(url, lang):
    return url if lang == "en" else url + "?lang=" + lang


def lastmod(rel):
    r = subprocess.run(["git", "log", "-1", "--format=%cs", "--", rel], cwd=ROOT, capture_output=True, text=True)
    return r.stdout.strip() or None


def esc(s):
    return s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    data = load_en()
    D, C = data["dict"], data["catalog"]
    global SITE_NAME
    SITE_NAME = D["site.name"]
    levels = {l["id"]: l for l in C["levels"]}
    type_label = {k[len("type."):]: v for k, v in D.items() if k.startswith("type.")}

    files = subprocess.run(["git", "ls-files", "*.html"], cwd=ROOT, capture_output=True, text=True).stdout.split()
    # facts from the author's CV (materials/cv) and the citations of the research pages; profile urls the owner adds
    # to PROFILES in site/about.html go to sameAs here too
    person = {
        "@type": "Person", "@id": PERSON_ID, "name": "Jaime Pesca",
        "alternateName": ["Jaime Enrique Pesca Santos", "J. E. Pesca Santos"],
        "url": "https://jaimepesca.com", "sameAs": ["https://orcid.org/0009-0003-8221-0924", "https://www.linkedin.com/in/jaime-pesca/", "https://github.com/JaimePesca"],
        "mainEntityOfPage": BASE + "about.html",
        "jobTitle": "Lecturer in optimization methods",
        "worksFor": {"@type": "CollegeOrUniversity", "name": "Universidad Externado de Colombia"},
        "alumniOf": {"@type": "CollegeOrUniversity", "name": "Universidad de La Sabana"},
        "memberOf": [{"@type": "Organization", "name": "The OR Society"},
                     {"@type": "Organization", "name": "Colombian Association of Operations Research (ASOCIO)"}],
        "knowsAbout": ["Operations research", "Mathematical optimization", "Mixed-integer linear programming", "Mixed-integer nonlinear programming",
                       "Combinatorial optimization", "Heuristics and metaheuristics", "Facility location", "Discrete choice models",
                       "Fuzzy AHP", "Multi-criteria decision analysis", "Stochastic programming", "Logistics and supply chain", "Machine learning"],
        "knowsLanguage": ["en", "es"]
    }
    course_id = BASE + "#course"
    website_id = BASE + "#website"
    og_image = BASE + "assets/og-image.png"
    og_alt = SITE_NAME + ": " + D["home.eyebrow"].replace("·", "-") if False else SITE_NAME + ". " + D["home.eyebrow"]

    report = {"ga": [], "pages": {}, "descriptions": {}, "speed": []}
    sitemap = []
    edu_by_href = {r["href"]: r for r in C["education"] if r.get("href")}
    res_by_href = {r["href"]: r for r in C["research"] if r.get("href")}

    for rel in sorted(files):
        path = os.path.join(ROOT, rel)
        s = open(path, encoding="utf-8").read()
        changes = []
        if "<!-- SEO (invisible)" in s:
            # refresh: drop the previous generated block (from its marker to the end of its JSON-LD script)
            a = s.index("<!-- SEO (invisible)")
            z = s.index("</script>\n", s.index('<script type="application/ld+json">', a)) + len("</script>\n")
            s = s[:a] + s[z:]
        # ---- 1. GA4 right after <head> (all pages) ----
        if "googletagmanager.com/gtag/js" not in s:
            s = s.replace("<head>\n", "<head>\n" + GA, 1)
            report["ga"].append(rel)
            changes.append("Google Analytics 4 tag (gtag.js, G-L1HT57WJW6) right after <head>")

        # ---- 2. connection hints (all pages): fonts are needed at once; the CDNs only later, so a DNS lookup is enough ----
        if "<!-- Speed (invisible)" in s:
            a = s.index("<!-- Speed (invisible)")
            s = s[:a] + s[s.index("<!-- /Speed -->\n", a) + len("<!-- /Speed -->\n"):]
        hints = ['<link rel="preconnect" href="https://fonts.googleapis.com">',
                 '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>']
        if re.search(r"tex\.js|research\.js|cdnjs\.cloudflare\.com", s):
            hints.append('<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">')
        if "cdn.jsdelivr.net" in s:
            hints.append('<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">')
        m = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com', s)
        if m:
            s = s[:m.start()] + "<!-- Speed (invisible): open the connections the page needs early -->\n" + "\n".join(hints) + "\n<!-- /Speed -->\n" + s[m.start():]
            if rel not in report["speed"]:
                report["speed"].append(rel)

        noindex = re.search(r'<meta name="robots" content="[^"]*noindex', s) is not None
        if rel == "resources/_template.html":
            # the page template is not a resource: blocked in robots.txt (a noindex here would be copied into new pages)
            noindex = True
            changes.append("kept out of sitemap.xml and blocked in robots.txt (it is the template new pages are copied from)")
        if noindex:
            report["pages"][rel] = changes
            open(path, "w", encoding="utf-8").write(s)
            continue

        # ---- what the page is ----
        title = re.search(r"<title>(.*?)</title>", s).group(1)
        url = page_url(rel)
        kind, desc_key, entity = None, None, None
        if rel == "index.html":
            kind = "home"
        elif rel in edu_by_href:
            kind, entity = "resource", edu_by_href[rel]
            desc_key = "resource." + entity["id"] + ".summary"
        elif rel == "about.html":
            kind, desc_key = "about", "ab.desc"
        elif rel in res_by_href:
            kind, entity = "research", res_by_href[rel]
            desc_key = "project." + entity["id"] + ".summary"
        else:
            print("UNMAPPED", rel, file=sys.stderr)
            continue

        head_add = []
        m = re.search(r'<meta name="description" content="([^"]*)"', s)
        if m:
            desc = html.unescape(m.group(1))
        else:
            desc = meta_desc(D[desc_key])
            head_add.append('<meta name="description" content="%s">' % esc(desc))
            report["descriptions"][rel] = desc
            changes.append("meta description (English, from `%s`; translated at runtime)" % desc_key)
        if desc_key and "data-desc-key" not in s:
            s = re.sub(r"<html ([^>]*)>", lambda m: '<html %s data-desc-key="%s">' % (m.group(1), desc_key), s, count=1)
            changes.append('`data-desc-key="%s"` on <html>: description, og:description and twitter:description follow the language' % desc_key)
        head_add.append('<meta name="author" content="Jaime Pesca">')
        # hreflang + x-default
        for l in LANGS:
            head_add.append('<link rel="alternate" hreflang="%s" href="%s">' % (l, lang_url(url, l)))
        head_add.append('<link rel="alternate" hreflang="x-default" href="%s">' % url)
        changes.append("hreflang alternates en, es, pt, fr (?lang=xx) and x-default (English); canonical per language added by assets/i18n.js")
        # Open Graph + Twitter
        og = [
            ('property', 'og:type', {"research": "article", "about": "profile"}.get(kind, "website")),
            ('property', 'og:site_name', SITE_NAME),
            ('property', 'og:title', title),
            ('property', 'og:description', desc),
            ('property', 'og:image', og_image),
            ('property', 'og:image:width', "1200"),
            ('property', 'og:image:height', "630"),
            ('property', 'og:image:alt', og_alt),
            ('property', 'og:locale', "en_US"),
        ] + [('property', 'og:locale:alternate', OG_LOCALE[l]) for l in LANGS[1:]] + [
            ('name', 'twitter:card', "summary_large_image"),
            ('name', 'twitter:title', title),
            ('name', 'twitter:description', desc),
            ('name', 'twitter:image', og_image),
            ('name', 'twitter:image:alt', og_alt),
        ]
        for a, k, v in og:
            head_add.append('<meta %s="%s" content="%s">' % (a, k, esc(v)))
        changes.append("Open Graph (type, site_name, title, description, image, locale and alternates) and Twitter Card (summary_large_image)")

        # ---- JSON-LD ----
        in_lang = LANGS
        graph = []
        if kind == "home":
            lv = []
            for l in C["levels"]:
                lv.append({"@type": "Syllabus", "name": "%s %d: %s" % (D["home.level"], l["n"], D["level.%s.title" % l["id"]]),
                           "description": plain(D["level.%s.summary" % l["id"]])})
            parts = [{"@id": page_url(r["href"]), "@type": "LearningResource", "name": D["resource.%s.title" % r["id"]], "url": page_url(r["href"])}
                     for r in C["education"] if r.get("href")]
            graph = [
                {"@type": "WebSite", "@id": website_id, "url": BASE, "name": SITE_NAME, "description": desc,
                 "inLanguage": in_lang, "author": {"@id": PERSON_ID}, "publisher": {"@id": PERSON_ID}},
                person,
                {"@type": "Course", "@id": course_id, "name": SITE_NAME + ": " + D["nav.learn"], "url": BASE + "#learn",
                 "description": plain(D["home.learn.intro"]).split(". ")[0] + ".",
                 "provider": {"@id": PERSON_ID}, "author": {"@id": PERSON_ID}, "inLanguage": in_lang, "isAccessibleForFree": True,
                 "teaches": [D["level.%s.title" % l["id"]] for l in C["levels"]],
                 "syllabusSections": lv, "hasPart": parts},
                {"@type": "ItemList", "name": D["nav.research"], "itemListElement": [
                    {"@type": "ListItem", "position": i + 1, "url": page_url(r["href"]), "name": D["project.%s.title" % r["id"]]}
                    for i, r in enumerate([r for r in C["research"] if r.get("href")])]}
            ]
            changes.append("JSON-LD: WebSite, Person (author), Course (the five-level learning path with its levels and resources), ItemList of research cases")
        elif kind == "resource":
            r, l = entity, levels[entity["level"]]
            topics = [x.strip() for x in D["level.%s.topics" % l["id"]].split("|")]
            graph = [
                {"@type": "LearningResource", "@id": url, "url": url, "name": D["resource.%s.title" % r["id"]], "description": desc,
                 "learningResourceType": type_label.get(r["type"], r["type"]), "interactivityType": "active",
                 "educationalLevel": "%s %d: %s" % (D["home.level"], l["n"], D["level.%s.title" % l["id"]]),
                 "teaches": D["level.%s.title" % l["id"]], "about": [{"@type": "DefinedTerm", "name": x} for x in topics], "keywords": ", ".join([D["level.%s.title" % l["id"]]] + topics),
                 "inLanguage": in_lang, "isAccessibleForFree": True, "author": {"@id": PERSON_ID}, "creator": {"@id": PERSON_ID},
                 "isPartOf": {"@type": "Course", "@id": course_id, "name": SITE_NAME + ": " + D["nav.learn"], "url": BASE + "#learn"}},
                person,
                {"@type": "BreadcrumbList", "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": SITE_NAME, "item": BASE},
                    {"@type": "ListItem", "position": 2, "name": D["resource.%s.title" % r["id"]], "item": url}]}
            ]
            changes.append("JSON-LD: LearningResource (type, level, topics, languages, free, author, part of the Course), Person, BreadcrumbList")
        elif kind == "about":
            graph = [
                {"@type": "ProfilePage", "@id": url, "url": url, "name": title, "description": desc, "inLanguage": in_lang,
                 "mainEntity": {"@id": PERSON_ID}, "about": {"@id": PERSON_ID},
                 "isPartOf": {"@type": "WebSite", "@id": website_id, "name": SITE_NAME, "url": BASE}},
                person
            ]
            changes.append("JSON-LD: ProfilePage whose main entity is the Person (job, university, education, memberships, topics, profiles)")
        else:
            p = entity
            cite = D["r.%s.cite" % p["id"]]
            headline = plain(re.search(r"<b>(.*?)</b>", cite).group(1)).rstrip(".")
            rest = plain(cite.split("</b>", 1)[1])
            names = rest.split(". ", 1)[0] if p["id"] != "nanostores" else rest.split(". In ", 1)[0]
            authors = []
            for n in re.split(r",\s*|\s+and\s+", names):
                n = n.strip().rstrip(".")
                if not n:
                    continue
                authors.append({"@id": PERSON_ID} if "Pesca" in n else {"@type": "Person", "name": n})
            art = {"@type": "ScholarlyArticle", "@id": url + "#study", "headline": headline, "author": authors,
                   "keywords": ", ".join(D["method." + m] for m in p["methods"]),
                   "spatialCoverage": {"@type": "Place", "name": plain(D["project.%s.place" % p["id"]])}}
            if p.get("paper"):
                art.update({"sameAs": p["paper"], "identifier": {"@type": "PropertyValue", "propertyID": "DOI", "value": p["paper"].split("doi.org/")[1]},
                            "datePublished": "2026", "pagination": "33-40", "publisher": {"@type": "Organization", "name": "Springer"},
                            "isPartOf": {"@type": "Book", "name": "ICPR 2025, Lecture Notes in Production Engineering",
                                         "editor": [{"@type": "Person", "name": "J. R. Montoya-Torres"}, {"@type": "Person", "name": "G. E. Mejía"}]}})
            else:
                art["creativeWorkStatus"] = "Working paper"
            graph = [
                {"@type": "WebPage", "@id": url, "url": url, "name": title, "description": desc, "inLanguage": in_lang,
                 "author": {"@id": PERSON_ID}, "isPartOf": {"@type": "WebSite", "@id": website_id, "name": SITE_NAME, "url": BASE},
                 "mainEntity": {"@id": url + "#study"}, "about": {"@id": url + "#study"}},
                art, person
            ]
            changes.append("JSON-LD: WebPage whose main entity is the ScholarlyArticle of the study (headline, authors, methods as keywords, place%s), Person" %
                           (", DOI, book, publisher, year and pages" if p.get("paper") else ", working paper status"))
        ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, indent=1)
        head_add.append('<script type="application/ld+json">\n' + ld + "\n</script>")

        block = "<!-- SEO (invisible): description, hreflang, social cards and structured data. The canonical link is added per language by assets/i18n.js -->\n" + "\n".join(head_add) + "\n"
        if True:
            t_end = s.index("</title>") + len("</title>\n")
            if rel == "index.html":
                # after the existing description line
                t_end = s.index("\n", s.index('<meta name="description"')) + 1 if s.index('<meta name="description"') > s.index("</title>") else t_end
            s = s[:t_end] + block + s[t_end:]
        report["pages"][rel] = changes
        open(path, "w", encoding="utf-8").write(s)
        sitemap.append((url, lastmod(rel), kind))

    # ---- sitemap.xml ----
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for url, lm, kind in sitemap:
        for l in LANGS:
            out.append("  <url>")
            out.append("    <loc>%s</loc>" % esc(lang_url(url, l)))
            if lm:
                out.append("    <lastmod>%s</lastmod>" % lm)
            for l2 in LANGS:
                out.append('    <xhtml:link rel="alternate" hreflang="%s" href="%s"/>' % (l2, esc(lang_url(url, l2))))
            out.append('    <xhtml:link rel="alternate" hreflang="x-default" href="%s"/>' % esc(url))
            out.append("  </url>")
    out.append("</urlset>")
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write("\n".join(out) + "\n")
    open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8").write(
        "# Optimization in Action\n"
        "# Every page may be crawled. The hidden lab pages carry <meta name=\"robots\" content=\"noindex, nofollow\">,\n"
        "# which crawlers can only read if the pages are not blocked here.\n"
        "User-agent: *\nAllow: /\nDisallow: /resources/_template.html\n\nSitemap: " + BASE + "sitemap.xml\n")
    print("speed hints:", len(report["speed"]), "GA:", len(report["ga"]), "indexable:", len(sitemap), "new descriptions:", len(report["descriptions"]))


main()
