# Portfolio

A modern, performant portfolio website built with React, TypeScript, TailwindCSS, and Bun. Features a stunning dark theme with vermillion accents, smooth animations, and a high-converting one-pager funnel layout.

## ✨ Features

- **One-Pager Funnel Layout** with smooth anchor scrolling and active section tracking via IntersectionObserver
- **Case Study Routing** with React Router for detailed project deep-dives
- **Dark Theme** with deep navy background and vermillion (#F85A3E) accents
- **Scoped Animated Background** with a custom dithered simplex-noise canvas overlay on the Hero section, smoothly dissolving into other sections via a frosted-glass blur fade
- **Interactive Lead Capture Form** with client-side validation, success panel states, and Forminit API integration
- **Fully Responsive** mobile-first design (320px to 4K)
- **Centralized Config** — update all content inside `src/data/portfolio.ts`
- **Testimonials Carousel** with auto-rotation and pause on hover
- **TypeScript Strict Mode** with clean type safety
- **SEO Optimized** — sitemaps, canonical links, robots.txt, and metadata via React Helmet Async

## 🛠️ Tech Stack

- **React 18** + TypeScript (strict mode)
- **Vite** for fast development and bundling
- **Bun** as the package manager and runtime
- **TailwindCSS** for styling
- **React Router** for case study routing
- **React Helmet Async** for SEO meta tags
- **Lucide React** for icons
- **Outfit + DM Sans** typography
- **Vercel** / **Cloudflare Pages** for deployment

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
- Input size `text-base` to prevent iOS automatic zoom on focus

### Security
- Environment variable configuration (`.env` file) for API tokens (`VITE_FORMINIT_ID`)
- External links use `rel="noopener noreferrer"`
- `.env` files ignored in `.gitignore`

## 📁 Project Structure

```
src/
├── data/
│   └── portfolio.ts          # ← ALL content config here
├── types/
│   └── portfolio.ts          # TypeScript interfaces for data
├── components/
│   ├── Layout.tsx            # Case study layout component
│   ├── SEO.tsx               # Meta tags & Open Graph
│   ├── backgrounds/
│   │   └── DitherBackground.tsx  # Canvas dither background
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── FeaturedProjects.tsx  # Grid of featured projects
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx    # Interactive contact form
│   └── ui/
│       ├── navigation.tsx    # Header, mobile menu, ScrollToTop
│       └── FadeIn.tsx        # Intersection observer animations
├── pages/
│   ├── HomePage.tsx          # Single page funnel view
│   ├── ProjectDetailPage.tsx # Project case study details view
│   └── NotFoundPage.tsx      # Standalone 404 page
└── index.css                 # Global styles + design system
```

## ⚙️ Customization

Edit `src/data/portfolio.ts` to update everything:

| Section | What you can change |
|---------|-------------------|
| `siteConfig` | Title, description, URL, OG image |
| `personalInfo` | Name, title, email, location |
| `contactLinks` | Email, LinkedIn, etc. |
| `heroContent` | Headline, bio, CTAs, resume link |
| `heroBadges` | Stats badges |
| `aboutContent` | About paragraphs |
| `skills` | Skills by category |
| `workExperience` | Jobs, roles, highlights |
| `education` | Degree, institution |
| `projects` | Projects with images and descriptions |
| `testimonials` | Client testimonials |
| `contactContent` | CTA text, availability status |

## 📦 Getting Started

1. Set up your environment variables:
   ```bash
   cp .env.example .env
   # Add your Forminit ID to VITE_FORMINIT_ID
   ```

2. Dev commands:
   ```bash
   # Install dependencies
   bun install

   # Start dev server
   bun run dev

   # Build for production (compiles code and generates sitemap)
   bun run build

   # Preview production build locally
   bun run preview
   ```

## 🚀 Deployment

- **Vercel**: Configured via `vercel.json`. Just link the repository to Vercel for automated builds.
- **Cloudflare Pages**: SPA routing config is supported via wrangler configurations.

## 🎨 Design System

- **Background**: Deep navy (#0d1117)
- **Cards**: Lighter navy (#161b22)
- **Primary accent**: Vermillion (#F85A3E)
- **Typography**: Outfit (headings), DM Sans (body)
- **Corners**: Rounded with consistent radius scale

## 📄 License

MIT License — use this as a template for your own portfolio!
