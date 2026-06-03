# @ouvarov/scroll-parallax

[![npm version](https://img.shields.io/npm/v/@ouvarov/scroll-parallax.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ouvarov/scroll-parallax?label=gzipped&color=blue)](https://bundlephobia.com/package/@ouvarov/scroll-parallax)
[![types](https://img.shields.io/npm/types/@ouvarov/scroll-parallax)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)
[![license](https://img.shields.io/npm/l/@ouvarov/scroll-parallax)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/@ouvarov/scroll-parallax)](https://www.npmjs.com/package/@ouvarov/scroll-parallax)

One React component for scroll-driven animation. Translate, opacity, scale, rotate — all four scroll-animatable CSS properties in one component, under 1 KB gzipped total runtime. The animation itself is pure CSS `animation-timeline: view()`.

📺 **Live demo & docs:** https://ouvarov.github.io/scroll-parallax/

```
JS:   1.0 KB raw  /  511 B gzipped
CSS:  2.6 KB raw  /  482 B gzipped
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

## Props

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
| `range` | `string` | `'cover 0% cover 100%'` | Any valid [`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) — controls where in the scroll progress the animation plays. |
| `easing` | `string` | `'linear'` | Any valid [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function). |
| `className` | `string` | — | Merged onto the wrapper. |
| `style` | `CSSProperties` | — | Merged onto the wrapper. |
| `children` | `ReactNode` | — | Whatever you want to animate. |

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
