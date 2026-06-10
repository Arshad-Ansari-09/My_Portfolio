import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { text: "I started with <b>curiosity</b>." },
  { text: "I stayed because <i>systems</i> fascinated me." },
  { text: "I learned the <b>frameworks</b>." },
  { text: "Then I learned what sits <i>underneath</i> them." },
  { text: "Architecture is a form of <b>care</b>." },
];

export function Manifesto() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const statements = root.querySelectorAll<HTMLElement>(".manifesto__statement");
    const bg = root.querySelector<HTMLElement>(".manifesto__bg")!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=" + (STATEMENTS.length * 80) + "%",
          pin: true,
          scrub: 0.6,
          onUpdate: (s) => {
            const idx = Math.min(STATEMENTS.length, Math.floor(s.progress * STATEMENTS.length) + 1);
            if (counterRef.current) counterRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(STATEMENTS.length).padStart(2, "0")}`;
          },
        },
      });
      tl.to(bg, { opacity: 1, duration: 1 }, 0);
      statements.forEach((el, i) => {
        const t = i;
        tl.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, t);
        if (i < statements.length - 1) tl.to(el, { y: -60, opacity: 0, duration: 1 }, t + 1);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" id="manifesto" ref={rootRef}>
      <div className="manifesto__pin">
        <div className="manifesto__bg" />
        <div className="manifesto__counter" ref={counterRef}>01 / {String(STATEMENTS.length).padStart(2, "0")}</div>
        {STATEMENTS.map((s, i) => (
          <p key={i} className="manifesto__statement" dangerouslySetInnerHTML={{ __html: s.text }} />
        ))}
      </div>
    </section>
  );
}
