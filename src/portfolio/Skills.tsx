import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATS: { name: string; desc: string; items: string[] }[] = [
  {
    name: "Frontend",
    desc: "Building responsive and interactive user interfaces.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
    ],
  },
  {
    name: "Backend",
    desc: "Scalable APIs, authentication and real-time systems.",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "Authentication (JWT)",
      "FastAPI",
      "API Design",
    ],
  },
  {
    name: "Databases",
    desc: "Modeling, querying and scaling structured & document data.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Supabase"],
  },
  {
    name: "Cloud & DevOps",
    desc: "Deployment, automation and infrastructure management.",
    items: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Cloudinary"],
  },
  {
    name: "AI",
    desc: "LLM integrations, agents and workflow automation.",
    items: ["LangChain", "LLM APIs", "n8n", "AI Workflows", "Prompt Engineering"],
  },
  {
    name: "Tools",
    desc: "Day-to-day craft: editors, debuggers and collaboration.",
    items: ["Git", "GitHub", "VS Code", "Postman", "npm"],
  },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-cell", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
      ref.current!.querySelectorAll<HTMLElement>(".skill-cell").forEach((cell) => {
        const counter = cell.querySelector<HTMLElement>(".skill-cell__count");
        const chips = cell.querySelectorAll<HTMLElement>(".skill-cell__chip");
        ScrollTrigger.create({
          trigger: cell,
          start: "top 85%",
          onEnter: () => {
            if (counter) {
              const v = Number(counter.dataset.val);
              const o = { n: 0 };
              gsap.to(o, {
                n: v,
                duration: 1.2,
                ease: "power3.out",
                onUpdate: () => (counter.textContent = String(Math.round(o.n)).padStart(2, "0")),
              });
            }
            gsap.from(chips, {
              y: 12,
              opacity: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
            });
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills" id="skills" ref={ref}>
      <div className="section__num">02 / Capabilities</div>
      <h2 className="section__title">A toolkit, mapped.</h2>
      <div className="skills__grid">
        {CATS.map((c) => (
          <div key={c.name} className="skill-cell">
            <div className="skill-cell__glow" />
            <div className="skill-cell__head">
              <span className="skill-cell__cat">{c.name}</span>
              <div
                className="skill-cell__count-wrap"
                title={`${c.items.length} skills mapped in ${c.name}`}
              >
                <span className="skill-cell__count" data-val={c.items.length}>
                  00
                </span>
                <span className="skill-cell__count-label">skills</span>
              </div>
            </div>
            <p className="skill-cell__desc">{c.desc}</p>
            <div className="skill-cell__items">
              {c.items.map((name) => (
                <span key={name} className="skill-cell__chip">
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
