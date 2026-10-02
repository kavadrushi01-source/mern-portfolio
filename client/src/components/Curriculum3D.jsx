// Pure-CSS 3D "curriculum" visual for the hero.
//
// Skills ride a tilted elliptical orbit around a glowing BCA core, the way a
// ringed planet reads in perspective. The orbit plane is tilted with rotateX,
// so the circle foreshortens into an ellipse and the chips genuinely move in
// depth; each chip is billboarded back to the viewer so its label stays
// perfectly readable at every point on the ring.
//
// Everything is CSS: a registered custom property (--cur3d-spin) is animated
// once and inherited by every slot, so all chips read the same clock.
// No libraries, no images, no canvas.
const FALLBACK_SKILLS = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "MySQL",
];

// Six chips keeps the spacing comfortable on the orbit: at a 134px radius,
// 60deg between neighbours is a 134px chord, which fits a label without
// collisions. Seven or more would start overlapping.
const MAX_CHIPS = 6;

// Small dots on a second, wider ring for extra depth.
const SPARK_COUNT = 3;

export default function Curriculum3D({ name, title, skills = [] }) {
  const orbit = (Array.isArray(skills) ? skills : [])
    .filter(Boolean)
    .slice(0, MAX_CHIPS);
  const items = orbit.length ? orbit : FALLBACK_SKILLS;
  const n = items.length;

  return (
    <div
      className="cur3d"
      role="img"
      aria-label={`Animated 3D curriculum orbit showing ${items.join(", ")}`}
    >
      <div className="cur3d-scene">
        {/* Soft elliptical glow beneath the orbit, grounding the composition */}
        <div className="cur3d-glow" aria-hidden="true" />

        {/* Central core - the BCA course the skills orbit around */}
        <div className="cur3d-core" aria-hidden="true">
          <span className="cur3d-core-halo" />
          <div className="cur3d-core-body">
            <span className="cur3d-core-label">BCA</span>
            <span className="cur3d-core-sub">2023 — 2026</span>
          </div>
        </div>

        {/* The tilted orbit plane. Everything inside is foreshortened into an
            ellipse, which is what sells the 3D. */}
        <div className="cur3d-plane" aria-hidden="true">
          <div className="cur3d-track" />

          {items.map((s, i) => (
            <div
              key={s}
              className="cur3d-slot"
              style={{
                "--ang": `calc(var(--cur3d-spin) + ${i} * (360deg / ${n}))`,
              }}
            >
              <div className="cur3d-chip">
                <span className="cur3d-chip-dot" />
                {s}
              </div>
            </div>
          ))}

          {/* Faint outer ring with a few travelling sparks */}
          <div className="cur3d-track cur3d-track-outer">
            {Array.from({ length: SPARK_COUNT }, (_, i) => (
              <span
                key={i}
                className="cur3d-spark"
                style={{
                  "--ang": `calc(var(--cur3d-spin) * -1 + ${i} * (360deg / ${SPARK_COUNT}))`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Accessible text equivalent of the animated scene */}
      <span className="sr-only">
        {name} — {title}. Curriculum: {items.join(", ")}.
      </span>
    </div>
  );
}