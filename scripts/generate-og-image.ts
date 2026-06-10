import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgString = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0d1117" />
  
  <!-- Sleek Glowing Accents (Vermillion #F85A3E) -->
  <defs>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#F85A3E" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#0d1117" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F85A3E" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#F85A3E" stop-opacity="0.1" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#glow)" />

  <!-- Abstract tech geometric elements -->
  <circle cx="1000" cy="150" r="300" stroke="url(#line-grad)" stroke-width="1.5" fill="none" opacity="0.3" />
  <circle cx="1000" cy="150" r="200" stroke="url(#line-grad)" stroke-width="1" fill="none" opacity="0.2" />
  <circle cx="1000" cy="150" r="100" stroke="url(#line-grad)" stroke-width="2" fill="none" opacity="0.4" />
  
  <!-- Subtle grid pattern overlay -->
  <path d="M 0,100 L 1200,100 M 0,200 L 1200,200 M 0,300 L 1200,300 M 0,400 L 1200,400 M 0,500 L 1200,500" stroke="#161b22" stroke-width="1" opacity="0.5" />
  <path d="M 100,0 L 100,630 M 200,0 L 200,630 M 300,0 L 300,630 M 400,0 L 400,630 M 500,0 L 500,630 M 600,0 L 600,630 M 700,0 L 700,630 M 800,0 L 800,630 M 900,0 L 900,630 M 1000,0 L 1000,630 M 1100,0 L 1100,630" stroke="#161b22" stroke-width="1" opacity="0.5" />

  <!-- Accent Border Line on left -->
  <rect x="0" y="0" width="8" height="630" fill="#F85A3E" />

  <!-- Branding and Content -->
  <!-- Name (Talha Kashif Hassan) -->
  <text x="100" y="290" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="82" font-weight="bold" fill="#ffffff" letter-spacing="-0.03em">Talha Kashif Hassan</text>
  
  <!-- Subtitle -->
  <text x="100" y="360" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="30" font-weight="600" fill="#F85A3E" letter-spacing="0.05em">FULL STACK DEVELOPER</text>

  <!-- Tagline -->
  <text x="100" y="440" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="22" fill="#8b949e">Building high-performance, responsive web applications for startups &amp; agencies.</text>

  <!-- URL -->
  <text x="100" y="540" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#8b949e" letter-spacing="0.05em">talhakashif.com</text>
</svg>
`;

async function generateOgImage() {
  const publicDir = path.resolve(__dirname, "../public");
  const distDir = path.resolve(__dirname, "../dist");
  
  const publicOutputPath = path.join(publicDir, "og_image.png");
  
  console.log("Rendering SVG to PNG...");
  
  // Use sharp to convert SVG to PNG
  const buffer = Buffer.from(svgString.trim());
  await sharp(buffer)
    .png()
    .toFile(publicOutputPath);
    
  console.log(`✅ OG Image generated successfully at ${publicOutputPath}`);
  
  // Also copy to dist if dist exists
  if (fs.existsSync(distDir)) {
    const distOutputPath = path.join(distDir, "og_image.png");
    fs.copyFileSync(publicOutputPath, distOutputPath);
    console.log(`✅ OG Image copied to ${distOutputPath}`);
  }
}

generateOgImage().catch(err => {
  console.error("❌ Failed to generate OG Image:", err);
});
