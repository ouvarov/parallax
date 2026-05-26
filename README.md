# @ouvarov/parallax

[![npm version](https://img.shields.io/npm/v/@ouvarov/parallax.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/@ouvarov/parallax)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ouvarov/parallax?label=gzipped&color=blue)](https://bundlephobia.com/package/@ouvarov/parallax)
[![types](https://img.shields.io/npm/types/@ouvarov/parallax)](https://www.npmjs.com/package/@ouvarov/parallax)
[![license](https://img.shields.io/npm/l/@ouvarov/parallax)](LICENSE)
[![downloads](https://img.shields.io/npm/dm/@ouvarov/parallax)](https://www.npmjs.com/package/@ouvarov/parallax)

One React component for scroll-driven animation. Translate, opacity, custom ranges and easings — all under ~350 bytes of JS, zero runtime. The animation itself is pure CSS `animation-timeline: view()`.

📺 **Live demo & docs:** https://ouvarov.github.io/parallax/

```
JS:   556 B raw   /   349 B gzipped
CSS:  1.2 KB raw  /   372 B gzipped
```

## Install

```sh
npm i @ouvarov/parallax
```

## Use

```tsx
import { Parallax } from "@ouvarov/parallax";
import "@ouvarov/parallax/style.css";

export function Hero() {
  return (
    <Parallax amplitude={30}>
      <img src="/hero.jpg" alt="" />
    </Parallax>
  );
}
```

The image drifts from `+30px` to `-30px` on the Y axis as it passes through the viewport. No `useEffect`, no `IntersectionObserver`, no scroll listener.

### Custom start and end

```tsx
<Parallax from={40} to={-20}>
  <img src="..." />
</Parallax>
```

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
| `to` | `number` | — | End translate in px. |
| `axis` | `'x' \| 'y'` | `'y'` | Which axis to drift on. |
| `opacityFrom` | `number` | `1` | Start opacity (0–1). |
| `opacityTo` | `number` | `1` | End opacity (0–1). |
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

- **Single-purpose.** Drift and opacity on scroll, nothing else. No spring physics, no gesture handling, no layout animations.
- The `<Parallax>` wrapper adds one DOM node. If that matters, copy the CSS from the source and apply it to your own element.
- Custom properties (`--parallax-from`, `--parallax-to`, opacity equivalents) are declared globally via `@property`. First library to load wins if multiple register the same name.
- Next.js Pages Router users must import `style.css` from `_app.tsx`. App Router has no restriction.

## License

MIT © Olexandr Uvarov
