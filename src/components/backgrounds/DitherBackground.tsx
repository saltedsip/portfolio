import { useEffect, useRef, memo, useState } from 'react';
import { createCanvas2DRenderer, createWebGLRenderer, type DitherRenderer, type Rgb } from './ditherRenderers';

interface DitherBackgroundProps {
  waveColor?: string;
  pixelSize?: number;
  speed?: number;
  className?: string;
}

const parseColor = (hex: string): Rgb => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 248, g: 90, b: 62 };
};

/**
 * Animated dither background with swirling smoke patterns.
 * Rendered on the GPU via WebGL (CPU canvas fallback), throttled to 24fps,
 * and paused while off-screen or while the tab is hidden.
 */
function DitherBackground({
  waveColor = '#F85A3E',
  pixelSize = 2,
  speed = 0.003,
  className = ''
}: DitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const [isReady, setIsReady] = useState(false);

  // Defer initialization to not block main thread
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    const scheduleInit = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
    const handle = scheduleInit(() => setIsReady(true));
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle as number);
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // One canvas pixel per dither cell, upscaled with pixelated rendering
    const cellSize = pixelSize * 1.5;
    const applySize = () => {
      const parent = canvas.parentElement || document.body;
      canvas.width = Math.max(1, Math.floor(parent.clientWidth / cellSize));
      canvas.height = Math.max(1, Math.floor(parent.clientHeight / cellSize));
    };
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.imageRendering = 'pixelated';
    applySize();

    const color = parseColor(waveColor);
    const renderer: DitherRenderer | null =
      createWebGLRenderer(canvas, color) ?? createCanvas2DRenderer(canvas, color);
    if (!renderer) return;

    // Animation loop with 24fps throttling
    let frameId: number | undefined;
    let lastFrameTime = 0;
    const frameInterval = 1000 / 24;

    const animate = (currentTime: number) => {
      frameId = requestAnimationFrame(animate);

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      timeRef.current += speed;
      renderer.render(timeRef.current, document.documentElement.classList.contains('dark'));
    };

    const start = () => {
      if (frameId !== undefined) return;
      lastFrameTime = 0;
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      if (frameId === undefined) return;
      cancelAnimationFrame(frameId);
      frameId = undefined;
    };

    // Only animate while the hero is on screen and the tab is visible
    let isOnScreen = true;
    const update = () => (isOnScreen && !document.hidden ? start() : stop());

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
      update();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', update);

    // A lost GPU context can't draw again; stop rather than spin
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    // Resize handler with debounce
    let resizeTimeout: number | undefined;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(applySize, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    update();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      renderer.dispose();
    };
  }, [waveColor, pixelSize, speed, isReady]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${isReady ? 'animate-fade-in' : 'opacity-0'} ${className}`}
      style={{
        animation: isReady ? 'fadeIn 1.5s ease-in forwards' : 'none',
        maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)'
      }}
      aria-hidden="true"
    />
  );
}

export default memo(DitherBackground);
