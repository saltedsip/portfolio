import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '../dist');
const htmlPath = path.join(distPath, 'index.html');

if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Find <link rel="stylesheet" crossorigin href="/assets/index-XXXX.css">
  const cssRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/(index-[a-zA-Z0-9_-]+\.css)">/;
  const match = html.match(cssRegex);

  if (match) {
    const cssFileName = match[1];
    const cssPath = path.join(distPath, 'assets', cssFileName);

    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');

      // Replace the link tag with the inline style tag
      const styleTag = `<style>${cssContent}</style>`;
      html = html.replace(match[0], styleTag);

      fs.writeFileSync(htmlPath, html, 'utf8');
      console.log(`✅ Inlined CSS: ${cssFileName} into index.html`);
    } else {
      console.error(`❌ CSS file not found: ${cssPath}`);
      process.exit(1);
    }
  } else {
    console.log('⚠️ No matching CSS link tag found in index.html to inline.');
  }
} else {
  console.error(`❌ index.html not found at: ${htmlPath}`);
  process.exit(1);
}
