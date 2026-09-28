/*
 * Decorative visuals of the home page, drawn in code with the site tokens (light and dark):
 *   HomeArt.band(el)       the five-level band under the hero: one small animated scene per level
 *                          (LP, IP, MILP, NLP, other OR), a spotlight moves from one to the next;
 *                          phones show one scene at a time and pan between them
 *   HomeArt.glyph(n)       a small canvas with the final frame of scene n, replayed when it scrolls
 *                          into view or on hover of its level row
 *   HomeArt.typeIcon(type) inline SVG icon for a resource type
 *   HomeArt.banner(id)     SVG illustration at the top of a research card
 * Every scene is a pure function of its progress p in [0, 1]; p = 1 is a complete picture, which is
 * what reduced motion shows. No text on the drawings except x*, s and t.
 */
(function () {
  "use strict";
  var reduce = window.matchMedia ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var col = {};
  var painters = []; // redraw callbacks after a theme change

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    ["ink", "ink2", "muted", "axis", "grid", "accent", "accent-text", "mit-bright", "mit-silver", "region", "surface", "surface2", "bg"]
      .forEach(function (k) { col[k] = cs.getPropertyValue("--" + k).trim(); });
  }
  readColors();
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onTheme = function () { readColors(); painters.forEach(function (f) { f(); }); };
    if (mq.addEventListener) mq.addEventListener("change", onTheme); else if (mq.addListener) mq.addListener(onTheme);
  }

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(p, a, b) { return clamp((p - a) / (b - a)); }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // ---------- geometry shared by the LP and IP scenes ----------
  var POLY = [[0.12, 0.12], [0.72, 0.12], [0.88, 0.40], [0.70, 0.80], [0.30, 0.88], [0.12, 0.60]];
  var CDIR = [0.5, 0.866];
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }
  function inside(pt, poly) {
    // convex polygon listed counterclockwise
    for (var i = 0; i < poly.length; i++) {
      var a = poly[i], b = poly[(i + 1) % poly.length];
      if ((b[0] - a[0]) * (pt[1] - a[1]) - (b[1] - a[1]) * (pt[0] - a[0]) < -1e-9) return false;
    }
    return true;
  }
  var LATTICE = [], BEST = null;
  (function () {
    for (var i = 0; i < 6; i++) for (var j = 0; j < 6; j++) {
      var q = [0.12 + 0.15 * i, 0.12 + 0.15 * j], ok = inside(q, POLY);
      LATTICE.push({ q: q, ok: ok });
      if (ok && (!BEST || dot(q, CDIR) > dot(BEST, CDIR) + 1e-9)) BEST = q;
    }
  })();
  var ZBEST = dot(BEST, CDIR);
  // polygon cut by c.x <= zbest (Sutherland-Hodgman against one half-plane)
  function clipHalf(poly, keep) {
    var out = [];
    for (var i = 0; i < poly.length; i++) {
      var a = poly[i], b = poly[(i + 1) % poly.length], ka = keep(a), kb = keep(b);
      if (ka >= 0) out.push(a);
      if ((ka >= 0) !== (kb >= 0)) { var t = ka / (ka - kb); out.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t)]); }
    }
    return out;
  }
  var CUTPOLY = clipHalf(POLY, function (q) { return ZBEST - dot(q, CDIR); });
  var CORNER = clipHalf(POLY, function (q) { return dot(q, CDIR) - ZBEST; });

  // ---------- NLP: an ill-conditioned quadratic and plain gradient descent ----------
  var NM = [0.60, 0.46], NTH = 35 * Math.PI / 180, NA = 1, NB = 7;
  function nrot(v, s) { var c = Math.cos(s * NTH), si = Math.sin(s * NTH); return [c * v[0] - si * v[1], si * v[0] + c * v[1]]; }
  var GD = (function () {
    var x0 = nrot([-0.42, 0.11], 1), x = [NM[0] + x0[0], NM[1] + x0[1]], pts = [x.slice()];
    var eta = 1.6 / (2 * NB); // the stiff direction flips sign each step (factor -0.6): the zigzag
    for (var k = 0; k < 18; k++) {
      var u = nrot([x[0] - NM[0], x[1] - NM[1]], -1), g = nrot([2 * NA * u[0], 2 * NB * u[1]], 1);
      x = [x[0] - eta * g[0], x[1] - eta * g[1]];
      pts.push(x.slice());
    }
    return pts;
  })();

  // ---------- B&B tree ----------
  // state: b = branched, p = pruned, i = integer (first incumbent), x = optimal incumbent
  var TREE = [
    { q: [0.42, 0.88], s: "b" },
    { q: [0.23, 0.64], s: "b", up: 0 },
    { q: [0.12, 0.40], s: "b", up: 1 },
    { q: [0.06, 0.16], s: "p", up: 2 },
    { q: [0.19, 0.16], s: "i", up: 2 },
    { q: [0.34, 0.40], s: "p", up: 1 },
    { q: [0.61, 0.64], s: "b", up: 0 },
    { q: [0.52, 0.40], s: "b", up: 6 },
    { q: [0.45, 0.16], s: "x", up: 7 },
    { q: [0.59, 0.16], s: "p", up: 7 },
    { q: [0.72, 0.40], s: "p", up: 6 }
  ];

  // ---------- network: a max flow of 8 and its min cut {a->c, d->t, b->e} ----------
  var NODES = { s: [0.07, 0.50], a: [0.34, 0.80], b: [0.34, 0.22], c: [0.64, 0.84], d: [0.62, 0.48], e: [0.64, 0.14], t: [0.93, 0.50] };
  var ARCS = [["s", "a", 5, 5], ["s", "b", 4, 3], ["a", "c", 3, 3], ["a", "d", 2, 2], ["b", "d", 2, 1], ["b", "e", 2, 2],
    ["c", "t", 4, 3], ["d", "t", 3, 3], ["e", "t", 3, 2]];
  var CUT = { "a-c": 1, "d-t": 1, "b-e": 1 };

  // ---------- drawing helpers ----------
  function frame(ctx, box) {
    var S = Math.min(box.w, box.h) * 0.9, cx = box.x + box.w / 2, cy = box.y + box.h / 2;
    return {
      S: S, lw: Math.max(1, S / 170),
      X: function (u) { return cx + (u - 0.5) * S; },
      Y: function (v) { return cy - (v - 0.5) * S; }
    };
  }
  function pathPoly(ctx, f, pts, close) {
    ctx.beginPath();
    pts.forEach(function (q, i) { if (i) ctx.lineTo(f.X(q[0]), f.Y(q[1])); else ctx.moveTo(f.X(q[0]), f.Y(q[1])); });
    if (close) ctx.closePath();
  }
  // partial polyline: the first `frac` of its length
  function partial(pts, frac, close) {
    var P = close ? pts.concat([pts[0]]) : pts, L = [], tot = 0, i;
    for (i = 1; i < P.length; i++) { var d = Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(d); tot += d; }
    var want = tot * frac, out = [P[0]];
    for (i = 1; i < P.length; i++) {
      if (want >= L[i - 1]) { out.push(P[i]); want -= L[i - 1]; continue; }
      var t = want / L[i - 1]; out.push([lerp(P[i - 1][0], P[i][0], t), lerp(P[i - 1][1], P[i][1], t)]); break;
    }
    return out;
  }
  function disc(ctx, f, q, r, fill, stroke, lw) {
    ctx.beginPath(); ctx.arc(f.X(q[0]), f.Y(q[1]), r, 0, 2 * Math.PI);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || f.lw; ctx.stroke(); }
  }
  function star(ctx, f, q, p, big) {
    // the optimum: a filled dot, a halo, and a pulse while p < 1
    var r = f.lw * (big ? 4.2 : 3.4);
    if (p < 1) { var k = (p * 2.2) % 1; ctx.globalAlpha *= 1; disc(ctx, f, q, r + f.lw * 10 * k, null, col.accent, f.lw * (1 - k) * 1.6 + 0.01); }
    disc(ctx, f, q, r + f.lw * 3, null, col.accent, f.lw * 0.9);
    disc(ctx, f, q, r, col.accent);
  }
  function label(ctx, f, text, q, dx, dy) {
    if (f.S < 110) return;
    ctx.font = "600 " + Math.round(f.S * 0.075) + "px " + "JetBrains Mono, ui-monospace, monospace";
    ctx.fillStyle = col.ink; ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(text, f.X(q[0]) + dx * f.S, f.Y(q[1]) - dy * f.S);
  }
  function arrow(ctx, x0, y0, x1, y1, color, lw) {
    var a = Math.atan2(y1 - y0, x1 - x0), h = lw * 4.5;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * h * 0.6, y1 - Math.sin(a) * h * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - h * Math.cos(a - 0.45), y1 - h * Math.sin(a - 0.45));
    ctx.lineTo(x1 - h * Math.cos(a + 0.45), y1 - h * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
  }
  function axes(ctx, f, a) {
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = col.axis; ctx.lineWidth = f.lw;
    ctx.beginPath(); ctx.moveTo(f.X(0.04), f.Y(0.98)); ctx.lineTo(f.X(0.04), f.Y(0.04)); ctx.lineTo(f.X(0.98), f.Y(0.04)); ctx.stroke();
    ctx.restore();
  }

  // ---------- the five scenes ----------
  function sceneLP(ctx, f, p) {
    axes(ctx, f, seg(p, 0, 0.1));
    var a = seg(p, 0, 0.18);
    ctx.save(); ctx.globalAlpha *= a; pathPoly(ctx, f, POLY, true); ctx.fillStyle = col.region; ctx.fill(); ctx.restore();
    pathPoly(ctx, f, partial(POLY, ease(seg(p, 0, 0.28)), true), false);
    ctx.strokeStyle = col.ink; ctx.lineWidth = f.lw * 1.3; ctx.stroke();
    // simplex path O -> A -> B -> C
    var path = [POLY[0], POLY[1], POLY[2], POLY[3]], m = seg(p, 0.28, 0.82) * 3, i = Math.min(2, Math.floor(m)), loc = ease(m - i);
    if (m >= 3) { i = 2; loc = 1; }
    var cur = [lerp(path[i][0], path[i + 1][0], loc), lerp(path[i][1], path[i + 1][1], loc)];
    // level line of the objective through the current point
    if (p > 0.26) {
      var n = [-CDIR[1], CDIR[0]];
      ctx.save(); ctx.setLineDash([f.lw * 4, f.lw * 3]); ctx.strokeStyle = col.muted; ctx.lineWidth = f.lw;
      ctx.globalAlpha *= seg(p, 0.26, 0.34);
      ctx.beginPath(); ctx.moveTo(f.X(cur[0] - n[0] * 0.5), f.Y(cur[1] - n[1] * 0.5)); ctx.lineTo(f.X(cur[0] + n[0] * 0.5), f.Y(cur[1] + n[1] * 0.5)); ctx.stroke();
      ctx.restore();
      var trail = path.slice(0, i + 1).concat([cur]);
      pathPoly(ctx, f, trail, false); ctx.strokeStyle = col.accent; ctx.lineWidth = f.lw * 2.2; ctx.lineJoin = "round"; ctx.stroke();
      for (var k = 0; k <= i; k++) disc(ctx, f, path[k], f.lw * 2.4, col.surface, col.accent, f.lw * 1.4);
    }
    if (p >= 0.82) {
      var e = seg(p, 0.82, 0.92), C = POLY[3];
      arrow(ctx, f.X(C[0]), f.Y(C[1]), f.X(C[0] + CDIR[0] * 0.16 * e), f.Y(C[1] + CDIR[1] * 0.16 * e), col.accent, f.lw * 1.4);
      star(ctx, f, C, p, true); label(ctx, f, "x*", C, -0.2, 0.1);
    } else if (p > 0.26) disc(ctx, f, cur, f.lw * 3.4, col.accent);
  }

  function sceneIP(ctx, f, p) {
    axes(ctx, f, 1);
    var cut = seg(p, 0.34, 0.54);
    pathPoly(ctx, f, cut > 0 ? CUTPOLY : POLY, true); ctx.fillStyle = col.region; ctx.fill();
    if (cut > 0) {
      // the corner the cut removes: hatched, then faded
      ctx.save(); pathPoly(ctx, f, CORNER, true); ctx.clip();
      ctx.globalAlpha *= 0.55 * (1 - 0.5 * seg(p, 0.54, 0.7)); ctx.strokeStyle = col["mit-bright"]; ctx.lineWidth = f.lw * 0.8;
      for (var h = -1; h < 2; h += 0.03) { ctx.beginPath(); ctx.moveTo(f.X(h), f.Y(0)); ctx.lineTo(f.X(h + 1), f.Y(1)); ctx.stroke(); }
      ctx.restore();
    }
    pathPoly(ctx, f, POLY, true); ctx.strokeStyle = col.ink; ctx.lineWidth = f.lw * 1.3; ctx.stroke();
    LATTICE.forEach(function (L, k) {
      var a = seg(p, 0.02 + k * 0.006, 0.12 + k * 0.006);
      if (!a) return;
      ctx.save(); ctx.globalAlpha *= a;
      disc(ctx, f, L.q, f.lw * (L.ok ? 2.3 : 1.5), L.ok ? col.ink2 : col.axis);
      ctx.restore();
    });
    // LP optimum (fractional corner): a hollow ring
    disc(ctx, f, POLY[3], f.lw * 3.4, col.surface, col.accent, f.lw * 1.4);
    if (cut > 0) {
      // the cut c.x <= z*: the chord where it crosses the polygon, extended a little on both sides
      var ends = CORNER.filter(function (q) { return Math.abs(dot(q, CDIR) - ZBEST) < 1e-9; });
      if (ends.length >= 2) {
        var u0 = ends[0], u1 = ends[ends.length - 1], dx = u1[0] - u0[0], dy = u1[1] - u0[1], dl = Math.hypot(dx, dy) || 1, ex = 0.1 / dl;
        var e0 = [u0[0] - dx * ex, u0[1] - dy * ex], e1 = [u1[0] + dx * ex, u1[1] + dy * ex], g = ease(cut);
        var m0 = [(e0[0] + e1[0]) / 2, (e0[1] + e1[1]) / 2];
        ctx.save(); ctx.setLineDash([f.lw * 4, f.lw * 3]); ctx.strokeStyle = col["mit-bright"]; ctx.lineWidth = f.lw * 1.6;
        ctx.beginPath(); ctx.moveTo(f.X(lerp(m0[0], e0[0], g)), f.Y(lerp(m0[1], e0[1], g))); ctx.lineTo(f.X(lerp(m0[0], e1[0], g)), f.Y(lerp(m0[1], e1[1], g))); ctx.stroke(); ctx.restore();
      }
    }
    var mv = ease(seg(p, 0.58, 0.84));
    if (mv > 0) {
      var from = POLY[3], cur = [lerp(from[0], BEST[0], mv), lerp(from[1], BEST[1], mv)];
      ctx.strokeStyle = col.accent; ctx.lineWidth = f.lw * 2.2;
      ctx.beginPath(); ctx.moveTo(f.X(from[0]), f.Y(from[1])); ctx.lineTo(f.X(cur[0]), f.Y(cur[1])); ctx.stroke();
      if (mv < 1) disc(ctx, f, cur, f.lw * 3.4, col.accent);
      else { star(ctx, f, BEST, p, true); label(ctx, f, "x*", BEST, -0.2, 0.07); }
    }
  }

  function sceneMILP(ctx, f, p) {
    var box = f.S * 0.08, gapX = 0.9;
    TREE.forEach(function (nd, k) { // edges first, so no line crosses a node
      var t0 = 0.03 + k * 0.068;
      if (nd.up == null || p < t0 - 0.04) return;
      var P = TREE[nd.up].q, e = ease(seg(p, t0 - 0.04, t0 + 0.02));
      ctx.strokeStyle = col.axis; ctx.lineWidth = f.lw * 1.2;
      ctx.beginPath(); ctx.moveTo(f.X(P[0]), f.Y(P[1])); ctx.lineTo(f.X(lerp(P[0], nd.q[0], e)), f.Y(lerp(P[1], nd.q[1], e))); ctx.stroke();
    });
    TREE.forEach(function (nd, k) {
      var t0 = 0.03 + k * 0.068, a = seg(p, t0, t0 + 0.06);
      if (!a) return;
      var x = f.X(nd.q[0]), y = f.Y(nd.q[1]), r = box / 2 * (0.6 + 0.4 * ease(a));
      ctx.save(); ctx.globalAlpha *= a;
      var fill = nd.s === "x" ? col.accent : nd.s === "i" ? col.ink2 : nd.s === "p" ? col.surface2 : col.surface;
      var stroke = nd.s === "p" ? col.axis : nd.s === "x" ? col.accent : col.ink;
      ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = f.lw * 1.3;
      ctx.beginPath(); ctx.rect(x - r, y - r, 2 * r, 2 * r); ctx.fill(); ctx.stroke();
      if (nd.s === "p") {
        ctx.strokeStyle = col.muted; ctx.lineWidth = f.lw;
        ctx.beginPath(); ctx.moveTo(x - r * 0.5, y - r * 0.5); ctx.lineTo(x + r * 0.5, y + r * 0.5);
        ctx.moveTo(x + r * 0.5, y - r * 0.5); ctx.lineTo(x - r * 0.5, y + r * 0.5); ctx.stroke();
      }
      // the node being explored right now
      var live = p < 1 && p >= t0 && p < t0 + 0.068;
      if (live) { ctx.strokeStyle = col["mit-bright"]; ctx.lineWidth = f.lw * 1.4; ctx.strokeRect(x - r - f.lw * 2.5, y - r - f.lw * 2.5, 2 * r + f.lw * 5, 2 * r + f.lw * 5); }
      if (nd.s === "x" && p >= 0.95) {
        ctx.strokeStyle = col.accent; ctx.lineWidth = f.lw; ctx.strokeRect(x - r - f.lw * 3, y - r - f.lw * 3, 2 * r + f.lw * 6, 2 * r + f.lw * 6);
      }
      ctx.restore();
    });
    // gap gauge: the bound falls, the incumbent rises, they meet
    var top = 0.9, bot = 0.12, meet = 0.5;
    var tInc1 = 0.03 + 4 * 0.068, tInc2 = 0.03 + 8 * 0.068;
    var bound = lerp(top, meet, ease(seg(p, 0.05, 0.84)));
    var inc = p < tInc1 ? null : p < tInc2 ? lerp(bot + 0.1, 0.36, ease(seg(p, tInc1, tInc1 + 0.06))) : lerp(0.36, meet, ease(seg(p, tInc2, tInc2 + 0.1)));
    ctx.strokeStyle = col.axis; ctx.lineWidth = f.lw;
    ctx.beginPath(); ctx.moveTo(f.X(gapX), f.Y(top + 0.04)); ctx.lineTo(f.X(gapX), f.Y(bot)); ctx.stroke();
    if (inc != null) {
      ctx.save(); ctx.globalAlpha *= 0.28; ctx.fillStyle = col["mit-bright"];
      ctx.fillRect(f.X(gapX) - f.lw * 3, f.Y(bound), f.lw * 6, f.Y(inc) - f.Y(bound)); ctx.restore();
    }
    ctx.fillStyle = col.ink; ctx.fillRect(f.X(gapX) - f.lw * 5, f.Y(bound) - f.lw, f.lw * 10, f.lw * 2);
    if (inc != null) { ctx.fillStyle = col.accent; ctx.fillRect(f.X(gapX) - f.lw * 5, f.Y(inc) - f.lw, f.lw * 10, f.lw * 2); }
    if (p >= 0.95) disc(ctx, f, [gapX, meet], f.lw * 2.8, col.accent);
  }

  function sceneNLP(ctx, f, p) {
    ctx.save();
    for (var k = 6; k >= 1; k--) {
      var r = 0.075 * k, a = seg(p, 0.02 + (6 - k) * 0.04, 0.2 + (6 - k) * 0.04);
      if (!a) continue;
      ctx.beginPath();
      var steps = 72, lim = Math.ceil(steps * ease(a));
      for (var s = 0; s <= lim; s++) {
        var th = s / steps * 2 * Math.PI, v = nrot([r / Math.sqrt(NA) * Math.cos(th), r / Math.sqrt(NB) * Math.sin(th)], 1);
        var X = f.X(NM[0] + v[0]), Y = f.Y(NM[1] + v[1]);
        if (s) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
      }
      ctx.strokeStyle = k === 1 ? col.ink : col.muted; ctx.globalAlpha = 0.35 + 0.1 * (6 - k); ctx.lineWidth = f.lw * (k === 1 ? 1.3 : 1);
      ctx.stroke();
    }
    ctx.restore();
    var m = seg(p, 0.3, 0.9) * (GD.length - 1), i = Math.min(GD.length - 2, Math.floor(m)), loc = m - i;
    if (m >= GD.length - 1) { i = GD.length - 2; loc = 1; }
    if (p > 0.28) {
      var cur = [lerp(GD[i][0], GD[i + 1][0], loc), lerp(GD[i][1], GD[i + 1][1], loc)];
      var tr = GD.slice(0, i + 1).concat([cur]);
      pathPoly(ctx, f, tr, false); ctx.strokeStyle = col.accent; ctx.lineWidth = f.lw * 1.8; ctx.lineJoin = "round"; ctx.stroke();
      disc(ctx, f, GD[0], f.lw * 2.4, col.surface, col.accent, f.lw * 1.4);
      if (p < 0.9) {
        var u = nrot([cur[0] - NM[0], cur[1] - NM[1]], -1), g = nrot([2 * NA * u[0], 2 * NB * u[1]], 1), gn = Math.hypot(g[0], g[1]) || 1;
        arrow(ctx, f.X(cur[0]), f.Y(cur[1]), f.X(cur[0] - g[0] / gn * 0.12), f.Y(cur[1] - g[1] / gn * 0.12), col["mit-bright"], f.lw * 1.2);
        disc(ctx, f, cur, f.lw * 3.2, col.accent);
      }
    }
    if (p >= 0.9) { star(ctx, f, NM, p, true); label(ctx, f, "x*", NM, 0.05, -0.07); }
  }

  function sceneFlow(ctx, f, p) {
    var grow = ease(seg(p, 0, 0.22));
    ARCS.forEach(function (A) {
      var P = NODES[A[0]], Q = NODES[A[1]], key = A[0] + "-" + A[1], hot = CUT[key] && p >= 0.62;
      ctx.strokeStyle = hot ? col.accent : col.axis; ctx.lineWidth = f.lw * (1 + A[2] * 0.75); ctx.lineCap = "round";
      ctx.globalAlpha = hot ? 0.55 : 1;
      ctx.beginPath(); ctx.moveTo(f.X(P[0]), f.Y(P[1])); ctx.lineTo(f.X(lerp(P[0], Q[0], grow)), f.Y(lerp(P[1], Q[1], grow))); ctx.stroke();
      ctx.globalAlpha = 1;
      // flow particles: count by flow, position by time (p), so the picture is a function of p
      if (p > 0.2) {
        var n = A[3] * 2, L = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
        for (var j = 0; j < n; j++) {
          var s = ((j / n) + (p - 0.2) * 2.2 / L * 0.35) % 1;
          ctx.save(); ctx.globalAlpha *= seg(p, 0.2, 0.3);
          disc(ctx, f, [lerp(P[0], Q[0], s), lerp(P[1], Q[1], s)], f.lw * 1.5, col["mit-bright"]);
          ctx.restore();
        }
      }
    });
    Object.keys(NODES).forEach(function (k) {
      var q = NODES[k], st = k === "s" || k === "t";
      disc(ctx, f, q, f.lw * (st ? 5.2 : 3.6), st ? col.ink : col.surface, col.ink, f.lw * 1.3);
      if (st && f.S >= 110) {
        ctx.font = "600 " + Math.round(f.S * 0.06) + "px JetBrains Mono, ui-monospace, monospace";
        ctx.fillStyle = col.surface; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(k, f.X(q[0]), f.Y(q[1]) + 0.5);
      }
    });
    // min cut: a dashed curve through the three saturated arcs
    var c = ease(seg(p, 0.62, 0.84));
    if (c > 0) {
      var pts = [[0.48, 0.99], [0.50, 0.76], [0.60, 0.68], [0.76, 0.58], [0.80, 0.40], [0.62, 0.30], [0.50, 0.12], [0.50, 0.01]];
      pathPoly(ctx, f, partial(pts, c, false), false);
      ctx.save(); ctx.setLineDash([f.lw * 4, f.lw * 3]); ctx.strokeStyle = col["mit-bright"]; ctx.lineWidth = f.lw * 1.6; ctx.stroke(); ctx.restore();
    }
  }

  var SCENES = [sceneLP, sceneIP, sceneMILP, sceneNLP, sceneFlow];
  function paintScene(ctx, k, p, box, alpha) {
    ctx.save();
    ctx.beginPath(); ctx.rect(box.x, box.y, box.w, box.h); ctx.clip();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    SCENES[k](ctx, frame(ctx, box), p);
    ctx.restore();
  }

  function fitCanvas(cv) {
    var r = cv.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    var ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: r.width, h: r.height };
  }

  // ---------- the band ----------
  var DUR = 5.2, ANIM = 0.8; // seconds per scene; share of it that animates (the rest holds the final frame)
  function band(host, levels) {
    var cv = host.querySelector("canvas"), links = host.querySelector(".band-links"), picks = host.querySelector(".band-picks");
    var T = 0, last = null, raf = 0, visible = true, hover = -1, phone = false;

    function build() {
      links.textContent = ""; picks.textContent = "";
      levels.forEach(function (l, k) {
        var a = document.createElement("a");
        a.href = "#level-" + l.id; a.className = "band-link";
        var n = document.createElement("span"); n.className = "band-n"; n.textContent = "0" + l.n;
        var ttl = document.createElement("span"); ttl.className = "band-t"; ttl.textContent = I18N.t("level." + l.id + ".title");
        a.append(n, ttl);
        a.addEventListener("mouseenter", function () { if (!phone) { hover = k; T = k * DUR; } });
        a.addEventListener("mouseleave", function () { hover = -1; });
        a.addEventListener("focus", function () { if (!phone) { T = k * DUR; draw(); } });
        links.appendChild(a);
        var b = document.createElement("button");
        b.type = "button"; b.className = "band-pick"; b.textContent = l.n;
        b.setAttribute("aria-label", I18N.t("level." + l.id + ".title"));
        b.addEventListener("click", function () { T = k * DUR + (reduce.matches ? DUR * ANIM : 0); draw(); });
        picks.appendChild(b);
      });
      draw();
    }

    function state() {
      var total = DUR * levels.length, tt = ((T % total) + total) % total;
      var k = Math.floor(tt / DUR), p = (tt - k * DUR) / DUR;
      if (hover >= 0) { k = hover; }
      return { k: k, p: reduce.matches ? 1 : Math.min(1, p / ANIM), raw: p };
    }

    function draw() {
      phone = host.clientWidth < 640;
      host.classList.toggle("phone", phone);
      var F = fitCanvas(cv), ctx = F.ctx, w = F.w, h = F.h, st = state();
      ctx.clearRect(0, 0, w, h);
      var n = levels.length, top = 0;
      Array.prototype.forEach.call(links.children, function (a) {
        var tl = a.querySelector(".band-t"); if (a.offsetParent !== null && tl) top = Math.max(top, tl.offsetTop + tl.offsetHeight + 6);
      });
      top = Math.max(top, 40) + 2;
      if (!phone) {
        var pw = w / n;
        for (var k = 0; k < n; k++) {
          var box = { x: k * pw + 6, y: top, w: pw - 12, h: h - top - 8 };
          var on = k === st.k;
          paintScene(ctx, k, on ? st.p : 1, box, reduce.matches || on ? 1 : 0.5);
          if (k) { ctx.fillStyle = col.grid; ctx.fillRect(Math.round(k * pw), 14, 1, h - 28); }
        }
      } else {
        // one scene; slide to the next during the last 12% of its time
        var slide = reduce.matches ? 0 : ease(seg(st.raw, 0.88, 1)), bx = { y: top, w: w - 12, h: h - top - 8 };
        paintScene(ctx, st.k, st.p, { x: 6 - slide * w, y: bx.y, w: bx.w, h: bx.h }, 1);
        if (slide > 0) paintScene(ctx, (st.k + 1) % n, 0, { x: 6 + (1 - slide) * w, y: bx.y, w: bx.w, h: bx.h }, 1);
      }
      Array.prototype.forEach.call(links.children, function (a, k) { a.classList.toggle("on", k === st.k); });
      Array.prototype.forEach.call(picks.children, function (b, k) { b.setAttribute("aria-pressed", String(k === st.k)); });
    }

    function tick(now) {
      raf = 0;
      if (last != null && hover < 0) T += Math.min(0.1, (now - last) / 1000);
      else if (last != null && hover >= 0) { var st = state(); if (st.raw < 1) T += Math.min(0.1, (now - last) / 1000); T = Math.min(T, hover * DUR + DUR * 0.999); }
      last = now; draw();
      if (visible && !reduce.matches) raf = requestAnimationFrame(tick);
    }
    function start() { if (!raf && visible && !reduce.matches) { last = null; raf = requestAnimationFrame(tick); } }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: 0.2 }).observe(host);
    }
    window.addEventListener("resize", draw);
    painters.push(draw);
    build(); start();
    return { relabel: build };
  }

  // ---------- small glyph for a level row ----------
  function glyph(k) {
    var cv = document.createElement("canvas"); cv.className = "lglyph"; cv.setAttribute("aria-hidden", "true");
    var t0 = null, raf = 0;
    function draw(p) {
      if (!cv.isConnected) return;
      var F = fitCanvas(cv); F.ctx.clearRect(0, 0, F.w, F.h);
      paintScene(F.ctx, k, p, { x: 0, y: 0, w: F.w, h: F.h }, 1);
    }
    function play() {
      if (reduce.matches) { draw(1); return; }
      if (raf) return;
      t0 = null;
      raf = requestAnimationFrame(function step(now) {
        if (t0 == null) t0 = now;
        var p = Math.min(1, (now - t0) / 2400);
        draw(p);
        raf = p < 1 ? requestAnimationFrame(step) : 0;
      });
    }
    cv.play = play;
    painters.push(function () { draw(1); });
    requestAnimationFrame(function () { draw(reduce.matches ? 1 : 0); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { play(); io.disconnect(); } }, { threshold: 0.6 });
      requestAnimationFrame(function () { io.observe(cv); });
    } else requestAnimationFrame(function () { draw(1); });
    return cv;
  }

  // ---------- icons by resource type (inline SVG, currentColor) ----------
  var ICONS = {
    animation: '<circle cx="8" cy="8" r="6.5"/><path d="M6.4 5.2v5.6L11 8z" class="f"/>',
    simulation: '<path d="M2 4.5h12M2 8h12M2 11.5h12"/><circle cx="5" cy="4.5" r="1.6" class="f"/><circle cx="10.5" cy="8" r="1.6" class="f"/><circle cx="7" cy="11.5" r="1.6" class="f"/>',
    game: '<rect x="2" y="2" width="12" height="12" rx="2"/><circle cx="5.3" cy="5.3" r="1.1" class="f"/><circle cx="8" cy="8" r="1.1" class="f"/><circle cx="10.7" cy="10.7" r="1.1" class="f"/>',
    example: '<path d="M3.5 1.8h6l3 3v9.4h-9z"/><path d="M9.5 1.8v3h3M5.5 8h5M5.5 10.5h5"/>'
  };
  function typeIcon(type) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 16 16"); s.setAttribute("class", "ticon"); s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[type] || ICONS.example;
    return s;
  }

  // ---------- research banners ----------
  function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  var ST = { ink: "var(--ink)", ink2: "var(--ink2)", muted: "var(--muted)", axis: "var(--axis)", grid: "var(--grid)", acc: "var(--accent)", bright: "var(--mit-bright)", surf: "var(--surface)", surf2: "var(--surface2)" };

  function bannerNanostores() {
    var r = rng(11), o = '<g transform="rotate(-9 200 60)">';
    [8, 36, 66, 94, 122].forEach(function (y) { o += '<path d="M-40 ' + y + 'H440" stroke="' + ST.grid + '" stroke-width="5"/>'; });
    [20, 72, 118, 170, 228, 276, 330, 380].forEach(function (x) { o += '<path d="M' + x + ' -40V160" stroke="' + ST.grid + '" stroke-width="5"/>'; });
    o += "</g>";
    for (var i = 0; i < 70; i++) o += '<circle cx="' + (r() * 400).toFixed(1) + '" cy="' + (r() * 120).toFixed(1) + '" r="1.4" fill="' + ST.axis + '"/>';
    [[48, 30], [140, 88], [205, 22], [262, 70], [318, 104], [368, 36], [96, 104], [186, 58]].forEach(function (q) {
      o += '<rect x="' + (q[0] - 4) + '" y="' + (q[1] - 4) + '" width="8" height="8" fill="' + ST.surf + '" stroke="' + ST.muted + '" stroke-width="1.6"/>';
    });
    [[108, 52, 0], [236, 96, 1], [300, 28, 2]].forEach(function (q) {
      o += '<circle class="ha-pulse d' + q[2] + '" cx="' + q[0] + '" cy="' + q[1] + '" r="30" fill="' + ST.acc + '" fill-opacity="0.07" stroke="' + ST.acc + '" stroke-opacity="0.55" stroke-dasharray="3 3"/>';
      o += '<rect x="' + (q[0] - 6) + '" y="' + (q[1] - 6) + '" width="12" height="12" fill="' + ST.acc + '"/>';
    });
    return o;
  }
  function bannerMarkets() {
    var r = rng(7), o = "", parks = [[70, 40, 1], [150, 92, 0], [215, 38, 1], [300, 88, 1], [360, 30, 0]], open = parks.filter(function (q) { return q[2]; });
    for (var i = 0; i < 46; i++) {
      var x = 8 + r() * 384, y = 8 + r() * 104, best = null, d2 = 1e9;
      open.forEach(function (q) { var d = (q[0] - x) * (q[0] - x) + (q[1] - y) * (q[1] - y); if (d < d2) { d2 = d; best = q; } });
      if (Math.sqrt(d2) < 120) o += '<path class="ha-flow" d="M' + x.toFixed(1) + " " + y.toFixed(1) + "L" + best[0] + " " + best[1] + '" stroke="' + ST.acc + '" stroke-opacity="0.35" stroke-width="' + (0.6 + 60 / (20 + Math.sqrt(d2))).toFixed(2) + '" stroke-dasharray="2 4"/>';
      o += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.8" fill="' + ST.ink2 + '"/>';
    }
    parks.forEach(function (q) {
      o += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="13" fill="' + (q[2] ? ST.acc : ST.surf) + '" stroke="' + (q[2] ? ST.acc : ST.muted) + '" stroke-width="1.6"/>';
      for (var k = 0; k < 3; k++) o += '<circle cx="' + (q[0] - 5 + k * 5) + '" cy="' + (q[1] + (k === 1 ? -3 : 2)) + '" r="2.6" fill="' + (q[2] ? ST.surf : ST.axis) + '" fill-opacity="' + (q[2] ? 0.85 : 1) + '"/>';
    });
    return o;
  }
  function bannerWildfire() {
    var o = "";
    for (var k = 0; k < 6; k++) {
      var y0 = 14 + k * 20, d = "M-10 " + y0;
      for (var x = 0; x <= 420; x += 30) d += " Q" + (x + 15) + " " + (y0 + (k % 2 ? 9 : -9) * Math.sin(x / 70 + k)) + " " + (x + 30) + " " + y0;
      o += '<path d="' + d + '" stroke="' + ST.axis + '" stroke-width="1" fill="none"/>';
    }
    o += '<path class="ha-fire" d="M268 52c10-14 30-16 40-6 12-4 26 6 22 20 10 10 2 28-14 28-8 10-30 10-38 0-16 2-26-12-18-24-6-10 0-18 8-18z" fill="' + ST.bright + '" fill-opacity="0.22" stroke="' + ST.bright + '" stroke-width="1.8"/>';
    var route = "M60 92 C100 40 140 28 172 30 C220 34 250 50 280 66 C300 90 330 100 352 98";
    o += '<path d="' + route + '" stroke="' + ST.acc + '" stroke-width="1.6" stroke-dasharray="5 4" fill="none"/>';
    o += '<rect x="36" y="86" width="48" height="12" fill="' + ST.ink + '"/><path d="M41 92h38" stroke="' + ST.surf + '" stroke-width="1.4" stroke-dasharray="4 3"/>';
    [[172, 30], [352, 98], [120, 70]].forEach(function (q) {
      o += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="7" fill="' + ST.surf + '" stroke="' + ST.ink + '" stroke-width="1.6"/><path d="M' + (q[0] - 3.5) + " " + (q[1] + 1) + "q3.5 -4 7 0" + '" stroke="' + ST.ink2 + '" stroke-width="1.2" fill="none"/>';
    });
    o += '<g class="ha-plane"><circle r="4.5" fill="' + ST.acc + '"/><animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path="' + route + '"/></g>';
    return o;
  }
  function bannerPallets() {
    // an air cargo container in isometric view, filled with boxes, and one box dropping in
    function iso(x, y, z) { return [200 + (x - y) * 0.87, 96 + (x + y) * 0.5 - z]; }
    function box(x, y, z, w, d, h, fill, stroke, cls) {
      var P = function (a, b, c) { var q = iso(a, b, c); return q[0].toFixed(1) + "," + q[1].toFixed(1); };
      var top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" ");
      var left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)].join(" ");
      var right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)].join(" ");
      return '<g' + (cls ? ' class="' + cls + '"' : "") + ' stroke="' + stroke + '" stroke-width="1" stroke-linejoin="round">' +
        '<polygon points="' + left + '" fill="' + fill + '" fill-opacity="0.75"/><polygon points="' + right + '" fill="' + fill + '" fill-opacity="0.5"/><polygon points="' + top + '" fill="' + fill + '"/></g>';
    }
    var o = '<g transform="translate(200 60) scale(0.58) translate(-221 -99)">';
    // container floor and back walls
    var F = function (a, b, c) { var q = iso(a, b, c); return q[0].toFixed(1) + "," + q[1].toFixed(1); };
    o += '<polygon points="' + [F(0, 0, 0), F(120, 0, 0), F(120, 70, 0), F(0, 70, 0)].join(" ") + '" fill="' + ST.surf2 + '" stroke="' + ST.muted + '"/>';
    o += '<polyline points="' + [F(0, 70, 0), F(0, 0, 0), F(120, 0, 0), F(120, 0, 70), F(95, 0, 88), F(0, 0, 88), F(0, 0, 0)].join(" ") + '" fill="none" stroke="' + ST.muted + '" stroke-width="1.4"/>';
    o += '<polyline points="' + [F(0, 0, 88), F(0, 70, 88), F(0, 70, 0)].join(" ") + '" fill="none" stroke="' + ST.muted + '" stroke-width="1.4" stroke-dasharray="3 3"/>';
    var slots = [];
    for (var i = 0; i < 4; i++) for (var j = 0; j < 2; j++) for (var k = 0; k < 2; k++) slots.push([i * 30, j * 35, k * 30]);
    slots.forEach(function (s, n) {
      if (n === 13) return; // the empty slot the red box drops into
      if (s[0] >= 90 && s[2] >= 30) return; // the sloped corner of the container
      o += box(s[0] + 1, s[1] + 1, s[2], 28, 33, 28, "var(--surface)", "var(--muted)");
    });
    o += box(61, 36, 30, 28, 33, 28, ST.acc, ST.acc, "ha-drop");
    return o + "</g>";
  }
  function bannerSoon() {
    var o = "", L = [[80, [30, 60, 90]], [150, [20, 47, 74, 101]], [220, [35, 60, 85]]];
    for (var a = 0; a < L.length - 1; a++) L[a][1].forEach(function (y1) { L[a + 1][1].forEach(function (y2) { o += '<path d="M' + L[a][0] + " " + y1 + "L" + L[a + 1][0] + " " + y2 + '" stroke="' + ST.axis + '" stroke-width="1"/>'; }); });
    L.forEach(function (c) { c[1].forEach(function (y) { o += '<circle cx="' + c[0] + '" cy="' + y + '" r="5" fill="' + ST.surf + '" stroke="' + ST.muted + '" stroke-width="1.4"/>'; }); });
    o += '<path d="M260 95L290 28L350 22L372 70L330 102Z" fill="var(--region)" stroke="' + ST.muted + '" stroke-width="1.4"/><circle cx="350" cy="22" r="4" fill="' + ST.muted + '"/>';
    o += '<path d="M232 60H252" stroke="' + ST.muted + '" stroke-width="1.4" stroke-dasharray="3 3"/>';
    return o;
  }
  var BANNERS = { nanostores: bannerNanostores, markets: bannerMarkets, wildfire: bannerWildfire, pallets: bannerPallets };
  function banner(id) {
    var d = document.createElement("div"); d.className = "p-banner" + (BANNERS[id] ? "" : " soon"); d.setAttribute("aria-hidden", "true");
    d.innerHTML = '<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice" fill="none">' + (BANNERS[id] || bannerSoon)() + "</svg>";
    if (reduce.matches) Array.prototype.forEach.call(d.querySelectorAll("animateMotion"), function (a) {
      a.parentNode.setAttribute("transform", "translate(226 44)"); a.remove(); // the plane rests on its route
    });
    return d;
  }

  window.HomeArt = { band: band, glyph: glyph, typeIcon: typeIcon, banner: banner, paint: paintScene };
})();
