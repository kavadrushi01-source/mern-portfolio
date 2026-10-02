// Pure-CSS 3D "curriculum" visual for the hero: skill chips orbit a glowing BCA
// core on a circular track, continuously spinning, while each chip stays
// readable by counter-rotating against its own angle.
//
// Everything is CSS: a registered custom property (--cur3d-spin) is animated
// once on the scene and inherited by every slot, so each chip derives its
// position and facing from the same clock. No libraries, no images.
const FALLBACK_SKILLS = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "MySQL",
];

// Six chips keeps the spacing comfortable: on a 126px track, 60deg between
// neighbours is a 126px chord, which fits a label without collisions.
const MAX_CHIPS = 6;

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
      aria-label={`Animated 3D curriculum wheel showing ${items.join(", ")}`}
    >
      <div className="cur3d-scene">
        {/* Faint dashed circle showing the path the chips travel along */}
        <div className="cur3d-track" aria-hidden="true" />

        {/* Central core - the BCA course the chips orbit around */}
        <div className="cur3d-core" aria-hidden="true">
          <div className="cur3d-core-ring" />
          <div className="cur3d-core-body">
            <span className="cur3d-core-label">BCA</span>
            <span className="cur3d-core-sub">2023 — 2026</span>
          </div>
        </div>

        {/* Orbiting chips. --a is the slot's fixed offset around the circle;
            --ang adds the shared spin so every chip reads the same clock. */}
        <div className="cur3d-orbit" aria-hidden="true">
          {items.map((s, i) => (
            <div
              key={s}
              className="cur3d-slot"
              style={{
                "--a": `calc(360deg / ${n} * ${i})`,
                "--ang": `calc(var(--cur3d-spin) + ${i} * (360deg / ${n}))`,
              }}
            >
              <div className="cur3d-chip">
                <span className="cur3d-chip-dot" />
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible text equivalent of the animated scene */}
      <span className="sr-only">
        {name} — {title}. Curriculum: {items.join(", ")}.
      </span>
    </div>
  );
}