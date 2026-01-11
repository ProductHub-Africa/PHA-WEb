
import React, { useState, useEffect } from 'react';
import { X, Loader2, ChevronDown, CheckCircle, ArrowLeft, ArrowRight, Edit3 } from 'lucide-react';
import { Button } from './Button';
import { TYPOGRAPHY } from '../constants';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMUNITY_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVd5qKy8fRGMHQGybPaIE8hi6tEfiAeye91UlATEfr/exec";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tracks = ['Product Management', 'Product Design', 'Data Analytics', 'Cybersecurity', 'Technical Writing', 'Software Engineering'];
const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Rwanda', 'Egypt', 'Uganda', 'Tanzania', 'Ethiopia', 'Morocco', 'Other'];

export const CommunityOverlay: React.FC<CommunityOverlayProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0); // 0: Info, 1: Track, 2: Review, 3: Success
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
      setCurrentPage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = { 
      timestamp: new Date().toLocaleString(),
      source: 'Community Hub',
      sheetName: 'Community',
      ...formData,
      dob: `${formData.dobDay} ${formData.dobMonth}`
    };

    try {
      await fetch(COMMUNITY_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      
      const existing = JSON.parse(localStorage.getItem('pha_submissions') || '[]');
      localStorage.setItem('pha_submissions', JSON.stringify([payload, ...existing]));
      
      setSubmitted(true);
      setCurrentPage(3);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full h-[46px] px-5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#135291] outline-none transition-all placeholder-gray-400 text-gray-800 font-medium text-sm";
  const labelClasses = "block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider";

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[620px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 px-8 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {currentPage === 2 ? 'Review your submission' : submitted ? 'Success' : 'Join the Community'}
            </h2>
            <p className="text-gray-500 text-xs">
              {submitted ? 'Record saved' : `Step ${currentPage + 1} of 3`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-10">
          {!submitted && (
            <div className="flex gap-2 mb-8">
              {[0, 1, 2].map((step) => (
                <div key={step} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${currentPage >= step ? 'bg-[#135291]' : 'bg-gray-100'}`} />
              ))}
            </div>
          )}

          {currentPage === 3 ? (
            <div className="animate-fade-in space-y-8">
              <div className="flex items-center gap-4 p-6 bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle className="text-green-600 shrink-0" size={32} />
                <div>
                  <h3 className="font-bold text-green-900">Successfully Submitted</h3>
                  <p className="text-sm text-green-700">Thank you! Your application has been recorded.</p>
                </div>
              </div>
              <Button fullWidth size="lg" onClick={onClose}>Finish & Close</Button>
            </div>
          ) : currentPage === 2 ? (
            <div className="animate-fade-in space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#135291] mb-6">Verify Your Data</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}` },
                    { label: 'Email', value: formData.email },
                    { label: 'WhatsApp', value: formData.whatsapp },
                    { label: 'Track', value: formData.track },
                    { label: 'Country', value: formData.country },
                    { label: 'Experience', value: `${formData.experience} Years` },
                    { label: 'Birthday', value: `${formData.dobDay} ${formData.dobMonth}` }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b border-gray-200 pb-3 last:border-0">
                      <span className="text-sm font-bold text-gray-400">{item.label}</span>
                      <span className="text-sm font-black text-[#08223d] text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" type="button" onClick={() => setCurrentPage(0)} className="w-1/3 border-gray-200 text-gray-600">
                  <Edit3 size={18} className="mr-2" /> Edit Details
                </Button>
                <Button fullWidth size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Finish & Submit"}
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-6">
              {currentPage === 0 && (
                <div className="animate-fade-in space-y-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>First Name *</label>
                      <input required type="text" className={inputClasses} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Last Name *</label>
                      <input required type="text" className={inputClasses} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input required type="email" className={inputClasses} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className={labelClasses}>WhatsApp Number *</label>
                    <input required type="tel" className={inputClasses} value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                  </div>
                  <div className="pt-6">
                    <Button fullWidth size="lg" type="button" onClick={() => setCurrentPage(1)} className="group">
                      Continue <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {currentPage === 1 && (
                <div className="animate-fade-in space-y-6">
                  <div>
                    <label className={labelClasses}>Track of Interest *</label>
                    <div className="relative">
                      <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.track} onChange={(e) => setFormData({...formData, track: e.target.value})}>
                        <option value="">Select a track</option>
                        {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Country *</label>
                    <div className="relative">
                      <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                        <option value="">Select country</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className={labelClasses}>Experience *</label>
                      <select required className={`${inputClasses} appearance-none`} value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}>
                        <option value="">Years</option>
                        <option value="0-1">0-1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-5">3-5</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>Birthday Month</label>
                      <select required className={`${inputClasses} appearance-none`} value={formData.dobMonth} onChange={(e) => setFormData({...formData, dobMonth: e.target.value})}>
                        <option value="">Month</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <Button variant="outline" type="button" onClick={() => setCurrentPage(0)} className="w-1/3">
                      <ArrowLeft size={18} className="mr-2" /> Back
                    </Button>
                    <Button fullWidth size="lg" type="button" onClick={() => setCurrentPage(2)}>
                      Review Details
                    </Button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
