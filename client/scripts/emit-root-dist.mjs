// Mirrors the freshly built client bundle into <repo-root>/dist.
//
// Why: this repository is a monorepo (client/ + server/) and Vercel builds the
// client either with "client" or with the repository root as the project's Root
// Directory. Vite always writes to client/dist, while Vercel's "Output
// Directory" setting ("dist") can be resolved against the repository root,
// which then fails with:
//
//   Error: No Output Directory named "dist" found after the Build completed.
//
// Emitting the same bundle at both client/dist and <repo-root>/dist makes the
// deployment succeed for either configuration. client/dist stays the real
// output (the Express server on Render serves it from there).
//
// Best effort by design: if the mirror cannot be written (for example when
// Vercel is not including files outside of the Root Directory in the build
// step) we log a warning and keep the successful build result.
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url)); // client/scripts
const clientDist = resolve(scriptDir, "..", "dist"); // client/dist
const rootDist = resolve(scriptDir, "..", "..", "dist"); // <repo-root>/dist

if (!existsSync(clientDist)) {
  console.warn(`[emit-root-dist] ${clientDist} not found - nothing to mirror.`);
  process.exit(0);
}

try {
  mkdirSync(rootDist, { recursive: true });
  for (const entry of readdirSync(clientDist)) {
    cpSync(resolve(clientDist, entry), resolve(rootDist, entry), {
      recursive: true,
      force: true
    });
  }
  console.log(`[emit-root-dist] mirrored ${clientDist} -> ${rootDist}`);
} catch (error) {
  console.warn(`[emit-root-dist] could not mirror to ${rootDist}: ${error.message}`);
}
