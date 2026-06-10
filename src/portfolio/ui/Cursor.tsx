import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let dx = 0,
      dy = 0,
      rx = 0,
      ry = 0,
      mx = 0,
      my = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, .magnetic, input, textarea")) {
        dot.classList.add("is-hover");
        ring.classList.add("is-hover");
      } else {
        dot.classList.remove("is-hover");
        ring.classList.remove("is-hover");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor cursor--ring" />
    </>
  );
}
