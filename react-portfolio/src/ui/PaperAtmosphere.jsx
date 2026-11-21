import { useEffect, useRef } from 'react';

const circle = (x, y, radius) => Array.from({ length: 97 }, (_, i) => {
  const angle = i / 96 * Math.PI * 2;
  return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius];
});
const shapes = {
  prismo: [
    [[-1, -0.6], [-0.35, -0.6], [-0.35, 0.1], [-1, 0.1], [-1, -0.6]],
    [[-0.35, -0.25], [0.1, -0.25]], circle(0.48, -0.25, 0.4),
    [[0.28, -0.25], [0.43, -0.1], [0.7, -0.43]],
    [[0.48, 0.15], [0.48, 0.6], [-0.68, 0.6], [-0.68, 0.1]],
  ],
  tr8de: [[[-1, 0.6], [-0.72, 0.3], [-0.5, 0.43], [-0.28, -0.18], [0, 0.05], [0.3, -0.45], [0.58, -0.2], [1, -0.7]], [[-1, 0.85], [1, 0.85]]],
  ghosted: [[[-0.95, 0.65], [-0.95, 0.35], [0, 0.35], [0, -0.18]], [[0, 0.35], [0.95, 0.35], [0.95, 0.65]], [[-0.5, -0.18], [-0.75, -0.3], [-0.7, -0.6], [-0.45, -0.65], [-0.3, -0.95], [0.1, -1], [0.4, -0.7], [0.7, -0.65], [0.8, -0.35], [0.55, -0.18], [-0.5, -0.18]]],
  mastercard: [circle(-0.35, 0, 0.65), circle(0.35, 0, 0.65)],
  capitalone: [
    [[-1, -0.65], [0.75, -0.65], [0.75, 0.5], [-1, 0.5], [-1, -0.65]],
    [[-1, -0.3], [0.75, -0.3]], [[-0.7, 0.15], [-0.3, 0.15]],
    [[0, 0.8], [1, 0.8], [0.75, 0.55]], [[1, 0.8], [0.75, 1.05]],
  ],
  lvlup: [[[-0.9, 0.8], [-0.9, 0.25], [-0.3, 0.25], [-0.3, -0.3], [0.3, -0.3], [0.3, -0.85], [0.9, -0.85]], [[0.6, -1.1], [0.9, -0.85], [0.6, -0.6]]],
  nutrify: [circle(0, 0, 0.8), [[-0.65, 0.6], [-0.2, 0.1], [0.45, -0.55]], [[-0.2, 0.1], [-0.25, -0.45]], [[-0.2, 0.1], [0.4, 0.15]]],
  utdallas: [[[-1, -0.2], [0, -0.7], [1, -0.2], [0, 0.3], [-1, -0.2]], [[-0.6, 0.05], [-0.6, 0.55], [0, 0.8], [0.6, 0.55], [0.6, 0.05]]],
  github: [[[-0.8, -0.1], [-0.55, -0.4], [-0.8, -0.7]], [[0.8, -0.1], [0.55, -0.4], [0.8, -0.7]], [[-0.25, -0.85], [0.25, -0.85], [-0.25, 0.85]]],
  linkedin: [circle(-0.65, -0.65, 0.1), [[-0.65, -0.25], [-0.65, 0.8]], [[-0.15, 0.8], [-0.15, -0.25], [-0.15, 0.05], [0.25, -0.25], [0.65, -0.15], [0.75, 0.15], [0.75, 0.8]]],
  x: [[[-0.7, -0.8], [0.7, 0.8]], [[0.7, -0.8], [-0.7, 0.8]]],
  email: [[[-1, -0.65], [1, -0.65], [1, 0.65], [-1, 0.65], [-1, -0.65], [0, 0.1], [1, -0.65]]],
  chat: [circle(-0.3, -0.25, 0.65), [[-0.65, 0.28], [-0.8, 0.65], [-0.25, 0.4]], [[0.4, -0.2], [0.85, 0], [0.9, 0.45], [0.7, 0.65], [0.85, 0.9], [0.3, 0.7]]],
};

// Sample by segment length so grains are distributed evenly around each shape.
function sampleShape(paths) {
  const segments = paths.flatMap(path => path.slice(1).map((end, index) => {
    const start = path[index];
    return { start, end, length: Math.hypot(end[0] - start[0], end[1] - start[1]) };
  }));
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);
  return Array.from({ length: 1100 }, (_, index) => {
    let distance = index / 1100 * total;
    let segment = segments[segments.length - 1];
    for (const candidate of segments) {
      segment = candidate;
      if (distance <= candidate.length) break;
      distance -= candidate.length;
    }
    const t = Math.min(1, distance / segment.length);
    return [segment.start[0] + (segment.end[0] - segment.start[0]) * t,
      segment.start[1] + (segment.end[1] - segment.start[1]) * t];
  });
}
const samples = Object.fromEntries(Object.entries(shapes).map(([key, paths]) => [key, sampleShape(paths)]));
const links = [
  ['getprismo.dev', 'prismo'], ['tr8de.vercel.app', 'tr8de'], ['ghostedai.net', 'ghosted'],
  ['mastercard.com', 'mastercard'], ['capitalone.com', 'capitalone'], ['lvlup.vc', 'lvlup'],
  ['nutrifyai.app', 'nutrify'], ['utdallas.edu', 'utdallas'], ['github.com', 'github'],
  ['linkedin.com', 'linkedin'], ['x.com', 'x'], ['mailto:', 'email'], ['calendly.com', 'chat'],
];

// Original assets are sampled in the browser. Backgrounds and screenshot chrome
// never become particles. Pale marks use charcoal so they read on ivory.
const cycle = ['prismo', 'tr8de', 'ghosted', 'capitalone', 'mastercard', 'nutrify', 'lvlup', 'utdallas'];
const openingDelay = 1800;
const cycleDuration = 10000;
const formationDuration = 4600;

const logoSources = {
  prismo: { src: '/images/prismo-logo.png', mode: 'color' },
  tr8de: { src: '/images/hover-logos/tr8de.png', mode: 'light', crop: [10, 53, 247, 59] },
  ghosted: { src: '/images/ghosted-logo.png', mode: 'white' },
  capitalone: { src: '/images/hover-logos/capitalone.png', mode: 'red' },
  lvlup: { src: '/images/hover-logos/lvlup.png', mode: 'pink' },
  nutrify: { src: '/images/hover-logos/nutrify.png', mode: 'green' },
  utdallas: { src: '/images/hover-logos/utdallas.png', mode: 'color' },
};

function sampleLogo(image, { mode, crop }) {
  const source = crop || [0, 0, image.naturalWidth, image.naturalHeight];
  const raster = document.createElement('canvas');
  const ratio = Math.min(300 / source[2], 300 / source[3]);
  raster.width = Math.max(1, Math.round(source[2] * ratio));
  raster.height = Math.max(1, Math.round(source[3] * ratio));
  const pen = raster.getContext('2d', { willReadFrequently: true });
  if (!pen) return [];
  pen.drawImage(image, ...source, 0, 0, raster.width, raster.height);
  const pixels = pen.getImageData(0, 0, raster.width, raster.height).data;
  const points = [];
  for (let y = 0; y < raster.height; y++) {
    for (let x = 0; x < raster.width; x++) {
      const index = (y * raster.width + x) * 4;
      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const alpha = pixels[index + 3];
      const high = Math.max(red, green, blue);
      const low = Math.min(red, green, blue);
      const saturation = high - low;
      let visible = saturation > 35 && high > 75;
      if (mode === 'red') visible = red > 90 && red > green * 1.5 && red > blue * 1.4;
      if (mode === 'green') visible = green > 65 && green > red * 1.15 && green > blue * 1.2;
      if (mode === 'pink') visible = high > 75 && saturation > 8 && red > green * 1.02 && blue > green * 1.01;
      if (mode === 'white') visible = low > 180;
      if (mode === 'light') visible = low > 160 || green > 100 && green > red * 1.5;
      if (alpha > 128 && visible) {
        const color = low > 180 && saturation < 22 && mode !== 'pink' ? [41, 40, 36] : [red, green, blue];
        points.push({ x, y, color });
      }
    }
  }
  if (!points.length) return [];
  const minX = Math.min(...points.map(point => point.x));
  const maxX = Math.max(...points.map(point => point.x));
  const minY = Math.min(...points.map(point => point.y));
  const maxY = Math.max(...points.map(point => point.y));
  const size = Math.max(maxX - minX, maxY - minY, 1) / 2;
  return Array.from({ length: 2100 }, (_, index) => {
    // A deterministic permutation avoids horizontal bands during the morph.
    const point = points[Math.floor(((index * 0.61803398875) % 1) * points.length)];
    return [(point.x - (maxX + minX) / 2) / size,
      (point.y - (maxY + minY) / 2) / size, ...point.color];
  });
}

export default function PaperAtmosphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame;
    let previous = null;
    let elapsed = 0;
    let lastDraw = null;
    let stepDuration = 33;
    let cycleClock = 0;
    let resumeAt = 0;
    let scrollUntil = 0;
    let manual = null;
    let portraitBounds;
    let active = null;
    let hovered = null;
    let focused = null;
    let textAreas = [];
    let bounds;
    let wordmarks = {};
    let fallbackSamples = {};
    let formation = 0;
    const rows = 24;
    let columns = innerWidth <= 600 ? 96 : 140;
    const rowColors = Array.from({ length: rows }, () => [0, 0, 0]);
    const logoSamples = {};
    let disposed = false;

    function makeWordmarks() {
      const labels = { prismo: 'prismo / agent control', tr8de: 'tr8de / market intelligence',
        ghosted: 'ghosted / cloud deployment', mastercard: 'mastercard',
        capitalone: 'capital one / payments', lvlup: 'lvlup / early stage',
        nutrify: 'nutrify ai / nutrition', utdallas: 'ut dallas',
        github: 'github / source', linkedin: 'linkedin', x: 'x',
        email: 'email', chat: 'schedule a chat' };
      const paper = document.createElement('canvas');
      paper.width = 420;
      paper.height = 36;
      const pen = paper.getContext('2d');
      if (!pen) return;
      wordmarks = Object.fromEntries(Object.entries(labels).map(([key, label]) => {
        pen.clearRect(0, 0, 420, 36);
        pen.fillStyle = '#292824';
        pen.font = '19px sans-serif';
        pen.textAlign = 'center';
        pen.fillText(label, 210, 25);
        const pixels = pen.getImageData(0, 0, 420, 36).data;
        const points = [];
        for (let y = 0; y < 36; y += 2) {
          for (let x = 0; x < 420; x += 2) {
            if (pixels[(y * 420 + x) * 4 + 3] > 100) points.push([(x - 210) / 170, y / 170 + 1.35]);
          }
        }
        return [key, points];
      }));
    }

    function createGrains() {
      return Array.from({ length: rows * columns }, (_, index) => ({
        u: Math.floor(index / rows) / columns,
        row: index % rows,
        x: null, y: null, color: [83, 101, 80],
        jitter: Math.sin(index * 13.37),
        verticalJitter: Math.cos(index * 7.1),
        paint: '',
      }));
    }
    let grains = createGrains();

    function measure() {
      width = innerWidth;
      height = innerHeight;
      const nextColumns = width <= 600 ? 96 : 140;
      if (columns !== nextColumns) {
        columns = nextColumns;
        grains = createGrains();
      }
      const scale = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * scale;
      canvas.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      bounds = document.querySelector('main').getBoundingClientRect();
      textAreas = [...document.querySelectorAll('main p, main h1, main h2, .projects li > span, .connect-links, .portrait-frame')]
        .map(element => element.getBoundingClientRect());
      portraitBounds = document.querySelector('.portrait-frame').getBoundingClientRect();
      draw(motion.matches);
    }

    function draw(snap = false, freeze = false) {
      context.clearRect(0, 0, width, height);
      const time = elapsed / 1000;
      const shape = logoSamples[active] || fallbackSamples[active] || null;
      const margin = width - bounds.right;
      const narrow = width <= 600;
      const radius = margin > 140 ? Math.min(125, margin * 0.37) : narrow ? Math.min(65, width * 0.16) : 72;
      const centerX = margin > 140 ? bounds.right + margin * 0.5
        : narrow ? (portraitBounds.right + width) / 2 : portraitBounds.left + portraitBounds.width / 2;
      const centerY = margin > 140 ? height * 0.47
        : narrow ? portraitBounds.top + portraitBounds.height / 2 : portraitBounds.bottom + 115;
      const settle = 1 - Math.exp(-stepDuration / (manual ? 145 : shape ? 260 : 350));
      const colorSettle = 1 - Math.exp(-stepDuration / 140);
      const formationSettle = 1 - Math.exp(-stepDuration / 350);
      if (!freeze) formation = snap ? Number(Boolean(shape))
        : formation + (Number(Boolean(shape)) - formation) * formationSettle;
      const scattering = Math.sin(formation * Math.PI) * 9;
      rowColors.forEach(color => { color[0] = 0; color[1] = 0; color[2] = 0; });

      // Position and color evolve together; the strand colors lead the gathering sand.
      for (let index = 0; index < grains.length; index++) {
        const grain = grains[index];
        if (!freeze) {
          let x;
          let y;
          let red = 83;
          let green = 101;
          let blue = 80;
          if (shape) {
            const point = shape[Math.floor(index / grains.length * shape.length)];
            if (point.length > 2) {
              red = point[2];
              green = point[3];
              blue = point[4];
            }
            x = centerX + point[0] * radius + grain.jitter * (0.55 + scattering);
            y = centerY + point[1] * radius + grain.verticalJitter * (0.55 + scattering);
          } else {
            const t = (grain.u + time * 0.007) % 1;
            const layer = grain.row / (rows - 1);
            const gather = Math.sin(t * Math.PI) ** 2;
            x = t * (width + 120) - 60;
            y = height * (0.48 + (layer - 0.5) * (0.5 + 0.3 * (1 - gather)))
              + Math.sin(t * Math.PI * 2 + time * 0.07 + layer * 0.4) * height * 0.17
              + Math.sin(t * Math.PI * 3 - time * 0.04) * height * 0.07 * gather;
          }
          if (snap || grain.x === null) {
            grain.x = x;
            grain.y = y;
          } else {
            grain.x += (x - grain.x) * settle;
            grain.y += (y - grain.y) * settle;
          }
          grain.color[0] += (red - grain.color[0]) * (snap ? 1 : colorSettle);
          grain.color[1] += (green - grain.color[1]) * (snap ? 1 : colorSettle);
          grain.color[2] += (blue - grain.color[2]) * (snap ? 1 : colorSettle);
          grain.paint = 'rgb(' + Math.round(grain.color[0]) + ',' + Math.round(grain.color[1]) + ',' + Math.round(grain.color[2]) + ')';
        }
        const rowColor = rowColors[grain.row];
        rowColor[0] += grain.color[0];
        rowColor[1] += grain.color[1];
        rowColor[2] += grain.color[2];
      }

      // One stroke per strand replaces thousands of individual canvas strokes.
      const connection = Math.pow(1 - formation, 1.7);
      const lineOpacity = (0.14 + Math.sin(formation * Math.PI) * 0.12) * connection;
      context.lineWidth = 0.65;
      if (lineOpacity > 0.002) {
        context.globalAlpha = lineOpacity;
        const maxDistanceSquared = (width / 18) ** 2;
        for (let row = 0; row < rows; row++) {
          const color = rowColors[row];
          context.strokeStyle = 'rgb(' + Math.round(color[0] / columns) + ',' + Math.round(color[1] / columns) + ',' + Math.round(color[2] / columns) + ')';
          context.beginPath();
          for (let index = row + rows; index < grains.length; index += rows) {
            const grain = grains[index];
            const preceding = grains[index - rows];
            const dx = grain.x - preceding.x;
            const dy = grain.y - preceding.y;
            if (dx * dx + dy * dy < maxDistanceSquared) {
              context.moveTo(preceding.x, preceding.y);
              context.lineTo(grain.x, grain.y);
            }
          }
          context.stroke();
        }
      }

      context.globalAlpha = 0.055 + formation * 0.65;
      const size = 0.5 + formation * 0.45;
      for (const grain of grains) {
        context.fillStyle = grain.paint;
        context.fillRect(grain.x, grain.y, size, size);
      }
      context.globalAlpha = 1;
      context.save();
      context.globalCompositeOperation = 'destination-out';
      textAreas.forEach(rect => context.fillRect(rect.left - 8, rect.top - 6, rect.width + 16, rect.height + 12));
      context.restore();
    }

    function automaticKey() {
      if (cycleClock < openingDelay) return null;
      const position = cycleClock - openingDelay;
      const key = cycle[Math.floor(position / cycleDuration) % cycle.length];
      // Avoid substituting an illustrative symbol while a logo is downloading.
      if (key in logoSources && !logoSamples[key]) return null;
      return position % cycleDuration < formationDuration ? key : null;
    }

    function animate(now) {
      const delta = previous === null ? 0 : Math.min(now - previous, 60);
      previous = now;
      elapsed += delta;
      const scrolling = now < scrollUntil;
      if (!manual && elapsed >= resumeAt && !scrolling) cycleClock += delta;
      active = manual || (elapsed >= resumeAt ? automaticKey() : null);
      if (lastDraw === null || now - lastDraw >= 8) {
        stepDuration = lastDraw === null ? 33 : Math.min(now - lastDraw, 100);
        if (!scrolling) draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(animate);
    }

    function update() {
      cancelAnimationFrame(frame);
      previous = null;
      lastDraw = null;
      if (document.hidden) return;
      if (!motion.matches) frame = requestAnimationFrame(animate);
      else {
        active = manual;
        draw(true);
      }
    }

    function resolve() {
      const link = hovered || focused;
      const next = link ? links.find(([href]) => link.href.includes(href))?.[1] || null : null;
      if (manual && !next) {
        // Release back into the current before the automatic sequence continues.
        resumeAt = elapsed + 2600;
        if (cycleClock >= openingDelay) {
          const position = cycleClock - openingDelay;
          cycleClock = openingDelay + Math.floor(position / cycleDuration) * cycleDuration + formationDuration;
        }
      }
      manual = next;
      active = manual;
      if (motion.matches) draw(true);
    }
    function over(event) {
      if (event.pointerType === 'touch') return;
      hovered = event.target.closest('a');
      resolve();
    }
    function leave() { hovered = null; resolve(); }
    function focus(event) { focused = event.target.closest('a'); resolve(); }
    function blur(event) { focused = event.relatedTarget?.closest?.('a') || null; resolve(); }

    function scroll() {
      scrollUntil = performance.now() + 800;
      bounds = document.querySelector('main').getBoundingClientRect();
      portraitBounds = document.querySelector('.portrait-frame').getBoundingClientRect();
      textAreas = [...document.querySelectorAll('main p, main h1, main h2, .projects li > span, .connect-links, .portrait-frame')]
        .map(element => element.getBoundingClientRect());
      draw(motion.matches, !motion.matches);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(document.querySelector('main'));
    makeWordmarks();
    fallbackSamples = Object.fromEntries(Object.keys(samples).map(key => [key, [...samples[key], ...(wordmarks[key] || [])]]));
    Object.entries(logoSources).forEach(([key, config]) => {
      const image = new Image();
      image.src = config.src;
      image.decode().then(() => {
        if (disposed) return;
        const points = sampleLogo(image, config);
        if (points.length) logoSamples[key] = points;
        if (motion.matches) draw(true);
      }).catch(() => {
        // Existing line symbols remain available if an asset cannot be loaded.
      });
    });
    measure();
    update();
    addEventListener('resize', measure);
    addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', leave);
    document.addEventListener('focusin', focus);
    document.addEventListener('focusout', blur);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener('resize', measure);
      removeEventListener('scroll', scroll);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('focusin', focus);
      document.removeEventListener('focusout', blur);
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <canvas className="paper-atmosphere" ref={canvasRef} aria-hidden="true" />;
}
