/*
 * Shared behaviour for research case pages (research/<id>.html).
 * - "Read the paper" button, shown when the case has a `paper` link in assets/catalog.js.
 * - Math formulations: <script type="text/x-tex"> blocks inside .math containers are typeset with
 *   MathJax (SVG output, no stylesheet needed). \text{ST} is replaced by the localized "s.t.".
 * Load after i18n.js and catalog.js.
 */
(function () {
  "use strict";
  var t = I18N.t;
  var bundle = document.documentElement.getAttribute("data-i18n-bundles") || "";
  var id = (bundle.match(/research\/([\w-]+)/) || [])[1];
  var entry = (window.CATALOG && window.CATALOG.research || []).filter(function (r) { return r.id === id; })[0];

  // ---- paper button ----
  function renderPaper() {
    var cite = document.querySelector(".cite");
    if (!cite || !entry || !entry.paper) return;
    var a = document.getElementById("paper-link");
    if (!a) {
      a = document.createElement("a");
      a.id = "paper-link";
      a.className = "paper-link";
      a.href = entry.paper;
      a.target = "_blank";
      a.rel = "noopener";
      cite.insertAdjacentElement("afterend", a);
    }
    a.textContent = t("ui.readPaper") + " ↗";
  }

  // ---- symbols in the variable lists: Unicode like "yⱼᵢₚ" or "V̂ⱼ" becomes inline TeX ----
  var SUB = { "ᵢ": "i", "ⱼ": "j", "ₚ": "p", "ₖ": "k", "ₜ": "t", "ᵣ": "r", "ₛ": "s", "ₘ": "m", "ₙ": "n",
    "ₐ": "a", "ₑ": "e", "ₒ": "o", "ₓ": "x", "ₕ": "h", "ₗ": "l", "ᵤ": "u", "ᵥ": "v",
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
    "₊": "+", "₋": "-", "ᵦ": "\\beta", "ᵧ": "\\gamma", "ᵨ": "\\rho", "ᵩ": "\\phi" };
  function toTex(str) {
    var out = "", i = 0;
    while (i < str.length) {
      var base = "";
      while (i < str.length && !SUB[str[i]]) {
        if (str[i] === "\u0302" && base) { base = base.slice(0, -1) + "\\hat{" + base.slice(-1) + "}"; }
        else base += str[i];
        i++;
      }
      var sub = "";
      while (i < str.length && SUB[str[i]]) { sub += SUB[str[i]]; i++; }
      var m = base.match(/^(.*?)([A-Za-z]{2,})$/); // multi-letter names such as Max or nd
      if (m && sub) base = m[1] + "\\mathit{" + m[2] + "}";
      out += base + (sub ? "_{" + sub + "}" : "");
    }
    return out;
  }
  function prepareSymbols() {
    // MathJax skips <code>, so each symbol moves into a span it will typeset
    return Array.prototype.slice.call(document.querySelectorAll(".vars code")).map(function (c) {
      var span = document.createElement("span");
      span.className = "sym";
      // a symbol written directly in TeX (it has a backslash, _ or ^) is used as is
      var raw = c.textContent, tex = /[\\_^]/.test(raw) ? raw : toTex(raw);
      span.textContent = "\\(" + tex.replace(/(\d),(\d)/g, "$1{,}$2") + "\\)";
      c.replaceWith(span);
      return span;
    });
  }

  // ---- math ----
  var blocks = Array.prototype.slice.call(document.querySelectorAll(".math script[type='text/x-tex']"));
  var mathReady = false;

  function renderMath() {
    if (!mathReady || !blocks.length) return;
    var outs = blocks.map(function (s) {
      var out = s.parentNode.querySelector(".math-out");
      if (!out) {
        out = document.createElement("div");
        out.className = "math-out";
        s.parentNode.appendChild(out);
      }
      var tex = s.textContent.replace(/\\text\{ST\}/g, "\\text{" + t("ui.st") + "}");
      out.textContent = "\\[" + tex + "\\]";
      return out;
    });
    outs = outs.concat(prepareSymbols());
    if (window.MathJax.typesetClear) window.MathJax.typesetClear(outs);
    window.MathJax.typesetPromise(outs).then(fitMath).catch(function (e) { console.error(e); });
  }

  // wide formulations shrink to the width of their box on phones instead of being cut off
  function fitMath() {
    document.querySelectorAll(".math-out").forEach(function (out) {
      out.style.fontSize = "";
      var box = out.clientWidth, svg = out.querySelector("mjx-container > svg");
      if (!svg || !box) return;
      var need = svg.getBoundingClientRect().width;
      if (need > box) {
        var base = parseFloat(getComputedStyle(out).fontSize);
        out.style.fontSize = Math.max(8, Math.floor(base * box / need * 10) / 10) + "px";
      }
    });
  }
  var fitTimer;
  window.addEventListener("resize", function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitMath, 150); });

  if (blocks.length) {
    window.MathJax = {
      tex: { inlineMath: [["\\(", "\\)"]] },
      svg: { fontCache: "global" },
      startup: {
        typeset: false,
        ready: function () {
          window.MathJax.startup.defaultReady();
          mathReady = true;
          renderMath();
        }
      }
    };
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js";
    s.async = true;
    document.head.appendChild(s);
  }

  I18N.onChange(function () { renderPaper(); renderMath(); });
})();
