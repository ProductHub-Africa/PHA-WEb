import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface VolunteerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dedicated URL for Volunteer sheet
const VOLUNTEER_SCRIPT_URL = "YOUR_VOLUNTEER_SHEET_URL_HERE";

const departments = [
  'Events Management',
  'Community Management',
  'Social Media & Content',
  'Technical Facilitation',
  'Partnerships',
  'Design & Creative'
];

export const VolunteerOverlay: React.FC<VolunteerOverlayProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    portfolio: '',
    linkedin: '',
    reason: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(VOLUNTEER_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString(),
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          department: formData.department,
          linkedin: formData.linkedin,
          reason: formData.reason
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full h-[46px] px-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 font-medium";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2.5";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="volunteer-overlay-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[620px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        <div className="sticky top-0 bg-white z-30 px-8 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 id="volunteer-overlay-title" className="text-2xl font-extrabold text-[#08223d] mb-1 block">Volunteer with Us</h2>
            <p className="text-gray-500 text-xs block">Join our team and help build the future.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close volunteer overlay">
            <X size={24} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
          {submitted ? (
            <div className="py-20 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#08223d] mb-4">Application Sent!</h3>
              <p className="text-gray-600 leading-relaxed mb-8">Thank you for your interest. We'll be in touch shortly.</p>
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
                <label className={labelClasses}>Department of Interest</label>
                <div className="relative">
                  <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>
                    <option value="">Select a department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label className={labelClasses}>Website / LinkedIn (Optional)</label>
                <input type="url" className={inputClasses} placeholder="https://..." value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
              </div>
              <div>
                <label className={labelClasses}>Motivation</label>
                <textarea className="w-full min-h-[120px] px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 font-medium" placeholder="Tell us why you'd be a good fit..." value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
              </div>
              <div className="pt-8 pb-10">
                <Button fullWidth size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Submitting...</> : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};