import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";

// Lazy load non-critical pages
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<LazyRoute><ProjectDetailPage /></LazyRoute>} />
        <Route path="*" element={<LazyRoute><NotFoundPage /></LazyRoute>} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
