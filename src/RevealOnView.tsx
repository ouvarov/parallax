import type { CSSProperties, ReactNode } from "react";
import { Parallax } from "./Parallax";

export type RevealEffect = "fade" | "scale" | "both";

export interface RevealOnViewProps {
  effect?: RevealEffect;
  threshold?: number;
  span?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

export function RevealOnView({
  effect = "fade",
  threshold = 0.3,
  span = 0.15,
  className,
  style,
  children,
}: RevealOnViewProps) {
  const start = Math.round(clamp01(threshold) * 100);
  const end = Math.max(start + 1, Math.round(clamp01(threshold + span) * 100));
  const fade = effect === "fade" || effect === "both";
  const scale = effect === "scale" || effect === "both";

  return (
    <Parallax
      amplitude={0}
      opacityFrom={fade ? 0 : undefined}
      opacityTo={fade ? 1 : undefined}
      scaleFrom={scale ? 0 : undefined}
      scaleTo={scale ? 1 : undefined}
      range={`cover ${start}% cover ${end}%`}
      easing="ease-out"
      className={className}
      style={style}
    >
      {children}
    </Parallax>
  );
}
