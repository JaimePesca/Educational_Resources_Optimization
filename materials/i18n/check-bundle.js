// Checks a Dutch bundle against its English reference, then the pages that use it.
// Usage (from the scratchpad directory):
//   node nl/check-bundle.js <bundle> <outDir> <page> [<page> ...]
//   <bundle>: path under site/locales without the language, e.g. resources/edu-diet, or "" for the shared en.js/nl.js
//   <page>:   path under site/, e.g. resources/cheapest-feed.html
// Static checks: missing or extra keys, {placeholders}, HTML tags, TeX braces, em/en dashes, "MIT",
// values left identical to English (listed for a human decision, not always wrong).
// Browser checks (?lang=nl, 1200/700/400 px, light/dark): page errors, raw keys, horizontal scroll,
// MathJax errors, <html lang>, and screenshots (1200 light and 400 dark, full page) in <outDir>.
// Exit code 1 when a hard check fails.
const fs = require('fs');
const path = require('path');
const SITE = '/home/user/repo/site';
const SCR = '/tmp/claude-0/-home-user-repo/c29c830a-c0ee-54bb-9a58-8c9f26c80fec/scratchpad';
const [bundle, outDir, ...pages] = process.argv.slice(2);
if (bundle === undefined || !outDir) { console.log('usage: node nl/check-bundle.js <bundle|""> <outDir> <page>...'); process.exit(2); }
fs.mkdirSync(outDir, { recursive: true });

function loadDict(lang) {
  const file = path.join(SITE, 'locales', bundle ? `${bundle}.${lang}.js` : `${lang}.js`);
  if (!fs.existsSync(file)) return null;
  const d = {};
  new Function('I18N', fs.readFileSync(file, 'utf8'))({ register: (code, o) => { if (code !== lang) throw new Error(`${file} registers "${code}", expected "${lang}"`); Object.assign(d, o); } });
  return d;
}
const en = loadDict('en'), nl = loadDict('nl');
let hard = 0;
const say = (ok, msg) => { if (!ok) hard++; console.log((ok ? 'ok   ' : 'FAIL ') + msg); };
if (!en) { console.log('no English bundle'); process.exit(2); }
if (!nl) { say(false, 'no Dutch bundle'); process.exit(1); }

const missing = Object.keys(en).filter(k => !(k in nl));
const extra = Object.keys(nl).filter(k => !(k in en));
say(!missing.length, `keys: ${Object.keys(en).length} in en, missing in nl: ${missing.length}${missing.length ? ' ' + missing.slice(0, 15).join(', ') : ''}`);
say(!extra.length, `extra keys in nl: ${extra.length}${extra.length ? ' ' + extra.slice(0, 15).join(', ') : ''}`);

// A TeX word group such as \text{accept} is not a placeholder (I18N.t leaves unknown {names} untouched), so it is skipped;
// a placeholder inside \text{...} is still compared because a group that holds braces is not skipped.
const ph = s => (String(s).replace(/\\(?:text|textrm|textbf|textit|mathrm|operatorname|mbox)\s*\{[^{}]*\}/g, '').match(/\{\w+\}/g) || []).sort().join(' ');
const tags = s => (String(s).match(/<\/?[a-zA-Z][a-zA-Z0-9]*/g) || []).map(t => t.toLowerCase()).sort().join(' ');
const attrs = s => (String(s).match(/\b(href|data-[a-z-]+|class)="[^"]*"/g) || []).sort().join(' ');
const braces = s => { let n = 0; for (const c of String(s).replace(/\\[{}]/g, '')) { if (c === '{') n++; if (c === '}') { n--; if (n < 0) return false; } } return n === 0; };
const bad = { ph: [], tags: [], attrs: [], tex: [], dash: [], mit: [], same: [] };
for (const k of Object.keys(en)) {
  if (!(k in nl)) continue;
  const e = en[k], n = nl[k];
  if (ph(e) !== ph(n)) bad.ph.push(k);
  if (tags(e) !== tags(n)) bad.tags.push(k);
  if (attrs(e) !== attrs(n)) bad.attrs.push(k);
  if (/\.tex$|tex$/i.test(k) && !braces(n)) bad.tex.push(k);
  if (/[–—]/.test(String(n))) bad.dash.push(k);
  if (/\bMIT\b/.test(String(n))) bad.mit.push(k);
  if (typeof e === 'string' && e === n && (e.match(/[A-Za-z]{3,}/g) || []).length >= 3) bad.same.push(k);
}
say(!bad.ph.length, `placeholders differ: ${bad.ph.length} ${bad.ph.slice(0, 10).join(', ')}`);
say(!bad.tags.length, `HTML tags differ: ${bad.tags.length} ${bad.tags.slice(0, 10).join(', ')}`);
say(!bad.attrs.length, `link or data attributes differ: ${bad.attrs.length} ${bad.attrs.slice(0, 10).join(', ')}`);
say(!bad.tex.length, `TeX braces unbalanced: ${bad.tex.length} ${bad.tex.slice(0, 10).join(', ')}`);
say(!bad.dash.length, `em/en dashes: ${bad.dash.length} ${bad.dash.slice(0, 10).join(', ')}`);
say(!bad.mit.length, `"MIT": ${bad.mit.length} ${bad.mit.slice(0, 10).join(', ')}`);
console.log(`note identical to English (3+ words, check they are names or code): ${bad.same.length} ${bad.same.slice(0, 20).join(', ')}`);

(async () => {
  if (!pages.length) { console.log(hard ? `\n${hard} hard check(s) failed` : '\nall hard checks passed'); process.exit(hard ? 1 : 0); }
  const { chromium } = require(path.join(SCR, 'node_modules', 'playwright'));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const scheme of ['light', 'dark']) for (const w of [1200, 700, 400]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme });
    await ctx.route(/cdnjs\.cloudflare\.com\/ajax\/libs\/mathjax\/[^/]+\/es5\/(.*)/, r => r.fulfill({ path: path.join(SCR, 'node_modules/mathjax/es5/', r.request().url().split('/es5/')[1].split('?')[0]), contentType: 'application/javascript' }));
    await ctx.route(/cdn\.jsdelivr\.net\/npm\/plotly\.js-dist-min@[^/]+\/plotly\.min\.js/, r => r.fulfill({ path: path.join(SCR, 'node_modules/plotly.js-dist-min/plotly.min.js'), contentType: 'application/javascript' }));
    await ctx.route(/googletagmanager|google-analytics|fonts\.googleapis|fonts\.gstatic/, r => r.fulfill({ body: '', contentType: 'text/plain' }));
    for (const pg of pages) {
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', e => errs.push(e.message));
      const resp = await p.goto(`http://localhost:8765/${pg}?lang=nl`);
      await p.waitForTimeout(1500);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); });
      await p.waitForTimeout(1200);
      const r = await p.evaluate(() => {
        const leaf = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && !e.closest('script,style,mjx-container,svg'));
        const raw = leaf.map(e => e.textContent.trim()).filter(t => /^[a-z][a-z0-9-]{1,14}(\.[A-Za-z0-9_\-]+){1,6}$/.test(t)).slice(0, 6);
        const wide = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('[style*="overflow"], .table-wrap, pre'); }).slice(0, 3).map(e => e.tagName + '.' + (e.className && e.className.baseVal === undefined ? e.className : '') + ' ' + (e.textContent || '').trim().slice(0, 30));
        return { raw, lang: document.documentElement.lang, hs: document.documentElement.scrollWidth > innerWidth + 1, merr: document.querySelectorAll('mjx-merror').length, dash: /[–—]/.test(document.body.innerText), wide };
      });
      const tag = `${scheme} ${w} ${pg}`;
      const okAll = resp && resp.status() === 200 && !r.raw.length && r.lang === 'nl' && !r.hs && !r.merr && !r.dash && !errs.length;
      say(okAll, `${tag}${okAll ? '' : ' ' + JSON.stringify({ status: resp && resp.status(), raw: r.raw, lang: r.lang, hscroll: r.hs, wide: r.hs ? r.wide : undefined, mathErrors: r.merr, dash: r.dash, errors: errs.slice(0, 3) })}`);
      if ((w === 1200 && scheme === 'light') || (w === 400 && scheme === 'dark')) {
        await p.screenshot({ path: path.join(outDir, `${pg.replace(/[\/.]/g, '_')}-nl-${w}-${scheme}.png`), fullPage: true });
      }
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
  console.log(hard ? `\n${hard} hard check(s) failed` : '\nall hard checks passed');
  process.exit(hard ? 1 : 0);
})();
