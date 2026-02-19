# Talha Kashif Hassan - Portfolio

A modern, performant portfolio website built with React, TypeScript, and TailwindCSS. Features a stunning dark theme with vermillion accents, smooth animations, and mobile-first design.

## ✨ Features

- **Multi-page routing** with React Router and smooth page transitions
- **Dark theme** with deep navy background and vermillion (#F85A3E) accents
- **Animated background** with custom Faulty Terminal WebGL effect
- **Fully responsive** mobile-first design (320px to 4K)
- **Section visibility toggle** - show/hide any section
- **Centralized config** - all content in `src/data/portfolio.ts`
- **Testimonials carousel** with auto-rotation and pause on hover
- **CSS staggered mobile menu** with fullscreen overlay

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **Vite** for fast development  
- **Bun** as package manager
- **TailwindCSS** for styling
- **React Router** for routing
- **Lucide React** for icons
- **Outfit + DM Sans** typography

## 🔧 Optimizations Applied

### Vercel React Best Practices
- `React.memo()` on frequently re-rendered components
- `useCallback` for event handlers and navigation functions
- `useMemo` for filtered/computed data
- Ternary operators instead of `&&` for conditional rendering
- Passive scroll event listeners

### Vercel Web Interface Guidelines
- `focus-visible` ring styles for keyboard navigation
- `prefers-reduced-motion` respected for accessibility
- `touch-action: manipulation` for better mobile UX
- `color-scheme: dark` for proper scrollbar/input theming
- `text-wrap: balance` on headings to prevent widows
- Safe area insets for notched devices (iPhone X+)

### Security
- No hardcoded secrets or API keys
- External links use `rel="noopener noreferrer"`
- `.env` patterns in `.gitignore`

## 📁 Project Structure

```
src/
├── data/
│   └── portfolio.ts         # ← ALL content config here
├── components/
│   ├── Layout.tsx           # Main layout with page transitions
│   ├── backgrounds/
│   │   └── FaultyTerminal.tsx  # WebGL background effect
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       └── navigation.tsx   # Header, mobile menu, ScrollToTop
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── ProjectDetailPage.tsx
└── index.css                # Global styles + design system
```

## ⚙️ Customization

Edit `src/data/portfolio.ts` to update everything:

| Section | What you can change |
|---------|-------------------|
| `personalInfo` | Name, title, email, phone |
| `socialLinks` | GitHub, LinkedIn, Twitter, Fiverr |
| `heroContent` | Headline, bio, CTAs, resume link |
| `heroBadges` | Stats badges |
| `aboutContent` | About paragraphs |
| `skills` | Skills by category |
| `workExperience` | Jobs, roles, highlights |
| `education` | Degree, institution |
| `projects` | Projects with images |
| `testimonials` | Client testimonials |
| `contactMethods` | Contact cards |
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
```

## 🎨 Design System

- **Background**: Deep navy (#0d1117)
- **Cards**: Lighter navy (#161b22)
- **Primary accent**: Vermillion (#F85A3E)
- **Typography**: Outfit (headings), DM Sans (body)
- **Corners**: 8px radius for geometric look

## 📄 License

MIT License - use this as a template for your own portfolio!