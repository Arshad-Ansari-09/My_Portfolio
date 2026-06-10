const WORDS = ["SYSTEMS", "REAL-TIME", "ARCHITECTURE", "AI", "SCALABLE", "DISTRIBUTED", "CLOUD"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__marquee">
        <div className="footer__marquee__inner">
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i}>{w} ·</span>
          ))}
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 · Arshad Ansari</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="https://github.com/arshad-ansari-09" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/arshad-ansari-profile" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:arshadansari12911@gmail.com">Email</a>
        </div>
        <span>Built with care · Bareilly</span>
      </div>
    </footer>
  );
}
