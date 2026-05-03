import React, { useState, useEffect, useMemo } from 'react';
import { X, Loader2, ChevronDown, CheckCircle, ArrowRight, Edit3 } from 'lucide-react';
import { Button } from './Button';
import { Input, Select, Label } from './FormElements';

interface CommunityOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// EXACT NEW URL PROVIDED
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJvkChVxMMgELzxfHc8VgtxY616MOm7kUg22gYK6vQT4PPI6ZNa2a7GhrtHQJ4vf46/exec";

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

  const isStep0Valid = formData.firstName && formData.lastName && formData.email && formData.whatsapp;
  const isStep1Valid = formData.track && formData.country && formData.experience;
  const isFormValid = isStep0Valid && isStep1Valid;

  const handleSubmit = async () => {
    if (isSubmitting || !isFormValid) return;
    setIsSubmitting(true);

    // Using Title Case keys ensures the Google Script creates readable headers
    const payload = { 
      'Timestamp': new Date().toLocaleString(),
      'Source': 'Community Hub',
      'sheetName': 'Community', 
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

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      <div className="relative w-full max-w-[620px] bg-white h-full animate-slide-in-right flex flex-col">
        
        <div className="sticky top-0 bg-white z-30 px-8 py-6 md:px-10 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[#08223d] mb-1">
              {currentPage === 2 ? 'Review submission' : submitted ? 'Success' : 'Join the Community'}
            </h2>
            {!submitted && (
              <p className="text-gray-500 text-xs">
                Step {currentPage + 1} of 3
              </p>
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
                  <div key={step} className={`h-1.5 flex-1 rounded-xl transition-all duration-500 ${currentPage >= step ? 'bg-[#135291]' : 'bg-gray-100'}`} />
                ))}
              </div>
            )}

            {currentPage === 3 ? (
              <div className="animate-fade-in space-y-8">
                <div className="flex items-center gap-4 p-6 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="text-green-600 shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold text-green-900">Successfully Submitted</h3>
                    <p className="text-sm text-green-700">Thank you! Your application has been recorded.</p>
                  </div>
                </div>
              </div>
            ) : currentPage === 2 ? (
              <div className="animate-fade-in space-y-8">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
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
                        <Label required>First Name</Label>
                        <Input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                      </div>
                      <div>
                        <Label required>Last Name</Label>
                        <Input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <Label required>Email Address</Label>
                      <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <Label required>WhatsApp Number</Label>
                      <Input required type="tel" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <Label required>Track of Interest</Label>
                        <Select required value={formData.track} onChange={(e) => setFormData({...formData, track: e.target.value})}>
                          <option value="">Select track</option>
                          {tracks.map(t => <option key={t} value={t}>{t}</option>)}
                        </Select>
                      </div>
                      <div>
                        <Label required>Country</Label>
                        <Select required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
                          <option value="">Select country</option>
                          {countries.map(c => <option key={c} value={c}>{c}</option>)}
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <Label required>Experience</Label>
                        <Select required value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})}>
                          <option value="">Years</option>
                          <option value="0-1">0-1</option>
                          <option value="1-3">1-3</option>
                          <option value="3-5">3-5</option>
                          <option value="5+">5+</option>
                        </Select>
                      </div>
                      <div>
                        <Label>Birthday (Date & Month)</Label>
                        <Select value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})}>
                          <option value="">Select Day & Month</option>
                          {birthdayOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </Select>
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
                <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting || !isFormValid}>
                  {isSubmitting ? <Loader2 size={16} className="animate-spin mr-2" /> : "Finish & Submit"}
                </Button>
              </div>
            ) : currentPage === 1 ? (
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setCurrentPage(0)}>Back</Button>
                <Button className="flex-1" onClick={() => setCurrentPage(2)} disabled={!isStep1Valid}>Review Details</Button>
              </div>
            ) : (
              <Button fullWidth size="lg" onClick={() => setCurrentPage(1)} disabled={!isStep0Valid}>
                Continue <ArrowRight size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};