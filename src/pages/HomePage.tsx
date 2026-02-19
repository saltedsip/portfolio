import { Header } from "@/components/ui/navigation";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/sections/HeroSection";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load the background component
const DitherBackground = lazy(() => import("@/components/backgrounds/DitherBackground"));

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Delay loading the background to prioritize content
  useEffect(() => {
    // Only skip if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    // Short delay to ensure LCP is complete
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container h-dvh bg-background transition-colors duration-300 overflow-y-auto overflow-x-hidden relative">
      <SEO />
      {/* Lightweight Dither Background */}
      {showBackground && (
        <Suspense fallback={null}>
          <DitherBackground
            waveColor="#F85A3E"
            pixelSize={4}
            speed={0.0003}
          />
        </Suspense>
      )}

      <Header isScrolled={isScrolled} />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-8 min-h-[calc(100dvh-6rem)] flex flex-col justify-center">
        <HeroSection />
      </main>
    </div>
  );
};

export default HomePage;
