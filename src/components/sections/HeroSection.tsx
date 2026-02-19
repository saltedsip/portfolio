import { ArrowRight, Download, Briefcase, Star, Award } from "lucide-react";
import { heroContent, personalInfo } from "@/data/portfolio";
import { memo } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";

// Stats data with icons
const stats = [
  { value: "200+", label: "Projects Delivered", icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" /> },
  { value: "4.9/5", label: "Client Rating", icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-primary" /> },
  { value: "Level 2", label: "Fiverr Seller", icon: <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" /> },
];

// Professional Oska-style highlight - straight rounded box with contrasting text
// Using brand-aligned "Orange Glow" for harmony
// Professional Oska-style highlight - Solid Text
// User selected Option 1 but requested "one color" and "no underline"
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary font-extrabold">
    {children}
  </span>
);

const HeroSection = () => (
  <section id="home" className="flex flex-col justify-center py-4">
    {/* Hero Content - Oska style */}
    <div className="mb-8 md:mb-12">
      {/* Main Headline with professional highlight */}
      <FadeIn delay={100} direction="up">
        <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-[1.3]">
          Hey, I'm {personalInfo.firstName}. A
          <br />
          <Highlight>{heroContent.subheadline}</Highlight>
          <br />
          with years of Experience
        </h1>
      </FadeIn>

      {/* Subtitle */}
      <FadeIn delay={300} direction="up">
        <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          {heroContent.bio}
        </p>
      </FadeIn>

      {/* CTA Buttons - Oska pill style */}
      <FadeIn delay={500} direction="up">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Contact Me
            <ArrowRight className="w-4 h-4" />
          </Link>
          {heroContent.resumeText && (
            <a
              href={heroContent.resumeLink}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-full font-medium hover:bg-muted transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              {heroContent.resumeText}
            </a>
          )}
        </div>
      </FadeIn>
    </div>

    {/* Stats Section - Horizontal row on desktop, stacked on mobile */}
    <FadeIn delay={700} direction="up">
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0 p-4 md:py-6 md:px-0 bg-card border border-border rounded-2xl">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 md:flex-1 md:justify-center md:px-6 ${i > 0 ? 'md:border-l md:border-border' : ''}`}
          >
            {/* Icon */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {stat.icon}
            </div>
            {/* Text */}
            <div>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  </section>
);

export default memo(HeroSection);
