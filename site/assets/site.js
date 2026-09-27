/*
 * Site chrome shared by every page: the author and copyright footer.
 * Load right after i18n.js. The footer is appended at the end of <body> and follows the language.
 */
(function () {
  "use strict";
  var AUTHOR = "Jaime Pesca";
  var SITE = "https://jaimepesca.com";

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="site-footer-in">' +
    '<p class="site-author"><span class="sf-by"></span> ' +
    '<a href="' + SITE + '" target="_blank" rel="noopener author">' + AUTHOR + '</a>' +
    '<span class="sf-sep" aria-hidden="true"> · </span>' +
    '<a class="sf-domain" href="' + SITE + '" target="_blank" rel="noopener">jaimepesca.com ↗</a></p>' +
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
