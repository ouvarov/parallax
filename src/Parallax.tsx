import type { CSSProperties, ReactNode } from "react";

export type ParallaxAxis = "x" | "y";

export interface ParallaxProps {
  amplitude?: number;
  from?: number;
  mid?: number;
  to?: number;
  axis?: ParallaxAxis;
  opacityFrom?: number;
  opacityMid?: number;
  opacityTo?: number;
  scaleFrom?: number;
  scaleTo?: number;
  rotateFrom?: number;
  rotateTo?: number;
  range?: string;
  easing?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Parallax({
  amplitude = 30,
  from,
  mid,
  to,
  axis = "y",
  opacityFrom,
  opacityMid,
  opacityTo,
  scaleFrom,
  scaleTo,
  rotateFrom,
  rotateTo,
  range,
  easing,
  className,
  style,
  children,
}: ParallaxProps) {
  const fromPx = from !== undefined ? from : amplitude;
  const toPx = to !== undefined ? to : -amplitude;
  const midPx = mid !== undefined ? mid : (fromPx + toPx) / 2;

  const mergedClassName = className
    ? `ouvarov-parallax ${className}`
    : "ouvarov-parallax";

  const vars: Record<string, string | number> = {
    "--ouvarov-parallax-from": `${fromPx}px`,
    "--ouvarov-parallax-mid": `${midPx}px`,
    "--ouvarov-parallax-to": `${toPx}px`,
  };

  if (opacityFrom !== undefined || opacityMid !== undefined || opacityTo !== undefined) {
    const oFrom = opacityFrom ?? 1;
    const oTo = opacityTo ?? 1;
    const oMid = opacityMid ?? (oFrom + oTo) / 2;
    vars["--ouvarov-parallax-opacity-from"] = oFrom;
    vars["--ouvarov-parallax-opacity-mid"] = oMid;
    vars["--ouvarov-parallax-opacity-to"] = oTo;
  }

  if (scaleFrom !== undefined) vars["--ouvarov-parallax-scale-from"] = scaleFrom;
  if (scaleTo !== undefined) vars["--ouvarov-parallax-scale-to"] = scaleTo;
  if (rotateFrom !== undefined) vars["--ouvarov-parallax-rotate-from"] = `${rotateFrom}deg`;
  if (rotateTo !== undefined) vars["--ouvarov-parallax-rotate-to"] = `${rotateTo}deg`;

  const mergedStyle: CSSProperties = { ...style, ...(vars as CSSProperties) };
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
