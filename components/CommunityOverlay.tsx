import React, { useState, useEffect, useMemo } from 'react';
import { X, Loader2, ChevronDown, CheckCircle, ArrowRight, Edit3 } from 'lucide-react';
import { Button } from './Button';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// EXACT NEW URL PROVIDED
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLi17lu5x0Txu9GgDrx-zL78LWIhQk9LaaDxgPSoIOigL4JRjfmy7-tmzEn7Vf3yKc/exec";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tracks = ['Product Management', 'Product Design', 'Data Analytics', 'Cybersecurity', 'Technical Writing', 'Software Engineering'];
const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Rwanda', 'Egypt', 'Uganda', 'Tanzania', 'Ethiopia', 'Morocco', 'Other'];

export const CommunityOverlay: React.FC<CommunityOverlayProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    track: '',
    experience: '',
    whatsapp: '',
    birthday: '',
    country: ''
  });

  const birthdayOptions = useMemo(() => {
    const opts: string[] = [];
    months.forEach(m => {
      const days = m === 'February' ? 29 : [4, 6, 9, 11].includes(months.indexOf(m) + 1) ? 30 : 31;
      for (let d = 1; d <= days; d++) {
        opts.push(`${d} ${m}`);
      }
    });
    return opts;
  }, []);

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

    // Using Title Case keys to ensure headers match standard sheet expectations
    const payload = { 
      'Timestamp': new Date().toLocaleString(),
      'Source': 'Community Hub',
      sheetName: 'Community', // Control parameter for script routing
      'First Name': formData.firstName,
      'Last Name': formData.lastName,
      'Email': formData.email,
      'WhatsApp': formData.whatsapp,
      'Track': formData.track,
      'Country': formData.country,
      'Experience': formData.experience,
      'Birthday': formData.birthday
    };

    try {
      await fetch(SCRIPT_URL, {
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
      alert("Network error. Please check your connection.");
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
        
        <div className="sticky top-0 bg-white z-30 px-8 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {currentPage === 2 ? 'Review submission' : submitted ? 'Success' : 'Join the Community'}
            </h2>
            <p className="text-gray-500 text-xs">
              {submitted ? 'Record saved' : `Step ${currentPage + 1} of 3`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
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
              </div>
            ) : currentPage === 2 ? (
              <div className="animate-fade-in space-y-8">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#135291] mb-6">Verify Your Data</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}` },
                      { label: 'Email', value: formData.email },
                      { label: 'WhatsApp', value: formData.whatsapp },
                      { label: 'Track', value: formData.track },
                      { label: 'Country', value: formData.country },
                      { label: 'Experience', value: `${formData.experience} Years` },
                      { label: 'Birthday', value: formData.birthday }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-gray-200 pb-3 last:border-0">
                        <span className="text-sm font-bold text-gray-400">{item.label}</span>
                        <span className="text-sm font-black text-[#08223d] text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
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
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelClasses}>Track of Interest *</label>
                        <div className="relative">
                          <select required className={`${inputClasses} appearance-none cursor-pointer`} value={formData.track} onChange={(e) => setFormData({...formData, track: e.target.value})}>
                            <option value="">Select track</option>
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
                        <label className={labelClasses}>Birthday (Date & Month)</label>
                        <div className="relative">
                          <select required className={`${inputClasses} appearance-none`} value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})}>
                            <option value="">Select Day & Month</option>
                            {birthdayOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-8 pb-8 pt-4 md:px-10 bg-white border-t border-gray-50 mt-auto">
            {submitted ? (
              <Button fullWidth size="lg" onClick={onClose}>Close</Button>
            ) : currentPage === 2 ? (
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setCurrentPage(0)}>
                  <Edit3 size={16} className="mr-2" /> Edit Info
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : "Finish & Submit"}
                </Button>
              </div>
            ) : currentPage === 1 ? (
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setCurrentPage(0)}>Back</Button>
                <Button className="flex-1" onClick={() => setCurrentPage(2)}>Review Details</Button>
              </div>
            ) : (
              <Button fullWidth size="lg" onClick={() => setCurrentPage(1)}>
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};