import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { initGridCanvas } from "./fx/gridCanvas";
import { MagneticButton } from "./ui/MagneticButton";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const c = canvasRef.current!;
    const stopGrid = initGridCanvas(c);
    const onMove = (e: MouseEvent) => {
      const l = lightRef.current!;
      l.style.setProperty("--mx", `${e.clientX}px`);
      l.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);

    const letters = titleRef.current!.querySelectorAll(".word span");
    gsap.fromTo(
      letters,
      { y: "110%" },
      { y: "0%", duration: 1.1, ease: "power4.out", stagger: 0.06, delay: 0.2 },
    );
    gsap.from(".hero__meta, .hero__sub, .hero__cta, .hero__footer", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.7,
    });

    return () => {
      stopGrid();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const TITLE = ["I", "BUILD", "SYSTEMS", "THAT", "HOLD", "UP."];

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div ref={lightRef} className="hero__light" />
      <div
        className="hero__shape hero__shape--circle"
        style={{ top: "15%", right: "8%", width: 220, height: 220 }}
      />
      <div
        className="hero__shape"
        style={{ bottom: "22%", left: "6%", width: 120, height: 120, transform: "rotate(35deg)" }}
      />
      <div
        className="hero__shape"
        style={{ top: "55%", right: "20%", width: 60, height: 60, transform: "rotate(15deg)" }}
      />

      <div className="hero__inner">
        <div className="hero__meta">
          <span>Hi, I'm Arshad Ansari.</span>
        </div>

        <h1 className="hero__title" ref={titleRef}>
          {TITLE.map((w, i) => (
            <span className="word" key={i}>
              <span>{i === 5 ? <em>{w}</em> : w}</span>
            </span>
          ))}
        </h1>

        <p className="hero__sub">
          Full-stack engineer focused on architecture, performance, cloud systems, real-time
          communication, and AI integrations. I build software that holds its shape under load.
        </p>

        <div className="hero__cta">
          <MagneticButton href="#projects">
            <span className="dot" /> View Work
          </MagneticButton>
          <MagneticButton href="#contact" ghost>
            Contact Me
          </MagneticButton>
        </div>
      </div>

      <div className="hero__footer">
        <span>© 2026 — Arshad Ansari</span>
        <div className="hero__scroll">Scroll</div>
        <span> portfolio</span>
      </div>
    </section>
  );
}
