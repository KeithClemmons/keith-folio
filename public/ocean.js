(function () {
  "use strict";

  var canvas = document.querySelector("canvas.ocean-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var motion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var TAU = Math.PI * 2;
  var NAVY = [27, 38, 64];

  var BODY = ["#94d5ee", "#53b5e4", "#2d8ed8", "#2768c6", "#1f4ea3", "#183b80"];
  var LIP = ["#f6f3ec", "#aadff2", "#5cb9e5", "#2f88d4", "#2459b6"];

  var LAYERS = [
    { base: 0.58, height: 0.4, speed: 16, tone: 0.5, count: 7 },
    { base: 0.74, height: 0.52, speed: 25, tone: 0.33, count: 6 },
    { base: 0.9, height: 0.66, speed: 37, tone: 0.16, count: 5 },
    { base: 1.08, height: 0.8, speed: 52, tone: 0, count: 4 },
  ];

  var seed = 20261009;
  function random() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function toned(hex, amount) {
    var c = hexToRgb(hex);
    return (
      "rgb(" +
      Math.round(c[0] + (NAVY[0] - c[0]) * amount) + "," +
      Math.round(c[1] + (NAVY[1] - c[1]) * amount) + "," +
      Math.round(c[2] + (NAVY[2] - c[2]) * amount) + ")"
    );
  }

  var palettes = LAYERS.map(function (layer) {
    return {
      body: BODY.map(function (c) { return toned(c, layer.tone); }),
      lip: LIP.map(function (c) { return toned(c, layer.tone * 0.9); }),
    };
  });

  var grain = (function () {
    var size = 160;
    var tile = document.createElement("canvas");
    tile.width = tile.height = size;
    var g = tile.getContext("2d");
    var img = g.createImageData(size, size);
    for (var i = 0; i < img.data.length; i += 4) {
      var v = 110 + Math.random() * 145;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    for (var f = 0; f < 70; f++) {
      g.strokeStyle = "rgba(255,255,255," + (0.08 + Math.random() * 0.12) + ")";
      g.lineWidth = 0.6;
      g.beginPath();
      var x = Math.random() * size;
      var y = Math.random() * size;
      g.moveTo(x, y);
      g.quadraticCurveTo(x + Math.random() * 14 - 7, y + Math.random() * 14 - 7, x + Math.random() * 24 - 12, y + Math.random() * 24 - 12);
      g.stroke();
    }
    return tile;
  })();
  var grainPattern = null;

  var width = 0;
  var height = 0;
  var dpr = 1;
  var layers = [];

  function makeCrest(layer, x) {
    return {
      x: x,
      scale: 0.72 + random() * 0.5,
      lift: random(),
      phase: random() * TAU,
      breath: 0.35 + random() * 0.35,
      speed: 0.85 + random() * 0.3,
    };
  }

  function crestReach(layer) {
    var h = layer.height * height * 1.22;
    return { back: h * 4.4, front: h * 2.4 };
  }

  function build() {
    layers = LAYERS.map(function (layer, index) {
      var reach = crestReach(layer);
      var span = width + reach.back + reach.front;
      var crests = [];
      for (var i = 0; i < layer.count; i++) {
        crests.push(makeCrest(layer, -reach.front + (span * (i + random() * 0.55)) / layer.count));
      }
      return { config: layer, palette: palettes[index], crests: crests, span: span, reach: reach };
    });
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    grainPattern = ctx.createPattern(grain, "repeat");
    seed = 20261009;
    build();
  }

  function ease(t) {
    return Math.pow(0.5 - 0.5 * Math.cos(Math.PI * t), 1.75);
  }

  var path = null;

  function begin() {
    path = new Path2D();
    return path;
  }

  function paperFill(color, depth) {
    ctx.save();
    ctx.translate(-depth * 0.35, depth * 0.55);
    ctx.fillStyle = "rgba(4, 16, 42, 0.16)";
    ctx.fill(path);
    ctx.translate(depth * 0.15, -depth * 0.3);
    ctx.fillStyle = "rgba(4, 16, 42, 0.24)";
    ctx.fill(path);
    ctx.restore();
    ctx.fillStyle = color;
    ctx.fill(path);
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 0.8;
    ctx.stroke(path);
  }

  function drawSheet(layer, time, front) {
    var cfg = layer.config;
    var baseY = cfg.base * height;
    var amp = cfg.height * height * 0.07;
    var drift = time * cfg.speed * 0.02;
    var colors = front ? [layer.palette.body[2], layer.palette.body[4]] : [layer.palette.body[1], layer.palette.body[3]];
    for (var k = 0; k < colors.length; k++) {
      var y0 = front ? baseY + cfg.height * height * 0.16 + k * amp * 1.3 : baseY - amp * 1.6 + k * amp * 1.1;
      begin();
      path.moveTo(-10, height + 10);
      for (var x = -10; x <= width + 10; x += 14) {
        var y = y0 + Math.sin(x * 0.011 - drift * (1 + k * 0.2) + k) * amp + Math.sin(x * 0.027 - drift * 1.7 + k * 2) * amp * 0.45;
        path.lineTo(x, y);
      }
      path.lineTo(width + 10, height + 10);
      path.closePath();
      paperFill(colors[k], 5);
    }
  }

  function bandPath(cx, cy, rho, by, length, curl, foam) {
    var peakX = cx - rho * 0.55;
    var peakY = cy - rho;
    var rise = by - peakY;
    var start = peakX - length;
    var a1 = -Math.PI * 0.5 + curl * Math.PI * 1.25;
    var thick = rho * (foam ? 0.44 : 0.36);
    var steps = 26;

    var sink = by + rise * 0.7;
    begin();
    path.moveTo(start - rise, height + 10);
    path.lineTo(start - rise, sink);
    path.quadraticCurveTo(start - rise * 0.4, by, start, by);
    for (var i = 1; i <= 26; i++) {
      var t = i / 26;
      path.lineTo(start + length * t, by - rise * ease(t));
    }
    for (var s = 0; s <= steps; s++) {
      var u = s / steps;
      var a = -Math.PI * 0.5 + (a1 + Math.PI * 0.5) * u;
      var r = rho * (1 - 0.2 * u * curl);
      path.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    var tipR = rho * (1 - 0.2 * curl);
    var tipT = thick * 0.5;
    var capX = cx + Math.cos(a1) * (tipR - tipT / 2);
    var capY = cy + Math.sin(a1) * (tipR - tipT / 2);
    path.arc(capX, capY, tipT / 2, a1, a1 + Math.PI, false);
    for (var w = steps; w >= 0; w--) {
      var v = w / steps;
      var b = -Math.PI * 0.5 + (a1 + Math.PI * 0.5) * v;
      var ri = rho * (1 - 0.2 * v * curl) - thick * (1 - 0.5 * v);
      path.lineTo(cx + Math.cos(b) * ri, cy + Math.sin(b) * ri);
    }
    var hollow = rho - thick;
    for (var f = 1; f <= 18; f++) {
      var c = -Math.PI * 0.5 - (Math.PI * f) / 18;
      path.lineTo(cx + Math.cos(c) * hollow, cy + Math.sin(c) * hollow);
    }
    var floorY = Math.min(by, cy + hollow);
    path.bezierCurveTo(cx + rho * 0.9, floorY, cx + rho * 1.3, by, cx + rho * 2.4, by);
    path.quadraticCurveTo(cx + rho * 3.6, by, cx + rho * 4.6, sink);
    path.lineTo(cx + rho * 4.6, height + 10);
    path.closePath();
  }

  function drawCrest(layer, crest, time) {
    var cfg = layer.config;
    var palette = layer.palette;
    var swell = 0.88 + 0.12 * Math.sin(time * crest.breath + crest.phase);
    var H = cfg.height * height * crest.scale * swell;
    var curl = 0.74 + 0.26 * Math.sin(time * crest.breath * 0.8 + crest.phase * 1.7);
    var by = cfg.base * height + crest.lift * cfg.height * height * 0.12;
    var rho = H * 0.46;
    var cx = crest.x;
    var cy = by - H + rho;
    var length = H * 3.3;
    var blur = 3 + cfg.height * 9;

    bandPath(cx + rho * 0.03, cy - rho * 0.02, rho * 1.08, by, length * 0.3, Math.min(1, curl + 0.05), true);
    paperFill(palette.lip[0], blur);

    for (var k = 0; k < palette.body.length; k++) {
      var shrink = 1 - k * 0.13;
      bandPath(cx, cy, rho * shrink, by + k * H * 0.05, length * (1 - k * 0.05), curl * (1 - k * 0.09), false);
      paperFill(palette.body[k], blur);
    }
  }

  var boost = 0;
  var lastScroll = window.scrollY || 0;
  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY || 0;
      boost = Math.min(3, boost + Math.abs(y - lastScroll) * 0.01);
      lastScroll = y;
    },
    { passive: true },
  );

  function render(time, dt) {
    ctx.clearRect(0, 0, width, height);
    for (var l = 0; l < layers.length; l++) {
      var layer = layers[l];
      var cfg = layer.config;
      var pace = cfg.speed * (0.6 + width / 2400) * (1 + boost);
      for (var c = 0; c < layer.crests.length; c++) {
        var crest = layer.crests[c];
        crest.x += pace * crest.speed * dt;
        if (crest.x - layer.reach.back > width) {
          var fresh = makeCrest(cfg, crest.x - layer.span);
          layer.crests[c] = fresh;
        }
      }
      drawSheet(layer, time, false);
      var order = layer.crests.slice().sort(function (a, b) { return a.lift - b.lift; });
      for (var o = 0; o < order.length; o++) drawCrest(layer, order[o], time);
      drawSheet(layer, time, true);
    }
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = 0.07;
    ctx.fillStyle = grainPattern;
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  var last = 0;
  var clock = 0;
  var frame = 0;
  function tick(now) {
    var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    clock += dt;
    boost *= Math.pow(0.12, dt);
    render(clock, dt);
    frame = requestAnimationFrame(tick);
  }

  function start() {
    cancelAnimationFrame(frame);
    last = 0;
    if (motion && motion.matches) {
      render(4, 0);
      return;
    }
    frame = requestAnimationFrame(tick);
  }

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      if (motion && motion.matches) render(4, 0);
    }, 120);
  });
  if (motion && motion.addEventListener) motion.addEventListener("change", start);

  resize();
  start();
})();
