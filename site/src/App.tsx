import { useState } from "react";
import { Parallax, type ParallaxAxis } from "@ouvarov/scroll-parallax";

export function App() {
  return (
    <>
      <Hero />
      <Card1FromTo />
      <Card2Speed />
      <Card3Opacity />
      <Card4Combined />
      <ApiSection />
      <BrowserSupport />
      <Caveats />
      <FooterSection />
    </>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <span className="hero-tag">@ouvarov/scroll-parallax · MIT</span>
        <h1>
          Scroll parallax for React.{" "}
          <span className="accent">~350 bytes</span> of JS, zero runtime.
        </h1>
        <p className="hero-sub">
          One component for scroll-driven animation in React. The animation
          itself is pure CSS <code>animation-timeline: view()</code> — a typed
          wrapper over the native browser API. Translate, opacity, custom
          ranges and easings — all from the same component.
        </p>

        <div className="size-row">
          <span className="badge">JS: <strong>556 B</strong> raw / <strong>349 B</strong> gzipped</span>
          <span className="badge">CSS: <strong>1.2 KB</strong> raw / <strong>372 B</strong> gzipped</span>
          <span className="badge">Dependencies: <strong>0</strong></span>
        </div>

        <div className="install">npm i @ouvarov/scroll-parallax</div>

        <div className="cta">
          <a href="#card-1">See the demos ↓</a>
          <a href="https://github.com/ouvarov/scroll-parallax" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.npmjs.com/package/@ouvarov/scroll-parallax" target="_blank" rel="noreferrer">npm</a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────── Card 1: custom from/to translate ─────────────── */

function Card1FromTo() {
  const [from, setFrom] = useState(30);
  const [to, setTo] = useState(-30);

  const snippet = `<Parallax from={${from}} to={${to}}>
  <Card />
</Parallax>`;

  return (
    <section className="demo-section" id="card-1">
      <div className="container">
        <h2><span className="num">1</span> Custom start and end</h2>
        <p className="lede">
          Set precise <code>from</code> and <code>to</code> translate values
          in px. Asymmetric is fine — drift only upward, only down, or biased
          to either side.
        </p>

        <div className="controls-bar">
          <div className="controls-grid">
            <div className="control-row">
              <label>
                <span>from</span>
                <span className="value">{from}px</span>
              </label>
              <input
                type="range" min={-100} max={100} value={from}
                onChange={(e) => setFrom(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label>
                <span>to</span>
                <span className="value">{to}px</span>
              </label>
              <input
                type="range" min={-100} max={100} value={to}
                onChange={(e) => setTo(Number(e.target.value))}
              />
            </div>
          </div>
          <pre className="controls-snippet"><code>{snippet}</code></pre>
        </div>
      </div>

      <div className="container scroll-row">
        <div className="scroll-text">
          <p>
            Scroll past this section. The card on the right starts at{" "}
            <code>{from}px</code> on the Y-axis and ends at{" "}
            <code>{to}px</code> by the time it exits the viewport.
          </p>
          <p>
            The text you're reading scrolls at normal page speed — no
            animation here. The card moves at <em>scroll speed plus</em> the
            parallax offset. That gap between the two is what you see as the
            parallax effect.
          </p>
          <p>
            Stop scrolling — the animation freezes. Scroll back up — it
            reverses. No JavaScript runs during the scroll: the browser is
            interpolating the <code>translate</code> property against the
            element's progress through the viewport.
          </p>
          <p>
            Adjust the sliders above to change the start and end points and
            see how the relative motion changes. Negative values invert the
            drift direction.
          </p>
        </div>
        <div className="scroll-card-col">
          <Parallax from={from} to={to}>
            <div className="demo-card" style={{ background: "var(--card-a)" }}>1</div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Card 2: speed = amplitude + range ─────────────── */

const RANGE_PRESETS = [
  { label: "cover (full pass)", value: "cover 0% cover 100%" },
  { label: "entry (fast, on enter)", value: "entry 0% entry 100%" },
  { label: "exit (fast, on leave)", value: "exit 0% exit 100%" },
  { label: "contain (in-view only)", value: "contain 0% contain 100%" },
] as const;

function Card2Speed() {
  const [amplitude, setAmplitude] = useState(60);
  const [range, setRange] = useState<string>(RANGE_PRESETS[0].value);

  const isDefaultRange = range === RANGE_PRESETS[0].value;
  const snippet = `<Parallax
  amplitude={${amplitude}}${isDefaultRange ? "" : `\n  range="${range}"`}
>
  <Card />
</Parallax>`;

  return (
    <section className="demo-section">
      <div className="container">
        <h2><span className="num">2</span> Speed = displacement + range</h2>
        <p className="lede">
          Two knobs for "speed". Bigger <code>amplitude</code> covers more
          distance across the same viewport pass. Shorter <code>range</code>{" "}
          plays the same distance in fewer scroll pixels — actually faster,
          not just bigger.
        </p>

        <div className="controls-bar">
          <div className="controls-grid">
            <div className="control-row">
              <label>
                <span>amplitude</span>
                <span className="value">{amplitude}px</span>
              </label>
              <input
                type="range" min={0} max={200} value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label><span>range</span></label>
              <select className="select" value={range} onChange={(e) => setRange(e.target.value)}>
                {RANGE_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <pre className="controls-snippet"><code>{snippet}</code></pre>
        </div>
      </div>

      <div className="container scroll-row">
        <div className="scroll-text">
          <p>
            Same direction as Card 1, but here you control the magnitude with
            a single <code>amplitude</code> prop —{" "}
            <code>from = +amplitude</code>, <code>to = -amplitude</code>.
            Symmetric drift, easier to reason about for hero images and
            decorations.
          </p>
          <p>
            <code>range</code> changes <em>where</em> in the scroll progress
            the animation plays. The default <code>cover</code> spreads the
            animation across the full viewport pass. Switch to{" "}
            <code>entry</code> and the same amplitude is compressed into the
            element's enter-phase only — visually faster.
          </p>
          <p>
            This is what the original parallax demos called "speed".
            Mathematically: same delta, smaller scroll window, so the
            apparent velocity per scrolled pixel is higher.
          </p>
        </div>
        <div className="scroll-card-col">
          <Parallax amplitude={amplitude} range={range}>
            <div className="demo-card" style={{ background: "var(--card-b)" }}>2</div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Card 3: opacity ramp ─────────────── */

function Card3Opacity() {
  const [opacityFrom, setOpacityFrom] = useState(0.2);
  const [opacityTo, setOpacityTo] = useState(1);

  const snippet = `<Parallax
  amplitude={0}
  opacityFrom={${opacityFrom}}
  opacityTo={${opacityTo}}
>
  <Card />
</Parallax>`;

  return (
    <section className="demo-section">
      <div className="container">
        <h2><span className="num">3</span> Opacity ramp</h2>
        <p className="lede">
          <code>animation-timeline</code> isn't limited to transforms.{" "}
          <code>opacityFrom</code> and <code>opacityTo</code> ramp opacity
          across the scroll-through. Pick any two values between 0 and 1.
        </p>

        <div className="controls-bar">
          <div className="controls-grid">
            <div className="control-row">
              <label>
                <span>opacityFrom</span>
                <span className="value">{opacityFrom.toFixed(2)}</span>
              </label>
              <input
                type="range" min={0} max={1} step={0.05} value={opacityFrom}
                onChange={(e) => setOpacityFrom(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label>
                <span>opacityTo</span>
                <span className="value">{opacityTo.toFixed(2)}</span>
              </label>
              <input
                type="range" min={0} max={1} step={0.05} value={opacityTo}
                onChange={(e) => setOpacityTo(Number(e.target.value))}
              />
            </div>
          </div>
          <pre className="controls-snippet"><code>{snippet}</code></pre>
        </div>
      </div>

      <div className="container scroll-row">
        <div className="scroll-text">
          <p>
            This card has <code>amplitude={"{0}"}</code> — no translate. The
            only thing animating is opacity, ramping from{" "}
            <code>{opacityFrom.toFixed(2)}</code> at the bottom of the
            viewport pass to <code>{opacityTo.toFixed(2)}</code> at the top.
          </p>
          <p>
            Useful for fading elements in as they enter view, fading them
            out as they leave, or any partial fade between two custom values
            (0.2 → 0.7 for muted reveal effects, for example).
          </p>
          <p>
            Combine with <code>range</code> if you want the fade to happen
            only during the entry phase, or only on exit, instead of across
            the full pass.
          </p>
        </div>
        <div className="scroll-card-col">
          <Parallax amplitude={0} opacityFrom={opacityFrom} opacityTo={opacityTo}>
            <div className="demo-card" style={{ background: "var(--card-c)" }}>3</div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Card 4: everything combined ─────────────── */

const EASING_PRESETS = [
  { label: "linear", value: "linear" },
  { label: "ease-in-out", value: "ease-in-out" },
  { label: "ease-out", value: "ease-out" },
  { label: "snap (custom bezier)", value: "cubic-bezier(0.7, 0, 0.3, 1)" },
] as const;

function Card4Combined() {
  const [amplitude, setAmplitude] = useState(80);
  const [axis, setAxis] = useState<ParallaxAxis>("y");
  const [opacityFrom, setOpacityFrom] = useState(0.3);
  const [opacityTo, setOpacityTo] = useState(1);
  const [range, setRange] = useState<string>(RANGE_PRESETS[0].value);
  const [easing, setEasing] = useState<string>(EASING_PRESETS[0].value);

  const lines = [
    `  amplitude={${amplitude}}`,
    axis === "x" ? `  axis="x"` : null,
    `  opacityFrom={${opacityFrom}}`,
    `  opacityTo={${opacityTo}}`,
    range !== RANGE_PRESETS[0].value ? `  range="${range}"` : null,
    easing !== EASING_PRESETS[0].value ? `  easing="${easing}"` : null,
  ].filter(Boolean);
  const snippet = `<Parallax\n${lines.join("\n")}\n>\n  <Card />\n</Parallax>`;

  return (
    <section className="demo-section">
      <div className="container">
        <h2><span className="num">4</span> Compose it all</h2>
        <p className="lede">
          Every prop on the same instance. Each <code>&lt;Parallax&gt;</code>{" "}
          on a page is independent — values don't bleed across siblings.
        </p>

        <div className="controls-bar">
          <div className="controls-grid controls-grid-wide">
            <div className="control-row">
              <label>
                <span>amplitude</span>
                <span className="value">{amplitude}px</span>
              </label>
              <input
                type="range" min={0} max={200} value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label>
                <span>axis</span>
                <span className="value">{axis}</span>
              </label>
              <div className="axis-toggle">
                <button type="button" className={axis === "y" ? "active" : ""} onClick={() => setAxis("y")}>y</button>
                <button type="button" className={axis === "x" ? "active" : ""} onClick={() => setAxis("x")}>x</button>
              </div>
            </div>
            <div className="control-row">
              <label>
                <span>opacityFrom</span>
                <span className="value">{opacityFrom.toFixed(2)}</span>
              </label>
              <input
                type="range" min={0} max={1} step={0.05} value={opacityFrom}
                onChange={(e) => setOpacityFrom(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label>
                <span>opacityTo</span>
                <span className="value">{opacityTo.toFixed(2)}</span>
              </label>
              <input
                type="range" min={0} max={1} step={0.05} value={opacityTo}
                onChange={(e) => setOpacityTo(Number(e.target.value))}
              />
            </div>
            <div className="control-row">
              <label><span>range</span></label>
              <select className="select" value={range} onChange={(e) => setRange(e.target.value)}>
                {RANGE_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className="control-row">
              <label><span>easing</span></label>
              <select className="select" value={easing} onChange={(e) => setEasing(e.target.value)}>
                {EASING_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
          <pre className="controls-snippet"><code>{snippet}</code></pre>
        </div>
      </div>

      <div className="container scroll-row">
        <div className="scroll-text">
          <p>
            All six knobs on one card. Translate magnitude, axis direction,
            opacity ramp, where in the scroll the animation plays, and the
            easing curve between start and end.
          </p>
          <p>
            Each <code>&lt;Parallax&gt;</code> sets its own CSS custom
            properties as inline styles on its wrapper. There's no shared
            state — put twenty of these on a page with different
            configurations and they animate independently.
          </p>
          <p>
            Try a non-linear easing like <code>cubic-bezier(0.7, 0, 0.3, 1)</code>{" "}
            — the card snaps through its range instead of drifting linearly.
            Combine with <code>range="entry"</code> for a punchy on-enter
            reveal.
          </p>
        </div>
        <div className="scroll-card-col">
          <Parallax
            amplitude={amplitude}
            axis={axis}
            opacityFrom={opacityFrom}
            opacityTo={opacityTo}
            range={range}
            easing={easing}
          >
            <div className="demo-card" style={{ background: "var(--card-d)" }}>4</div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── API table ─────────────── */

function ApiSection() {
  return (
    <section className="section">
      <div className="container">
        <h2>API</h2>
        <p className="lede">All props are optional. Defaults preserve current visual layout.</p>

        <table className="api-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>amplitude</code></td>
              <td><code>number</code></td>
              <td><code>30</code></td>
              <td>Symmetric drift shortcut. Animates from <code>+amplitude</code> to <code>-amplitude</code>. Overridden by <code>from</code>/<code>to</code> when set.</td>
            </tr>
            <tr>
              <td><code>from</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>Start translate in px. Overrides amplitude.</td>
            </tr>
            <tr>
              <td><code>to</code></td>
              <td><code>number</code></td>
              <td>—</td>
              <td>End translate in px. Overrides amplitude.</td>
            </tr>
            <tr>
              <td><code>axis</code></td>
              <td><code>'x' | 'y'</code></td>
              <td><code>'y'</code></td>
              <td>Which axis the drift happens on.</td>
            </tr>
            <tr>
              <td><code>opacityFrom</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Start opacity. Ramp runs only when at least one opacity prop is set.</td>
            </tr>
            <tr>
              <td><code>opacityTo</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>End opacity.</td>
            </tr>
            <tr>
              <td><code>range</code></td>
              <td><code>string</code></td>
              <td><code>'cover 0% cover 100%'</code></td>
              <td>Any valid <code>animation-range</code>. Controls where in the scroll progress the animation plays — the "speed" knob.</td>
            </tr>
            <tr>
              <td><code>easing</code></td>
              <td><code>string</code></td>
              <td><code>'linear'</code></td>
              <td>Any valid <code>animation-timing-function</code>.</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>Merged onto the wrapper element.</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td>—</td>
              <td>Merged onto the wrapper element.</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>—</td>
              <td>Whatever you want to animate.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BrowserSupport() {
  return (
    <section className="section">
      <div className="container">
        <h2>Browser support</h2>
        <p className="lede">
          Built on <code>animation-timeline: view()</code>. Browsers without
          support render the element normally — no fallback animation, layout
          intact.
        </p>

        <table className="browser-table">
          <thead>
            <tr>
              <th>Browser</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chrome / Edge / Opera</td>
              <td className="status-ok">✓ supported</td>
              <td>v115+ (Aug 2023)</td>
            </tr>
            <tr>
              <td>Safari (macOS &amp; iOS)</td>
              <td className="status-ok">✓ supported</td>
              <td>v18+ (Sept 2024)</td>
            </tr>
            <tr>
              <td>Firefox</td>
              <td className="status-warn">flag required</td>
              <td><code>layout.css.scroll-driven-animations.enabled</code></td>
            </tr>
            <tr>
              <td>Older browsers</td>
              <td className="status-bad">no animation</td>
              <td>Element renders normally, layout intact</td>
            </tr>
            <tr>
              <td><code>prefers-reduced-motion: reduce</code></td>
              <td className="status-ok">✓ respected</td>
              <td>Animation is disabled automatically</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Caveats() {
  return (
    <section className="section">
      <div className="container">
        <h2>Caveats</h2>
        <ul className="caveats">
          <li>
            <strong>Single-purpose.</strong> Drift and opacity on scroll,
            nothing else. No spring physics, no gesture handling, no layout
            animations.
          </li>
          <li>
            <strong>Adds one wrapper DOM node.</strong> If that matters,
            copy the CSS from the source and apply it to your own element.
          </li>
          <li>
            <strong>Next.js Pages Router.</strong> Global CSS imports must come
            from <code>_app.tsx</code>. App Router has no restriction.
          </li>
        </ul>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-links">
          <a href="https://github.com/ouvarov/scroll-parallax" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.npmjs.com/package/@ouvarov/scroll-parallax" target="_blank" rel="noreferrer">npm</a>
        </div>
        <p>MIT © Olexandr Uvarov</p>
      </div>
    </footer>
  );
}
