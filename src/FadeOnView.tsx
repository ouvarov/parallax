import type { CSSProperties, ReactNode } from "react";
import { Parallax } from "./Parallax";

export interface FadeOnViewProps {
  rise?: number;
  range?: string;
  easing?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function FadeOnView({
  rise = 0,
  range = "entry",
  easing,
  className,
  style,
  children,
}: FadeOnViewProps) {
  return (
    <Parallax
      opacityFrom={0}
      opacityTo={1}
      from={rise}
      to={0}
      range={range}
      easing={easing}
      className={className}
      style={style}
    >
      {children}
    </Parallax>
  );
}
