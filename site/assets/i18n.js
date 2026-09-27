/*
 * Tiny i18n runtime shared by every page of the site.
 *
 * Adding a language:
 *   1. Copy locales/en.js to locales/<code>.js and translate the values (keep the keys).
 *   2. Add one entry to LANGS below.
 * Nothing else changes: pages, catalog and switcher read from this list.
 *
 * Markup hooks:
 *   data-i18n="key"             sets textContent
 *   data-i18n-html="key"        sets innerHTML (only for strings we write ourselves)
 *   data-i18n-attr="attr:key;…" sets attributes (aria-label, title, placeholder…)
 *   data-keep-lang              on internal <a>, appends ?lang=<code> so the choice travels
 *
 * Page bundles: a page can keep its own strings in separate files instead of the shared locale.
 * Declare them on <html data-i18n-bundles="research/wildfire"> and create
 * locales/research/wildfire.<code>.js, each calling I18N.register("<code>", {...}, "research/wildfire").
 * Missing bundle files simply fall back to English.
 */
(function () {
  "use strict";

  var LANGS = [
    { code: "en", name: "English", locale: "en-US" },
    { code: "es", name: "Español", locale: "es-CO" },
    { code: "pt", name: "Português", locale: "pt-BR" },
    { code: "fr", name: "Français", locale: "fr-FR" }
  ];
  var DEFAULT = "en";
  var STORE_KEY = "oia-lang";

  var script = document.currentScript;
  var localesBase = new URL("../locales/", script ? script.src : location.href).href;

  var dicts = {};
  var registered = {}; // "<code>|<bundle>" -> true, so files are fetched once
  var listeners = [];
  var current = DEFAULT;
  var started = false;

  function known(code) {
    return LANGS.some(function (l) { return l.code === code; });
  }
  function meta(code) {
    return LANGS.filter(function (l) { return l.code === code; })[0] || LANGS[0];
  }

  function initialLang() {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get("lang"); } catch (e) { /* old browser */ }
    if (fromUrl && known(fromUrl)) return fromUrl;
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && known(saved)) return saved;
    } catch (e) { /* storage blocked: fall back to default */ }
    return DEFAULT;
  }

  function bundles() {
    var b = document.documentElement.getAttribute("data-i18n-bundles");
    return b ? b.split(/\s+/).filter(Boolean) : [];
  }

  function loadFile(code, bundle, cb) {
    if (registered[code + "|" + bundle]) { cb(); return; }
    var s = document.createElement("script");
    s.src = localesBase + (bundle ? bundle + "." + code : code) + ".js";
    s.charset = "utf-8";
    s.onload = s.onerror = function () { cb(); }; // a missing file falls back to English
    document.head.appendChild(s);
  }

  function load(code, cb) {
    var files = [""].concat(bundles());
    var pending = files.length;
    files.forEach(function (b) { loadFile(code, b, function () { if (--pending === 0) cb(); }); });
  }

  function lookup(code, key) {
    var d = dicts[code];
    return d && Object.prototype.hasOwnProperty.call(d, key) ? d[key] : undefined;
  }

  function t(key, vars) {
    var s = lookup(current, key);
    if (s === undefined) s = lookup(DEFAULT, key);
    if (s === undefined) return key;
    if (vars) {
      s = String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return Object.prototype.hasOwnProperty.call(vars, k) ? vars[k] : m;
      });
    }
    return s;
  }

  function withLang(href) {
    try {
      var u = new URL(href, location.href);
      if (u.origin !== location.origin) return href;
      u.searchParams.set("lang", current);
      return u.href;
    } catch (e) { return href; }
  }

  function apply(root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    root.querySelectorAll("a[data-keep-lang]").forEach(function (a) {
      if (!a.dataset.baseHref) a.dataset.baseHref = a.getAttribute("href");
      a.setAttribute("href", withLang(a.dataset.baseHref));
    });
    document.documentElement.lang = current;
    var titleKey = document.documentElement.getAttribute("data-title-key");
    if (titleKey) document.title = t(titleKey);
    document.querySelectorAll("select.lang-select").forEach(function (sel) { sel.value = current; });
  }

  function emit() {
    apply(document);
    listeners.forEach(function (fn) { try { fn(current); } catch (e) { console.error(e); } });
    document.documentElement.classList.remove("i18n-loading");
  }

  function set(code) {
    if (!known(code)) code = DEFAULT;
    load(code, function () {
      current = dicts[code] ? code : DEFAULT;
      try { localStorage.setItem(STORE_KEY, current); } catch (e) { /* ok */ }
      try {
        var u = new URL(location.href);
        if (u.searchParams.has("lang")) {
          u.searchParams.set("lang", current);
          history.replaceState(null, "", u.pathname + u.search + u.hash);
        }
      } catch (e) { /* ok */ }
      emit();
    });
  }

  function mountSwitcher(host) {
    if (!host) return;
    var id = "lang-select-" + Math.random().toString(36).slice(2, 7);
    var label = document.createElement("label");
    label.className = "lang-label";
    label.htmlFor = id;
    label.setAttribute("data-i18n", "ui.language");
    label.textContent = t("ui.language");
    var sel = document.createElement("select");
    sel.className = "lang-select";
    sel.id = id;
    LANGS.forEach(function (l) {
      var o = document.createElement("option");
      o.value = l.code;
      o.textContent = l.name;
      o.lang = l.code;
      sel.appendChild(o);
    });
    sel.value = current;
    sel.addEventListener("change", function () { set(sel.value); });
    host.append(label, sel);
  }

  function start() {
    if (started) return;
    started = true;
    document.querySelectorAll("[data-lang-switcher]").forEach(mountSwitcher);
    var first = initialLang();
    load(DEFAULT, function () {
      if (first === DEFAULT) { current = DEFAULT; emit(); }
      else set(first);
    });
  }

  window.I18N = {
    languages: LANGS,
    register: function (code, dict, bundle) {
      dicts[code] = Object.assign(dicts[code] || {}, dict);
      registered[code + "|" + (bundle || "")] = true;
    },
    t: t,
    set: set,
    apply: apply,
    get lang() { return current; },
    get locale() { return meta(current).locale; },
    fmt: function (v, maxDigits, minDigits) {
      return (+v).toLocaleString(meta(current).locale, {
        minimumFractionDigits: minDigits == null ? 0 : minDigits,
        maximumFractionDigits: maxDigits == null ? 1 : maxDigits
      });
    },
    /* fn runs once the first language is ready and again after every switch */
    onChange: function (fn) { listeners.push(fn); if (started && dicts[current]) fn(current); },
    href: withLang
  };

  // Never leave the page hidden if a locale file is slow or missing
  document.documentElement.classList.add("i18n-loading");
  setTimeout(function () { document.documentElement.classList.remove("i18n-loading"); }, 1500);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
