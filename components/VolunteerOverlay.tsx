import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface VolunteerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const departments = [
  'Events Management',
  'Community Management',
  'Social Media & Content',
  'Technical Facilitation',
  'Partnerships',
  'Design & Creative'
];

export const VolunteerOverlay: React.FC<VolunteerOverlayProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    reason: ''
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
      aria-labelledby="volunteer-overlay-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-[600px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 id="volunteer-overlay-title" className={`${TYPOGRAPHY.header02} text-[#08223d] mb-2`}>Volunteer with Us</h2>
              <p className="text-gray-500">Join our team and help build the future of African tech.</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close volunteer overlay"
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
              <label className={labelClasses}>Email Address</label>
              <input 
                type="email" 
                className={inputClasses}
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className={labelClasses}>Department of Interest</label>
              <div className="relative">
                <select 
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="">Select a department</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Why do you want to volunteer?</label>
              <textarea 
                className={`${inputClasses} min-h-[120px]`}
                placeholder="Tell us about yourself and why you'd be a good fit..."
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
              />
            </div>

          </form>
          
          <div className="h-10"></div>
        </div>

        {/* Sticky Footer Button */}
        <div className="p-5 md:p-10 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
          <Button fullWidth size="lg">Submit Application</Button>
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