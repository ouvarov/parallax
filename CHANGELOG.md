# Changelog

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
