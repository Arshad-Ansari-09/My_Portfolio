import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import snapNotes from "@/assets/snap-notes-mockup.jpg";
import realtimeChat from "@/assets/realtime-chat-mockup.jpg";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: "01",
    projectUrl: "https://snap-notes-4360.onrender.com/",
    title: "Snap Notes",
    img: snapNotes,
    desc: "Enables students to securely upload, discover, and share handwritten notes and study resources through authenticated APIs and cloud-based storage.",
    stats: [
      { v: "<150ms", l: "Response time" },
      { v: "JWT", l: "Auth" },
      { v: "MVC", l: "Architecture" },
    ],
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary", "EJS", "REST"],
    arch: ["Client", "Express API", "MongoDB", "Cloudinary"],
  },
  {
    num: "02",
    projectUrl: "https://chatshot.lovable.app/",
    title: "Real-Time Chat",
    img: realtimeChat,
    desc: "A real-time social platform combining private messaging, World Chat, and Stories with instant synchronization and reliable cloud-backed data management.",
    stats: [
      { v: "<60ms", l: "Sync" },
      { v: "Realtime", l: "Channels" },
      { v: "Media", l: "Engine" },
    ],
    tags: ["React", "TypeScript", "Supabase", "Realtime", "Edge"],
    arch: ["React", "Realtime Channel", "Postgres", "Storage"],
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const rail = railRef.current!;

    const ctx = gsap.context(() => {
      // Horizontal scroll tween — NO dwell delay, starts immediately
      gsap.to(rail, {
        x: () => -(rail.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: () => `+=${rail.scrollWidth - window.innerWidth}`,
          pin: true,
          pinSpacing: true, // ← FIX: prevents section collapse
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // 3D tilt on cards
      track.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--mx", `${x * 100}%`);
          card.style.setProperty("--my", `${y * 100}%`);
          gsap.to(card, {
            rotateY: (x - 0.5) * 8,
            rotateX: -(y - 0.5) * 6,
            duration: 0.6,
            ease: "power3.out",
            transformPerspective: 1000,
          });
        };
        const onLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
          });

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      // Refresh ScrollTrigger after images load
      const images = rail.querySelectorAll("img");
      let loadedCount = 0;
      const totalImages = images.length;
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          ScrollTrigger.refresh();
        }
      };
      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener("load", onImageLoad);
          img.addEventListener("error", onImageLoad);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ position: "relative" }}>
      {/* Header — scrolls normally, NOT pinned */}
      <div className="section" style={{ padding: "6rem 6vw 2rem" }}>
        <div className="section__num">03 / Selected Work</div>
        <h2 className="section__title">Two builds, in production.</h2>
      </div>

      {/* Horizontal scroll track — ONLY this gets pinned */}
      <div className="projects__track" ref={trackRef}>
        <div className="projects__rail" ref={railRef}>
          {PROJECTS.map((p) => (
            <article key={p.title} className="project-card">
              <div className="project-card__media">
                <div className="project-card__frame">
                  <span />
                  <span />
                  <span />
                </div>
                <img src={p.img} alt={p.title} loading="lazy" width={1600} height={1024} />
              </div>
              <div className="project-card__body">
                <span className="project-card__num">
                  Project {p.num} ·{" "}
                  <a href={p.projectUrl} target="_blank" title="Open in new tab" rel="noreferrer">
                    Live↗
                  </a>
                </span>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__stats">
                  {p.stats.map((s) => (
                    <div key={s.l} className="project-card__stat">
                      <b>{s.v}</b>
                      <span>{s.l}</span>
                    </div>
                  ))}
                </div>
                <div className="project-card__tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-card__arch">
                  <i /> Flow:
                  {p.arch.map((a, i) => (
                    <span key={a}>
                      <em>{a}</em>
                      {i < p.arch.length - 1 ? " →" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
          <div style={{ flex: "0 0 10vw" }} />
        </div>
      </div>
    </section>
  );
}
