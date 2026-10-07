// ============================================
// DITHER RENDERERS
// ============================================
// Two interchangeable ways to draw the animated dither:
// - WebGL: a fragment shader computes every dither cell on the GPU (default).
// - Canvas 2D: the same algorithm on the CPU, used only when WebGL is unavailable.
//
// Both take the canvas at "dither cell" resolution (one canvas pixel per cell,
// upscaled with image-rendering: pixelated) and draw one frame per render().
// ============================================

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface DitherRenderer {
  render(time: number, isDark: boolean): void;
  dispose(): void;
}

// Shared look
const NOISE_SCALE = 0.004;
const BRIGHTNESS_GAIN = 1.2;
// Dark mode: ~10% opacity, color darkened by intensity.
// Light mode: darkening the color reads as grey-beige on white, so keep the
// full orange and let intensity drive opacity instead (~8–21%).
const DARK_ALPHA = 26;
const LIGHT_ALPHA_MIN = 20;
const LIGHT_ALPHA_RANGE = 34;

// --------------------------------------------
// WEBGL
// --------------------------------------------
const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uDark;

// 2D simplex noise (Ashima Arts / Stefan Gustavson, MIT), range ~[-1, 1]
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Same domain-warped fbm as the CPU renderer
float fbm(vec2 p, float t) {
  p += vec2(t * 0.4, -t * 0.6);
  float warp1 = snoise(vec2(p.x * 0.5 + t * 0.05, p.y * 0.5));
  float warp2 = snoise(vec2(p.x * 0.5, p.y * 0.5 + t * 0.04));
  p += vec2(warp1, warp2) * 1.5;
  return (snoise(p) + 0.5 * snoise(p * 2.0) + 0.25 * snoise(p * 4.0) + 1.0) * 0.5;
}

// 8x8 Bayer threshold (col = x, row = y), built from the 2x2 pattern
// [[0, 2], [3, 1]] at three bit levels weighted 16, 4, 1.
float bayer8(vec2 cell) {
  vec2 p = mod(cell, 8.0);
  float value = 0.0;
  float weight = 16.0;
  float divisor = 1.0;
  for (int k = 0; k < 3; k++) {
    vec2 b = mod(floor(p / divisor), 2.0);
    value += weight * (b.y * 3.0 + b.x * 2.0 - 4.0 * b.x * b.y);
    weight /= 4.0;
    divisor *= 2.0;
  }
  return value / 64.0;
}

void main() {
  // Cell coordinates with y pointing down, matching the CPU renderer
  vec2 cell = floor(gl_FragCoord.xy);
  cell.y = uResolution.y - 1.0 - cell.y;

  float brightness = fbm(cell * ${NOISE_SCALE.toFixed(3)}, uTime) * ${BRIGHTNESS_GAIN.toFixed(1)};
  if (brightness <= bayer8(cell)) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float intensity = min(brightness, 1.0);
  vec3 rgb = uDark > 0.5 ? uColor * intensity : uColor;
  float alpha = uDark > 0.5
    ? ${DARK_ALPHA.toFixed(1)} / 255.0
    : (${LIGHT_ALPHA_MIN.toFixed(1)} + ${LIGHT_ALPHA_RANGE.toFixed(1)} * intensity) / 255.0;
  gl_FragColor = vec4(rgb * alpha, alpha); // premultiplied alpha
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("DitherBackground: shader compile failed", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createWebGLRenderer(canvas: HTMLCanvasElement, color: Rgb): DitherRenderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("DitherBackground: program link failed", gl.getProgramInfoLog(program));
    return null;
  }
  gl.useProgram(program);

  // One oversized triangle covering the viewport
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uDark = gl.getUniformLocation(program, "uDark");
  gl.uniform3f(gl.getUniformLocation(program, "uColor"), color.r / 255, color.g / 255, color.b / 255);

  return {
    render(time, isDark) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uDark, isDark ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    },
  };
}

// --------------------------------------------
// CANVAS 2D (CPU fallback)
// --------------------------------------------

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

// Domain-warped fbm with 3 octaves
const fbm = (x: number, y: number, t: number): number => {
  x += t * 0.4;
  y += -t * 0.6;

  const warp1 = noise2D(x * 0.5 + t * 0.05, y * 0.5);
  const warp2 = noise2D(x * 0.5, y * 0.5 + t * 0.04);

  x += warp1 * 1.5;
  y += warp2 * 1.5;

  return (
    noise2D(x, y) +
    0.5 * noise2D(x * 2, y * 2) +
    0.25 * noise2D(x * 4, y * 4) +
    1
  ) * 0.5;
};

export function createCanvas2DRenderer(canvas: HTMLCanvasElement, color: Rgb): DitherRenderer | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;
  let imageData: ImageData | null = null;

  return {
    render(t, isDark) {
      const w = canvas.width;
      const h = canvas.height;
      if (!imageData || imageData.width !== w || imageData.height !== h) {
        imageData = ctx.createImageData(w, h);
      }
      const data = imageData.data;
      data.fill(0);

      for (let y = 0; y < h; y++) {
        const yOffset = y * w * 4;
        const by = (y & 7) << 3; // (y % 8) * 8

        for (let x = 0; x < w; x++) {
          const brightness = fbm(x * NOISE_SCALE, y * NOISE_SCALE, t) * BRIGHTNESS_GAIN;
          if (brightness <= BAYER_MATRIX[by + (x & 7)]) continue;

          const intensity = brightness < 1 ? brightness : 1;
          const idx = yOffset + (x << 2);
          if (isDark) {
            data[idx] = (color.r * intensity) | 0;
            data[idx + 1] = (color.g * intensity) | 0;
            data[idx + 2] = (color.b * intensity) | 0;
            data[idx + 3] = DARK_ALPHA;
          } else {
            data[idx] = color.r;
            data[idx + 1] = color.g;
            data[idx + 2] = color.b;
            data[idx + 3] = (LIGHT_ALPHA_MIN + LIGHT_ALPHA_RANGE * intensity) | 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },
    dispose() {
      imageData = null;
    },
  };
}
