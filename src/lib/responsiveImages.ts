// ============================================
// RESPONSIVE PROJECT IMAGES
// ============================================
// Smaller copies of a project cover live next to it as `<name>.<width>w.webp`
// (e.g. boskamers.640w.webp, boskamers.1100w.webp) and are picked up here
// automatically. Generate them from the full-size cover, e.g.:
//
//   ffmpeg -i boskamers.webp -vf scale=640:-1:flags=lanczos -c:v libwebp -quality 80 boskamers.640w.webp
//
// Cards use them via srcset; the project page header keeps the full image.
// ============================================

const variants = import.meta.glob<string>("/src/assets/projects/*.*w.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

/** `srcset` for a cover's smaller variants, or undefined if none exist. */
export function srcSetFor(name: string): string | undefined {
  const entries = Object.entries(variants)
    .map(([path, url]) => {
      const match = path.match(/\/([^/]+)\.(\d+)w\.webp$/);
      return match && match[1] === name ? { url, width: Number(match[2]) } : null;
    })
    .filter((entry): entry is { url: string; width: number } => entry !== null)
    .sort((a, b) => a.width - b.width);

  return entries.length ? entries.map((e) => `${e.url} ${e.width}w`).join(", ") : undefined;
}
