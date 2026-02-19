import { useEffect, useRef, memo, useState } from 'react';

interface DitherBackgroundProps {
  waveColor?: string;
  pixelSize?: number;
  speed?: number;
  className?: string;
}

// Pre-computed normalized 8x8 Bayer matrix (already divided by 64)
const BAYER_MATRIX = new Float32Array([
  0 / 64, 32 / 64, 8 / 64, 40 / 64, 2 / 64, 34 / 64, 10 / 64, 42 / 64,
  48 / 64, 16 / 64, 56 / 64, 24 / 64, 50 / 64, 18 / 64, 58 / 64, 26 / 64,
  12 / 64, 44 / 64, 4 / 64, 36 / 64, 14 / 64, 46 / 64, 6 / 64, 38 / 64,
  60 / 64, 28 / 64, 52 / 64, 20 / 64, 62 / 64, 30 / 64, 54 / 64, 22 / 64,
  3 / 64, 35 / 64, 11 / 64, 43 / 64, 1 / 64, 33 / 64, 9 / 64, 41 / 64,
  51 / 64, 19 / 64, 59 / 64, 27 / 64, 49 / 64, 17 / 64, 57 / 64, 25 / 64,
  15 / 64, 47 / 64, 7 / 64, 39 / 64, 13 / 64, 45 / 64, 5 / 64, 37 / 64,
  63 / 64, 31 / 64, 55 / 64, 23 / 64, 61 / 64, 29 / 64, 53 / 64, 21 / 64
]);

// Pre-computed permutation table for noise
const PERM = new Uint8Array(512);
const P = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
for (let i = 0; i < 256; i++) { PERM[i] = PERM[i + 256] = P[i]; }

// Pre-computed gradient vectors
const GRAD3_X = new Float32Array([1, -1, 1, -1, 1, -1, 1, -1, 0, 0, 0, 0]);
const GRAD3_Y = new Float32Array([1, 1, -1, -1, 0, 0, 0, 0, 1, -1, 1, -1]);

// Pre-computed constants
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

/**
 * Optimized dither background with dramatic swirling smoke patterns.
 * Performance optimized with typed arrays and deferred initialization.
 */
function DitherBackground({
  waveColor = '#F85A3E',
  pixelSize = 2,
  speed = 0.003,
  className = ''
}: DitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
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

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Use larger pixel size initially for faster rendering
    const effectivePixelSize = pixelSize * 1.5;

    // Resize handler with debounce
    let resizeTimeout: number;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        canvas.width = Math.floor(window.innerWidth / effectivePixelSize);
        canvas.height = Math.floor(window.innerHeight / effectivePixelSize);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.imageRendering = 'pixelated';
      }, 100);
    };

    // Initial resize without debounce
    canvas.width = Math.floor(window.innerWidth / effectivePixelSize);
    canvas.height = Math.floor(window.innerHeight / effectivePixelSize);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.imageRendering = 'pixelated';

    window.addEventListener('resize', resize, { passive: true });

    // Parse wave color once
    const parseColor = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 248, g: 90, b: 62 };
    };
    const color = parseColor(waveColor);

    // Inline dot product for performance
    const noise2D = (xin: number, yin: number): number => {
      const s = (xin + yin) * F2;
      const i = Math.floor(xin + s);
      const j = Math.floor(yin + s);
      const t = (i + j) * G2;
      const x0 = xin - (i - t);
      const y0 = yin - (j - t);

      const i1 = x0 > y0 ? 1 : 0;
      const j1 = x0 > y0 ? 0 : 1;

      const x1 = x0 - i1 + G2;
      const y1 = y0 - j1 + G2;
      const x2 = x0 - 1 + 2 * G2;
      const y2 = y0 - 1 + 2 * G2;

      const ii = i & 255;
      const jj = j & 255;
      const gi0 = PERM[ii + PERM[jj]] % 12;
      const gi1 = PERM[ii + i1 + PERM[jj + j1]] % 12;
      const gi2 = PERM[ii + 1 + PERM[jj + 1]] % 12;

      let n0 = 0, n1 = 0, n2 = 0;
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (GRAD3_X[gi0] * x0 + GRAD3_Y[gi0] * y0); }
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (GRAD3_X[gi1] * x1 + GRAD3_Y[gi1] * y1); }
      let t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (GRAD3_X[gi2] * x2 + GRAD3_Y[gi2] * y2); }

      return 70 * (n0 + n1 + n2);
    };

    // Simplified FBM with fewer octaves for performance
    const fbm = (x: number, y: number, t: number): number => {
      const driftX = t * 0.4;
      const driftY = -t * 0.6;

      x += driftX;
      y += driftY;

      const warp1 = noise2D(x * 0.5 + t * 0.05, y * 0.5);
      const warp2 = noise2D(x * 0.5, y * 0.5 + t * 0.04);

      x += warp1 * 1.5;
      y += warp2 * 1.5;

      // Reduced to 3 octaves for performance (was 5)
      return (
        noise2D(x, y) +
        0.5 * noise2D(x * 2, y * 2) +
        0.25 * noise2D(x * 4, y * 4) +
        1
      ) * 0.5;
    };

    // Animation loop with 24fps throttling for better performance
    let lastFrameTime = 0;
    const frameInterval = 1000 / 24;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < frameInterval) return;
      lastFrameTime = currentTime - (elapsed % frameInterval);

      timeRef.current += speed;
      const t = timeRef.current;

      const w = canvas.width;
      const h = canvas.height;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      const scale = 0.004;
      const colorR = color.r;
      const colorG = color.g;
      const colorB = color.b;

      for (let y = 0; y < h; y++) {
        const yOffset = y * w * 4;
        const by = (y & 7) << 3; // (y % 8) * 8

        for (let x = 0; x < w; x++) {
          const noiseVal = fbm(x * scale, y * scale, t);
          const threshold = BAYER_MATRIX[by + (x & 7)];
          const brightness = noiseVal * 1.2;

          if (brightness > threshold) {
            const intensity = brightness < 1 ? brightness : 1;
            const idx = yOffset + (x << 2);
            data[idx] = (colorR * intensity) | 0;
            data[idx + 1] = (colorG * intensity) | 0;
            data[idx + 2] = (colorB * intensity) | 0;
            data[idx + 3] = 26;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause animation when tab is hidden to save resources
    const handleVisibility = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
      } else {
        if (!animationRef.current) {
          lastFrameTime = 0;
          animationRef.current = requestAnimationFrame(animate);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waveColor, pixelSize, speed, isReady]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${isReady ? 'animate-fade-in' : 'opacity-0'} ${className}`}
      style={{
        animation: isReady ? 'fadeIn 1.5s ease-in forwards' : 'none',
      }}
      aria-hidden="true"
    />
  );
}

export default memo(DitherBackground);

