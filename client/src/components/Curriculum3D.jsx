// Pure-CSS 3D "curriculum" visual for the hero. Replaces the old hand-drawn
// avatar: a perspective scene where skill chips orbit a glowing core on a
// continuously spinning 3D ring, with a receding floor grid for depth.
// No animation libraries and no images - everything is CSS 3D transforms, so
// it stays cheap to render and needs no asset loading.
const FALLBACK_SKILLS = [
  "React.js",
  "TypeScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "MySQL",
];

// Six chips is the sweet spot for the ring geometry: at a 132px radius, 60deg
// spacing gives a ~132px chord between neighbours, which comfortably fits a
// label. Eight would drop to ~101px and make adjacent chips collide.
const MAX_CHIPS = 6;

export default function Curriculum3D({ name, title, skills = [] }) {
  const orbit = (Array.isArray(skills) ? skills : [])
    .filter(Boolean)
    .slice(0, MAX_CHIPS);
  const items = orbit.length ? orbit : FALLBACK_SKILLS;

  return (
    <div
      className="cur3d"
      role="img"
      aria-label={`Animated 3D curriculum wheel showing ${items.join(", ")}`}
    >
      <div className="cur3d-scene">
        {/* Floor grid - sells the depth/perspective of the scene */}
        <div className="cur3d-floor" aria-hidden="true" />

        {/* Central core - the BCA course the chips orbit around */}
        <div className="cur3d-core" aria-hidden="true">
          <div className="cur3d-core-ring" />
          <div className="cur3d-core-body">
            <span className="cur3d-core-label">BCA</span>
            <span className="cur3d-core-sub">2023 — 2026</span>
          </div>
        </div>

        {/* Spinning ring of chips. Each slot is rotated around the Y axis and
            pushed out to the ring radius; the chip inside counter-rotates so
            its label always faces the viewer. */}
        <div className="cur3d-ring" aria-hidden="true">
          {items.map((s, i) => (
            <div
              key={s}
              className="cur3d-slot"
              style={{ "--i": i, "--n": items.length }}
            >
              <div className="cur3d-chip">
                <span className="cur3d-chip-dot" />
                {s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caption under the scene, mirroring the old avatar's text role */}
      <div className="cur3d-caption">
        <strong>{name}</strong>
        <span>{title}</span>
      </div>
    </div>
  );
}