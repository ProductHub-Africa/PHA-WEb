import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './features/home/HomePage';
import { BootcampsPage } from './features/bootcamps/BootcampsPage';
import { AboutPage } from './features/about-us/AboutPage';
import { CommunityPage } from './features/community/CommunityPage';
import { BlogPage } from './features/blog/BlogPage';
import { ContactPage } from './features/contact-us/ContactPage';
import { StemSchoolPage } from './features/stem-school/StemSchoolPage';
import { FAQPage } from './features/legal/FAQPage';
import { PrivacyPolicyPage } from './features/legal/PrivacyPolicyPage';

// ScrollToTop utility component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-[#3a3a3a]">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bootcamps" element={<BootcampsPage />} />
            <Route path="/bootcamps/:courseId" element={<BootcampsPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/stem-school" element={<StemSchoolPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;