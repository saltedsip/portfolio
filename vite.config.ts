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
    // Improve chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-utils': ['clsx'],
        },
      },
    },
    // Enable minification
    minify: 'esbuild' as const,
    // Optimize CSS
    cssMinify: 'esbuild' as const,
    cssCodeSplit: true,
    // Generate sourcemaps for debugging (can disable in prod)
    sourcemap: false,
  },
}));
