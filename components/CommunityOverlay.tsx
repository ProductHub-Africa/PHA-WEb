import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const tracks = [
  'Product Management',
  'Product Design',
  'Data Analytics',
  'Cybersecurity',
  'Technical Writing',
  'Software Engineering'
];

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Rwanda', 'Egypt', 'Uganda', 'Tanzania', 'Ethiopia', 'Morocco', 'Other'
];

export const CommunityOverlay: React.FC<CommunityOverlayProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    track: '',
    experience: '',
    whatsapp: '',
    dobMonth: '',
    dobDay: '',
    country: ''
  });

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const inputClasses = "w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 font-medium";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2.5";

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="community-overlay-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel - Flex Layout for sticky footer */}
      <div className="relative w-full max-w-[600px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 id="community-overlay-title" className={`${TYPOGRAPHY.header02} text-[#08223d] mb-2`}>Join the Community</h2>
              <p className="text-gray-500">Join 5,000+ techies across Africa.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close community overlay"
            >
              <X size={28} className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}>First Name</label>
                <input 
                  type="text" 
                  className={inputClasses}
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input 
                  type="text" 
                  className={inputClasses}
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Track of Interest</label>
              <div className="relative">
                <select 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.track}
                  onChange={(e) => setFormData({...formData, track: e.target.value})}
                >
                  <option value="">Select a track</option>
                  {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

             <div>
              <label className={labelClasses}>Country</label>
              <div className="relative">
                <select 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option value="">Select your country</option>
                  {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Years of Experience</label>
              <div className="relative">
                <select 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0 - 1 years</option>
                  <option value="1-3">1 - 3 years</option>
                  <option value="3-5">3 - 5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>WhatsApp Number</label>
              <input 
                type="tel" 
                className={inputClasses}
                placeholder="+234 800 000 0000"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>

            <div>
              <label className={labelClasses}>Date of Birth</label>
              <div className="grid grid-cols-2 gap-5">
                <div className="relative">
                  <select 
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    value={formData.dobMonth}
                    onChange={(e) => setFormData({...formData, dobMonth: e.target.value})}
                  >
                    <option value="">Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select 
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    value={formData.dobDay}
                    onChange={(e) => setFormData({...formData, dobDay: e.target.value})}
                  >
                    <option value="">Day</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
          
          <div className="h-10"></div> {/* Spacer for scroll */}
        </div>

        {/* Sticky Footer Button */}
        <div className="p-5 md:p-10 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
          <Button fullWidth size="lg">Join Now</Button>
          <p className="text-center text-sm text-gray-400 mt-4">
            By joining, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};