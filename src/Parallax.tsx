import type { CSSProperties, ReactNode } from "react";

export type ParallaxAxis = "x" | "y";

export interface ParallaxProps {
  amplitude?: number;
  from?: number;
  to?: number;
  axis?: ParallaxAxis;
  opacityFrom?: number;
  opacityTo?: number;
  range?: string;
  easing?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Parallax({
  amplitude = 30,
  from,
  to,
  axis = "y",
  opacityFrom,
  opacityTo,
  range,
  easing,
  className,
  style,
  children,
}: ParallaxProps) {
  const startPx = from !== undefined ? from : amplitude;
  const endPx = to !== undefined ? to : -amplitude;

  const mergedClassName = className
    ? `uvarov-parallax ${className}`
    : "uvarov-parallax";

  const mergedStyle: CSSProperties = {
    ...style,
    ["--parallax-from" as string]: `${startPx}px`,
    ["--parallax-to" as string]: `${endPx}px`,
  };

  if (opacityFrom !== undefined) {
    (mergedStyle as Record<string, unknown>)["--parallax-opacity-from"] = opacityFrom;
  }
  if (opacityTo !== undefined) {
    (mergedStyle as Record<string, unknown>)["--parallax-opacity-to"] = opacityTo;
  }

  if (range) mergedStyle.animationRange = range;
  if (easing) mergedStyle.animationTimingFunction = easing;

  return (
    <div
      className={mergedClassName}
      data-axis={axis === "x" ? "x" : undefined}
      style={mergedStyle}
    >
      {children}
    </div>
  );
}
