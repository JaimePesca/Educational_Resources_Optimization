/*
 * Site chrome shared by every page: the author and copyright footer, and the "Browse" menu in the top bar.
 * Load right after i18n.js. The footer is appended at the end of <body> and follows the language.
 */
(function () {
  "use strict";
  var AUTHOR = "Jaime Pesca";
  var SITE = "https://jaimepesca.com";
  var me = document.currentScript;
  var ABOUT = new URL("../about.html", me ? me.src : location.href).href; // about.html at the site root

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="site-footer-in">' +
    '<p class="site-author"><span class="sf-by"></span> ' +
    '<a href="' + SITE + '" target="_blank" rel="noopener author">' + AUTHOR + '</a>' +
    '<span class="sf-sep" aria-hidden="true"> · </span>' +
    '<a class="sf-domain" href="' + SITE + '" target="_blank" rel="noopener">jaimepesca.com ↗</a>' +
    '<span class="sf-sep" aria-hidden="true"> · </span>' +
    '<a class="sf-about" href="' + ABOUT + '" data-keep-lang></a></p>' +
    '<p class="site-copy">© <span class="sf-year"></span> ' + AUTHOR + '. <span class="sf-rights"></span></p>' +
    "</div>";

  // "Further reading" line of a learning resource, the same citation on every page:
  //   <p class="note further" data-further="2.6" data-refs="kkt.refs"></p>
  // data-further is the section of Petropoulos, Laporte et al. (2024); data-refs (optional) is a key with
  // the classic references of that resource.
  function renderFurther() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-further]"), function (p) {
      var refs = p.getAttribute("data-refs");
      p.innerHTML = "<b>" + I18N.t("ref.further") + ".</b> " +
        I18N.t("ref.orma", { sec: I18N.t("ref.section", { n: p.getAttribute("data-further") }) }) +
        (refs ? " " + I18N.t(refs) : "");
    });
  }

  function render() {
    footer.querySelector(".sf-by").textContent = I18N.t("footer.by");
    footer.querySelector(".sf-rights").textContent = I18N.t("footer.rights");
    var about = footer.querySelector(".sf-about");
    about.textContent = I18N.t("footer.about");
    if (!about.dataset.baseHref) about.dataset.baseHref = ABOUT;
    about.setAttribute("href", I18N.href(about.dataset.baseHref));
    footer.querySelector(".sf-year").textContent = String(new Date().getFullYear());
    renderFurther();
  }

  function mount() {
    if (!document.body.contains(footer)) document.body.appendChild(footer);
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
  I18N.onChange(render);
})();

/*
 * "Browse" menu in the top bar, next to the language selector: the published learning resources
 * grouped by level and by type (tabs). Built from window.CATALOG (loaded on demand when the page does
 * not include assets/catalog.js). Never shown on the hidden lab pages (lab/). Strings: nav.menu,
 * nav.menuLabel, nav.byLevel, nav.byType, nav.close plus the catalog keys.
 */
(function () {
  "use strict";
  var script = document.currentScript;
  var ROOT = new URL("../", script ? script.src : location.href).href; // the site root
  var VERSION = script && script.src ? new URL(script.src).searchParams.get("v") : null;
  var TYPES = ["simulation", "game", "animation", "example"];
  var PHONE = window.matchMedia ? window.matchMedia("(max-width: 640px)") : null;
  var uid = Math.random().toString(36).slice(2, 7);

  var host, btn, panel, body, tabs = {}, view = "level", openGroups = null, catalogRequested = false;

  function t(k, v) { return I18N.t(k, v); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function norm(path) { return path.replace(/\/index\.html$/, "/"); }
  var here = norm(location.pathname);

  function isLab() {
    return location.pathname.indexOf(new URL("lab/", ROOT).pathname) === 0;
  }

  function withCatalog(cb) {
    if (window.CATALOG) { cb(); return; }
    var src = new URL("assets/catalog.js", ROOT).href;
    var s = Array.prototype.filter.call(document.scripts, function (x) {
      return x.src && x.src.split("?")[0] === src;
    })[0];
    if (!s && !catalogRequested) {
      catalogRequested = true;
      s = document.createElement("script");
      s.src = src + (VERSION ? "?v=" + VERSION : "");
      s.charset = "utf-8";
      document.head.appendChild(s);
    }
    if (s) s.addEventListener("load", function () { if (window.CATALOG) cb(); });
  }

  function chevron() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 10 6");
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "6");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", "navmenu-chev");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", "M1 1l4 4 4-4");
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", "1.6");
    svg.appendChild(p);
    return svg;
  }

  function published() {
    return (window.CATALOG.education || []).filter(function (r) { return !!r.href; });
  }
  function levelOf(id) {
    return window.CATALOG.levels.filter(function (l) { return l.id === id; })[0];
  }

  function groups() {
    var res = published();
    if (view === "level") {
      return window.CATALOG.levels.map(function (l) {
        return {
          key: "level-" + l.id,
          kicker: t("home.level") + " " + l.n,
          title: t("level." + l.id + ".title"),
          items: res.filter(function (r) { return r.level === l.id; }),
          tag: function (r) { return t("type." + r.type); }
        };
      }).filter(function (g) { return g.items.length; });
    }
    var types = TYPES.slice();
    res.forEach(function (r) { if (types.indexOf(r.type) < 0) types.push(r.type); });
    return types.map(function (ty) {
      return {
        key: "type-" + ty,
        kicker: null,
        title: t("type." + ty),
        items: res.filter(function (r) { return r.type === ty; }),
        tag: function (r) { var l = levelOf(r.level); return l ? t("home.level") + " " + l.n : ""; }
      };
    }).filter(function (g) { return g.items.length; });
  }

  function link(r, g) {
    var a = el("a", "navmenu-link");
    var u = new URL(r.href, ROOT);
    a.href = I18N.href(u.href);
    if (norm(u.pathname) === here) a.setAttribute("aria-current", "page");
    a.append(el("span", "navmenu-title", t("resource." + r.id + ".title")), el("span", "navmenu-tag", g.tag(r)));
    return a;
  }

  function list(g) {
    var ul = el("ul", "navmenu-list");
    g.items.forEach(function (r) { var li = el("li"); li.appendChild(link(r, g)); ul.appendChild(li); });
    return ul;
  }

  function head(g, tag) {
    var h = el(tag, "navmenu-ghead");
    if (g.kicker) h.appendChild(el("span", "navmenu-kicker", g.kicker));
    h.appendChild(el("span", "navmenu-gtitle", g.title));
    h.appendChild(el("span", "navmenu-count", String(g.items.length)));
    return h;
  }

  function renderBody() {
    if (!body) return;
    body.textContent = "";
    body.setAttribute("aria-labelledby", tabs[view].id);
    if (!window.CATALOG) return;
    var compact = PHONE && PHONE.matches;
    var gs = groups();
    if (!openGroups) { // on phones, open the group that holds the current page
      openGroups = {};
      published().forEach(function (r) {
        if (norm(new URL(r.href, ROOT).pathname) === here) {
          openGroups["level-" + r.level] = true;
          openGroups["type-" + r.type] = true;
        }
      });
    }
    gs.forEach(function (g) {
      if (compact) {
        var d = el("details", "navmenu-group");
        d.open = !!openGroups[g.key];
        var s = el("summary");
        s.appendChild(head(g, "span"));
        d.append(s, list(g));
        d.addEventListener("toggle", function () { openGroups[g.key] = d.open; });
        body.appendChild(d);
      } else {
        var sec = el("section", "navmenu-group");
        sec.append(head(g, "h3"), list(g));
        body.appendChild(sec);
      }
    });
  }

  function renderLabels() {
    btn.querySelector(".navmenu-label").textContent = t("nav.menu");
    host.setAttribute("aria-label", t("nav.menuLabel"));
    tabs.level.textContent = t("nav.byLevel");
    tabs.type.textContent = t("nav.byType");
    var c = panel.querySelector(".navmenu-close");
    c.setAttribute("aria-label", t("nav.close"));
    c.title = t("nav.close");
  }

  function isOpen() { return btn.getAttribute("aria-expanded") === "true"; }
  function setOpen(on, focusBtn) {
    btn.setAttribute("aria-expanded", on ? "true" : "false");
    panel.hidden = !on;
    host.classList.toggle("is-open", on);
    if (!on && focusBtn) btn.focus();
  }

  function select(v, focus) {
    view = v;
    ["level", "type"].forEach(function (k) {
      var on = k === v;
      tabs[k].setAttribute("aria-selected", on ? "true" : "false");
      tabs[k].tabIndex = on ? 0 : -1;
    });
    renderBody();
    body.scrollTop = 0;
    if (focus) tabs[v].focus();
  }

  function build() {
    var sw = document.querySelector(".topbar [data-lang-switcher]");
    if (!sw || isLab()) return;
    host = el("nav", "navmenu");
    btn = el("button", "navmenu-btn");
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "navmenu-panel-" + uid);
    btn.append(el("span", "navmenu-label"), chevron());

    panel = el("div", "navmenu-panel");
    panel.id = "navmenu-panel-" + uid;
    panel.hidden = true;
    var bar = el("div", "navmenu-bar");
    var tl = el("div", "navmenu-tabs");
    tl.setAttribute("role", "tablist");
    ["level", "type"].forEach(function (k) {
      var b = el("button", "navmenu-tab");
      b.type = "button";
      b.id = "navmenu-tab-" + k + "-" + uid;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "navmenu-body-" + uid);
      b.addEventListener("click", function () { select(k); });
      tabs[k] = b;
      tl.appendChild(b);
    });
    tl.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
        e.preventDefault();
        select(e.key === "Home" ? "level" : e.key === "End" ? "type" : (view === "level" ? "type" : "level"), true);
      }
    });
    var close = el("button", "navmenu-close");
    close.type = "button";
    close.innerHTML = '<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>';
    close.addEventListener("click", function () { setOpen(false, true); });
    bar.append(tl, close);
    body = el("div", "navmenu-body");
    body.id = "navmenu-body-" + uid;
    body.setAttribute("role", "tabpanel");
    body.tabIndex = -1;
    panel.append(bar, body);
    host.append(btn, panel);
    sw.insertBefore(host, sw.firstChild); // first in the language box: they wrap together
    sw.classList.add("has-navmenu");

    btn.addEventListener("click", function () { setOpen(!isOpen()); });
    host.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { e.preventDefault(); setOpen(false, true); }
    });
    body.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (isOpen() && !host.contains(e.target)) setOpen(false);
    });
    host.addEventListener("focusout", function (e) {
      if (isOpen() && e.relatedTarget && !host.contains(e.relatedTarget)) setOpen(false);
    });
    if (PHONE) {
      var onMq = function () { renderBody(); };
      if (PHONE.addEventListener) PHONE.addEventListener("change", onMq); else if (PHONE.addListener) PHONE.addListener(onMq);
    }

    select("level");
    renderLabels();
    I18N.onChange(function () { renderLabels(); renderBody(); });
    withCatalog(renderBody);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();

/*
 * Accessible names for charts and animations (nothing visible changes): every <canvas> and every
 * top-level chart <svg> that has no accessible name gets role="img" and an aria-label made from texts
 * already on the page, the page title plus the nearest heading or caption above the graphic, so screen
 * readers and search engines know what each graphic is. Graphics that already have aria-label,
 * aria-labelledby or aria-hidden are left alone. Labels follow the language and graphics added later.
 */
(function () {
  "use strict";
  var HEAD = "h1,h2,h3,h4,figcaption,caption,legend,.anim-title,.chart-title,.panel-title";

  function named(el) {
    // a label is ours only while it is still the one we wrote (data-auto-label keeps a copy); a page's own wins
    var own = el.hasAttribute("aria-label") && el.getAttribute("aria-label") !== el.getAttribute("data-auto-label");
    return own || el.hasAttribute("aria-labelledby") ||
      el.closest("[aria-hidden='true']") || /^(presentation|none)$/.test(el.getAttribute("role") || "");
  }
  function isChartSvg(el) {
    if (el.id && /^MJX/.test(el.id)) return false;                     // MathJax internals
    if (el.closest("mjx-container, button, a, .js-plotly-plot")) return false;
    if (el.parentElement && el.parentElement.closest("svg")) return false;
    var r = el.getBoundingClientRect();
    return !(r.width && r.width < 40 && r.height < 40);               // small icons
  }
  function clean(s) { return (s || "").replace(/\s+/g, " ").trim(); }

  // nearest heading or caption that comes before the graphic, searching outward from its container
  function context(el) {
    for (var a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      var list = a.querySelectorAll(HEAD), best = null;
      for (var i = 0; i < list.length; i++) {
        var h = list[i];
        if (h.contains(el)) continue;
        if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) best = h; else break;
      }
      if (best) {
        // a heading made of blocks (kicker + title) reads "Kicker: Title", as written in the locale files
        var parts = best.children.length ? Array.prototype.map.call(best.childNodes, function (n) { return clean(n.textContent); }) : [clean(best.textContent)];
        var txt = parts.filter(Boolean).join(": ");
        if (txt) return txt;
      }
    }
    return "";
  }
  function label(el) {
    var title = clean(document.title), ctx = context(el);
    var s = ctx && ctx !== title ? (title ? title + ": " + ctx : ctx) : title;
    return s.length > 160 ? s.slice(0, 157) + "..." : s;
  }
  function scan() {
    var els = Array.prototype.slice.call(document.querySelectorAll("canvas"))
      .concat(Array.prototype.filter.call(document.querySelectorAll("svg"), isChartSvg));
    els.forEach(function (el) {
      if (named(el)) return;
      var s = label(el);
      if (!s) return;
      if (el.getAttribute("role") !== "img") el.setAttribute("role", "img");
      if (el.getAttribute("aria-label") !== s) el.setAttribute("aria-label", s);
      el.setAttribute("data-auto-label", s);
    });
  }

  var timer = 0;
  function later() { clearTimeout(timer); timer = setTimeout(scan, 60); }
  function hasGraphic(n) {
    return n.nodeType === 1 && (/^(canvas|svg)$/i.test(n.nodeName) || (n.querySelector && n.querySelector("canvas,svg")));
  }
  function start() {
    later();
    if ("MutationObserver" in window) {
      new MutationObserver(function (records) {
        for (var i = 0; i < records.length; i++) {
          var add = records[i].addedNodes;
          for (var j = 0; j < add.length; j++) if (hasGraphic(add[j])) { later(); return; }
        }
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
  I18N.onChange(later); // headings change language, so do the labels
})();
