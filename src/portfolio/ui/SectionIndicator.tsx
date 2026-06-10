import { useEffect, useState } from "react";

const SECTIONS = [
  "hero",
  "manifesto",
  "skills",
  "projects",
  "arch",
  "timeline",
  "ai",
  "certs",
  "contact",
];

export function SectionIndicator() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="section-indicator" aria-label="Section">
      {SECTIONS.map((id) => (
        <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-label={id} />
      ))}
    </nav>
  );
}
