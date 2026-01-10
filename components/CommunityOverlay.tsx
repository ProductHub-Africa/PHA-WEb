import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dedicated URL for Community sheet
const COMMUNITY_SCRIPT_URL = "YOUR_COMMUNITY_SHEET_URL_HERE";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    track: '',
    experience: '',
    whatsapp: '',
    dobMonth: '',
    dobDay: '',
    country: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch(COMMUNITY_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          timestamp: new Date().toLocaleString(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          track: formData.track,
          experience: formData.experience,
          whatsapp: formData.whatsapp,
          dob: `${formData.dobDay} ${formData.dobMonth}`,
          country: formData.country
        }),
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full h-[46px] px-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 font-medium";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2.5";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="community-overlay-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[620px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-8 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 id="community-overlay-title" className="text-2xl font-extrabold text-[#08223d] mb-1">Join the Community</h2>
            <p className="text-gray-500 text-xs">Join 5,000+ techies across Africa.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close community overlay">
            <X size={24} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
          {submitted ? (
            <div className="py-20 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#08223d] mb-4">Welcome to the Hub!</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Your application has been received. You will receive an email with instructions on how to join our channels within 24 hours.
              </p>
              <Button fullWidth onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>First Name</label>
                  <input required type="text" className={inputClasses} placeholder="John" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className={labelClasses}>Last Name</label>
                  <input required type="text" className={inputClasses} placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </div>
              </div>
              <div>
                <label className={labelClasses}>Email Address</label>
                <input required type="email" className={inputClasses} placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className={labelClasses}>Track of Interest</label>
                <div className="relative">
                  <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.track} onChange={(e) => setFormData({...formData, track: e.target.value})}>
                    <option value="">Select a track</option>
                    {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Country</label>
                <div className="relative">
                  <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                    <option value="">Select your country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Years of Experience</label>
                <div className="relative">
                  <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}>
                    <option value="">Select experience level</option>
                    <option value="0-1">0 - 1 years</option>
                    <option value="1-3">1 - 3 years</option>
                    <option value="3-5">3 - 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClasses}>WhatsApp Number</label>
                <input required type="tel" className={inputClasses} placeholder="+234..." value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
              </div>
              <div>
                <label className={labelClasses}>Date of Birth</label>
                <div className="grid grid-cols-2 gap-5">
                  <div className="relative">
                    <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.dobMonth} onChange={(e) => setFormData({...formData, dobMonth: e.target.value})}>
                      <option value="">Month</option>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.dobDay} onChange={(e) => setFormData({...formData, dobDay: e.target.value})}>
                      <option value="">Day</option>
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <Button fullWidth size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Submitting...</> : "Join Now"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};