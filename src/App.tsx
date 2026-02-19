import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import { sectionVisibility } from "@/data/portfolio";

// Lazy load non-critical pages for better initial load performance
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Wrap lazy component with Suspense
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {sectionVisibility.about && (
          <Route path="/about" element={<LazyRoute><AboutPage /></LazyRoute>} />
        )}
        {sectionVisibility.projects && (
          <>
            <Route path="/projects" element={<LazyRoute><ProjectsPage /></LazyRoute>} />
            <Route path="/projects/:slug" element={<LazyRoute><ProjectDetailPage /></LazyRoute>} />
          </>
        )}
        {sectionVisibility.contact && (
          <Route path="/contact" element={<LazyRoute><ContactPage /></LazyRoute>} />
        )}
        <Route path="*" element={<LazyRoute><NotFoundPage /></LazyRoute>} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;


