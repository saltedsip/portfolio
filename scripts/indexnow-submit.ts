/**
 * IndexNow Submission Script
 * 
 * Submits URLs to IndexNow API for faster indexing on Bing, Yandex, etc.
 * 
 * Setup:
 * 1. Generate an API key (any UUID, or get one from Bing Webmaster Tools)
 * 2. Set INDEXNOW_API_KEY environment variable, or edit the key below
 * 3. Create a file named {your-api-key}.txt in public/ containing the key
 * 4. Run: bun run scripts/indexnow-submit.ts
 */

import * as fs from "fs";
import * as path from "path";

// Configuration
const API_KEY = process.env.INDEXNOW_API_KEY || "YOUR_API_KEY_HERE";
const SITE_HOST = "talhakashif.com";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Read the generated sitemap to extract URLs
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");

if (!fs.existsSync(sitemapPath)) {
    console.error("❌ sitemap.xml not found. Run generate-sitemap.ts first.");
    process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
const locRegex = /<loc>([^<]+)<\/loc>/g;
const urls: string[] = [];
let match;
while ((match = locRegex.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
}

if (urls.length === 0) {
    console.error("❌ No URLs found in sitemap.xml");
    process.exit(1);
}

if (API_KEY === "YOUR_API_KEY_HERE") {
    console.log("⚠️  IndexNow API key not configured.");
    console.log("   Set INDEXNOW_API_KEY environment variable or edit scripts/indexnow-submit.ts");
    console.log("");
    console.log("   To set up IndexNow:");
    console.log("   1. Generate a UUID (e.g., from https://www.uuidgenerator.net/)");
    console.log("   2. Create public/{your-key}.txt containing the key");
    console.log("   3. Set INDEXNOW_API_KEY={your-key}");
    console.log("   4. Re-run this script");
    process.exit(0);
}

// Submit to IndexNow
async function submitToIndexNow() {
    const payload = {
        host: SITE_HOST,
        key: API_KEY,
        keyLocation: `https://${SITE_HOST}/${API_KEY}.txt`,
        urlList: urls,
    };

    console.log(`📤 Submitting ${urls.length} URL(s) to IndexNow...`);

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload),
        });

        if (response.ok || response.status === 200 || response.status === 202) {
            console.log(`✅ Successfully submitted ${urls.length} URL(s) to IndexNow`);
            urls.forEach((u) => console.log(`   - ${u}`));
        } else {
            console.error(`❌ IndexNow returned status ${response.status}: ${response.statusText}`);
            const text = await response.text();
            if (text) console.error(`   Response: ${text}`);
        }
    } catch (error) {
        console.error(`❌ Failed to submit to IndexNow:`, error);
    }
}

submitToIndexNow();
