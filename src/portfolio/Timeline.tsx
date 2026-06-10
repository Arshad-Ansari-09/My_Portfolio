import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { year: "2024", title: "Engineering Foundations", body: "Learned web development fundamentals through JavaScript, React, and hands-on projects." },
  { year: "2025", title: "Backend Systems", body: "Learned to design APIs, model data, manage authentication, and structure maintainable backend systems."},
  { year: "2025", title: "Applied Engineering", body: "Built Snap Notes and Real-Time Chat with a modular backend focused on maintainability and clean architecture." },
  { year: "2025-2026", title: "AI & Cloud Exploration", body: "Explored LLM workflows and automation tools. Learned AWS, containerization, and CI/CD workflows."},
  { year: "Now", title: "Systems Thinking", body: "Focused on scalability, maintainability, performance, and building reliable software systems." },
];

export function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rail = railRef.current!;
      const dist = rail.scrollWidth - window.innerWidth + 100;
      gsap.to(rail, {
        x: -dist, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current, start: "top top",
          end: () => `+=${dist}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (s) => { if (fillRef.current) fillRef.current.style.transform = `scaleX(${s.progress})`; },
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section timeline" id="timeline" ref={sectionRef} style={{ paddingRight: 0 }}>
      <div style={{ paddingRight: "6vw" }}>
        <div className="section__num">05 / Trajectory</div>
        <h2 className="section__title">3 years of compounding.</h2>
      </div>
      <div className="timeline__rail" ref={railRef}>
        {ITEMS.map((it) => (
          <div key={it.year} className="timeline__item">
            <b>{it.year}</b>
            <h4>{it.title}</h4>
            <p>{it.body}</p>
          </div>
        ))}
        <div style={{ flex: "0 0 20vw" }} />
      </div>
      <div className="timeline__progress"><div className="timeline__progress-fill" ref={fillRef} /></div>
    </section>
  );
}
