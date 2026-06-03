# Changelog

## [0.4.0] — 2026-06-03

- New `<FadeOnView>` component. One-tag sugar over `Parallax` for the most common scroll effect — fade in as the element enters the viewport. `<FadeOnView>` with no props equals `<Parallax opacityFrom={0} opacityTo={1} range="entry">`.
- `rise` prop on `FadeOnView` adds an optional upward drift on the way in; `rise={0}` (default) is a pure fade. Forwards `className`, `style` and `easing` to `Parallax`.
- Pure forward, no new CSS or runtime engine — adds ~70 bytes gzipped over the core.

[0.4.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.4.0

## [0.3.0] — 2026-06-03

- Three-stop animation. New `mid` prop for translate and `opacityMid` for opacity — drift in then back out, fade in at the apex then fade out. When not set, `mid` defaults to the midpoint of `from` and `to`, so existing two-stop animations are visually identical.
- Scale support. `scaleFrom` / `scaleTo` animate the `scale` property as a unitless multiplier.
- Rotate support. `rotateFrom` / `rotateTo` animate the `rotate` property in degrees.
- All four scroll-animatable CSS properties (translate, opacity, scale, rotate) now in one component, under 1 KB gzipped total runtime.

[0.3.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.3.0

## [0.2.1] — 2026-05-28

- Fix snap-back with `range="entry …"`, `range="exit …"` and `range="contain …"`. Outside the animated range the element used to revert to its un-animated position because `animation-fill-mode` defaulted to `none` — a visible jump on entry-end / exit-start / both contain edges. Setting `animation-fill-mode: both` makes the element hold the `from`-value before the range and the `to`-value after it, so any non-`cover` range stays continuous.
- `range="cover …"` was unaffected visually (its un-filled regions are off-screen) and behaves identically to before.

[0.2.1]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.2.1

## [0.2.0] — 2026-05-27

- CSS is auto-imported by the component — users no longer need a separate `import "@ouvarov/scroll-parallax/style.css"` line.
- Custom properties, keyframes and class name are namespaced under `ouvarov-` so they cannot collide with other libraries declaring scroll-driven animations.
- Next.js Pages Router users must still import the CSS explicitly from `_app.tsx` to comply with its global-CSS rules.

[0.2.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.2.0

## [0.1.0] — 2026-05-26

- Initial release. `<Parallax>` component for scroll-driven animation in React.
- Props: `amplitude`, `from`, `to`, `axis`, `opacityFrom`, `opacityTo`, `range`, `easing`.
- Pure CSS `animation-timeline: view()` under the hood — zero JavaScript at runtime.

[0.1.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.1.0
