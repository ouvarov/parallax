# @ouvarov/scroll-parallax

[![npm version](https://img.shields.io/npm/v/@ouvarov/scroll-parallax.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ouvarov/scroll-parallax?label=gzipped&color=blue)](https://bundlephobia.com/package/@ouvarov/scroll-parallax)
[![types](https://img.shields.io/npm/types/@ouvarov/scroll-parallax)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
[![license](https://img.shields.io/npm/l/@ouvarov/scroll-parallax)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/@ouvarov/scroll-parallax)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)

One React component for scroll-driven animation. Translate, opacity, scale, rotate — all four scroll-animatable CSS properties in one component, under 1 KB gzipped per imported component. Plus `<FadeOnView>` and `<RevealOnView>`, one-tag wrappers for the common reveal-on-scroll cases, `<ScrollProgress>`, a page-level reading-progress bar, and `<StickyShrink>`, a sticky header that shrinks on scroll. The animation itself is pure CSS `animation-timeline: view()` (or `scroll()` for the page-level ones).

📺 **Live demo & docs:** https://ouvarov.github.io/scroll-parallax/

```
JS:   2.9 KB raw  /  1.2 KB gzipped  (all components; tree-shakes to 268–869 B per component)
CSS:  8.3 KB raw  /  1.9 KB gzipped
```

## Install

```sh
npm i @ouvarov/scroll-parallax
```

## Use

```tsx
import { Parallax } from "@ouvarov/scroll-parallax";

export function Hero() {
  return (
    <Parallax amplitude={30}>
      <img src="/hero.jpg" alt="" />
    </Parallax>
  );
}
```

The CSS is auto-imported by the component — one line is all you need. The image drifts from `+30px` to `-30px` on the Y axis as it passes through the viewport. No `useEffect`, no `IntersectionObserver`, no scroll listener.

### Custom start and end

```tsx
<Parallax from={40} to={-20}>
  <img src="..." />
</Parallax>
```

### Pulse — three-stop animation

Pass `mid` to drift in, then back out. Same trick for opacity (`opacityMid`).

```tsx
<Parallax mid={0} from={40} to={40} opacityFrom={0} opacityMid={1} opacityTo={0}>
  <Card />
</Parallax>
```

Card translates from `+40px` to `0` then back to `+40px`, fading in at the apex and out again — a classic "rise and settle" pulse.

### Scale and rotate

```tsx
<Parallax amplitude={0} scaleFrom={0.8} scaleTo={1} rotateFrom={-4} rotateTo={0}>
  <img src="..." />
</Parallax>
```

`rotateFrom` / `rotateTo` take degrees as numbers. Scale is a unitless multiplier (`1` = original size).

### Opacity ramp

```tsx
<Parallax amplitude={0} opacityFrom={0.2} opacityTo={1}>
  <img src="..." />
</Parallax>
```

### Stagger — cascade across children

Set `stagger` and `<Parallax>` stops animating itself — instead each direct child runs the animation in a cascade. No mapping over children, no JS: each child's `animation-range-start` is shifted by an `:nth-child` rule.

```tsx
<Parallax stagger={6} range="cover 0% cover 50%"
          from={40} to={0} opacityFrom={0} opacityTo={1}>
  {items.map((i) => <Card key={i} />)}
</Parallax>
```

`range` is the cascade window — **you decide where the reveal lands**. The cascade offsets each child's *start* inside it; the *end* is shared, so every child finishes at the same point. `cover 50%` is the viewport center, so the group is fully revealed by the time it's in the reading zone — not only at the very top (`cover 100%`). With `stagger`, give `range` in the explicit `"<name> n% <name> n%"` form (default `cover 0% cover 50%`).

The cascade unit is a **percentage of view progress per child**, not milliseconds — scroll-driven animations ignore time-based `animation-delay`. Child *n* starts at `from + (n−1) × stagger`%. Works best on a group that enters together (a row or grid). Pure CSS, capped at **24 children** (beyond that they share the last offset); keep `from + stagger × count` under the `range` end.

### Compose everything

```tsx
<Parallax
  amplitude={80}
  axis="y"
  opacityFrom={0.3}
  opacityTo={1}
  scaleFrom={0.95}
  scaleTo={1}
  range="entry 0% cover 60%"
  easing="cubic-bezier(0.7, 0, 0.3, 1)"
>
  <img src="..." />
</Parallax>
```

### FadeOnView — the common case

Fade in as the element enters the viewport. No opacity props, no `range` to remember.

```tsx
import { FadeOnView } from "@ouvarov/scroll-parallax";

<FadeOnView>
  <Card />
</FadeOnView>
```

This is exactly `<Parallax opacityFrom={0} opacityTo={1} range="entry">`. Pass `rise` for an upward drift on the way in:

```tsx
<FadeOnView rise={24}>
  <Card />
</FadeOnView>
```

The card starts 24px lower and settles as it fades. `rise={0}` (the default) is a pure fade.

### RevealOnView — animate in at a threshold

The element stays hidden until it reaches a trigger line on the way up — by default the lower third — then plays a short ease-out reveal and holds. Where `FadeOnView` ramps across the whole entry, `RevealOnView` waits at the threshold, then reveals over a brief `span`.

```tsx
import { RevealOnView } from "@ouvarov/scroll-parallax";

<RevealOnView>            {/* opacity 0 → 1, starting at 30% up */}
  <Card />
</RevealOnView>

<RevealOnView effect="scale">   {/* scale 0 → 1 */}
  <Card />
</RevealOnView>

<RevealOnView effect="both" threshold={0.5} span={0.1}>   {/* snappy grow + fade at center */}
  <Card />
</RevealOnView>
```

`threshold={0.3}` with `span={0.15}` maps to `range="cover 30% cover 45%"` — invisible below 30% of the pass, animating in across the next 15%, solid after. Shrink `span` for a snappier entrance.

It's still a scroll-driven animation: at normal scroll speed it reads as an entrance, but scrubbing slowly tracks the scroll, and it's **reversible** (scroll back up past the line and it hides again). A time-based one-shot would need JS, which this package deliberately avoids.

### ScrollProgress — page reading bar

A fixed bar that fills as the whole page scrolls. Drop one tag at the root of your app — no scroll listener, no `useState`. Unlike the rest of the library it tracks the document with `animation-timeline: scroll()`, not a single element's `view()`.

```tsx
import { ScrollProgress } from "@ouvarov/scroll-parallax";

<ScrollProgress />                                  {/* 4px bar at the top, currentColor */}

<ScrollProgress height={6} color="#7c3aed" />       {/* thicker, accent color */}

<ScrollProgress position="bottom" />                {/* pin to the bottom edge */}
```

The fill is a composite-only `scaleX`, so the bar rides the compositor and never lays out or paints while you scroll. It stays active under `prefers-reduced-motion` — it mirrors the native scrollbar rather than adding decorative motion.

### StickyShrink — header that shrinks on scroll

A `position: sticky` header that shrinks from a tall variant to a compact one over the first `distance` px of page scroll. No scroll listener, no `useScroll`.

```tsx
import { StickyShrink } from "@ouvarov/scroll-parallax";

<StickyShrink>                              {/* 80px → 56px over 200px of scroll */}
  <Logo />
  <Nav />
</StickyShrink>

<StickyShrink from={120} to={64} distance={300}>
  <Header />
</StickyShrink>
```

It's driven by a single registered progress variable, `--ouvarov-sticky-progress` (`0 → 1`), animated on `animation-timeline: scroll(root block)`. Children **inherit** it, so they can react to the same scroll without any extra wiring:

```tsx
<StickyShrink>
  {/* logo scales down as the header collapses */}
  <img style={{ scale: "calc(1 - 0.25 * var(--ouvarov-sticky-progress))" }} />
</StickyShrink>
```

Unlike the parallax components, shrinking a header reflows the page below it, so this one **does touch layout** — bounded to one element and its subtree, only while scrolling the first `distance` px. Under `prefers-reduced-motion` it stays at its tall size and never shrinks.

## Props

### `<Parallax>`

| prop | type | default | notes |
|------|------|---------|-------|
| `amplitude` | `number` | `30` | Symmetric drift shortcut. Animates from `+amplitude` to `-amplitude`. Overridden by `from`/`to`. |
| `from` | `number` | — | Start translate in px. |
| `mid` | `number` | `(from + to) / 2` | Middle translate in px (50% keyframe). Set explicitly to create a pulse / three-stop drift. |
| `to` | `number` | — | End translate in px. |
| `axis` | `'x' \| 'y'` | `'y'` | Which axis to drift on. |
| `opacityFrom` | `number` | `1` | Start opacity (0–1). |
| `opacityMid` | `number` | `(opacityFrom + opacityTo) / 2` | Middle opacity (50% keyframe). Set explicitly for fade-in-then-out pulses. |
| `opacityTo` | `number` | `1` | End opacity (0–1). |
| `scaleFrom` | `number` | `1` | Start scale multiplier. |
| `scaleTo` | `number` | `1` | End scale multiplier. |
| `rotateFrom` | `number` | `0` | Start rotation in degrees. |
| `rotateTo` | `number` | `0` | End rotation in degrees. |
| `stagger` | `number` | — | When set, the wrapper isn't animated — each direct child runs the animation, offset by this percentage of view progress per child. `range` sets the window; children share its end. Pure CSS via `:nth-child`, capped at 24 children. |
| `range` | `string` | `'cover 0% cover 100%'`<br/>(`'cover 0% cover 50%'` with `stagger`) | Any valid [`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) — where in the scroll the animation plays. With `stagger`, it's the cascade window (use the `"<name> n% <name> n%"` form); `cover 50%` ends at the viewport center. |
| `easing` | `string` | `'linear'` | Any valid [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function). |
| `className` | `string` | — | Merged onto the wrapper. |
| `style` | `CSSProperties` | — | Merged onto the wrapper. |
| `children` | `ReactNode` | — | Whatever you want to animate. |

### `<FadeOnView>`

Sugar over `<Parallax>`. Forwards `className`, `style` and `easing` unchanged.

| prop | type | default | notes |
|------|------|---------|-------|
| `rise` | `number` | `0` | Upward drift in px on the way in. `0` is a pure fade. |
| `range` | `string` | `'entry'` | Where the fade plays — defaults to the element's entry into the viewport. |

### `<RevealOnView>`

Sugar over `<Parallax>`. Forwards `className` and `style` unchanged.

| prop | type | default | notes |
|------|------|---------|-------|
| `effect` | `'fade' \| 'scale' \| 'both'` | `'fade'` | `fade` ramps opacity 0→1, `scale` grows from 0→1, `both` combines them. Eases in with `ease-out`. |
| `threshold` | `number` | `0.3` | Trigger line — fraction of the element's pass where the reveal starts. Below it, the element is hidden. Clamped to 0–1. |
| `span` | `number` | `0.15` | How much scroll the reveal takes after the threshold. Together: `range="cover {threshold×100}% cover {(threshold+span)×100}%"`. Smaller = snappier. |

### `<ScrollProgress>`

Standalone page-level bar — renders its own fixed `<div>`, takes no children.

| prop | type | default | notes |
|------|------|---------|-------|
| `height` | `number \| string` | `4` | Bar thickness. Number → px; string used as-is. |
| `color` | `string` | `currentColor` | Fill color. |
| `position` | `'top' \| 'bottom'` | `'top'` | Which viewport edge to pin to. |
| `zIndex` | `number` | `2147483647` | Stacking order — defaults high so it sits above page chrome. |
| `className` | `string` | — | Merged onto the bar. |
| `style` | `CSSProperties` | — | Merged onto the bar. |

### `<StickyShrink>`

A `position: sticky` header. Exposes `--ouvarov-sticky-progress` (`0 → 1`) to its subtree.

| prop | type | default | notes |
|------|------|---------|-------|
| `from` | `number \| string` | `80` | Tall height before scroll. Number → px; string used as-is. |
| `to` | `number \| string` | `56` | Compact height after shrinking. Number → px; string used as-is. |
| `distance` | `number \| string` | `200` | Scroll distance from the top over which it shrinks. Number → px. |
| `className` | `string` | — | Merged onto the header. |
| `style` | `CSSProperties` | — | Merged onto the header. |
| `children` | `ReactNode` | — | Header content. Read `var(--ouvarov-sticky-progress)` to react to the shrink. |

The component renders a `<div>` wrapper. The wrapper is the animated element.

Each `<Parallax>` instance is scoped — values don't bleed across siblings.

## Browser support

| Browser | Status |
|---------|--------|
| Chrome / Edge / Opera | ✅ 115+ (Aug 2023) |
| Safari | ✅ 18+ (Sept 2024) |
| Firefox | ⚠ Behind `layout.css.scroll-driven-animations.enabled` flag |
| iOS Safari | ✅ 18+ |
| Older browsers | Element renders normally, no animation |

Reduced motion is respected automatically via `@media (prefers-reduced-motion: reduce)`.

## Why this exists

`animation-timeline: view()` has been stable in Chromium since 2023 and Safari since 2024 — the browser reads scroll progress natively, no JavaScript needed. This package is a typed React wrapper over that native CSS API.

## Caveats

- **Single-purpose.** Translate, opacity, scale and rotate on scroll, nothing else. No spring physics, no gesture handling, no layout animations.
- The `<Parallax>` wrapper adds one DOM node. If that matters, copy the CSS from the source and apply it to your own element.
- **Next.js Pages Router** disallows global CSS imports from non-`_app.tsx` files, so the auto-import will throw at build. Workaround: import `@ouvarov/scroll-parallax/style.css` from `_app.tsx` instead and don't import `Parallax` outside it. App Router has no restriction.

## License

MIT © Olexandr Uvarov
