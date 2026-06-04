# Changelog

## [0.6.0] — 2026-06-04

- New `stagger` prop on `<Parallax>`. When set, the wrapper stops animating itself — each direct child runs the animation instead, in a cascade. No mapping over children, no JS: each child's `animation-range-start` is shifted by an `:nth-child` rule.
- `range` is the cascade window — you decide where the reveal lands. The cascade offsets each child's start inside it; the end is shared, so every child finishes at the same point. Defaults to `cover 0% cover 50%` (viewport center) so the group is fully revealed in the reading zone, not only at the top. Use the explicit `"<name> n% <name> n%"` form.
- The cascade unit is a percentage of view progress per child, not milliseconds — scroll-driven animations ignore time-based `animation-delay`. Child *n* starts at `from + (n−1) × stagger`%.
- Pure CSS, capped at 24 children (beyond that they share the last offset). Works best on a group that enters together (a row or grid).

[0.6.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.6.0

## [0.5.0] — 2026-06-04

- New `<RevealOnView>` component. The element stays hidden until it reaches a trigger line on the way up the viewport (by default the lower third), then plays a short ease-out reveal and holds. Where `FadeOnView` ramps across the whole entry, `RevealOnView` waits at the threshold, then reveals over a brief span.
- `effect` prop picks the reveal: `"fade"` (opacity 0→1, default), `"scale"` (scale 0→1), or `"both"`.
- `threshold` prop (default `0.3`) is the trigger line; `span` prop (default `0.15`) is how much scroll the reveal takes after it. Together they map to `range="cover {threshold×100}% cover {(threshold+span)×100}%"`. Both clamped to 0–1.
- Reversible like any scroll-driven animation (scrolling back up past the line hides it again); a time-based one-shot would require JS and is intentionally out of scope.
- Pure forward to `Parallax`, no new CSS — adds ~135 bytes gzipped over the core.

[0.5.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.5.0

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
