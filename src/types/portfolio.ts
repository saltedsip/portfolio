// ============================================
// TYPE DEFINITIONS FOR PORTFOLIO DATA LAYER
// ============================================

export interface SiteConfig {
    title: string;
    description: string;
    url: string;
    ogImage: string;
    keywords: string;
}

export interface PersonalInfo {
    name: string;
    firstName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
}

export interface ContactLink {
    id: string;
    label: string;
    value: string;
    icon: string;
    href: string;
    showInNav: boolean;
    showInContact: boolean;
}

export interface NavLink {
    label: string;
    href: string;
    isRoute: boolean;
}

export interface HeroContent {
    greeting: string;
    headline: string;
    subheadline: string;
    bio: string;
    ctaText: string;
    ctaLink: string;
    resumeText: string;
    resumeLink: string;
}

export interface HeroBadge {
    icon: string;
    label: string;
}

export interface AboutContent {
    title: string;
    paragraphs: string[];
}

export interface Skills {
    [category: string]: string[];
}

export interface WorkExperience {
    id: number;
    company: string;
    title: string;
    period: string;
    isActive: boolean;
    highlights: string[];
    tags: string[];
}

export interface Education {
    degree: string;
    institution: string;
}

export interface Certification {
    title: string;
    issuer: string;
    year: string;
}

export interface ProjectsContent {
    title: string;
    subtitle: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    link: string;
    github: string;
    featured: boolean;
}

export interface ContactContent {
    title: string;
    subtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    availability: string;
}

export interface TestimonialsContent {
    badge: string;
    title: string;
    subtitle: string;
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    content: string;
    rating: number;
}

export interface FooterContent {
    copyright: string;
    showSocialLinks: boolean;
}

export interface SectionVisibility {
    hero: boolean;
    about: boolean;
    projects: boolean;
    testimonials: boolean;
    contact: boolean;
}
