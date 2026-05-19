import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackClassName,
  loading = "lazy",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    // Check if the image is already cached in browser memory
    const img = new Image();
    img.src = src;
    if (img.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted", fallbackClassName)}>
      {/* Pulse loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/60 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
