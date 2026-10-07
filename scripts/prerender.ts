/**
 * SEO prerender
 *
 * Writes a static HTML file per route with that page's title, description,
 * canonical, Open Graph / Twitter tags and JSON-LD already in <head>, so link
 * previews (LinkedIn, X, Slack, WhatsApp…) and crawlers see the right metadata
 * without running JavaScript. The React app still boots from each file as usual.
 *
 *   dist/index.html                  → home
 *   dist/projects/<id>/index.html    → each project
 *   dist/404.html                    → served by Vercel for unknown URLs (noindex)
 *
 * Tags come from src/lib/seo.ts, the same module <SEO /> uses at runtime.
 *
 * Usage: node --experimental-strip-types scripts/prerender.ts (runs in postbuild)
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const PLACEHOLDER = "<!--app-head-->";

// Load the app's own modules through Vite so aliases and asset imports resolve.
const vite = await createServer({
  root,
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false },
});

try {
  const { projects } = await vite.ssrLoadModule("/src/data/portfolio.ts");
  const seo = await vite.ssrLoadModule("/src/lib/seo.ts");

  const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
  if (!template.includes(PLACEHOLDER)) {
    throw new Error(`dist/index.html is missing the ${PLACEHOLDER} placeholder`);
  }

  const render = (input: unknown) =>
    template
      .replace(/<title>[\s\S]*?<\/title>\s*/, "")
      .replace(PLACEHOLDER, seo.renderSeoTags(seo.resolveSeo(input)));

  const write = (relativePath: string, html: string) => {
    const file = path.join(dist, relativePath);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html, "utf-8");
    console.log(`   - ${relativePath}`);
  };

  console.log("✅ Prerendered SEO pages:");
  write("404.html", render(seo.notFoundSeo()));
  for (const project of projects) {
    write(path.join("projects", project.id, "index.html"), render(seo.projectSeo(project)));
  }
  write("index.html", render(seo.homeSeo()));
} finally {
  await vite.close();
}
