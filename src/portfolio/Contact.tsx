import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGradientMesh } from "./fx/gradientMesh";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stop = initGradientMesh(canvasRef.current!);
    const ctx = gsap.context(() => {
      gsap.from(".contact__form, .contact__map", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
      });
      // pin pulse
      gsap.to(".pin-pulse", { r: 8, opacity: 0, duration: 1.4, repeat: -1, ease: "power2.out" });
    }, ref);
    return () => { stop(); ctx.revert(); };
  }, []);

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); };

  return (
    <section className="section contact" id="contact" ref={ref}>
      <canvas className="contact__bg" ref={canvasRef} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="section__num">08 / Signal</div>
        <h2 className="section__title">Let's build something that holds up.</h2>
      </div>
      <div className="contact__inner">
        <form className="contact__form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@domain.com" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="msg">Message</label>
            <textarea id="msg" placeholder="What are we building?" />
          </div>
          <button type="submit" className="btn btn--liquid magnetic" style={{ alignSelf: "flex-start" }}>
            <span className="dot" /> Send Transmission
          </button>
        </form>

        <div className="contact__map">
          <svg viewBox="0 0 200 100" aria-label="World map">
            <defs>
              <pattern id="dots" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.55" fill="rgba(255,255,255,0.18)" />
              </pattern>
            </defs>
            {/* abstract world silhouette */}
            <path d="M10,55 Q30,35 55,40 T100,42 T150,38 T195,55 Q175,72 140,68 T80,72 T25,72 Z" fill="url(#dots)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
            <path d="M40,70 Q55,82 75,80 T110,82 Q90,92 65,90 Z" fill="url(#dots)" />
            {/* Bareilly approx 78.78E 28.36N → x≈143 y≈42 */}
            <circle className="pin" cx="143" cy="42" r="1.6" />
            <circle className="pin pin-pulse" cx="143" cy="42" r="3" opacity="0.6" />
            <line x1="143" y1="42" x2="160" y2="22" stroke="rgba(255,184,107,0.6)" strokeWidth="0.3" />
            <text x="161" y="20" fill="var(--paper)" fontSize="3" fontFamily="var(--font-mono)" letterSpacing="0.3">BAREILLY · IN</text>
          </svg>
          <div className="contact__location">
            <b>Bareilly, Uttar Pradesh</b>
            <span>UTC +5:30 · Remote-friendly</span>
            <a href="mailto:arshadansari12911@gmail.com" style={{ color: "var(--accent-3)", marginTop: "0.8rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem", textDecoration: "none" }}>
              arshadansari12911@gmail.com →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
