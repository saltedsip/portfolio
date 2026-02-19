import { testimonialsContent, testimonials } from "@/data/portfolio";
import { useState, useEffect, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

// Get initials from name for avatar
const getInitials = (name: string) => {
  return name
    .split(/[\s.]/)
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Generate a consistent color based on name
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-primary",
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [isAnimating]);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [isAnimating]);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setAnimationKey(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [isAnimating, currentIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20">
      {/* Full-width testimonial card - Oska style with min-height */}
      <FadeIn direction="up">
        <div
          className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[400px] flex flex-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote mark decoration */}
          <Quote className="absolute top-6 right-6 w-16 h-16 text-primary/10" />

          {/* Section Label */}
          <p className="text-sm text-primary font-medium uppercase tracking-wide mb-8">
            {testimonialsContent.badge || "Client Love"}
          </p>

          {/* Large Quote - with fade animation */}
          <div className="flex-1 flex flex-col justify-center min-h-[180px]">
            <blockquote
              key={animationKey}
              className={`text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed max-w-4xl transition-all duration-500 ease-out ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
            >
              "{current.content}"
            </blockquote>
          </div>

          {/* Author and Navigation - with fade animation */}
          <div
            className={`flex items-center justify-between mt-8 transition-all duration-500 ease-out ${isAnimating ? "opacity-0" : "opacity-100"
              }`}
          >
            {/* Author info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className={`w-12 h-12 rounded-full ${getAvatarColor(current.name)} flex items-center justify-center text-white font-medium`}>
                  {getInitials(current.name)}
                </div>
              )}

              <div>
                <p className="font-semibold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role ? `${current.role}, ${current.company}` : current.company}
                </p>
              </div>
            </div>

            {/* Navigation arrows - Oska style */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress dots with smooth CSS animation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden ${i === currentIndex ? "bg-border w-8" : "bg-border hover:bg-muted-foreground w-2"
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {/* Smooth CSS progress animation for active dot */}
                {i === currentIndex ? (
                  isPaused ? (
                    <span className="absolute inset-y-0 left-0 bg-primary rounded-full w-1/2" />
                  ) : (
                    <span
                      key={`progress-${currentIndex}-${animationKey}`}
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      style={{ animation: `progressFill ${AUTOPLAY_INTERVAL}ms linear forwards` }}
                    />
                  )
                ) : null}
              </button>
            ))}
          </div>

        </div>
      </FadeIn>
    </section>
  );
};

export default memo(TestimonialsSection);
