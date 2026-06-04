import type { CSSProperties } from "react";

export type ScrollProgressPosition = "top" | "bottom";

export interface ScrollProgressProps {
  /** Bar thickness. Number → px, string → used as-is. Default 4. */
  height?: number | string;
  /** Fill color. Defaults to currentColor. */
  color?: string;
  /** Pin to the top or bottom of the viewport. Default "top". */
  position?: ScrollProgressPosition;
  /** Stacking order. Default a very high value so it sits above page chrome. */
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Fixed page-level progress bar that fills as the document scrolls.
 * Pure CSS via `animation-timeline: scroll(root block)` — zero JS, no
 * scroll listeners, no useState. The fill is a composite-only `scaleX`,
 * so it never triggers layout or paint while scrolling.
 */
export function ScrollProgress({
  height = 4,
  color,
  position = "top",
  zIndex,
  className,
  style,
}: ScrollProgressProps) {
  const vars: Record<string, string | number> = {
    "--ouvarov-scroll-progress-height":
      typeof height === "number" ? `${height}px` : height,
  };
  if (color !== undefined) vars["--ouvarov-scroll-progress-color"] = color;
  if (zIndex !== undefined) vars["--ouvarov-scroll-progress-z"] = zIndex;

  const baseClass = "ouvarov-scroll-progress";
  const mergedClassName = className ? `${baseClass} ${className}` : baseClass;
  const mergedStyle: CSSProperties = { ...style, ...(vars as CSSProperties) };

  return (
    <div
      className={mergedClassName}
      data-position={position === "bottom" ? "bottom" : "top"}
      style={mergedStyle}
      aria-hidden="true"
    />
  );
}
