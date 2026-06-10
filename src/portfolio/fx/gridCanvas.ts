export function initGridCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let w = 0,
    h = 0,
    dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  const gap = 38;
  let pts: { x: number; y: number }[] = [];

  function build() {
    const r = canvas.getBoundingClientRect();
    w = r.width;
    h = r.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pts = [];
    for (let y = 0; y <= h + gap; y += gap)
      for (let x = 0; x <= w + gap; x += gap) pts.push({ x, y });
  }

  function onMove(e: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    mouse.tx = e.clientX - r.left;
    mouse.ty = e.clientY - r.top;
  }
  function onLeave() {
    mouse.tx = -9999;
    mouse.ty = -9999;
  }

  let raf = 0;
  function tick() {
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    ctx.clearRect(0, 0, w, h);
    const R = 220;
    for (const p of pts) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      let ox = 0,
        oy = 0,
        alpha = 0.18;
      if (d < R) {
        const f = 1 - d / R;
        const push = f * 18;
        ox = (dx / (d || 1)) * push;
        oy = (dy / (d || 1)) * push;
        alpha = 0.18 + f * 0.6;
      }
      ctx.fillStyle = `rgba(91,140,255,${alpha})`;
      ctx.fillRect(p.x + ox - 1, p.y + oy - 1, 1.5, 1.5);
    }
    raf = requestAnimationFrame(tick);
  }

  build();
  tick();
  window.addEventListener("resize", build);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseleave", onLeave);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", build);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseleave", onLeave);
  };
}
