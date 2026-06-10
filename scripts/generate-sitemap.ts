/**
 * Sitemap Generator for portfolio-minimal
 * 
 * Reads sectionVisibility and projects from src/data/portfolio.ts
 * to generate a sitemap.xml that only includes visible pages.
 * 
 * Usage: bun run scripts/generate-sitemap.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read portfolio.ts as raw text and parse values
const portfolioPath = path.resolve(__dirname, "../src/data/portfolio.ts");
const portfolioContent = fs.readFileSync(portfolioPath, "utf-8");

// Extract siteConfig.url
const urlMatch = portfolioContent.match(/url:\s*["']([^"']+)["']/);
const siteUrl = urlMatch ? urlMatch[1] : "https://www.talhakashif.com";

function extractProjectIds(): string[] {
    // This regex looks specifically for the 'projects' array section 
    // to avoid grabbing 'email', 'phone', or 'linkedin' IDs
    const projectsSection = portfolioContent.split('export const projects: Project[] = [')[1]?.split('];')[0];

    if (!projectsSection) return [];

    const idRegex = /id:\s*["']([^"']+)["']/g;
    const ids: string[] = [];
    let match;
    while ((match = idRegex.exec(projectsSection)) !== null) {
        ids.push(match[1]);
    }
    return ids;
}

const projectIds = extractProjectIds();

// Build URL list
const today = new Date().toISOString().split("T")[0];

interface SitemapUrl {
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
}

const urls: SitemapUrl[] = [
    // Home page is always included
    { loc: `${siteUrl}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
];

for (const id of projectIds) {
    urls.push({ loc: `${siteUrl}/projects/${id}`, lastmod: today, changefreq: "monthly", priority: "0.8" });
}

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map(
            (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
        )
        .join("\n")}
</urlset>
`;

// Write to public/sitemap.xml
const outPath = path.resolve(__dirname, "../dist/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");

console.log(`✅ Sitemap generated at ${outPath}`);
console.log(`   Pages included: ${urls.length}`);
urls.forEach((u) => console.log(`   - ${u.loc} (priority: ${u.priority})`));
