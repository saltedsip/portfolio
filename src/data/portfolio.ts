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
  SectionVisibility,
} from "@/types/portfolio";

// --------------------------------------------
// SITE CONFIG
// --------------------------------------------
export const siteConfig: SiteConfig = {
  title: "Talha Kashif Hassan - Full Stack Developer",
  description: "Full stack developer specializing in React, Next.js, and Node.js.",
  url: "https://talhakashif.com",
  ogImage: "https://talhakashif.com/og_image.png",
  keywords: "full stack developer, react, nextjs, nodejs, freelance",
};

// --------------------------------------------
// PERSONAL INFO
// --------------------------------------------
export const personalInfo: PersonalInfo = {
  name: "Talha Kashif Hassan",
  firstName: "Talha",
  title: "Full Stack Developer",
  email: "talhakashif.dev@gmail.com",
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
    value: "talhakashif.dev@gmail.com",
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
    showInContact: true,
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
  // Uncomment to enable:
  // {
  //   id: "github",
  //   label: "GitHub",
  //   value: "@saltedsip",
  //   icon: "github",
  //   href: "https://github.com/saltedsip",
  //   showInNav: true,
  //   showInContact: true,
  // },
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
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Projects", href: "/projects", isRoute: true },
  { label: "Contact", href: "/contact", isRoute: true },
];

// --------------------------------------------
// HERO SECTION
// --------------------------------------------
export const heroContent: HeroContent = {
  greeting: "👋",
  headline: "Talha Kashif Hassan",
  subheadline: "Full Stack Developer",
  bio: "I help businesses and startups bring their ideas to life through clean, scalable code. As a Level 2 Fiverr seller, I've delivered 200+ projects—from sleek landing pages to full-featured SaaS dashboards—with a 4.9/5 client satisfaction rating.",
  ctaText: "Get in touch",
  ctaLink: "#contact",
  // Resume download button (leave empty to hide)
  resumeText: "Download Resume",
  resumeLink: "/resume.pdf", // Add your resume PDF to public folder
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
    "I'm a full stack developer who loves building modern, scalable web applications that solve real problems. My core stack is React, Next.js, and Node.js, but I'm equally comfortable with Webflow, WordPress, and custom backend solutions.",
    "I'm passionate about building products that make a real impact. Beyond client work, I'm actively working on my own SaaS ideas. I believe great software comes from understanding the problem first, then writing code.",
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
  Tools: [
    "Git",
    "Webflow",
    "WordPress",
    "Figma",
  ],
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
  subtitle: "Here's a selection of projects I've worked on. Each represents a unique challenge and opportunity to deliver exceptional results.",
};

export const projects: Project[] = [
  {
    id: "lms-course-platform",
    title: "LMS Course Platform",
    description: "Full-featured learning management system with video courses, progress tracking, quizzes, certificates, and Stripe payment integration. Built for an ed-tech startup.",
    longDescription: "This comprehensive learning management system was built for an ed-tech startup looking to deliver online courses at scale. The platform includes video hosting with progress tracking, interactive quizzes with instant feedback, certificate generation, and a complete payment system powered by Stripe. Students can track their learning journey while instructors have access to detailed analytics dashboards.",
    image: "/assets/projects/dashboard.png",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    link: "#",
    github: "",
    featured: true,
  },
  {
    id: "job-board-saas",
    title: "Job Board SaaS",
    description: "Multi-tenant job board platform with employer dashboards, applicant tracking, resume parsing, and subscription billing. Handles 10K+ listings.",
    longDescription: "A multi-tenant job board platform designed for scale. Employers can post jobs, review applications, and manage their hiring pipeline. The system includes AI-powered resume parsing, applicant tracking, and subscription-based billing. Built to handle over 10,000 active job listings with real-time search powered by Redis.",
    image: "/assets/projects/agency.png",
    tags: ["React", "Node.js", "MongoDB", "Redis"],
    link: "#",
    github: "",
    featured: true,
  },
  {
    id: "real-estate-portal",
    title: "Real Estate Portal",
    description: "Property listing platform with advanced search filters, map integration, virtual tours, and agent management. Mobile-responsive with 50K+ monthly users.",
    longDescription: "A feature-rich real estate platform serving 50K+ monthly users. Property seekers can browse listings with advanced filters, view properties on an interactive Mapbox-powered map, and take virtual tours. Agents have dedicated dashboards to manage their listings and respond to inquiries. The platform is fully responsive and optimized for mobile users.",
    image: "/assets/projects/ecommerce.png",
    tags: ["Next.js", "TypeScript", "Mapbox", "Supabase"],
    link: "#",
    github: "",
    featured: true,
  },
  {
    id: "travel-booking-engine",
    title: "Travel Booking Engine",
    description: "End-to-end travel booking system with flight/hotel search, dynamic pricing, booking management, and multi-currency support for a travel agency.",
    longDescription: "A complete travel booking solution built for a travel agency. The system aggregates flights and hotels from multiple providers, implements dynamic pricing based on demand, and supports booking management with email confirmations. Multi-currency support allows customers worldwide to book in their local currency.",
    image: "/assets/projects/portfolio.png",
    tags: ["React", "Express", "PostgreSQL", "AWS"],
    link: "#",
    github: "",
    featured: false,
  },
];

// --------------------------------------------
// CONTACT SECTION
// --------------------------------------------
export const contactContent: ContactContent = {
  title: "Get in Touch",
  subtitle: "Have a project in mind? I'd love to hear about it. Feel free to reach out through any of the channels below.",
  ctaTitle: "Ready to start a project?",
  ctaSubtitle: "Let's build something great together.",
  ctaButtonText: "Send me an email",
  availability: "Taking on new projects for Q1 2026",
};

// Helper exports for backward compatibility
// Use contactLinks directly for full control
export const contactMethods = contactLinks.filter(link => link.showInContact);
export const navSocialLinks = contactLinks.filter(link => link.showInNav);

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
    role: "",
    company: "United States",
    image: "",
    content: "Kashif did an amazing job! The website looks incredible and very professional. He was polite, communicative, and paid great attention to detail throughout the entire process. Super talented designer — highly recommended! 10/10",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus B.",
    role: "",
    company: "Germany",
    image: "",
    content: "Absolutely wow! KASHIF is an outstanding professional, super friendly, and always reliable. He perfectly redesigned my website, making it look great on mobile as well. Very fast and competent service – always happy to work with him again!",
    rating: 5,
  },
  {
    id: 3,
    name: "Sherry P.",
    role: "",
    company: "United Kingdom",
    image: "",
    content: "If I could give this guy more stars, I would. Thanks a million for your support and patience! I will be back!",
    rating: 5,
  },
  {
    id: 4,
    name: "Maxwell E.",
    role: "",
    company: "United States",
    image: "",
    content: "I know barely anything about website design. This guy was so professional and made sure he got it right. I'm very happy with the results — money very well spent. He saved me a lot of time of trial and error.",
    rating: 5,
  },
  {
    id: 5,
    name: "David X.",
    role: "",
    company: "Australia",
    image: "",
    content: "Kashif went above and beyond to help get the job done promptly and efficiently. He was always happy to help with my requests. Very good communication and turnaround times. Would highly recommend him to anyone!",
    rating: 5,
  },
  {
    id: 6,
    name: "Svenja M.",
    role: "",
    company: "Germany",
    image: "",
    content: "I am beyond pleased with his work. Not only did he optimize my website for mobile, but he also gave me helpful suggestions to fix my site's SEO! Amazing experience — so friendly and responsive.",
    rating: 5,
  },
  {
    id: 7,
    name: "Mike J.",
    role: "",
    company: "India",
    image: "",
    content: "Excellent Work — my best experience on Fiverr so far! Easy and quick service. Great communication. Did what he said he would do. If you are considering working with this guy, give him a chance. You won't regret it!",
    rating: 5,
  },
  {
    id: 8,
    name: "Eddie O.",
    role: "",
    company: "United States",
    image: "",
    content: "The Seller works fast, solved problems quickly, and was very understanding. Also demonstrated strong leadership skills and is an over-achiever. The pricing was better than competitors for similar service!",
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

// --------------------------------------------
// SECTION VISIBILITY
// Set to false to visually hide (content still accessible to search engines)
// --------------------------------------------
export const sectionVisibility: SectionVisibility = {
  hero: true,
  about: true,
  projects: false,
  testimonials: true,
  contact: true,
};
