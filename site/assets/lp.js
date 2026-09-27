/*
 * Small linear programming solver for the learning resources (runs in the browser, no dependencies).
 * Two-phase tableau simplex with Bland's rule, for problems small enough to teach with (tens of
 * variables and constraints).
 *
 *   var r = LP.solve({
 *     sense: "max",                       // "max" or "min"
 *     c: [3, 2],                          // objective coefficients
 *     rows: [                             // constraints a·x (<=|>=|=) b
 *       { a: [2, 1], op: "<=", b: 100, name: "finishing" },
 *       { a: [1, 1], op: "<=", b: 80,  name: "carpentry" },
 *       { a: [1, 0], op: "<=", b: 40,  name: "demand" }
 *     ]
 *     // all variables are >= 0
 *   });
 *   r.status  -> "optimal" | "infeasible" | "unbounded"
 *   r.x       -> optimal values            r.z -> optimal objective value
 *   r.duals   -> shadow price of each row: change in the optimal objective per unit increase of b
 *   r.slack   -> b − a·x for each row (for ">=" rows this is negative surplus, i.e. a·x − b = −slack)
 *   r.binding -> true when the row holds with equality at the optimum
 *   r.iterations -> number of pivots
 *
 * LP.steps(problem) returns the phase-2 tableau before each pivot of a problem whose rows are all
 * "<=" with b >= 0 (so the slack basis is feasible), for step-by-step animations:
 *   [{ tableau, basis, entering, leaving, x, z }, ...]  (last step has entering = leaving = -1)
 */
(function () {
  "use strict";
  var EPS = 1e-9;

  function build(p) {
    var n = p.c.length, rows = p.rows, m = rows.length;
    // normalise so every b >= 0, remembering flips to restore dual signs
    var R = rows.map(function (r) {
      var a = r.a.slice(), b = r.b, op = r.op, flip = false;
      if (b < 0) {
        a = a.map(function (v) { return -v; }); b = -b; flip = true;
        op = op === "<=" ? ">=" : op === ">=" ? "<=" : "=";
      }
      return { a: a, b: b, op: op, flip: flip };
    });
    // columns: n originals, then one "identity" column per row (slack for <=, artificial for >= and =),
    // then one surplus column per >= row
    var nSur = R.filter(function (r) { return r.op === ">="; }).length;
    var N = n + m + nSur;
    var T = [], idCol = [], surCol = [], art = [];
    var s = 0;
    for (var i = 0; i < m; i++) {
      var row = new Float64Array(N + 1);
      for (var j = 0; j < n; j++) row[j] = R[i].a[j] || 0;
      row[n + i] = 1;
      idCol.push(n + i);
      art.push(R[i].op !== "<=");
      if (R[i].op === ">=") { row[n + m + s] = -1; surCol.push(n + m + s); s++; } else surCol.push(-1);
      row[N] = R[i].b;
      T.push(row);
    }
    return { n: n, m: m, N: N, T: T, R: R, idCol: idCol, surCol: surCol, art: art };
  }

  function pivot(T, obj, r, k) {
    var N1 = T[0].length, pr = T[r], pv = pr[k], i, j;
    for (j = 0; j < N1; j++) pr[j] /= pv;
    var all = T.concat([obj]);
    for (i = 0; i < all.length; i++) {
      var row = all[i];
      if (row === pr) continue;
      var f = row[k];
      if (Math.abs(f) < EPS) continue;
      for (j = 0; j < N1; j++) row[j] -= f * pr[j];
    }
  }

  // maximise obj over the tableau; obj row holds reduced costs (z_j − c_j) and −value in last cell
  function run(T, obj, basis, allowed, maxIt) {
    var it = 0, N = obj.length - 1;
    while (it < maxIt) {
      var k = -1;
      for (var j = 0; j < N; j++) if (allowed[j] && obj[j] < -EPS) { k = j; break; } // Bland: first improving
      if (k < 0) return { status: "optimal", it: it };
      var r = -1, best = Infinity;
      for (var i = 0; i < T.length; i++) {
        if (T[i][k] > EPS) {
          var q = T[i][N] / T[i][k];
          if (q < best - EPS || (Math.abs(q - best) <= EPS && basis[i] < basis[r])) { best = q; r = i; }
        }
      }
      if (r < 0) return { status: "unbounded", it: it };
      pivot(T, obj, r, k);
      basis[r] = k;
      it++;
    }
    return { status: "iteration-limit", it: it };
  }

  function solve(p) {
    var S = build(p), n = S.n, m = S.m, N = S.N, T = S.T, i, j;
    var sign = p.sense === "min" ? -1 : 1;
    var basis = S.idCol.slice();
    var allowed = new Array(N).fill(true);

    // phase 1: minimise the sum of artificials = maximise −sum
    var iters = 0;
    if (S.art.some(Boolean)) {
      var o1 = new Float64Array(N + 1);
      for (i = 0; i < m; i++) if (S.art[i]) o1[S.idCol[i]] = 1;
      for (i = 0; i < m; i++) if (S.art[i]) for (j = 0; j <= N; j++) o1[j] -= T[i][j];
      var r1 = run(T, o1, basis, allowed, 5000);
      iters += r1.it;
      if (-o1[N] > 1e-7) return { status: "infeasible", iterations: iters };
      // drive artificials out of the basis where possible (they sit at zero after a feasible phase 1)
      var isArt = function (col) { var q = S.idCol.indexOf(col); return q >= 0 && S.art[q]; };
      for (i = 0; i < m; i++) {
        if (!isArt(basis[i])) continue;
        for (j = 0; j < N; j++) {
          if (!isArt(j) && Math.abs(T[i][j]) > EPS) { pivot(T, o1, i, j); basis[i] = j; break; }
        }
      }
      // artificial columns may no longer enter
      for (i = 0; i < m; i++) if (S.art[i]) allowed[S.idCol[i]] = false;
    }

    // phase 2 objective: reduced costs for maximising sign·c
    var o2 = new Float64Array(N + 1);
    for (j = 0; j < n; j++) o2[j] = -sign * (p.c[j] || 0);
    for (i = 0; i < m; i++) {
      var cb = basis[i] < n ? sign * (p.c[basis[i]] || 0) : 0;
      if (cb) for (j = 0; j <= N; j++) o2[j] += cb * T[i][j];
    }
    var r2 = run(T, o2, basis, allowed, 5000);
    iters += r2.it;
    if (r2.status !== "optimal") return { status: r2.status, iterations: iters };

    var x = new Array(n).fill(0);
    for (i = 0; i < m; i++) if (basis[i] < n) x[basis[i]] = T[i][N];
    var z = 0;
    for (j = 0; j < n; j++) z += (p.c[j] || 0) * x[j];
    var duals = [], slack = [], binding = [];
    for (i = 0; i < m; i++) {
      // y_i = c_B B^-1 e_i is the reduced cost of the row's identity column (cost 0 in phase 2)
      var y = o2[S.idCol[i]];
      if (S.R[i].flip) y = -y;
      duals.push(clean(sign * y));
      var ax = 0;
      for (j = 0; j < n; j++) ax += (p.rows[i].a[j] || 0) * x[j];
      slack.push(clean(p.rows[i].b - ax));
      binding.push(Math.abs(p.rows[i].b - ax) < 1e-6);
    }
    return { status: "optimal", x: x.map(clean), z: clean(z), duals: duals, slack: slack, binding: binding, iterations: iters };
  }

  function clean(v) { return Math.abs(v) < 1e-9 ? 0 : Math.round(v * 1e9) / 1e9; }

  // phase-2 tableaux for an all-"<=" problem with b >= 0 (maximisation), for animations
  function steps(p) {
    var S = build(p), n = S.n, m = S.m, N = S.N, T = S.T, i, j;
    var basis = S.idCol.slice(), obj = new Float64Array(N + 1), out = [];
    for (j = 0; j < n; j++) obj[j] = -(p.c[j] || 0);
    function snap(k, r) {
      var x = new Array(n).fill(0);
      for (i = 0; i < m; i++) if (basis[i] < n) x[basis[i]] = T[i][N];
      out.push({
        tableau: T.map(function (row) { return Array.prototype.map.call(row, clean); }).concat([Array.prototype.map.call(obj, clean)]),
        basis: basis.slice(), entering: k, leaving: r, x: x.map(clean), z: clean(obj[N])
      });
    }
    for (var guard = 0; guard < 100; guard++) {
      var k = -1, most = -EPS;
      for (j = 0; j < N; j++) if (obj[j] < most) { most = obj[j]; k = j; } // Dantzig's rule reads better on screen
      if (k < 0) { snap(-1, -1); break; }
      var r = -1, best = Infinity;
      for (i = 0; i < m; i++) if (T[i][k] > EPS) { var q = T[i][N] / T[i][k]; if (q < best - EPS) { best = q; r = i; } }
      if (r < 0) { snap(k, -1); break; }
      snap(k, r);
      pivot(T, obj, r, k);
      basis[r] = k;
    }
    return out;
  }

  window.LP = { solve: solve, steps: steps };
})();
