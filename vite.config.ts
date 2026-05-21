import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'esbuild' as const,
    // Optimize CSS
    cssMinify: 'esbuild' as const,
    cssCodeSplit: true,
    // Generate sourcemaps for debugging (can disable in prod)
    sourcemap: false,
  },
}));
