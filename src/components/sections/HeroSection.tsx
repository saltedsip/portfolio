import { ArrowRight, Download } from "lucide-react";
import { heroContent, personalInfo } from "@/data/portfolio";
import { FadeIn } from "@/components/ui/FadeIn";
import { memo } from "react";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-primary font-extrabold">
    {children}
  </span>
);

const HeroSection = () => (
  <section className="flex flex-col justify-center py-4">
    {/* Hero Content - Oska style */}
    <div>
      {/* Main Headline with professional highlight */}
      <FadeIn delay={100} direction="up">
        <h1 className="text-[2rem] sm:text-[3rem] md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.2]">
          Hey, I'm {personalInfo.firstName}. <span className="block sm:inline"><br className="hidden sm:inline" />I'm a <Highlight>{heroContent.subheadline}</Highlight>.</span>
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
          <a
            href={heroContent.ctaLink || "#contact"}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            {heroContent.ctaText || "Contact Me"}
            <ArrowRight className="w-4 h-4" />
          </a>
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
  </section>
);

export default memo(HeroSection);
