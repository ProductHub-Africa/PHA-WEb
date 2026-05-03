import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Loader2, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { Input, Select, Textarea, Label } from './FormElements';

interface PartnerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'partner' | 'facilitator' | 'sponsor';
}

// EXACT NEW URL PROVIDED
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJvkChVxMMgELzxfHc8VgtxY616MOm7kUg22gYK6vQT4PPI6ZNa2a7GhrtHQJ4vf46/exec";

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
    motivation: '',
    linkedin: '',
    portfolio: ''
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

  const isStep0Valid = formData.fullName && formData.orgName && formData.email && formData.phone && formData.location;
  const isStep1Valid = mode === 'facilitator' 
    ? (formData.trackInterestedIn && formData.motivation)
    : (formData.supporterType.length > 0 && formData.motivation);
    
  const isFormValid = isStep0Valid && isStep1Valid;

  const handleSubmit = async () => {
    if (isSubmitting || !isFormValid) return;
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
      'Message': formData.motivation,
      'LinkedIn': formData.linkedin,
      'Portfolio': formData.portfolio
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

  const getTitle = () => {
    if (currentPage === 2) return 'Review submission';
    if (submitted) return 'Success';
    if (mode === 'facilitator') return 'Become a Facilitator';
    if (mode === 'sponsor') return 'Become a Sponsor';
    return 'Partner with Us';
  };

  const getReviewItems = () => {
    const baseItems = [
      { label: 'Name', value: formData.fullName },
      { label: 'Email', value: formData.email },
      { label: 'Organization', value: formData.orgName },
      { label: 'Phone', value: formData.phone },
      { label: 'Location', value: formData.location },
    ];

    if (mode === 'facilitator') {
      return [
        ...baseItems,
        { label: 'Track', value: formData.trackInterestedIn },
        { label: 'LinkedIn', value: formData.linkedin || 'N/A' },
        { label: 'Portfolio', value: formData.portfolio || 'N/A' }
      ];
    }

    return [
      ...baseItems,
      { label: 'Type', value: formData.supporterType.join(', ') }
    ];
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-[670px] bg-white h-full animate-slide-in-right flex flex-col">
        
        <div className="sticky top-0 bg-white z-30 px-6 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {getTitle()}
            </h2>
            {!submitted && (
              <p className="text-gray-500 text-xs">Step {currentPage + 1} of 3</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 md:pt-5 md:px-5 md:pb-10">
            {!submitted && (
               <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((step) => (
                  <div key={step} className={`h-1.5 flex-1 rounded-xl ${currentPage >= step ? 'bg-[#135291]' : 'bg-gray-100'}`} />
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
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#135291] mb-6">Verify Information</h4>
                  <div className="space-y-4">
                    {getReviewItems().map((item, i) => (
                      <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-3 last:border-0">
                        <span className="text-sm font-bold text-gray-400">{item.label}</span>
                        <span className="text-sm font-black text-[#08223d] text-right break-words max-w-[60%]">{item.value}</span>
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
                        <Label required>Full Name</Label>
                        <Input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                      </div>
                      <div>
                        <Label required>{mode === 'facilitator' ? 'Current Org' : 'Org Name'}</Label>
                        <Input required value={formData.orgName} onChange={e => setFormData({...formData, orgName: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label required>Work Email</Label>
                      <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label required>Phone</Label>
                        <Input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div>
                        <Label required>Location</Label>
                        <Input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                      </div>
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-fade-in space-y-6">
                    {mode === 'facilitator' ? (
                      <>
                        <div>
                          <Label required>Track of Interest</Label>
                          <Select required value={formData.trackInterestedIn} onChange={e => setFormData({...formData, trackInterestedIn: e.target.value})}>
                            <option value="">Select track</option>
                            {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                             <Label>LinkedIn URL</Label>
                             <Input type="url" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                          </div>
                          <div>
                             <Label>Portfolio URL</Label>
                             <Input type="url" placeholder="https://..." value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <Label required>Support Types</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {supporterTypes.map(t => (
                            <label key={t} className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all border ${formData.supporterType.includes(t) ? 'bg-[#135291]/5 border-[#135291]/20' : 'bg-gray-50 border-gray-100'} hover:bg-gray-100`}>
                              <input type="checkbox" checked={formData.supporterType.includes(t)} onChange={() => handleToggle(t)} className="w-4 h-4 accent-[#135291]" />
                              <span className="text-xs font-medium text-gray-700">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <Label required>Motivation / Message</Label>
                      <Textarea required rows={4} placeholder="Tell us more about your interest..." value={formData.motivation} onChange={e => setFormData({...formData, motivation: e.target.value})} />
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
                <Button className="flex-1" size="lg" onClick={handleSubmit} disabled={isSubmitting || !isFormValid}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : "Finish & Submit"}
                </Button>
              </div>
            ) : currentPage === 1 ? (
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => setCurrentPage(0)} className="flex-1">Back</Button>
                <Button className="flex-1" size="lg" type="button" onClick={() => setCurrentPage(2)} disabled={!isStep1Valid}>Review Details</Button>
              </div>
            ) : (
              <Button fullWidth size="lg" type="button" onClick={() => setCurrentPage(1)} disabled={!isStep0Valid}>
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};