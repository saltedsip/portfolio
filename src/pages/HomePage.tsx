import { Header } from "@/components/ui/navigation";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { footerContent, navSocialLinks } from "@/data/portfolio";
import { ScrollToTop } from "@/components/ui/navigation";

// Lazy load the background component
const DitherBackground = lazy(() => import("@/components/backgrounds/DitherBackground"));

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to hash on mount (handles back-navigation from subpages)
  useEffect(() => {
    // Override browser scroll restoration to prevent layout jumping on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
      return () => {
        clearTimeout(timer);
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'auto';
        }
      };
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Delay loading the background to prioritize content
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="app-container min-h-screen bg-background transition-colors duration-300 overflow-x-hidden relative">
      <SEO />
      <Header isScrolled={isScrolled} />

      <main className="relative z-10">
        {/* Hero — screen height viewport with parent-relative dither background */}
        <div id="home" className="relative w-full h-[100dvh] overflow-hidden">
          {showBackground && (
            <Suspense fallback={null}>
              <DitherBackground
                waveColor="#F85A3E"
                pixelSize={2}
                speed={0.0003}
              />
            </Suspense>
          )}
          
          {/* Fade transition overlay at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none z-10" />
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center relative z-20">
            <HeroSection />
          </div>
        </div>

        {/* About */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <AboutSection />
        </div>

        {/* Featured Projects */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <FeaturedProjects />
        </div>

        {/* Testimonials */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <TestimonialsSection />
        </div>

        {/* Contact */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <ContactSection />
        </div>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground py-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>{footerContent.copyright}</p>
            {navSocialLinks.length > 0 && (
              <div className="flex gap-4">
                {navSocialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>
      </main>

      <ScrollToTop visible={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

export default HomePage;
