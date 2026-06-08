import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgString = `
<svg width="1584" height="396" viewBox="0 0 1584 396" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1584" height="396" fill="#0d1117" />
  
  <!-- Sleek Glowing Accents (Vermillion #F85A3E) -->
  <defs>
    <radialGradient id="glow" cx="85%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#F85A3E" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#0d1117" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F85A3E" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#F85A3E" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <rect width="1584" height="396" fill="url(#glow)" />

  <!-- Abstract tech geometric elements on the right -->
  <circle cx="1400" cy="198" r="300" stroke="url(#line-grad)" stroke-width="1.5" fill="none" opacity="0.25" />
  <circle cx="1400" cy="198" r="200" stroke="url(#line-grad)" stroke-width="1" fill="none" opacity="0.15" />
  <circle cx="1400" cy="198" r="100" stroke="url(#line-grad)" stroke-width="2" fill="none" opacity="0.3" />
  
  <!-- Subtle grid pattern overlay -->
  <path d="M 0,66 L 1584,66 M 0,132 L 1584,132 M 0,198 L 1584,198 M 0,264 L 1584,264 M 0,330 L 1584,330" stroke="#161b22" stroke-width="1" opacity="0.5" />
  <path d="M 100,0 L 100,396 M 200,0 L 200,396 M 300,0 L 300,396 M 400,0 L 400,396 M 500,0 L 500,396 M 600,0 L 600,396 M 700,0 L 700,396 M 800,0 L 800,396 M 900,0 L 900,396 M 1000,0 L 1000,396 M 1100,0 L 1100,396 M 1200,0 L 1200,396 M 1300,0 L 1300,396 M 1400,0 L 1400,396 M 1500,0 L 1500,396" stroke="#161b22" stroke-width="1" opacity="0.5" />

  <!-- Accent Border Line on left -->
  <rect x="0" y="0" width="8" height="396" fill="#F85A3E" />

  <!-- Branding and Content - Shifted to the right (x=480) to clear the profile picture overlay -->
  <!-- Name (Talha Hassan) -->
  <text x="480" y="160" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="64" font-weight="bold" fill="#ffffff" letter-spacing="-0.03em">Talha Hassan</text>
  
  <!-- Subtitle -->
  <text x="480" y="215" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="600" fill="#F85A3E" letter-spacing="0.05em">FULL STACK DEVELOPER</text>

  <!-- Tagline / Skills -->
  <text x="480" y="270" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="18" fill="#8b949e" letter-spacing="0.02em">React  ·  Next.js  ·  Node.js  ·  TypeScript  ·  AWS</text>

  <!-- URL -->
  <text x="480" y="325" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="600" fill="#8b949e" letter-spacing="0.05em">talhahassan.me</text>
</svg>
`;

async function generateLinkedinBanner() {
  const publicDir = path.resolve(__dirname, "../public");
  const distDir = path.resolve(__dirname, "../dist");
  
  const publicOutputPath = path.join(publicDir, "linkedin_banner.png");
  
  console.log("Rendering LinkedIn Banner SVG to PNG...");
  
  const buffer = Buffer.from(svgString.trim());
  await sharp(buffer)
    .png()
    .toFile(publicOutputPath);
    
  console.log(`✅ LinkedIn Banner generated successfully at ${publicOutputPath}`);
  
  // Also copy to dist if dist exists
  if (fs.existsSync(distDir)) {
    const distOutputPath = path.join(distDir, "linkedin_banner.png");
    fs.copyFileSync(publicOutputPath, distOutputPath);
    console.log(`✅ LinkedIn Banner copied to ${distOutputPath}`);
  }
}

generateLinkedinBanner().catch(err => {
  console.error("❌ Failed to generate LinkedIn Banner:", err);
});
