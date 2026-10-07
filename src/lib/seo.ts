// ============================================
// SEO
// ============================================
// Single source of truth for page metadata. Used by <SEO /> at runtime and by
// scripts/prerender.ts at build time, so crawlers and link previews that don't
// run JavaScript see exactly the tags the app renders.
// ============================================

import { siteConfig, personalInfo, contactLinks } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

type JsonLd = Record<string, unknown>;

export interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd[];
}

export interface SeoData {
  title: string;
  description: string;
  url: string;
  image: string;
  type: "website" | "article";
  noindex: boolean;
  jsonLd: JsonLd[];
}

export const absoluteUrl = (path: string) => new URL(path, `${siteConfig.url}/`).toString();

export function resolveSeo(input: SeoInput = {}): SeoData {
  return {
    title: input.title ? `${input.title} | ${siteConfig.title}` : siteConfig.title,
    description: input.description || siteConfig.description,
    url: absoluteUrl(input.path ?? "/"),
    image: absoluteUrl(input.image || siteConfig.ogImage),
    type: input.type ?? "website",
    noindex: input.noindex ?? false,
    jsonLd: input.jsonLd ?? [],
  };
}

// --------------------------------------------
// STRUCTURED DATA (schema.org)
// --------------------------------------------
const personId = absoluteUrl("/#person");

const person: JsonLd = {
  "@type": "Person",
  "@id": personId,
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: absoluteUrl("/"),
  image: absoluteUrl(siteConfig.ogImage),
  sameAs: contactLinks
    .filter((link) => link.id === "linkedin" || link.id === "github")
    .map((link) => link.href),
};

// --------------------------------------------
// PAGE PRESETS
// --------------------------------------------
export const homeSeo = (): SeoInput => ({
  path: "/",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "WebSite",
          "@id": absoluteUrl("/#website"),
          name: siteConfig.title,
          url: absoluteUrl("/"),
          description: siteConfig.description,
          author: { "@id": personId },
        },
      ],
    },
  ],
});

export const projectPath = (project: Project) => `/projects/${project.id}`;

export const projectSeo = (project: Project): SeoInput => ({
  title: project.title,
  description: project.description,
  path: projectPath(project),
  image: project.ogImage,
  type: "article",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: absoluteUrl(projectPath(project)),
          image: absoluteUrl(project.ogImage || siteConfig.ogImage),
          keywords: project.tags.join(", "),
          creator: { "@id": personId },
          ...(project.link ? { sameAs: project.link } : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/#work") },
            { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(projectPath(project)) },
          ],
        },
      ],
    },
  ],
});

export const notFoundSeo = (): SeoInput => ({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  noindex: true,
});

// --------------------------------------------
// STATIC HTML (build time)
// --------------------------------------------
const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// `<` is escaped so a value can never close the <script> tag early.
export const serializeJsonLd = (data: JsonLd) => JSON.stringify(data).replace(/</g, "\\u003c");

// Tags carry data-rh so react-helmet-async takes them over on load
// instead of adding duplicates next to them.
export function renderSeoTags(seo: SeoData): string {
  const meta = (attr: "name" | "property", key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeAttr(content)}" data-rh="true">`;

  return [
    `<title>${escapeAttr(seo.title)}</title>`,
    meta("name", "description", seo.description),
    seo.noindex ? meta("name", "robots", "noindex") : "",
    seo.noindex ? "" : `<link rel="canonical" href="${escapeAttr(seo.url)}" data-rh="true">`,
    meta("property", "og:type", seo.type),
    meta("property", "og:site_name", personalInfo.name),
    meta("property", "og:url", seo.url),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    meta("property", "og:image", seo.image),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", seo.image),
    ...seo.jsonLd.map(
      (data) => `<script type="application/ld+json" data-rh="true">${serializeJsonLd(data)}</script>`
    ),
  ]
    .filter(Boolean)
    .join("\n  ");
}
