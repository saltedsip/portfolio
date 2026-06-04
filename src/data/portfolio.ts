// ============================================
// PORTFOLIO CONFIGURATION FILE
// ============================================
// Edit this file to update ALL content on your portfolio.
// Every text, link, card, and section can be modified here.
// ============================================

import type {
  SiteConfig,
  PersonalInfo,
  ContactLink,
  NavLink,
  HeroContent,
  HeroBadge,
  AboutContent,
  Skills,
  WorkExperience,
  Education,
  Certification,
  ProjectsContent,
  Project,
  ContactContent,
  TestimonialsContent,
  Testimonial,
  FooterContent,
} from "@/types/portfolio";
import visualbuilder from "../assets/projects/visualbuilder.webp";
import tozan from "../assets/projects/tozan.webp";

// --------------------------------------------
// SITE CONFIG
// --------------------------------------------
export const siteConfig: SiteConfig = {
  title: "Talha Kashif Hassan - Full Stack Developer",
  description:
    "Full stack developer specializing in React, Next.js, and Node.js.",
  url: "https://www.talhakashif.com",
  ogImage: "https://www.talhakashif.com/og_image.png",
  keywords: "full stack developer, react, nextjs, nodejs, freelance",
};

const emailAddress = ["talhakashif.dev", "gmail.com"].join("@");

// --------------------------------------------
// PERSONAL INFO
// --------------------------------------------
export const personalInfo: PersonalInfo = {
  name: "Talha Kashif Hassan",
  firstName: "Talha",
  title: "Full Stack Developer",
  email: emailAddress,
  phone: "+92 326 622 7895",
  location: "Remote, Worldwide",
};

// --------------------------------------------
// CONTACT LINKS (unified social + contact methods)
// showInNav: appears in header/footer navigation
// showInContact: appears as a card in the contact section
// --------------------------------------------
export const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    value: emailAddress,
    icon: "mail",
    href: "gmail", // Special value: opens Gmail compose
    showInNav: false,
    showInContact: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+92 326 622 7895",
    icon: "phone",
    href: "tel:+923266227895",
    showInNav: false,
    showInContact: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Connect with me",
    icon: "linkedin",
    href: "https://linkedin.com/in/talha-kashif-hassan",
    showInNav: true,
    showInContact: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "@saltedsip",
    icon: "github",
    href: "https://github.com/saltedsip",
    showInNav: true,
    showInContact: false,
  },
  // {
  //   id: "twitter",
  //   label: "Twitter",
  //   value: "@handle",
  //   icon: "twitter",
  //   href: "https://twitter.com/handle",
  //   showInNav: true,
  //   showInContact: false,
  // },
  // {
  //   id: "fiverr",
  //   label: "Fiverr",
  //   value: "Hire me",
  //   icon: "fiverr",
  //   href: "https://fiverr.com/yourprofile",
  //   showInNav: false,
  //   showInContact: true,
  // },
];

// --------------------------------------------
// NAVIGATION
// --------------------------------------------
export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", isRoute: false },
  { label: "About", href: "#about", isRoute: false },
  { label: "Work", href: "#work", isRoute: false },
  { label: "Contact", href: "#contact", isRoute: false },
];

// --------------------------------------------
// HERO SECTION
// --------------------------------------------
export const heroContent: HeroContent = {
  greeting: "👋",
  headline: "Talha Kashif Hassan",
  subheadline: "Full Stack Developer for Startups & Agencies",
  bio: "I turn product ideas into production-ready web applications. 200+ projects shipped for founders and agencies across 15+ countries — from high-converting landing pages to full-featured SaaS platforms — with a 4.9/5 client satisfaction rating.",
  ctaText: "Start a Project",
  ctaLink: "#contact",
  resumeText: "Download Resume",
  resumeLink: "/resume.pdf",
};

// Hero badges/stats
export const heroBadges: HeroBadge[] = [
  { icon: "award", label: "Level 2 Seller" },
  { icon: "star", label: "4.9/5 rating" },
  { icon: "clock", label: "24hr response" },
];

// --------------------------------------------
// ABOUT SECTION
// --------------------------------------------
export const aboutContent: AboutContent = {
  title: "About me",
  paragraphs: [
    "I've spent 8+ years building web applications across e-commerce, SaaS, real estate, healthcare, and ed-tech — working directly with solo founders, marketing teams, and agency CTOs. My core stack is React, Next.js, and Node.js, but I've also delivered production work in Webflow, WordPress, and Python.",
    "What sets me apart: I think in business outcomes, not just code. I've improved client page-load speeds by 40%, boosted engagement metrics by 20%, and increased organic traffic by 25% through performance and SEO work. I write software that ships fast and scales without breaking.",
  ],
};

// --------------------------------------------
// SKILLS (add/remove categories and skills)
// --------------------------------------------
export const skills: Skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3/Sass",
    "TailwindCSS",
  ],
  Backend: [
    "Node.js",
    "Express",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
  ],
  Tools: ["Git", "Webflow", "WordPress", "Figma"],
};

// --------------------------------------------
// WORK EXPERIENCE
// --------------------------------------------
export const experienceTitle = "Experience";

export const workExperience: WorkExperience[] = [
  {
    id: 1,
    company: "Fiverr",
    title: "Freelance Full Stack Developer",
    period: "03.2017 – Present",
    isActive: true,
    highlights: [
      "Delivered 200+ web development projects with 4.9/5 satisfaction rating.",
      "Achieved Level 2 seller status, increasing repeat business by 40%.",
    ],
    tags: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
  },
  {
    id: 2,
    company: "Aardig",
    title: "Webflow Developer",
    period: "06.2022 – 04.2023",
    isActive: false,
    highlights: [
      "Improved user engagement metrics by 20% through custom interactions.",
      "Achieved 40% increase in page load speeds with performance optimization.",
    ],
    tags: ["Webflow", "Figma", "GSAP", "CSS3"],
  },
  {
    id: 3,
    company: "DeBetaStudent",
    title: "WordPress Developer",
    period: "12.2018 – 06.2022",
    isActive: false,
    highlights: [
      "Developed 15+ WordPress and Wix websites with 40% engagement increase.",
      "Boosted organic traffic by 25% through advanced SEO techniques.",
    ],
    tags: ["WordPress", "PHP", "MySQL", "SEO"],
  },
];

// --------------------------------------------
// EDUCATION & CERTIFICATIONS
// --------------------------------------------
export const educationTitle = "Education & Certifications";

export const education: Education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "Virtual University of Pakistan",
};

export const certifications: Certification[] = [
  {
    title: "Code In Place",
    issuer: "Stanford University",
    year: "2025",
  },
  {
    title: "Front-End Developer Specialization",
    issuer: "Meta",
    year: "2023",
  },
];

// --------------------------------------------
// PROJECTS SECTION
// --------------------------------------------
export const projectsContent: ProjectsContent = {
  title: "Projects",
  subtitle:
    "Here's a selection of projects I've worked on. Each represents a unique challenge and opportunity to deliver exceptional results.",
};

export const projects: Project[] = [
  {
    id: "visualbuilder",
    title: "Visual Builder",
    description:
      "Visual Builder is a fully-featured, local-first visual web builder engineered to feel like premium tools such as Elementor and Webflow. Built entirely with React, TypeScript, Tailwind CSS, and Shadcn UI, it allows you to design, build, and export component-driven web pages without ever writing a line of code.",
    longDescription: `Visual Builder is a fully-featured, local-first visual web builder designed to deliver a premium, no-code development experience akin to tools like Webflow and Elementor. Engineered entirely with React, TypeScript, Tailwind CSS, and Shadcn UI, it empowers users to design, build, and export component-driven, multi-page websites without writing a single line of code.

**Core Highlights:**
- Local-First & Export-Ready: Runs entirely in the browser with local storage (or an optional REST API backend). Export your entire canvas to semantic, dependency-free HTML and CSS with one click.

- Advanced Visual Canvas: Features a highly interactive drag-and-drop interface with deep, recursive element trees. Users can pan, zoom (10–200%), edit rich text inline, and instantly drop pre-built block modules onto the canvas.

- Robust Design System: Granular control over atomic CSS classes and design tokens. Map raw CSS custom properties scoped to your specific template, and test layouts across visual device breakpoints.

- Security by Design: All inputs and outputs are heavily sanitized using DOMPurify, custom URL scheme allowlists, and sandboxed iframes for embed codes.
`,
    image: visualbuilder,
    tags: ["React", "Typescript", "Tailwind CSS"],
    link: "https://visualbuilder-react.vercel.app/",
    github: "https://github.com/saltedsip/visualbuilder", // Add your repo link here if you have one!
    featured: true,
  },
  {
    id: "tozan",
    title: "Tozan Design",
    description:
      "A Next.js rebuild of a Dutch interior-design studio's site, replacing a Bricks/WordPress build with a static, animation-first front end.",
    longDescription: `**What I did**

Replaced the studio's Bricks-builder WordPress front end with a fully static Next.js export. The goal was a site that loads instantly, animates the way the studio's print portfolio feels (deliberate, paced, not flashy), and ranks on its own brand searches.

**Key work:**

- Built a custom animation system in plain React + CSS — a per-character WaveText cascade for nav links, a center-out AnimatedDivider that draws in sync with the wave, a sticky scroll-driven back button on project pages, and a per-route entrance transition. No GSAP, no Framer Motion — just IntersectionObserver + transition.
- Synchronized animations across components. The footer's divider and the four nav-link wave reveals share a single IntersectionObserver on the nav row, so the line and the letter cascade start on the exact same frame.
- Cut hero image weight by 93% — 8 MB print-resolution PNGs downscaled to 2560 wide and re-encoded as WebP / quality-92 JPEG via sharp.Same visual fidelity, 500 KB instead of 8 MB per asset.
- SEO ground-up: per-page metadata exports, generated sitemap.xml + robots.txt, Organization + Article + CreativeWork + BreadcrumbList   JSON-LD, OG + Twitter card metadata, canonical URLs.
- Headerless content pipeline. Projects and blog posts live in flat JSON / MDX files under content/ — no CMS, no database, no admin panel. Editing copy means editing a file and pushing.
- Tailwind v4 with @theme tokens — single source of truth for brand colors, fonts, and the design system; replaces ~2000 lines of per-id CSS that the Bricks export shipped with.

**Things I'd do differently**

- Wire a tiny headless CMS (Sanity / Tina) for the project JSON files so the studio can update copy without touching code.
- Pre-generate AVIF alongside JPEG for the 5% of users on browsers that handle it.
`,
    image: tozan,
    tags: ["NextJs", "Typescript", "Tailwind CSS"],
    link: "https://tozandesign.nl",
    github: "", // Add your repo link here if you have one!
    featured: true,
  },
];

// --------------------------------------------
// CONTACT SECTION
// --------------------------------------------
export const contactContent: ContactContent = {
  title: "Get in Touch",
  subtitle:
    "Have a project in mind? I'd love to hear about it. Feel free to reach out through any of the channels below.",
  ctaTitle: "Ready to start a project?",
  ctaSubtitle: "Let's build something great together.",
  ctaButtonText: "Send me an email",
  availability: "Available for new projects — let's talk",
};

// Helper exports for backward compatibility
// Use contactLinks directly for full control
export const contactMethods = contactLinks.filter((link) => link.showInContact);
export const navSocialLinks = contactLinks.filter((link) => link.showInNav);

// --------------------------------------------
// TESTIMONIALS SECTION
// --------------------------------------------
export const testimonialsContent: TestimonialsContent = {
  badge: "CLIENT LOVE",
  title: "Loved by clients",
  subtitle: "What people I've worked with are saying.",
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "J. Anthony",
    role: "Founder",
    company: "Marketplace Startup, US",
    image: "",
    content:
      "Kashif did an amazing job! The website looks incredible and very professional. He was polite, communicative, and paid great attention to detail throughout the entire process. Super talented designer — highly recommended! 10/10",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus B.",
    role: "Business Owner",
    company: "E-commerce, Germany",
    image: "",
    content:
      "Absolutely wow! KASHIF is an outstanding professional, super friendly, and always reliable. He perfectly redesigned my website, making it look great on mobile as well. Very fast and competent service – always happy to work with him again!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sherry P.",
    role: "Creative Director",
    company: "Agency, UK",
    image: "",
    content:
      "If I could give this guy more stars, I would. Thanks a million for your support and patience! I will be back!",
    rating: 5,
  },
  {
    id: 4,
    name: "Maxwell E.",
    role: "Entrepreneur",
    company: "SaaS Startup, US",
    image: "",
    content:
      "I know barely anything about website design. This guy was so professional and made sure he got it right. I'm very happy with the results — money very well spent. He saved me a lot of time of trial and error.",
    rating: 5,
  },
  {
    id: 5,
    name: "David X.",
    role: "Product Manager",
    company: "Tech Company, Australia",
    image: "",
    content:
      "Kashif went above and beyond to help get the job done promptly and efficiently. He was always happy to help with my requests. Very good communication and turnaround times. Would highly recommend him to anyone!",
    rating: 5,
  },
  {
    id: 6,
    name: "Svenja M.",
    role: "Marketing Lead",
    company: "Digital Agency, Germany",
    image: "",
    content:
      "I am beyond pleased with his work. Not only did he optimize my website for mobile, but he also gave me helpful suggestions to fix my site's SEO! Amazing experience — so friendly and responsive.",
    rating: 5,
  },
  {
    id: 7,
    name: "Mike J.",
    role: "Founder",
    company: "EdTech Platform, India",
    image: "",
    content:
      "Excellent Work — my best experience on Fiverr so far! Easy and quick service. Great communication. Did what he said he would do. If you are considering working with this guy, give him a chance. You won't regret it!",
    rating: 5,
  },
  {
    id: 8,
    name: "Eddie O.",
    role: "Operations Director",
    company: "Consulting Firm, US",
    image: "",
    content:
      "The Seller works fast, solved problems quickly, and was very understanding. Also demonstrated strong leadership skills and is an over-achiever. The pricing was better than competitors for similar service!",
    rating: 5,
  },
];

// --------------------------------------------
// FOOTER
// --------------------------------------------
export const footerContent: FooterContent = {
  copyright: `© ${new Date().getFullYear()} Talha Kashif Hassan`,
  showSocialLinks: true,
};


