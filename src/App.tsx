/**
 * App Component - Root Application Router
 *
 * Main application component that defines all routes and integrates
 * Vercel analytics. This is the entry point rendered by main.tsx.
 *
 * @module App
 * @since 1.0.0
 *
 * Route Structure:
 * - / → HomePage (main landing page)
 * - /about → AboutPage (team and philosophy)
 * - /about/library → LibraryPage (architectural reference books)
 * - /portfolio → PortfolioPage (project listing)
 * - /portfolio/:slug → ProjectDetailPage (individual project)
 * - /3d-visualization → Portfolio3DPage (3D rendering services)
 * - /contact → ContactPage (contact information)
 * - /privacy → PrivacyPolicyPage (LGPD compliance)
 * - /tos → TermsOfServicePage (terms of use)
 * - /* → NotFoundPage (404 catch-all)
 *
 * Analytics:
 * - Vercel Speed Insights (Core Web Vitals monitoring)
 * - Vercel Analytics (page view tracking)
 *
 * @example
 * ```tsx
 * // In main.tsx
 * <BrowserRouter>
 *   <App />
 * </BrowserRouter>
 * ```
 */
import { Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LibraryPage from './pages/LibraryPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import Portfolio3DPage from './pages/Portfolio3DPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Root application component with route definitions
 *
 * @returns Application with routes and analytics
 */
export default function App() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/library" element={<LibraryPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="/3d-visualization" element={<Portfolio3DPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Legal Pages */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/tos" element={<TermsOfServicePage />} />

        {/* 404 Catch All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}