import React, { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface PartnerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  'STEM-A-SCHOOL/ STEMCON Tour',
  'Scholarships (Laptop, Training, Bootcamps)',
  'Women & Girls in Tech Initiatives',
  'Community Events & Meetups',
  'Talent Development & Employability',
  'Research, Innovation & Policy Advocacy'
];

const intentions = [
  'Financial sponsorship',
  'In-kind support (tools, software, devices, venue, internet, etc.)',
  'Mentorship / Training delivery',
  'Speaking engagements',
  'Internship / Job placement opportunities',
  'Partnerships / Co-branding',
  'Media coverage or promotion'
];

const expectations = [
  'Brand visibility',
  'Impact reporting',
  'Talent pipeline access',
  'CSR alignment',
  'Community goodwill (I just want to give back)',
  'Other'
];

export const PartnerOverlay: React.FC<PartnerOverlayProps> = ({ isOpen, onClose }) => {
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
    supporterType: [] as string[],
    otherSupporter: '',
    interests: [] as string[],
    intentions: [] as string[],
    motivation: '',
    pastSupport: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full h-[46px] px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 text-sm font-medium";
  const labelClasses = "block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider";
  const checkboxClasses = "appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-transparent checked:bg-[#135291] checked:border-[#135291] transition-all relative cursor-pointer outline-none after:content-[''] after:absolute after:hidden checked:after:block after:left-[5px] after:top-[1px] after:w-[5px] after:h-[10px] after:border-white after:border-b-2 after:border-r-2 after:rotate-45";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-[670px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-6 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">Partner & Sponsor</h2>
            <p className="text-gray-500 text-xs">Collaborate with Product Hub Africa.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
          {submitted ? (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#08223d] mb-4">Submission Received!</h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for your interest in supporting Product Hub Africa. Our team will review your submission and reach out within 5–7 working days.
              </p>
              <Button className="mt-10" onClick={onClose}>Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">1. Basic Information</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Full Name *</label>
                      <input required type="text" className={inputClasses} placeholder="Your name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Organization Name *</label>
                      <input required type="text" className={inputClasses} placeholder="Company or 'Individual'" value={formData.orgName} onChange={e => setFormData({...formData, orgName: e.target.value})} />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Website / LinkedIn (Optional)</label>
                      <input type="url" className={inputClasses} placeholder="https://..." value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Organization Size (Optional)</label>
                      <select className={inputClasses} value={formData.orgSize} onChange={e => setFormData({...formData, orgSize: e.target.value})}>
                        <option value="">Select size</option>
                        {orgSizes.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">2. Type of Supporter</h4>
                <div className="grid grid-cols-1 gap-2">
                  {supporterTypes.map(type => (
                    <label key={type} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border border-transparent transition-all">
                      <input 
                        type="checkbox" 
                        className={checkboxClasses} 
                        checked={formData.supporterType.includes(type)} 
                        onChange={() => handleToggle(formData.supporterType, type, 'supporterType')} 
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                  {formData.supporterType.includes('Other') && (
                    <input type="text" className={inputClasses} placeholder="Specify other type" value={formData.otherSupporter} onChange={e => setFormData({...formData, otherSupporter: e.target.value})} />
                  )}
                </div>
              </section>

              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">3. Support Focus</h4>
                <div className="grid grid-cols-1 gap-2">
                  {interestAreas.map(area => (
                    <label key={area} className="flex items-start gap-3 p-3 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox" 
                        className={checkboxClasses} 
                        checked={formData.interests.includes(area)} 
                        onChange={() => handleToggle(formData.interests, area, 'interests')} 
                      />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">4. Intention</h4>
                <div className="grid grid-cols-1 gap-2">
                  {intentions.map(intent => (
                    <label key={intent} className="flex items-start gap-3 p-3 rounded-lg cursor-pointer">
                      <input 
                        type="checkbox" 
                        className={checkboxClasses} 
                        checked={formData.intentions.includes(intent)} 
                        onChange={() => handleToggle(formData.intentions, intent, 'intentions')} 
                      />
                      <span className="text-sm text-gray-700">{intent}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">5. Motivation *</h4>
                <textarea required rows={4} className="w-full min-h-[120px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 text-sm font-medium resize-none" placeholder="Why are you interested in supporting Product Hub Africa, and what impact would you like to help create?" value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} />
              </section>

              <section>
                <h4 className="text-[#135291] font-bold text-sm mb-5 pb-2 border-b border-gray-100">6. Primary Expectation</h4>
                <div className="relative">
                  <select 
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    value={formData.expectation}
                    onChange={(e) => setFormData({...formData, expectation: e.target.value})}
                  >
                    <option value="">Select your main expectation</option>
                    {expectations.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown size={18} />
                  </div>
                </div>
                {formData.expectation === 'Other' && (
                  <div className="mt-4">
                    <input type="text" className={inputClasses} placeholder="Specify other expectations" value={formData.otherExpectations} onChange={e => setFormData({...formData, otherExpectations: e.target.value})} />
                  </div>
                )}
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
                <Button fullWidth size="lg" type="submit">Submit Partnership Application</Button>
              </div>
            </form>
          )}
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