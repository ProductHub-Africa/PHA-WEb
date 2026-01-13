import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface VolunteerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// EXACT NEW URL PROVIDED
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJvkChVxMMgELzxfHc8VgtxY616MOm7kUg22gYK6vQT4PPI6ZNa2a7GhrtHQJ4vf46/exec";
const departments = ['Events Management', 'Community Management', 'Social Media & Content', 'Technical Facilitation', 'Partnerships', 'Design & Creative'];

export const VolunteerOverlay: React.FC<VolunteerOverlayProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    linkedin: '',
    reason: ''
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

    // Using Title Case keys
    const payload = {
      'Timestamp': new Date().toLocaleString(),
      'Source': 'Volunteer App',
      'sheetName': 'Volunteer',
      'First Name': formData.firstName,
      'Last Name': formData.lastName,
      'Email': formData.email,
      'Department': formData.department,
      'LinkedIn': formData.linkedin,
      'Motivation': formData.reason
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
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check your network connection.");
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
              {currentPage === 2 ? 'Review submission' : submitted ? 'Success' : 'Volunteer with Us'}
            </h2>
            <p className="text-gray-500 text-xs">{submitted ? 'Saved' : `Step ${currentPage + 1} of 3`}</p>
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
                  <div key={step} className={`h-1.5 flex-1 rounded-full ${currentPage >= step ? 'bg-[#135291]' : 'bg-gray-100'}`} />
                ))}
              </div>
            )}

            {currentPage === 3 ? (
              <div className="animate-fade-in space-y-8">
                 <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <CheckCircle className="text-[#135291] shrink-0" size={32} />
                  <div>
                    <h3 className="font-bold text-[#08223d]">Application Sent</h3>
                    <p className="text-sm text-[#135291]/70">Thank you for volunteering!</p>
                  </div>
                </div>
              </div>
            ) : currentPage === 2 ? (
              <div className="animate-fade-in space-y-8">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#135291] mb-6">Confirm Details</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}` },
                      { label: 'Email', value: formData.email },
                      { label: 'Department', value: formData.department },
                      { label: 'LinkedIn', value: formData.linkedin || 'N/A' },
                      { label: 'Motivation', value: formData.reason }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col border-b border-gray-100 pb-3 last:border-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.label}</span>
                        <span className="text-sm font-black text-[#08223d]">{item.value}</span>
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
                        <label className={labelClasses}>First Name</label>
                        <input required className={inputClasses} value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                      </div>
                      <div>
                        <label className={labelClasses}>Last Name</label>
                        <input required className={inputClasses} value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>Email Address</label>
                      <input required type="email" className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                )}

                {currentPage === 1 && (
                  <div className="animate-fade-in space-y-6">
                    <div>
                      <label className={labelClasses}>Department</label>
                      <select required className={inputClasses} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                        <option value="">Select Department</option>
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClasses}>LinkedIn Profile</label>
                      <input type="url" placeholder="https://linkedin.com/in/..." className={inputClasses} value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} />
                    </div>
                    <div>
                      <label className={labelClasses}>Why do you want to join? *</label>
                      <textarea required className="w-full min-h-[120px] p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-8 pb-8 pt-4 md:px-10 bg-white border-t border-gray-50 mt-auto">
            {submitted ? (
              <Button fullWidth size="lg" onClick={onClose}>Done</Button>
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
                Next Step <ArrowRight size={18} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};