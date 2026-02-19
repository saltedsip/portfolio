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

// Read portfolio.ts as raw text and parse values
const portfolioPath = path.resolve(__dirname, "../src/data/portfolio.ts");
const portfolioContent = fs.readFileSync(portfolioPath, "utf-8");

// Extract siteConfig.url
const urlMatch = portfolioContent.match(/url:\s*["']([^"']+)["']/);
const siteUrl = urlMatch ? urlMatch[1] : "https://talhakashif.com";

// Extract sectionVisibility
function extractVisibility(section: string): boolean {
    const regex = new RegExp(`${section}:\\s*(true|false)`);
    const match = portfolioContent.match(regex);
    return match ? match[1] === "true" : false;
}

const visibility = {
    hero: extractVisibility("hero"),
    about: extractVisibility("about"),
    projects: extractVisibility("projects"),
    testimonials: extractVisibility("testimonials"),
    contact: extractVisibility("contact"),
};

// Extract project IDs (only if projects section is visible)
function extractProjectIds(): string[] {
    if (!visibility.projects) return [];

    const idRegex = /id:\s*["']([^"']+)["']/g;
    const ids: string[] = [];
    let match;
    while ((match = idRegex.exec(portfolioContent)) !== null) {
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

if (visibility.about) {
    urls.push({ loc: `${siteUrl}/about`, lastmod: today, changefreq: "monthly", priority: "0.8" });
}

if (visibility.contact) {
    urls.push({ loc: `${siteUrl}/contact`, lastmod: today, changefreq: "monthly", priority: "0.7" });
}

if (visibility.projects) {
    urls.push({ loc: `${siteUrl}/projects`, lastmod: today, changefreq: "weekly", priority: "0.9" });

    for (const id of projectIds) {
        urls.push({ loc: `${siteUrl}/projects/${id}`, lastmod: today, changefreq: "monthly", priority: "0.6" });
    }
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
const outPath = path.resolve(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf-8");

console.log(`✅ Sitemap generated at ${outPath}`);
console.log(`   Pages included: ${urls.length}`);
urls.forEach((u) => console.log(`   - ${u.loc} (priority: ${u.priority})`));
