import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { id: "client", label: "Client", x: 10, y: 50, info: "React · TypeScript · Edge-rendered" },
  { id: "api", label: "API", x: 32, y: 25, info: "Express · FastAPI · REST + RPC" },
  { id: "rt", label: "Realtime", x: 32, y: 75, info: "Supabase · Socket.IO · WebSocket" },
  { id: "db", label: "DB", x: 60, y: 50, info: "PostgreSQL · MongoDB · indexed for reads" },
  { id: "cloud", label: "Cloud", x: 88, y: 25, info: "AWS · Cloudinary · CDN-fronted" },
  { id: "ai", label: "AI", x: 88, y: 75, info: "LangChain · LLM APIs · Workflows" },
];

const EDGES: [string, string][] = [
  ["client", "api"],
  ["client", "rt"],
  ["api", "db"],
  ["rt", "db"],
  ["db", "cloud"],
  ["db", "ai"],
];

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ✅ safer trigger (no collapse after pinned sections)
      gsap.from(".arch__node", {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(2)",
      });

      gsap.from(".arch__path", {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      // ✅ FIXED pulse (no DOM timing issues)
      requestAnimationFrame(() => {
        const pulses = el.querySelectorAll<SVGCircleElement>(".arch__pulse");

        pulses.forEach((p, i) => {
          const path = p.previousElementSibling as SVGPathElement;
          if (!path) return;

          const len = path.getTotalLength();
          const o = { t: 0 };

          gsap.to(o, {
            t: 1,
            duration: 2 + (i % 3),
            repeat: -1,
            ease: "none",
            delay: i * 0.3,
            onUpdate: () => {
              const pt = path.getPointAtLength(o.t * len);
              p.setAttribute("cx", String(pt.x));
              p.setAttribute("cy", String(pt.y));
            },
          });
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section arch" id="arch" ref={ref}>
      <div className="section__num">04 / Mental Model</div>
      <h2 className="section__title">How the pieces fit.</h2>

      <div className="arch__diagram">
        <svg className="arch__svg" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          {EDGES.map(([a, b], i) => {
            const A = NODES.find((n) => n.id === a)!;
            const B = NODES.find((n) => n.id === b)!;

            const mx = (A.x + B.x) / 2;
            const my = (A.y + B.y) / 2;

            const d = `M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`;

            return (
              <g key={i}>
                <path className="arch__path" d={d} />
                <circle className="arch__pulse" cx={A.x} cy={A.y} r="0.6" />
              </g>
            );
          })}
        </svg>

        {NODES.map((n) => (
          <div key={n.id} className="arch__node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <b>{n.label[0]}</b>
            <span>{n.label}</span>
            <i>{n.info}</i>
          </div>
        ))}
      </div>
    </section>
  );
}
