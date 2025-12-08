import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import { VolunteerOverlay } from './VolunteerOverlay';

export const Footer: React.FC = () => {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  return (
    <>
      <footer style={{ backgroundColor: '#08223d' }} className="text-white pt-20 pb-10 font-sans">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Column - Span 2 on large screens */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src="https://trainings.producthubafrica.org/wp-content/uploads/2024/10/PHA-logo-160x54.png" 
                  alt="Product Hub Africa" 
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div className="flex space-x-4 mb-8">
                <a href="https://www.linkedin.com/company/product-hub-africa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white text-[#08223d] flex items-center justify-center hover:bg-[#daa728] transition-colors"><Linkedin size={16} /></a>
                <a href="https://x.com/ProductHubAfri" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 rounded-full bg-white text-[#08223d] flex items-center justify-center hover:bg-[#daa728] transition-colors"><Twitter size={16} /></a>
                <a href="https://www.youtube.com/@producthubafrica" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white text-[#08223d] flex items-center justify-center hover:bg-[#daa728] transition-colors"><Youtube size={16} /></a>
                <a href="https://www.instagram.com/producthubafrica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white text-[#08223d] flex items-center justify-center hover:bg-[#daa728] transition-colors"><Instagram size={16} /></a>
                <a href="https://web.facebook.com/people/Product-Hub-Africa/61555965181457/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white text-[#08223d] flex items-center justify-center hover:bg-[#daa728] transition-colors"><Facebook size={16} /></a>
              </div>
              <p className="text-gray-400 text-xs">Copyright (c) 2023. Product Hub Africa.</p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-300 hover:text-[#daa728] text-sm">Home</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:text-[#daa728] text-sm">Blog Post</Link></li>
                <li><Link to="/about-us" className="text-gray-300 hover:text-[#daa728] text-sm">About Us</Link></li>
                <li><Link to="/contact-us" className="text-gray-300 hover:text-[#daa728] text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Product Hub Africa */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product Hub Africa</h4>
              <ul className="space-y-4">
                <li><Link to="/community" className="text-gray-300 hover:text-[#daa728] text-sm">Community</Link></li>
                <li><a href="mailto:producthubafrica@gmail.com?subject=Partnership Inquiry" className="text-gray-300 hover:text-[#daa728] text-sm">Partnership</a></li>
                <li><a href="#" className="text-gray-300 hover:text-[#daa728] text-sm">Donations</a></li>
                <li><button onClick={() => setIsVolunteerOpen(true)} className="text-gray-300 hover:text-[#daa728] text-sm text-left">Volunteer</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Legal</h4>
               <ul className="space-y-4">
                <li><Link to="/faq" className="text-gray-300 hover:text-[#daa728] text-sm">FAQs</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-[#daa728] text-sm">Privacy Policy</Link></li>
              </ul>
            </div>

          </div>
          
          {/* Newsletter Section - Absolute or Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-blue-900 gap-4">
             <div className="mb-4 md:mb-0 text-center md:text-left">
               <span className="text-sm text-gray-300">Subscribe to our newsletter</span>
             </div>
             <div className="flex w-full md:w-auto">
               <input 
                 type="email" 
                 placeholder="mail@mail.com"
                 aria-label="Email address for newsletter"
                 className="px-4 py-2 rounded-l w-full md:w-64 text-gray-900 focus:outline-none"
               />
               <button className="px-6 py-2 bg-[#135291] text-white rounded-r font-medium border border-[#135291] hover:bg-[#0d3a67] transition-colors">
                 Subscribe
               </button>
             </div>
          </div>

        </div>
      </footer>
      <VolunteerOverlay isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
    </>
  );
};