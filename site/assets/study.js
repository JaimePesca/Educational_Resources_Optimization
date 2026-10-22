/*
 * Study section (lab/study/): helpers for the hub and the renderer of the paper pages.
 * Load after i18n.js, site.js, the locale files and lab/study/papers.js (window.STUDY), and before tex.js.
 *
 * A paper page declares <main id="study-root" data-study-paper="<slug>" data-study-prefix="<P>"> and this file builds the
 * whole page inside it from the page bundle (keys P.*) and the shared bundle lab/study/common (keys stu.*), in this order:
 * chronological strip, masthead, "On this page", at a glance, setting, model, main results, methods and tools, allocation
 * rules or solution approach, numerical study, insights, limitations, connections, prerequisites, key terms, study
 * questions, "Try it", previous and next. A section whose keys are missing is left out.
 *
 *   P.title, P.lede (optional)                          h1 and lede (the h1 is also the <title>: data-title-key="P.title")
 *   P.question                                          at a glance: the research question in one paragraph
 *   P.setting.1, .2 ...                                 paragraphs (HTML)
 *   P.model.1, .2 ...  (+ P.model.N.tex, .formula)      paragraph, then an optional display formula (TeX.set) after it
 *   P.r.1 ... : .label .name .page .st (+ .tex .formula) .mean .proof
 *                                                       one collapsible block per result: "Theorem 2", a short name,
 *                                                       the page ("1729" or "1725-1726"), statement, plain meaning, proof idea
 *   P.methods.1 ...                                     chips (plain text)
 *   P.alloc.head (optional heading), P.alloc.1 ... (+ .tex)
 *   P.num.1 ... (+ .tex), P.num.stat.1.v / .l ...       paragraphs and optional stat tiles (value, label)
 *   P.ins.1 ..., P.lim.1 ...                            lists (HTML)
 *   P.conn.1 ... (+ .tex), P.conn.to.<slug>             paragraphs, then one linked card per paper of the line that has a
 *                                                       P.conn.to.<slug> sentence (pages not built yet show without link)
 *   P.pre.1 ...                                         list (HTML; links inside may carry data-keep-lang)
 *   P.g.1.term / P.g.1.def ...                          key terms (optional)
 *   P.q.1 ...                                           study questions (no answers)
 *   P.try.intro, P.try.note                             text around the page's own widget
 *   P.note (optional)                                   last note of the page, before the shared stu.note
 *
 * "Try it": the page writes its widget in the HTML as <div id="study-try" hidden>...</div> (anywhere inside <main>) and
 * runs its own script with I18N.onChange after this file; the renderer moves that node into the "Try it" section and
 * shows it, keeping the node (and its listeners) across language switches. Key lists stop at the first missing number.
 */
(function () {
  "use strict";
  var DATA = window.STUDY || { papers: [] };
  var papers = DATA.papers.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  function t(k, v) { return I18N.t(k, v); }
  function has(k) { return I18N.t(k) !== k; }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function html(tag, cls, h) { var n = el(tag, cls); n.innerHTML = h; return n; }
  function seq(prefix) {
    var out = [];
    for (var n = 1; n < 200; n++) { var k = prefix + "." + n; if (!has(k)) break; out.push(k); }
    return out;
  }
  function bySlug(slug) { return papers.filter(function (p) { return p.slug === slug; })[0] || null; }
  function indexOf(slug) { for (var i = 0; i < papers.length; i++) if (papers[i].slug === slug) return i; return -1; }

  function fmtDate(p, short) {
    var d = p.date.split("-").map(Number), dt = new Date(Date.UTC(d[0], d[1] - 1, d[2] || 1));
    var o = { year: "numeric", month: short ? "short" : "long", timeZone: "UTC" };
    if (p.date_precision !== "month" && !short) o.day = "numeric";
    return dt.toLocaleDateString(I18N.locale, o);
  }
  function dateLine(p) { return t("stu.date." + p.date_kind, { d: fmtDate(p) }); }
  function shortTitle(p) { var k = "stu.p." + p.slug + ".short"; return has(k) ? t(k) : p.title; }
  function summary(p) { var k = "stu.p." + p.slug + ".sum"; return has(k) ? t(k) : ""; }
  function lineName(line) { return t("stu.line." + line); }
  function badge(line) { return el("span", "st-badge line-" + line, lineName(line)); }
  function pageRef(s) { return t(String(s).indexOf("-") >= 0 ? "stu.pages" : "stu.page", { n: s }); }
  function doiUrl(p) { return "https://doi.org/" + p.doi; }
  // links of the study section keep the language; base hrefs are remembered so a language switch rewrites them
  function keepLang(root) {
    root.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
      if (!a.dataset.baseHref) a.dataset.baseHref = a.getAttribute("href");
      a.setAttribute("href", I18N.href(a.dataset.baseHref));
    });
  }
  // a link to a paper page, or a plain element when the page is not built yet
  function paperNode(p, cls) {
    var n;
    if (p.ready) { n = el("a", cls); n.href = p.href; n.setAttribute("data-keep-lang", ""); }
    else { n = el("div", cls + " is-soon"); }
    return n;
  }

  // ---- chronological strip: one dot per paper, the current one highlighted, the others linked ----
  function strip(current) {
    var nav = el("nav", "st-strip"), idx = indexOf(current);
    nav.setAttribute("aria-label", t("stu.strip.aria"));
    var ol = el("ol", "st-strip-list"), lastYear = null;
    papers.forEach(function (p) {
      var li = el("li", "st-strip-item line-" + p.line), y = p.date.slice(0, 4);
      var label = t("stu.strip.item", { year: y, title: shortTitle(p) }), dot;
      if (p.slug === current) {
        li.classList.add("is-current");
        dot = el("span", "st-strip-dot"); dot.setAttribute("aria-current", "page");
        dot.setAttribute("role", "img"); dot.setAttribute("aria-label", label);
      } else if (p.ready) {
        dot = el("a", "st-strip-dot"); dot.href = p.href; dot.setAttribute("data-keep-lang", "");
        dot.setAttribute("aria-label", label);
      } else {
        dot = el("span", "st-strip-dot is-soon"); dot.setAttribute("role", "img");
        dot.setAttribute("aria-label", label + " (" + t("stu.soon") + ")");
      }
      dot.title = label;
      li.appendChild(dot);
      if (y !== lastYear) { li.appendChild(el("span", "st-strip-year", y)); lastYear = y; li.classList.add("new-year"); }
      ol.appendChild(li);
    });
    if (idx >= 0) nav.appendChild(el("p", "st-strip-cap", t("stu.strip.cap", { n: idx + 1, total: papers.length })));
    nav.appendChild(ol);
    return nav;
  }

  function formula(key) {
    var f = el("div", "formula st-formula"), tex = t(key + ".tex");
    if (window.TeX) TeX.set(f, tex, has(key + ".formula") ? t(key + ".formula") : tex);
    else f.textContent = has(key + ".formula") ? t(key + ".formula") : tex;
    return f;
  }
  // paragraphs P.x.1, P.x.2 ..., each followed by its display formula when P.x.N.tex exists
  function flow(prefix) {
    var out = [];
    seq(prefix).forEach(function (k) {
      out.push(html("p", "st-p", t(k)));
      if (has(k + ".tex")) out.push(formula(k));
    });
    return out;
  }
  function list(prefix, tag, cls) {
    var keys = seq(prefix);
    if (!keys.length) return null;
    var ul = el(tag || "ul", cls || "st-list");
    keys.forEach(function (k) { ul.appendChild(html("li", null, t(k))); });
    return ul;
  }

  function section(id, title, nodes, extraCls) {
    nodes = nodes.filter(Boolean);
    if (!nodes.length) return null;
    var s = el("section", "st-sec" + (extraCls ? " " + extraCls : "")); s.id = "st-" + id;
    var h = el("h2", "st-h"); h.id = "h-st-" + id;
    h.appendChild(el("span", "st-h-text", title));
    s.setAttribute("aria-labelledby", h.id);
    s.appendChild(h);
    nodes.forEach(function (n) { s.appendChild(n); });
    return s;
  }

  function glance(p, P) {
    var box = el("div", "st-glance");
    var q = el("div", "st-q");
    q.append(el("p", "st-label", t("stu.question")), html("p", "st-qtext", t(P + ".question")));
    var dl = el("dl", "st-cite");
    function row(label, node) { var w = el("div", "st-cite-row"); w.append(el("dt", null, label), node); dl.appendChild(w); }
    var dd = el("dd"); dd.appendChild(badge(p.line)); row(t("stu.cite.line"), dd);
    row(t("stu.cite.date"), el("dd", null, dateLine(p)));
    var v = el("dd"); v.append(el("i", null, p.venue), document.createTextNode(", " + p.volume_pages + " (" + p.year + ")"));
    row(t("stu.cite.venue"), v);
    row(t("stu.cite.authors"), el("dd", null, p.authors.join(", ")));
    var ti = el("dd", "st-cite-title", p.title); ti.lang = "en"; row(t("stu.cite.title"), ti);
    var d = el("dd"), a = el("a", "st-doi", "doi:" + p.doi);
    a.href = doiUrl(p); a.target = "_blank"; a.rel = "noopener";
    d.appendChild(a); row(t("stu.cite.doi"), d);
    var open = el("a", "st-open", t("stu.cite.open") + " ↗");
    open.href = doiUrl(p); open.target = "_blank"; open.rel = "noopener";
    box.append(q, el("div", "st-cite-box"));
    box.lastChild.append(dl, open);
    return box;
  }

  function results(P) {
    var items = [];
    for (var n = 1; n < 100; n++) { if (!has(P + ".r." + n + ".label")) break; items.push(P + ".r." + n); }
    if (!items.length) return [];
    var bar = el("div", "st-res-bar");
    var openAll = el("button", "st-btn", t("stu.res.open")), closeAll = el("button", "st-btn", t("stu.res.close"));
    openAll.type = closeAll.type = "button";
    bar.append(openAll, closeAll);
    var wrap = el("div", "st-results");
    items.forEach(function (k) {
      var d = el("details", "st-res"), s = el("summary");
      s.appendChild(el("span", "st-res-label", t(k + ".label")));
      if (has(k + ".name")) s.appendChild(el("span", "st-res-name", t(k + ".name")));
      if (has(k + ".page")) s.appendChild(el("span", "st-res-page", pageRef(t(k + ".page"))));
      d.appendChild(s);
      var body = el("div", "body");
      body.appendChild(el("p", "st-sub", t("stu.res.statement")));
      body.appendChild(html("p", "st-p st-statement", t(k + ".st")));
      if (has(k + ".tex")) body.appendChild(formula(k));
      if (has(k + ".mean")) { body.appendChild(el("p", "st-sub", t("stu.res.meaning"))); body.appendChild(html("p", "st-p", t(k + ".mean"))); }
      if (has(k + ".proof")) { body.appendChild(el("p", "st-sub", t("stu.res.proof"))); body.appendChild(html("p", "st-p", t(k + ".proof"))); }
      d.appendChild(body);
      // a closed <details> has no width, so fit its formulas once it opens
      d.addEventListener("toggle", function () {
        if (d.open && window.TeX) d.querySelectorAll(".formula.tex-on").forEach(TeX.fit);
      });
      wrap.appendChild(d);
    });
    openAll.addEventListener("click", function () { wrap.querySelectorAll("details").forEach(function (d) { d.open = true; }); });
    closeAll.addEventListener("click", function () { wrap.querySelectorAll("details").forEach(function (d) { d.open = false; }); });
    return [bar, wrap];
  }

  function chips(P) {
    var keys = seq(P + ".methods");
    if (!keys.length) return null;
    var ul = el("ul", "st-chips");
    keys.forEach(function (k) { ul.appendChild(el("li", null, t(k))); });
    return ul;
  }

  function stats(prefix) {
    var box = null;
    for (var n = 1; n < 30; n++) {
      var k = prefix + "." + n;
      if (!has(k + ".v")) break;
      if (!box) box = el("div", "st-stats");
      var s = el("div", "st-stat");
      s.append(html("b", null, t(k + ".v")), html("span", null, t(k + ".l")));
      box.appendChild(s);
    }
    return box;
  }

  function connections(P, current) {
    var out = flow(P + ".conn"), ul = null;
    papers.forEach(function (p) {
      var k = P + ".conn.to." + p.slug;
      if (p.slug === current || !has(k)) return;
      if (!ul) ul = el("ul", "st-links");
      var li = el("li"), card = paperNode(p, "st-link line-" + p.line);
      var top = el("span", "st-link-top");
      top.append(el("span", "st-link-date", fmtDate(p, true)), badge(p.line));
      card.append(top, el("span", "st-link-title", shortTitle(p)), html("span", "st-link-why", t(k)));
      if (!p.ready) card.appendChild(el("span", "st-soon", t("stu.soon")));
      li.appendChild(card); ul.appendChild(li);
    });
    if (ul) { out.push(el("p", "st-sub", t("stu.conn.others"))); out.push(ul); }
    return out;
  }

  function terms(P) {
    var dl = null;
    for (var n = 1; n < 100; n++) {
      var k = P + ".g." + n;
      if (!has(k + ".term")) break;
      if (!dl) dl = el("dl", "st-terms");
      var w = el("div");
      w.append(html("dt", null, t(k + ".term")), html("dd", null, t(k + ".def")));
      dl.appendChild(w);
    }
    return dl;
  }

  function prevNext(current) {
    var i = indexOf(current), nav = el("nav", "st-pn");
    nav.setAttribute("aria-label", t("stu.nav.aria"));
    function card(p, dir) {
      if (!p) return el("p", "st-pn-none", t(dir === "prev" ? "stu.nav.first" : "stu.nav.last"));
      var c = paperNode(p, "st-pn-card st-pn-" + dir + " line-" + p.line);
      c.append(el("span", "st-pn-dir", (dir === "prev" ? "← " : "") + t("stu.nav." + dir) + (dir === "next" ? " →" : "")),
        el("span", "st-pn-title", shortTitle(p)), el("span", "st-pn-meta", fmtDate(p, true) + " · " + p.venue_short));
      if (!p.ready) c.appendChild(el("span", "st-soon", t("stu.soon")));
      return c;
    }
    nav.append(card(papers[i - 1], "prev"), card(papers[i + 1], "next"));
    var hub = el("a", "st-hub", t("stu.nav.hub")); hub.href = "index.html"; hub.setAttribute("data-keep-lang", "");
    nav.appendChild(hub);
    return nav;
  }

  // ---- the paper page ----
  function renderPaper(root) {
    var slug = root.getAttribute("data-study-paper"), P = root.getAttribute("data-study-prefix"), p = bySlug(slug);
    if (!p) return;
    var tryNode = document.getElementById("study-try");
    if (tryNode && tryNode.parentNode) tryNode.parentNode.removeChild(tryNode);
    root.textContent = "";
    var idx = indexOf(slug);

    root.appendChild(strip(slug));
    var head = el("header", "masthead st-mast");
    head.append(html("p", "eyebrow", t("stu.eyebrow.paper", { n: idx + 1, total: papers.length })), el("h1", null, t(P + ".title")));
    if (has(P + ".lede")) head.appendChild(html("p", "lede", t(P + ".lede")));
    root.appendChild(head);

    var secs = [];
    secs.push(section("glance", t("stu.h.glance"), [glance(p, P)]));
    secs.push(section("setting", t("stu.h.setting"), flow(P + ".setting")));
    secs.push(section("model", t("stu.h.model"), flow(P + ".model")));
    secs.push(section("results", t("stu.h.results"), results(P)));
    secs.push(section("methods", t("stu.h.methods"), [chips(P)]));
    secs.push(section("alloc", has(P + ".alloc.head") ? t(P + ".alloc.head") : t("stu.h.alloc"), flow(P + ".alloc")));
    secs.push(section("num", t("stu.h.num"), flow(P + ".num").concat([stats(P + ".num.stat")])));
    secs.push(section("ins", t("stu.h.ins"), [list(P + ".ins")]));
    secs.push(section("lim", t("stu.h.lim"), [list(P + ".lim")]));
    secs.push(section("conn", t("stu.h.conn"), connections(P, slug)));
    secs.push(section("pre", t("stu.h.pre"), [list(P + ".pre")]));
    secs.push(section("terms", t("stu.h.terms"), [terms(P)]));
    var qs = list(P + ".q", "ol", "st-qs");
    secs.push(section("q", t("stu.h.q"), qs ? [el("p", "st-p st-muted", t("stu.q.intro")), qs] : []));
    if (tryNode) {
      tryNode.hidden = false;
      var tn = [];
      if (has(P + ".try.intro")) tn.push(html("p", "st-p", t(P + ".try.intro")));
      tn.push(tryNode);
      if (has(P + ".try.note")) tn.push(html("p", "note st-try-note", t(P + ".try.note")));
      secs.push(section("try", t("stu.h.try"), tn, "st-try"));
    }
    secs = secs.filter(Boolean);

    // "On this page": one chip per section, numbered like the headings
    var toc = el("nav", "st-toc"); toc.setAttribute("aria-label", t("stu.toc"));
    toc.appendChild(el("p", "st-toc-head", t("stu.toc")));
    var tl = el("ol");
    secs.forEach(function (s, i) {
      var num = (i + 1 < 10 ? "0" : "") + (i + 1);
      s.querySelector(".st-h").insertBefore(el("span", "st-h-num", num), s.querySelector(".st-h-text"));
      var a = el("a", null); a.href = "#" + s.id;
      a.append(el("span", "st-toc-num", num), el("span", null, s.querySelector(".st-h-text").textContent));
      var li = el("li"); li.appendChild(a); tl.appendChild(li);
    });
    toc.appendChild(tl);
    root.appendChild(toc);
    secs.forEach(function (s) { root.appendChild(s); });

    root.appendChild(prevNext(slug));
    if (has(P + ".note")) root.appendChild(html("p", "note", t(P + ".note")));
    root.appendChild(el("p", "note", t("stu.note")));
    keepLang(root);
  }

  var root = document.querySelector("[data-study-paper]"), first = true;
  if (root) I18N.onChange(function () {
    renderPaper(root);
    // the sections did not exist when the browser looked for the #hash, so jump there after the first render
    if (first && location.hash) {
      first = false;
      var target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(function () { target.scrollIntoView(); });
    }
    first = false;
  });

  window.Study = {
    papers: papers, bySlug: bySlug, indexOf: indexOf, fmtDate: fmtDate, dateLine: dateLine,
    shortTitle: shortTitle, summary: summary, lineName: lineName, badge: badge, keepLang: keepLang, strip: strip,
    lines: ["cooperative", "security", "stochastic"]
  };
})();
