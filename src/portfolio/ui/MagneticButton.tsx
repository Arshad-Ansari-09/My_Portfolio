import { useEffect, useRef, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap } from "gsap";

type Props = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  ghost?: boolean;
  liquid?: boolean;
  strength?: number;
};

export function MagneticButton({
  children,
  ghost,
  liquid,
  strength = 0.35,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const cls = ["btn", "magnetic", ghost && "btn--ghost", liquid && "btn--liquid", className]
    .filter(Boolean)
    .join(" ");
  return (
    <a ref={ref} className={cls} {...rest}>
      {children}
    </a>
  );
}
