import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initNeuralNet } from "./fx/neuralNet";

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  ["LangChain", "App/Web Integration"],
  ["Prompt Engineering", "Context & Framing"],
  ["n8n", "Workflow Automation"],
  ["Smart Features", "Semantic Search"],
  ["AI Utilities", "Structured Outputs"],
];

export function AILab() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stop = initNeuralNet(canvasRef.current!);
    const ctx = gsap.context(() => {
      gsap.from(".ai__chip", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        x: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, ref);
    return () => {
      stop();
      ctx.revert();
    };
  }, []);

  return (
    <section className="section ai" id="ai" ref={ref}>
      <canvas className="ai__canvas" ref={canvasRef} />
      <div className="ai__overlay">
        <div>
          <div className="section__num">06 / Intelligence Layer</div>
          <h2 className="section__title">AI, integrated smartly</h2>
          <p style={{ color: "var(--paper-dim)", maxWidth: 480, lineHeight: 1.6 }}>
            I approach software engineering with a product-first mindset. While my core strength is
            building scalable full-stack web applications, I leverage modern orchestration tools
            like LangChain and n8n to integrate intelligent automations and AI features seamlessly
            into production environments.
          </p>
        </div>
        <div className="ai__chips">
          {CHIPS.map(([a, b]) => (
            <div className="ai__chip" key={a}>
              <span>
                <b /> {a}
              </span>
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
