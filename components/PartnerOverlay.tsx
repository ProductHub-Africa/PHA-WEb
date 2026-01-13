import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './Button';

interface PartnerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'partner' | 'facilitator' | 'sponsor';
}

// EXACT NEW URL PROVIDED
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYt9kghTFi4wYyR7aw2gfAEliOzz8BDv_bhZnk6ijgtc5TQmfFmYj1Gp107Wyq4smx/exec";

const tracks = ['Product Management', 'Product Design', 'Data Analytics', 'Cybersecurity', 'Technical Writing', 'Software Engineering'];
const supporterTypes = ['Sponsor (Financial)', 'Partner (Strategic)', 'Community Supporter', 'Corporate Partner', 'Media Partner', 'Other'];

export const PartnerOverlay: React.FC<PartnerOverlayProps> = ({ isOpen, onClose, mode = 'partner' }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    email: '',
    phone: '',
    location: '',
    trackInterestedIn: '',
    supporterType: [] as string[],
    motivation: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      setCurrentPage(0);
      
      if (mode === 'sponsor') {
        setFormData(prev => ({ ...prev, supporterType: ['Sponsor (Financial)'] }));
      }
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, mode]);

  const handleToggle = (item: string) => {
    const newList = formData.supporterType.includes(item) 
      ? formData.supporterType.filter(i => i !== item) 
      : [...formData.supporterType, item];
    setFormData({ ...formData, supporterType: newList });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Using Title Case keys
    const payload = {
      'Timestamp': new Date().toLocaleString(),
      'Source': mode === 'facilitator' ? 'Facilitator App' : mode === 'sponsor' ? 'Sponsor App' : 'Partner App',
      'sheetName': mode === 'facilitator' ? 'Facilitators' : mode === 'sponsor' ? 'Sponsors' : 'Partners',
      'Full Name': formData.fullName,
      'Email': formData.email,
      'Organization': formData.orgName,
      'Phone': formData.phone,
      'Location': formData.location,
      'Track': formData.trackInterestedIn,
      'Supporter Type': formData.supporterType.join(', '),
      'Message': formData.motivation
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
      console.error(error);
      alert("Submission failed. Check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full h-[46px] px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none text-sm font-medium";
  const labelClasses = "block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider";

  const getTitle = () => {
    if (currentPage === 2) return 'Review submission';
    if (submitted) return 'Success';
    if (mode === 'facilitator') return 'Become a Facilitator';
    if (mode === 'sponsor') return 'Become a Sponsor';
    return 'Partner with Us';
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-[670px] bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
        
        <div className="sticky top-0 bg-white z-30 px-6 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {getTitle()}
            </h2>
            <p className="text-gray-500 text-xs">{submitted ? 'Done' : `Step ${currentPage + 1} of 3`}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 md:p-10">
            {!submitted && (
               <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((step) => (
                  <div key={step} className={`h-1.5 flex-1 rounded-full ${currentPage >= step ? 'bg-[#135291]' : 'bg-gray-100'}`} />
                ))}
              </div>
            )}

            {currentPage === 3 ? (
              <div className="animate-fade-in py-10 text-center">
                <CheckCircle size={60} className="text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Application Sent</h3>
                <p className="text-gray-600 mb-8">We will reach out to you within 5 working days.</p>
              </div>
            ) : currentPage === 2 ? (
              <div className="animate-fade-in space-y-8">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#135291] mb-6">Verify Information</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Name', value: formData.fullName },
                      { label: 'Email', value: formData.email },
                      { label: 'Organization', value: formData.orgName },
                      { label: 'Phone', value: formData.phone },
                      { label: 'Location', value: formData.location },
                      mode === 'facilitator' ? { label: 'Track', value: formData.trackInterestedIn } : { label: 'Type', value: formData.supporterType.join(', ') },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
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
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>Full Name *</label>
                        <input required className={inputClasses} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                      </div>
                      <div>
                        <label className={labelClasses}>{mode === 'facilitator' ? 'Current Org' : 'Org Name'}</label>
                        <input required className={inputClasses} value={formData.orgName} onChange={e => setFormData({...formData, orgName: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>Work Email *</label>
                      <input required type="email" className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>Phone *</label>
                        <input required type="tel" className={inputClasses} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className={labelClasses}>Location *</label>
                        <input required className={inputClasses} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-fade-in space-y-6">
                    {mode === 'facilitator' ? (
                      <div>
                        <label className={labelClasses}>Track of Interest *</label>
                        <select required className={inputClasses} value={formData.trackInterestedIn} onChange={e => setFormData({...formData, trackInterestedIn: e.target.value})}>
                          <option value="">Select track</option>
                          {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className={labelClasses}>Support Types *</label>
                        <div className="grid grid-cols-2 gap-2">
                          {supporterTypes.map(t => (
                            <label key={t} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 border border-gray-100">
                              <input type="checkbox" checked={formData.supporterType.includes(t)} onChange={() => handleToggle(t)} className="w-4 h-4" />
                              <span className="text-xs">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <label className={labelClasses}>Motivation / Message *</label>
                      <textarea required rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-6 pb-8 pt-4 md:px-10 border-t border-gray-50 bg-white mt-auto">
            {submitted ? (
              <Button fullWidth onClick={onClose}>Close</Button>
            ) : currentPage === 2 ? (
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => setCurrentPage(0)} className="flex-1">Back</Button>
                <Button className="flex-1" size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : "Finish & Submit"}
                </Button>
              </div>
            ) : currentPage === 1 ? (
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => setCurrentPage(0)} className="flex-1">Back</Button>
                <Button className="flex-1" size="lg" type="button" onClick={() => setCurrentPage(2)}>Review Details</Button>
              </div>
            ) : (
              <Button fullWidth size="lg" type="button" onClick={() => setCurrentPage(1)}>
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};