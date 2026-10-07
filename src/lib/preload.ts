import type { Project } from "@/types/portfolio";

// Shared with the lazy route in App.tsx so a prefetch and the real navigation
// resolve to the same chunk.
export const loadProjectDetailPage = () => import("@/pages/ProjectDetailPage");

const preloaded = new Map<string, Promise<void>>();

// Downloads and decodes an image once, so later <img> tags paint it instantly.
// Pass the same srcSet/sizes as the <img> so the browser picks the same file.
export function preloadImage(src: string, srcSet?: string, sizes?: string): Promise<void> {
  const key = srcSet ? `${srcSet}|${sizes ?? ""}` : src;
  const existing = preloaded.get(key);
  if (existing) return existing;

  const img = new Image();
  img.decoding = "async";
  if (srcSet) {
    img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
  }
  img.src = src;
  const promise = img.decode().catch(() => undefined);
  preloaded.set(key, promise);
  return promise;
}

const markdownImageRegex = /!\[[^\]]*\]\(([^)\s]+)/g;

// The hero image plus any images embedded in the project's markdown.
export function getProjectImages(project: Project): string[] {
  const images = project.image ? [project.image] : [];
  for (const match of project.longDescription.matchAll(markdownImageRegex)) {
    images.push(match[1]);
  }
  return images;
}

// Warms everything the project detail page needs: its JS chunk and its images.
export function preloadProject(project: Project) {
  loadProjectDetailPage().catch(() => undefined);
  getProjectImages(project).forEach((src) => preloadImage(src));
}

// Runs a task once the browser is idle, falling back to a timeout where
// requestIdleCallback is unsupported (Safari).
export function whenIdle(task: () => void, timeout = 2000): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(task, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(task, 200);
  return () => clearTimeout(id);
}
