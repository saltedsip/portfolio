# Talha Kashif Hassan - Portfolio

A modern, performant portfolio website built with React, TypeScript, and TailwindCSS. Features a stunning dark theme with vermillion accents, smooth animations, and mobile-first design.

## ✨ Features

- **Multi-page routing** with React Router and smooth page transitions
- **Dark theme** with deep navy background and vermillion (#F85A3E) accents
- **Animated background** with custom dithered simplex-noise canvas effect
- **Fully responsive** mobile-first design (320px to 4K)
- **Section visibility toggle** — show/hide any section from config
- **Centralized config** — all content in `src/data/portfolio.ts`
- **Testimonials carousel** with auto-rotation and pause on hover
- **CSS staggered mobile menu** with fullscreen overlay and body scroll lock
- **TypeScript strict mode** with full type definitions
- **SEO optimized** — sitemap, meta tags, Open Graph, robots.txt

## 🛠️ Tech Stack

- **React 18** + TypeScript (strict mode)
- **Vite** for fast development and bundling
- **Bun** as package manager
- **TailwindCSS** for styling
- **React Router** for client-side routing
- **React Helmet Async** for SEO meta tags
- **Lucide React** for icons
- **Outfit + DM Sans** typography
- **Cloudflare Pages** for deployment

## 🔧 Optimizations

### Performance
- `React.memo()` on frequently re-rendered components
- `useCallback` / `useMemo` for stable references
- Lazy-loaded routes with `React.lazy()` + `Suspense`
- DitherBackground pauses when tab is hidden (`visibilitychange`)
- 24fps throttled canvas animation to save GPU
- Passive scroll event listeners

### Accessibility & UX
- `focus-visible` ring styles for keyboard navigation
- `prefers-reduced-motion` respected
- `touch-action: manipulation` for better mobile UX
- `color-scheme: dark` for proper scrollbar/input theming
- `text-wrap: balance` on headings to prevent widows
- Safe area insets for notched devices (iPhone X+)
- `role="main"` on main content area
- Body scroll lock on mobile menu open

### Security
- No hardcoded secrets or API keys
- External links use `rel="noopener noreferrer"`
- `.env` patterns in `.gitignore`

## 📁 Project Structure

```
src/
├── data/
│   └── portfolio.ts          # ← ALL content config here
├── types/
│   └── portfolio.ts          # TypeScript interfaces for data
├── components/
│   ├── Layout.tsx            # Main layout with page transitions
│   ├── SEO.tsx               # Meta tags & Open Graph
│   ├── backgrounds/
│   │   └── DitherBackground.tsx  # Canvas dither background
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── navigation.tsx    # Header, mobile menu, ScrollToTop
│       └── FadeIn.tsx        # Intersection observer animations
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailPage.tsx
│   └── NotFoundPage.tsx
└── index.css                 # Global styles + design system
```

## ⚙️ Customization

Edit `src/data/portfolio.ts` to update everything:

| Section | What you can change |
|---------|-------------------|
| `siteConfig` | Title, description, URL, OG image |
| `personalInfo` | Name, title, email, phone, location |
| `contactLinks` | Email, phone, LinkedIn, GitHub, etc. |
| `heroContent` | Headline, bio, CTAs, resume link |
| `heroBadges` | Stats badges |
| `aboutContent` | About paragraphs |
| `skills` | Skills by category |
| `workExperience` | Jobs, roles, highlights |
| `education` | Degree, institution |
| `projects` | Projects with images and descriptions |
| `testimonials` | Client testimonials |
| `contactContent` | CTA text, availability status |
| `sectionVisibility` | Show/hide sections |

## 📦 Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate sitemap
bun run generate-sitemap
```

## 🚀 Deployment

Deployed on **Cloudflare Pages** via `wrangler deploy`. SPA routing is configured in `wrangler.jsonc`.

## 🎨 Design System

- **Background**: Deep navy (#0d1117)
- **Cards**: Lighter navy (#161b22)
- **Primary accent**: Vermillion (#F85A3E)
- **Typography**: Outfit (headings), DM Sans (body)
- **Corners**: Rounded with consistent radius scale

## 📄 License

MIT License — use this as a template for your own portfolio!