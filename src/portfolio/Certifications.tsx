import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CERTS = [
  { year: "2025", title: "Responsive Web Design", issuer: "freeCodeCamp", sigil: "300+ hours" },
  { year: "2025", title: "Front-End with Generative AI", issuer: "freeCodeCamp", sigil: "GenAI Track" },
  { year: "2025", title: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification", sigil: "Cloud · Fundamentals" },
  { year: "2025", title: "AWS APAC Solutions Architecture", issuer: "Forage Virtual Experience", sigil: "Elastic Beanstalk · Scaling" },
];

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cert", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
      });
      ref.current!.querySelectorAll<HTMLElement>(".cert").forEach((c) => {
        const onMove = (e: MouseEvent) => {
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(c, { rotateY: x * 10, rotateX: -y * 8, duration: 0.5, transformPerspective: 1000, ease: "power3.out" });
        };
        const onLeave = () => gsap.to(c, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
        c.addEventListener("mousemove", onMove);
        c.addEventListener("mouseleave", onLeave);
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section certs" id="certs" ref={ref}>
      <div className="section__num">07 / Credentials</div>
      <h2 className="section__title">Papers, in the drawer.</h2>
      <div className="certs__grid">
        {CERTS.map((c) => (
          <article key={c.title} className="cert">
            <span className="cert__year">{c.year}</span>
            <h3 className="cert__title">{c.title}</h3>
            <div className="cert__issuer">{c.issuer}</div>
            <div className="cert__sigil"><em>◇</em> {c.sigil}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
