
import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Eagerly load main pages for instant navigation as requested
import { HomePage } from './features/home/HomePage';
import { BlogPage } from './features/blog/BlogPage';

// Lazy load other feature pages
const BootcampsPage = lazy(() => import('./features/bootcamps/BootcampsPage').then(module => ({ default: module.BootcampsPage })));
const AboutPage = lazy(() => import('./features/about-us/AboutPage').then(module => ({ default: module.AboutPage })));
const CommunityPage = lazy(() => import('./features/community/CommunityPage').then(module => ({ default: module.CommunityPage })));
const BlogPostPage = lazy(() => import('./features/blog/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const ContactPage = lazy(() => import('./features/contact-us/ContactPage').then(module => ({ default: module.ContactPage })));
const StemSchoolPage = lazy(() => import('./features/stem-school/StemSchoolPage').then(module => ({ default: module.StemSchoolPage })));
const FAQPage = lazy(() => import('./features/legal/FAQPage').then(module => ({ default: module.FAQPage })));
const PrivacyPolicyPage = lazy(() => import('./features/legal/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const CookieConsent = lazy(() => import('./components/CookieConsent').then(module => ({ default: module.CookieConsent })));
const ResponsesPage = lazy(() => import('./features/admin/ResponsesPage').then(module => ({ default: module.ResponsesPage })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e7eef4] border-t-[#135291]"></div>
  </div>
);

// ScrollToTop utility component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bootcamps" element={<BootcampsPage />} />
              <Route path="/bootcamps/:courseId" element={<BootcampsPage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/*" element={<BlogPostPage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/stem-school" element={<StemSchoolPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/responses" element={<ResponsesPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <CookieConsent />
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
