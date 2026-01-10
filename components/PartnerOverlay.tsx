import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface PartnerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'partner' | 'facilitator';
}

const PARTNER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxl3asaXDp5N1imxXIxeqq4I7kFCVqdVjxyPM5mRW7l39oGsKe6GHR0G4dCq-v4ktqSRQ/exec";
const FACILITATOR_SCRIPT_URL = "YOUR_FACILITATOR_SHEET_URL_HERE";

const orgSizes = ['Individual', 'Startup', 'SME', 'Enterprise', 'NGO'];
const supporterTypes = [
  'Sponsor (Financial support)',
  'Partner (Strategic / Program / Institutional)',
  'Community Supporter / Advocate',
  'Corporate / CSR Partner',
  'Media / Publicity Partner',
  'Other'
];

const interestAreas = [
  'Tech Education & Training Programs',
  'Product Management / Software Development Tracks',
  'STEM-A-SCHOOL / STEMCON Tour',
  'Scholarships (Laptop, Training, Bootcamps)',
  'Women & Girls in Tech Initiatives',
  'Community Events & Meetups',
  'Talent Development & Employability'
];

const intentions = [
  'Financial sponsorship',
  'In-kind support (tools, software, devices, etc.)',
  'Mentorship / Training delivery',
  'Speaking engagements',
  'Internship / Job placement opportunities',
  'Partnerships / Co-branding'
];

const tracks = [
  'Product Management',
  'Product Design',
  'Data Analytics',
  'Cybersecurity',
  'Technical Writing',
  'Software Engineering'
];

export const PartnerOverlay: React.FC<PartnerOverlayProps> = ({ isOpen, onClose, mode = 'partner' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    role: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    orgSize: '',
    trackInterestedIn: '',
    supporterType: [] as string[],
    interests: [] as string[],
    intentions: [] as string[],
    motivation: '',
    expectation: '',
    otherExpectations: '',
    consent: false
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

  const handleToggle = (list: string[], item: string, key: keyof typeof formData) => {
    const currentList = list as string[];
    const newList = currentList.includes(item) 
      ? currentList.filter(i => i !== item) 
      : [...currentList, item];
    setFormData({ ...formData, [key]: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    const isFacilitator = mode === 'facilitator';
    const targetUrl = isFacilitator ? FACILITATOR_SCRIPT_URL : PARTNER_SCRIPT_URL;

    if (targetUrl.includes("YOUR_")) {
      alert("Error: The script URL for this form has not been set yet. Please check the code.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        timestamp: new Date().toLocaleString(),
        fullName: formData.fullName,
        orgName: formData.orgName,
        role: formData.role,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        motivation: formData.motivation,
        ...(isFacilitator 
          ? { trackInterestedIn: formData.trackInterestedIn } 
          : { 
              orgSize: formData.orgSize,
              supporterType: formData.supporterType.join(', '),
              interests: formData.interests.join(', '),
              intentions: formData.intentions.join(', '),
              expectation: formData.expectation === 'Other' ? formData.otherExpectations : formData.expectation
            }
        )
      };

      // Using text/plain ensures no CORS pre-flight, which is crucial for Google Apps Script 'no-cors' POST
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please check your internet connection and verify that your Google Apps Script is deployed as 'Anyone'.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full h-[46px] px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 text-sm font-medium";
  const selectClasses = "w-full h-[46px] px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 text-sm font-semibold appearance-none cursor-pointer hover:bg-white shadow-sm";
  const labelClasses = "block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider";
  const checkboxClasses = "appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-transparent checked:bg-[#135291] checked:border-[#135291] transition-all relative cursor-pointer outline-none after:content-[''] after:absolute after:hidden checked:after:block after:left-[5px] after:top-[1px] after:w-[5px] after:h-[10px] after:border-white after:border-b-2 after:border-r-2 after:rotate-45";

  const isFacilitatorMode = mode === 'facilitator';

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-[670px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-6 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {isFacilitatorMode ? 'Become a Facilitator' : 'Partner & Sponsor'}
            </h2>
            <p className="text-gray-500 text-xs">Collaborate with Product Hub Africa.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {submitted ? (
            <div className="py-20 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#08223d] mb-4">Submission Received!</h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for your interest in {isFacilitatorMode ? 'facilitating with' : 'supporting'} Product Hub Africa. Our team will review your submission and reach out within 5–7 working days.
              </p>
              <Button className="mt-10" onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Basic Info */}
              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100 uppercase tracking-widest">1. Basic Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Full Name *</label>
                      <input required type="text" className={inputClasses} placeholder="Your name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>{isFacilitatorMode ? 'Current Organization *' : 'Organization Name *'}</label>
                      <input required type="text" className={inputClasses} placeholder={isFacilitatorMode ? "Where do you work?" : "Company or 'Individual'"} value={formData.orgName} onChange={e => setFormData({...formData, orgName: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Role / Title *</label>
                      <input required type="text" className={inputClasses} placeholder="Your position" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address *</label>
                      <input required type="email" className={inputClasses} placeholder="email@address.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Phone Number *</label>
                      <input required type="tel" className={inputClasses} placeholder="+234..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Country / City *</label>
                      <input required type="text" className={inputClasses} placeholder="Lagos, Nigeria" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                    </div>
                  </div>

                  {isFacilitatorMode && (
                    <div>
                      <label className={labelClasses}>Track Interested In *</label>
                      <div className="relative">
                        <select required className={selectClasses} value={formData.trackInterestedIn} onChange={(e) => setFormData({...formData, trackInterestedIn: e.target.value})}>
                          <option value="">Select a track</option>
                          {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#135291]">
                          <ChevronDown size={18} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="w-full">
                    <div>
                      <label className={labelClasses}>Website / LinkedIn (Optional)</label>
                      <input type="url" className={inputClasses} placeholder="https://..." value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                    </div>
                    {!isFacilitatorMode && (
                      <div className="mt-4">
                        <label className={labelClasses}>Organization Size (Optional)</label>
                        <div className="relative">
                          <select className={selectClasses} value={formData.orgSize} onChange={e => setFormData({...formData, orgSize: e.target.value})}>
                            <option value="">Select size</option>
                            {orgSizes.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#135291]">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Section 2: Partnership Specifics */}
              {!isFacilitatorMode && (
                <section>
                  <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100 uppercase tracking-widest">2. Partnership Details</h4>
                  <div className="space-y-6">
                    <div>
                      <label className={labelClasses}>Type of Supporter *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {supporterTypes.map(type => (
                          <label key={type} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-transparent transition-all hover:bg-gray-50">
                            <input type="checkbox" className={checkboxClasses} checked={formData.supporterType.includes(type)} onChange={() => handleToggle(formData.supporterType, type, 'supporterType')} />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Areas of Interest *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {interestAreas.map(item => (
                          <label key={item} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-transparent transition-all hover:bg-gray-50">
                            <input type="checkbox" className={checkboxClasses} checked={formData.interests.includes(item)} onChange={() => handleToggle(formData.interests, item, 'interests')} />
                            <span className="text-sm text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Mode of Support (Intentions) *</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {intentions.map(item => (
                          <label key={item} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-transparent transition-all hover:bg-gray-50">
                            <input type="checkbox" className={checkboxClasses} checked={formData.intentions.includes(item)} onChange={() => handleToggle(formData.intentions, item, 'intentions')} />
                            <span className="text-sm text-gray-700">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Section 3: Motivation */}
              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100 uppercase tracking-widest">
                  {isFacilitatorMode ? '2. Experience & Motivation *' : '3. Motivation *'}
                </h4>
                <textarea required rows={4} className="w-full min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 text-sm font-medium resize-none" placeholder={isFacilitatorMode ? "Tell us about your experience..." : "Why are you interested in supporting Product Hub Africa?"} value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} />
              </section>

              <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input required type="checkbox" className={checkboxClasses} checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} />
                  <span className="text-xs font-bold text-[#08223d] uppercase tracking-wide">
                    I agree to be contacted by Product Hub Africa regarding this submission.
                  </span>
                </label>
              </section>

              <div className="pt-4 pb-10">
                <Button fullWidth size="lg" type="submit" disabled={isSubmitting}>
                   {isSubmitting ? <><Loader2 size={18} className="animate-spin mr-2" /> Submitting...</> : (isFacilitatorMode ? 'Submit Facilitator Application' : 'Submit Partnership Application')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};