import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const KEYWORDS = ["SYSTEMS", "ARCHITECTURE", "REAL-TIME", "DISTRIBUTED", "SCALABLE", "AI"];
const NAME = "ARSHAD ANSARI";

export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    const root = rootRef.current!;
    const letters = root.querySelectorAll(".loader__name span");
    const line = root.querySelector(".loader__line");
    const curtain = root.querySelector(".loader__curtain");
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(line, { scaleX: 1, duration: 0.9, ease: "power4.inOut" })
      .to(letters, { y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power3.out" }, "-=0.3")
      .add(() => {
        let i = 0;
        const kw = keywordRef.current!;
        const id = window.setInterval(() => {
          kw.textContent = KEYWORDS[i % KEYWORDS.length];
          i++;
          if (i >= KEYWORDS.length) window.clearInterval(id);
        }, 130);
      })
      .to({}, { duration: 0.95 })
      .to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power3.inOut" })
      .to(curtain, { y: "-100%", duration: 1.1, ease: "power4.inOut" }, "-=0.2")
      .set(root, { display: "none" });
    return () => { tl.kill(); };
  }, [onDone]);

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader__corner loader__corner--tl">Boot · 2026</div>
      <div className="loader__corner loader__corner--tr">v 1.0.0</div>
      <div className="loader__corner loader__corner--br">Bareilly · IN</div>
      <div className="loader__line" />
      <div className="loader__name" aria-label={NAME}>
        {NAME.split("").map((c, i) => (
          <span key={i}>{c === " " ? "\u00A0" : c}</span>
        ))}
      </div>
      <div className="loader__keyword">
        Initialising · <b><span ref={keywordRef}>SYSTEMS</span></b>
      </div>
      <div className="loader__curtain" />
    </div>
  );
}
