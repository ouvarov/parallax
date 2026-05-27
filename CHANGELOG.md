# Changelog

## [0.2.0] — 2026-05-27

- CSS is auto-imported by the component — users no longer need a separate `import "@ouvarov/scroll-parallax/style.css"` line.
- Next.js Pages Router users must still import the CSS explicitly from `_app.tsx` to comply with its global-CSS rules.

[0.2.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.2.0

## [0.1.0] — 2026-05-26

- Initial release. `<Parallax>` component for scroll-driven animation in React.
- Props: `amplitude`, `from`, `to`, `axis`, `opacityFrom`, `opacityTo`, `range`, `easing`.
- Pure CSS `animation-timeline: view()` under the hood — zero JavaScript at runtime.

[0.1.0]: https://github.com/ouvarov/scroll-parallax/releases/tag/v0.1.0
