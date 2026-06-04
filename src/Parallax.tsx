import type { CSSProperties, ReactNode } from "react";

export type ParallaxAxis = "x" | "y";

// Parses a stagger range of the form "<name> <start>% <name> <end>%"
// (e.g. "cover 0% cover 50%") into its four parts. The cascade offsets the
// start per child; the end is shared so every child lands at the same point.
// Falls back to "cover 0% cover 50%" (reveal completes at viewport center).
function staggerWindow(range: string | undefined) {
  const m = (range ?? "").trim().match(
    /^([\w-]+)\s+([\d.]+)%\s+([\w-]+)\s+([\d.]+)%$/
  );
  if (!m) return { sName: "cover", sPct: 0, eName: "cover", ePct: 50 };
  return { sName: m[1] ?? "cover", sPct: Number(m[2] ?? 0), eName: m[3] ?? "cover", ePct: Number(m[4] ?? 100) };
}

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
  stagger?: number;
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
  stagger,
  range,
  easing,
  className,
  style,
  children,
}: ParallaxProps) {
  const fromPx = from !== undefined ? from : amplitude;
  const toPx = to !== undefined ? to : -amplitude;
  const midPx = mid !== undefined ? mid : (fromPx + toPx) / 2;

  // When stagger is set, the wrapper is not animated — it cascades the
  // animation onto its direct children (see .ouvarov-parallax-stagger in CSS).
  const baseClass = stagger !== undefined ? "ouvarov-parallax-stagger" : "ouvarov-parallax";
  const mergedClassName = className ? `${baseClass} ${className}` : baseClass;

  const vars: Record<string, string | number> = {
    "--ouvarov-parallax-from": `${fromPx}px`,
    "--ouvarov-parallax-mid": `${midPx}px`,
    "--ouvarov-parallax-to": `${toPx}px`,
  };

  if (stagger !== undefined) {
    const w = staggerWindow(range);
    vars["--ouvarov-stagger"] = `${stagger}%`;
    vars["--ouvarov-stagger-rs-name"] = w.sName;
    vars["--ouvarov-stagger-rs"] = `${w.sPct}%`;
    vars["--ouvarov-stagger-re-name"] = w.eName;
    vars["--ouvarov-stagger-re"] = `${w.ePct}%`;
  }

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
  if (range && stagger === undefined) mergedStyle.animationRange = range;
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
