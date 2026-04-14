import { useEffect, useRef, useState } from "react";

// Mobile device detection - uses matchMedia for reliability
// Cached per session since device type doesn't change
let cachedIsMobile: boolean | null = null;
const getIsMobileDevice = (): boolean => {
  if (cachedIsMobile !== null) return cachedIsMobile;
  if (typeof window === 'undefined') return false;
  const isNarrow = window.matchMedia('(max-width: 767px)').matches;
  const hasTouch = 'ontouchstart' in window && navigator.maxTouchPoints > 0;
  cachedIsMobile = isNarrow && hasTouch;
  return cachedIsMobile;
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 500,
  threshold = 0.1,
  direction = "up"
}: FadeInProps) {
  // Compute isMobile once during component mount (stable value)
  const isMobileRef = useRef(getIsMobileDevice());
  const isMobile = isMobileRef.current;

  // On mobile, start visible. On desktop, start hidden.
  const [isVisible, setIsVisible] = useState(isMobile);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip observer on mobile - content is already visible
    if (isMobile) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, isMobile]);

  const getTransformStyle = () => {
    if (!direction || direction === "none") return "";
    if (isVisible) return "translate(0, 0)";

    switch (direction) {
      case "up": return "translate(0, 20px)";
      case "down": return "translate(0, -20px)";
      case "left": return "translate(20px, 0)";
      case "right": return "translate(-20px, 0)";
      default: return "";
    }
  };

  // On mobile, render without animation styles (but don't return early before hooks!)
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyle(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
