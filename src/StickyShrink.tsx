import type { CSSProperties, ReactNode } from "react";

export interface StickyShrinkProps {
  /** Tall height before scrolling. Number → px, string → used as-is. Default 80. */
  from?: number | string;
  /** Compact height after shrinking. Number → px, string → used as-is. Default 56. */
  to?: number | string;
  /** Scroll distance from the top over which it shrinks. Number → px. Default 200. */
  distance?: number | string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const len = (v: number | string) => (typeof v === "number" ? `${v}px` : v);

/**
 * A `position: sticky` header that shrinks from `from` to `to` over the first
 * `distance` px of page scroll. Pure CSS — no scroll listener, no `useScroll`.
 *
 * Driven by a single registered progress var (`--ouvarov-sticky-progress`,
 * 0 → 1) animated on `scroll(root block)`; the height is derived from it.
 * Children inherit that var, so they can react too — e.g.
 * `scale: calc(1 - 0.25 * var(--ouvarov-sticky-progress))` on a logo.
 *
 * Note: shrinking a header reflows the page below it, so unlike the parallax
 * components this one does touch layout. The cost is bounded — one element and
 * its subtree, only while scrolling the first `distance` px.
 */
export function StickyShrink({
  from = 80,
  to = 56,
  distance = 200,
  className,
  style,
  children,
}: StickyShrinkProps) {
  const vars: Record<string, string | number> = {
    "--ouvarov-sticky-from": len(from),
    "--ouvarov-sticky-to": len(to),
    "--ouvarov-sticky-distance": len(distance),
  };

  const baseClass = "ouvarov-sticky-shrink";
  const mergedClassName = className ? `${baseClass} ${className}` : baseClass;
  const mergedStyle: CSSProperties = { ...style, ...(vars as CSSProperties) };

  return (
    <div className={mergedClassName} style={mergedStyle}>
      {children}
    </div>
  );
}
