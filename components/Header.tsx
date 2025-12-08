import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { MegaMenu } from '../features/bootcamps/MegaMenu';
import { CommunityOverlay } from './CommunityOverlay';
import { TYPOGRAPHY } from '../constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'About us', path: '/about-us' },
    { label: 'Bootcamps', path: '/bootcamps', isMegaMenu: true },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact us', path: '/contact-us' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled || isMenuOpen || isMegaMenuOpen
            ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left Section: Logo + Nav */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img 
                src="https://trainings.producthubafrica.org/wp-content/uploads/2024/10/PHA-logo-160x54.png" 
                alt="Product Hub Africa" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav - Left Aligned */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group h-full flex items-center">
                  {link.isMegaMenu ? (
                    <button
                      className={`flex items-center space-x-1 ${TYPOGRAPHY.bodySmall01} font-bold hover:text-[#135291] transition-colors py-6`}
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown size={14} strokeWidth={3} />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`${TYPOGRAPHY.bodySmall01} font-bold hover:text-[#135291] transition-colors ${
                        location.pathname === link.path ? 'text-[#135291]' : 'text-[#3a3a3a]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                  
                  {/* Mega Menu Overlay - Shifted Right */}
                  {link.isMegaMenu && isMegaMenuOpen && (
                    <div 
                      className="absolute top-full left-1/2 -translate-x-1/2 ml-[240px] pt-4 w-screen max-w-screen-xl px-4"
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                    >
                      <MegaMenu onItemClick={() => setIsMegaMenuOpen(false)} />
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Desktop CTA - Right Aligned */}
          <div className="hidden lg:flex items-center space-x-4">
             <Button 
               size="md" 
               variant="outline"
               onClick={() => setIsOverlayOpen(true)}
             >
               Join Our Community
             </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white fixed inset-0 w-full h-screen z-[100] flex flex-col overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="px-6 h-20 flex items-center justify-between border-b border-gray-50 shrink-0">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <img 
                    src="https://trainings.producthubafrica.org/wp-content/uploads/2024/10/PHA-logo-160x54.png" 
                    alt="Product Hub Africa" 
                    className="h-10 w-auto object-contain"
                  />
                </Link>
                <button className="p-2 text-gray-600" onClick={toggleMenu}>
                    <X size={24} />
                </button>
            </div>

            <div className="flex flex-col px-8 pt-8 pb-10 flex-grow">
              <div className="flex flex-col space-y-6">
                <Link
                    to="/"
                    className={`${TYPOGRAPHY.header03} font-bold text-gray-700 hover:text-[#135291]`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Home
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`${TYPOGRAPHY.header03} font-bold text-gray-700 hover:text-[#135291]`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              <div className="mt-auto">
                <Button 
                  fullWidth 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsOverlayOpen(true);
                  }}
                >
                  Join Our Community
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Community Overlay */}
      <CommunityOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
    </>
  );
};