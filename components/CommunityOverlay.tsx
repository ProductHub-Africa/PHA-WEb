import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { COLORS, TYPOGRAPHY } from '../constants';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunityOverlay: React.FC<CommunityOverlayProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    track: '',
    experience: '',
    whatsapp: '',
    dobMonth: '',
    dobDay: ''
  });

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto animate-slide-in-right">
        <div className="p-6 md:p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className={`${TYPOGRAPHY.header03} text-[#08223d]`}>Join the Community</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Please fill in your details to join our vibrant community of tech enthusiasts.
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Track of Interest</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none bg-white"
                value={formData.track}
                onChange={(e) => setFormData({...formData, track: e.target.value})}
              >
                <option value="">Select a track</option>
                {tracks.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none bg-white"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="">Select experience level</option>
                <option value="0-1">0 - 1 years</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none"
                placeholder="+234 800 000 0000"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none bg-white"
                  value={formData.dobMonth}
                  onChange={(e) => setFormData({...formData, dobMonth: e.target.value})}
                >
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none bg-white"
                  value={formData.dobDay}
                  onChange={(e) => setFormData({...formData, dobDay: e.target.value})}
                >
                  <option value="">Day</option>
                  {days.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-4">
              <Button fullWidth size="lg">Join Now</Button>
            </div>
          </form>
        </div>
      </div>
      
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
