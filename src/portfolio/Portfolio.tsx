import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import "../styles/portfolio.css";

import { Loader } from "./Loader";
import { Cursor } from "./ui/Cursor";
import { ScrollProgress } from "./ui/ScrollProgress";
import { SectionIndicator } from "./ui/SectionIndicator";
import { Hero } from "./Hero";
import { Manifesto } from "./Manifesto";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Architecture } from "./Architecture";
import { Timeline } from "./Timeline";
import { AILab } from "./AILab";
import { Certifications } from "./Certifications";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <div className="portfolio">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <ScrollProgress />
      <SectionIndicator />

      <nav className="nav">
        <div className="nav__brand">
          ARSHAD<b>.</b>ANSARI
        </div>
        <div className="nav__links">
          <a href="#projects">Work</a>
          <a href="#arch">Architecture</a>
          <a href="#ai">AI</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <Hero />
        <Manifesto />
        <Skills />
        <Projects />
        <Architecture />
        <Timeline />
        <AILab />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
