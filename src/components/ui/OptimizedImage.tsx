import { useState, useRef, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
}

type LoadState = "loading" | "cached" | "loaded";

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackClassName,
  loading = "lazy",
  fetchPriority,
  ...props
}: OptimizedImageProps) {
  const [state, setState] = useState<LoadState>("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Before the first paint, check whether the browser already has this image
  // (preloaded or cached). If so, show it straight away with no skeleton or fade.
  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setState("cached");
    } else {
      setState("loading");
    }
  }, [src]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted", fallbackClassName)}>
      {/* Pulse loading skeleton */}
      {state === "loading" && (
        <div className="absolute inset-0 bg-muted/60 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={cn(
          "w-full h-full object-cover",
          state !== "cached" && "transition-opacity duration-500 ease-in-out",
          state === "loading" ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setState((s) => (s === "cached" ? s : "loaded"))}
        onError={() => setState("loaded")}
        {...props}
        {...{ fetchpriority: fetchPriority }}
      />
    </div>
  );
}
