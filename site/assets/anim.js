/*
 * Shared animation player for the research case pages.
 *
 * A scene is a pure function of time: render(t) draws the frame at t seconds (0..duration), so
 * scrubbing, chapter jumps, pausing and language or theme changes all just call render again.
 *
 *   var player = Anim.create({
 *     root: document.getElementById("anim"),   // a .anim element containing a .anim-stage
 *     duration: 52,                             // seconds at 1x
 *     chapters: [{ t: 0, key: "r.x.anim.ch1" }, { t: 12, key: "r.x.anim.ch2" }],
 *     render: function (t) { ... }              // draw the frame for time t
 *   });
 *   player.refresh();   // redraw the current frame (e.g. after a scenario control changed)
 *   player.restart();   // back to 0 and play
 *
 * Behaviour: starts playing when the stage is at least 35% visible and pauses when it leaves the
 * screen; with prefers-reduced-motion it does not autoplay and shows the final frame instead.
 * Helpers: Anim.canvas(stage) for a crisp HiDPI canvas, Anim.colors() for theme tokens,
 * Anim.ease.*, Anim.lerp, Anim.clamp, Anim.seg(t, a, b) (0..1 progress inside [a, b]),
 * Anim.rng(seed) for deterministic pseudo random numbers.
 */
(function () {
  "use strict";
  var t_ = function (k, v) { return window.I18N ? I18N.t(k, v) : k; };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var TOKENS = ["--bg", "--surface", "--surface2", "--ink", "--ink2", "--muted", "--grid", "--axis",
    "--border", "--accent", "--accent-text", "--mit-red", "--mit-bright", "--mit-silver", "--on-solid",
    "--region", "--sel", "--good", "--crit", "--c-blue", "--c-aqua", "--c-violet"];
  var colorCache = null;
  function colors() {
    if (colorCache) return colorCache;
    var cs = getComputedStyle(document.documentElement), out = {};
    TOKENS.forEach(function (k) { out[k.slice(2)] = cs.getPropertyValue(k).trim(); });
    colorCache = out;
    return out;
  }
  function clearColors() { colorCache = null; }

  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function seg(t, a, b) { return clamp((t - a) / (b - a), 0, 1); }
  var ease = {
    inOut: function (u) { return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    out: function (u) { return 1 - Math.pow(1 - u, 3); },
    in: function (u) { return u * u * u; },
    back: function (u) { var c = 1.70158; return 1 + (c + 1) * Math.pow(u - 1, 3) + c * Math.pow(u - 1, 2); }
  };
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var r = Math.imul(a ^ (a >>> 15), 1 | a);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  // HiDPI canvas that fills its stage; returns { el, ctx, w, h } (w, h in CSS pixels, updated on resize)
  function canvas(stage) {
    var el = document.createElement("canvas");
    el.className = "anim-canvas";
    stage.appendChild(el);
    var o = { el: el, ctx: el.getContext("2d"), w: 0, h: 0 };
    o.fit = function () {
      var r = stage.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      o.w = Math.max(1, Math.round(r.width));
      o.h = Math.max(1, Math.round(r.height));
      el.width = Math.round(o.w * dpr);
      el.height = Math.round(o.h * dpr);
      el.style.width = o.w + "px";
      el.style.height = o.h + "px";
      o.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    o.fit();
    return o;
  }

  function fmtTime(s) {
    s = Math.max(0, Math.round(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function create(opts) {
    var root = opts.root, stage = root.querySelector(".anim-stage");
    var duration = opts.duration, chapters = opts.chapters || [];
    var t = reduce ? duration : 0, playing = false, speed = 1, last = 0, raf = 0, userPaused = false, seen = false;

    // ---- controls ----
    var bar = document.createElement("div");
    bar.className = "anim-bar";
    bar.innerHTML =
      '<button type="button" class="anim-btn anim-play"></button>' +
      '<button type="button" class="anim-btn anim-restart"></button>' +
      '<div class="anim-track" role="slider" tabindex="0" aria-valuemin="0">' +
      '<div class="anim-fill"></div><div class="anim-ticks"></div></div>' +
      '<span class="anim-time"></span>' +
      '<div class="anim-speed" role="group"></div>';
    root.appendChild(bar);
    var chapWrap = document.createElement("div");
    chapWrap.className = "anim-chapters";
    root.appendChild(chapWrap);

    var btnPlay = bar.querySelector(".anim-play"), btnRestart = bar.querySelector(".anim-restart");
    var track = bar.querySelector(".anim-track"), fill = bar.querySelector(".anim-fill");
    var ticks = bar.querySelector(".anim-ticks"), timeEl = bar.querySelector(".anim-time");
    var speedWrap = bar.querySelector(".anim-speed");
    track.setAttribute("aria-valuemax", String(duration));

    [0.5, 1, 2].forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = s + "×";
      b.dataset.speed = s;
      b.addEventListener("click", function () { speed = s; syncSpeed(); });
      speedWrap.appendChild(b);
    });
    function syncSpeed() {
      speedWrap.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", +b.dataset.speed === speed ? "true" : "false");
      });
    }

    chapters.forEach(function (c, i) {
      var tick = document.createElement("span");
      tick.className = "anim-tick";
      tick.style.left = (c.t / duration * 100) + "%";
      ticks.appendChild(tick);
      var b = document.createElement("button");
      b.type = "button";
      b.className = "anim-chap";
      b.dataset.i = i;
      b.addEventListener("click", function () { seek(c.t + 0.001); if (!playing) play(); });
      chapWrap.appendChild(b);
    });

    function chapterAt(time) {
      var idx = 0;
      chapters.forEach(function (c, i) { if (time >= c.t) idx = i; });
      return idx;
    }

    function labels() {
      btnRestart.textContent = "↺";
      btnRestart.setAttribute("aria-label", t_("ui.anim.restart"));
      btnRestart.title = t_("ui.anim.restart");
      speedWrap.setAttribute("aria-label", t_("ui.anim.speed"));
      track.setAttribute("aria-label", t_("ui.anim.timeline"));
      chapWrap.querySelectorAll(".anim-chap").forEach(function (b, i) {
        b.textContent = (i + 1) + ". " + t_(chapters[i].key);
      });
      syncPlay();
    }
    function syncPlay() {
      var atEnd = t >= duration - 1e-6;
      var k = playing ? "ui.anim.pause" : atEnd ? "ui.anim.replay" : "ui.anim.play";
      btnPlay.textContent = playing ? "❚❚" : atEnd ? "↻" : "▶";
      btnPlay.setAttribute("aria-label", t_(k));
      btnPlay.title = t_(k);
    }
    function syncUi() {
      var u = clamp(t / duration, 0, 1);
      fill.style.width = (u * 100) + "%";
      track.setAttribute("aria-valuenow", String(Math.round(t)));
      timeEl.textContent = fmtTime(t) + " / " + fmtTime(duration);
      var ci = chapterAt(t);
      chapWrap.querySelectorAll(".anim-chap").forEach(function (b, i) {
        b.classList.toggle("on", i === ci);
        b.classList.toggle("done", i < ci);
      });
      root.dataset.chapter = ci;
    }

    function draw() {
      try { opts.render(t); } catch (e) { console.error(e); }
      syncUi();
    }
    function frame(now) {
      if (!playing) return;
      var dt = Math.max(0, Math.min(0.1, (now - last) / 1000));   // the first rAF stamp can precede play()
      last = now;
      t = Math.min(duration, t + dt * speed);
      draw();
      if (t >= duration) { playing = false; syncPlay(); return; }
      raf = requestAnimationFrame(frame);
    }
    function play() {
      if (playing) return;
      if (t >= duration - 1e-6) t = 0;
      playing = true;
      last = performance.now();
      syncPlay();
      raf = requestAnimationFrame(frame);
    }
    function pause() { playing = false; cancelAnimationFrame(raf); syncPlay(); }
    function seek(time) { t = clamp(time, 0, duration); draw(); syncPlay(); }

    btnPlay.addEventListener("click", function () {
      if (playing) { userPaused = true; pause(); } else { userPaused = false; play(); }
    });
    btnRestart.addEventListener("click", function () { userPaused = false; seek(0); play(); });

    // scrubbing
    function seekFromEvent(ev) {
      var r = track.getBoundingClientRect();
      seek((ev.clientX - r.left) / r.width * duration);
    }
    var dragging = false;
    track.addEventListener("pointerdown", function (ev) {
      // seek before pause(): the play glyph changes on pause, so read the track while it is where the user pressed
      dragging = true; track.setPointerCapture(ev.pointerId); seekFromEvent(ev); pause(); userPaused = true;
    });
    track.addEventListener("pointermove", function (ev) { if (dragging) seekFromEvent(ev); });
    track.addEventListener("pointerup", function () { dragging = false; });
    track.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight") { seek(t + 2); ev.preventDefault(); }
      if (ev.key === "ArrowLeft") { seek(t - 2); ev.preventDefault(); }
      if (ev.key === " " || ev.key === "Enter") { btnPlay.click(); ev.preventDefault(); }
    });

    // autoplay when visible, pause when not
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && e.intersectionRatio >= 0.35) {
            if (!reduce && !userPaused && (!seen || t < duration)) play();
            seen = true;
          } else if (playing) {
            pause();
          }
        });
      }, { threshold: [0, 0.35, 0.6] }).observe(stage);
    }

    // redraw on resize, theme and language changes
    var rt = 0;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { if (opts.onResize) opts.onResize(); draw(); }, 80);
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { clearColors(); draw(); });
    }
    // an explicit light/dark choice on the page stamps data-theme on <html>
    new MutationObserver(function () { clearColors(); draw(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.I18N) I18N.onChange(function () { labels(); draw(); });

    syncSpeed();
    labels();
    draw();

    return {
      refresh: draw,
      restart: function () { userPaused = false; seek(0); play(); },
      seek: seek,
      play: play,
      pause: pause,
      get time() { return t; },
      get duration() { return duration; }
    };
  }

  window.Anim = {
    create: create, canvas: canvas, colors: colors, clamp: clamp, lerp: lerp, seg: seg, ease: ease, rng: rng,
    reducedMotion: reduce
  };
})();
