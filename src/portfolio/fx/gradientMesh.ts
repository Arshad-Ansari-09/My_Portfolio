export function initGradientMesh(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;
  const blobs = [
    { x: 0.25, y: 0.3, r: 0.5, c: "rgba(91,140,255,0.45)", phase: 0 },
    { x: 0.75, y: 0.4, r: 0.5, c: "rgba(255,184,107,0.35)", phase: 2 },
    { x: 0.5, y: 0.8, r: 0.55, c: "rgba(124,255,178,0.35)", phase: 4 },
  ];
  function build() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  let t = 0, raf = 0;
  function tick() {
    t += 0.005;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);
    for (const b of blobs) {
      const cx = (b.x + Math.cos(t + b.phase) * 0.08) * w;
      const cy = (b.y + Math.sin(t + b.phase) * 0.08) * h;
      const rr = b.r * Math.max(w, h);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
      g.addColorStop(0, b.c);
      g.addColorStop(1, "rgba(10,10,10,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    raf = requestAnimationFrame(tick);
  }
  build(); tick();
  window.addEventListener("resize", build);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", build); };
}
