export function initNeuralNet(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;
  type N = { x: number; y: number; r: number; layer: number; phase: number };
  let nodes: N[] = [];
  const layers = 4;

  function build() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = [];
    const perLayer = [3, 5, 5, 3];
    for (let l = 0; l < layers; l++) {
      const count = perLayer[l];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: (w / (layers + 1)) * (l + 1),
          y: (h / (count + 1)) * (i + 1),
          r: 3 + Math.random() * 2,
          layer: l,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  let t = 0, raf = 0;
  function tick() {
    t += 0.02;
    ctx.clearRect(0, 0, w, h);
    // edges
    for (const a of nodes) {
      for (const b of nodes) {
        if (b.layer === a.layer + 1) {
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, "rgba(124,255,178,0.15)");
          grad.addColorStop(1, "rgba(91,140,255,0.15)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          // traveling pulse
          const pt = (Math.sin(t + a.phase + b.phase) + 1) / 2;
          const px = a.x + (b.x - a.x) * pt;
          const py = a.y + (b.y - a.y) * pt;
          ctx.fillStyle = "rgba(124,255,178,0.9)";
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    // nodes
    for (const n of nodes) {
      const glow = 0.5 + 0.5 * Math.sin(t + n.phase);
      ctx.fillStyle = `rgba(124,255,178,${0.35 + glow * 0.4})`;
      ctx.shadowColor = "rgba(124,255,178,0.7)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + glow, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    raf = requestAnimationFrame(tick);
  }
  build(); tick();
  window.addEventListener("resize", build);
  return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", build); };
}
