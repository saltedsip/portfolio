import { ReactNode, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Header, ScrollToTop } from "@/components/ui/navigation";

// Scroll tracking hook
const useScrollTracking = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { isScrolled, showScrollTop, scrollToTop };
};

// Page transition hook
const usePageTransition = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [currentKey, setCurrentKey] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== currentKey) {
      // Start exit animation
      setIsVisible(false);

      // After exit, update key and start enter animation
      const timer = setTimeout(() => {
        setCurrentKey(location.pathname);
        window.scrollTo(0, 0);
        setIsVisible(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentKey]);

  return { isVisible, currentKey };
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isScrolled, showScrollTop, scrollToTop } = useScrollTracking();
  const { isVisible } = usePageTransition();

  return (
    <div className="app-container min-h-screen bg-background transition-colors duration-300">
      <Header isScrolled={isScrolled} />

      <main
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 transition-all duration-300 ease-out ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
          }`}
      >
        {children}
      </main>

      <ScrollToTop visible={showScrollTop} onClick={scrollToTop} />
    </div>
  );
};

export default Layout;
