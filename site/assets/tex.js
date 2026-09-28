/*
 * Typeset formulas for the learning resources with MathJax (loaded once, on demand, from cdnjs).
 *
 * Static formula: put the TeX in a locale key and point to it; the plain text key stays as the
 * fallback that shows until MathJax is ready (or if it cannot load):
 *   <div class="formula tex" data-tex="bigm.d1.tex" data-i18n="bigm.d1.formula"></div>
 *
 * Formula built in a script with live numbers:
 *   TeX.set(el, t("mset.d1.tex", { B: 44 }), t("mset.d1.formula", { ... }));   // TeX, fallback text
 *
 * TeX conventions: display math without delimiters, usually \begin{aligned} ... \end{aligned};
 * \text{ST} becomes the localized "s.t." (ui.st); a comma between two digits is a decimal comma
 * (so write sets as \{0, 1\} with a space). Wide formulas shrink to fit their box on phones, down to
 * 10 px; wider ones scroll inside their box. MathJax itself loads lazily (see schedule() at the end).
 */
(function () {
  "use strict";
  var t = function (k) { return window.I18N ? I18N.t(k) : k; };
  var ready = false, queue = [], jobs = new Map();

  function prep(tex) {
    return tex.replace(/\\text\{ST\}/g, "\\text{" + t("ui.st") + "}")
      .replace(/(\d),(\d)/g, "$1{,}$2");
  }

  function fit(el) {
    el.style.fontSize = "";
    var box = el.clientWidth - parseFloat(getComputedStyle(el).paddingLeft) - parseFloat(getComputedStyle(el).paddingRight);
    var svg = el.querySelector("mjx-container > svg");
    if (!svg || box <= 0) return;
    var need = svg.getBoundingClientRect().width;
    if (need > box) {
      var base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = Math.max(10, Math.floor(base * box / need * 10) / 10) + "px"; // below 10 px the box scrolls instead
    }
  }

  function typeset(el, tex) {
    // one job per element: a newer formula replaces the pending one (slider drags)
    jobs.set(el, tex);
    if (!ready) { if (queue.indexOf(el) < 0) queue.push(el); return; }
    var MJ = window.MathJax;
    Promise.resolve(el._texPromise).then(function () {
      if (!jobs.has(el)) return;
      var src = jobs.get(el); jobs.delete(el);
      if (MJ.typesetClear) MJ.typesetClear([el]);
      el.classList.add("tex-on");
      el.textContent = "\\[" + prep(src) + "\\]";
      el._texPromise = MJ.typesetPromise([el]).then(function () { fit(el); }).catch(function (e) { console.error(e); });
    });
  }

  function set(el, tex, fallback) {
    if (!el) return;
    if (!ready && fallback != null) el.textContent = fallback;
    typeset(el, tex);
  }

  function renderStatic() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tex]"), function (el) {
      var tex = t(el.getAttribute("data-tex"));
      if (tex && tex !== el.getAttribute("data-tex")) typeset(el, tex);
    });
  }

  function start() {
    ready = true;
    var q = queue; queue = [];
    q.forEach(function (el) { if (jobs.has(el)) { var s = jobs.get(el); jobs.delete(el); typeset(el, s); } });
  }

  function load() {
    var MJ = window.MathJax;
    if (MJ && MJ.typesetPromise) { start(); return; }
    if (MJ && MJ.startup) { // another loader on the page is already bringing MathJax
      var wait = setInterval(function () { if (window.MathJax.typesetPromise && window.MathJax.startup.document) { clearInterval(wait); start(); } }, 100);
      return;
    }
    window.MathJax = {
      tex: { inlineMath: [["\\(", "\\)"]] },
      svg: { fontCache: "global", mtextInheritFont: true }, // words in \text{} use the page font
      startup: { typeset: false, ready: function () { window.MathJax.startup.defaultReady(); start(); } }
    };
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js";
    s.async = true;
    document.head.appendChild(s);
  }

  var timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { document.querySelectorAll(".tex-on").forEach(fit); }, 150);
  });
  if (window.I18N) I18N.onChange(renderStatic);

  // MathJax is the heaviest file of a page, so it stays off the critical path: it loads when the first formula
  // comes within 300 px of the screen, or once the page has loaded and the browser is idle, whichever is first.
  // Formulas set before that wait in the queue and are typeset as soon as it is ready.
  var asked = false;
  function go() { if (!asked) { asked = true; load(); } }
  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); }
      }, { rootMargin: "300px 0px" });
      document.querySelectorAll(".formula, [data-tex]").forEach(function (el) { io.observe(el); });
    }
    var idle = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 200); })(go, { timeout: 2500 }); };
    if (document.readyState === "complete") idle(); else window.addEventListener("load", idle);
  }
  // watch positions only once the page has its texts: before that it is nearly empty and every formula looks near
  if (window.I18N) I18N.onChange(function () { requestAnimationFrame(schedule); });
  else if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule); else schedule();

  window.TeX = { set: set, render: renderStatic, fit: fit };
})();
