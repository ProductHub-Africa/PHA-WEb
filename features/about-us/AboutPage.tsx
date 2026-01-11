
import React, { useState } from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Reveal } from '../../components/Reveal';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../../components/Button';

// Dedicated URL for Volunteer sheet
const VOLUNTEER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxVd5qKy8fRGMHQGybPaIE8hi6tEfiAeye91UlATEfr/exec";

const teamMembers = [
  { name: "Victoria Oladosu", role: "Founder, Lead Community manager", image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Oladosu_Victoria_dpc5be.jpg" },
  { name: "Dosunmu Aishat", role: "Programs, Community Manager", image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Dosunmu_Aeesha_taobia.jpg" },
  { name: "Osaite Emmanuel", role: "Lead Designer", image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Emmanuel_Osaite_gqhu4f.jpg" },
  { name: "Adegboye Opeyemi", role: "Head of Operations, Digital Designer", image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1766044618/Adegboye_Opeyemi_xukkuc.jpg" },
  { name: "Temitope Abike", role: "Content Specialist", image: "https://trainings.producthubafrica.org/wp-content/uploads/2024/10/PHA-logo-160x54.png" },
];

export const AboutPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', department: '', experience: '' });
  
  const scrollToVolunteer = () => {
    document.getElementById('volunteer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(VOLUNTEER_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString(),
          fullName: formData.fullName,
          email: formData.email,
          department: formData.department,
          experience: formData.experience,
          source: 'About Page Volunteer Form',
          sheetName: 'Volunteer'
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

  const inputClasses = "w-full h-[46px] bg-white/10 border border-white/20 rounded-xl px-4 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all text-sm";
  const selectClasses = "w-full h-[46px] bg-white/10 border border-white/20 rounded-xl px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all text-sm appearance-none cursor-pointer";
  const labelClasses = "block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide";

  return (
    <div className="w-full overflow-hidden font-sans">
      <section className="w-full pt-[140px] md:pt-[220px] pb-0 md:pb-[140px]" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 text-center lg:text-left">
              <Reveal width="100%">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-[#135291] font-bold text-sm mb-8 border border-blue-100">
                  <Heart size={16} className="mr-2 fill-current" /> About Product Hub Africa
                </div>
                <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6 leading-tight`}>
                  Empowering Tech Innovators to <span className="text-[#135291]">Shape the Future</span>
                </h1>
                <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-0 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0`}>
                  We are a vibrant community of tech enthusiasts, united by our passion for creating scalable, user-centered products that drive positive change across Africa and beyond.
                </p>
              </Reveal>
            </div>
            <div className="lg:w-1/2 relative">
              <Reveal width="100%" delay={0.2}>
                <div className="relative rounded-xl md:rounded-[32px] overflow-hidden border border-gray-100">
                   <img src="https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110880/PHA_Hero_ABout_dcngjb.png" alt="About PHA" loading="eager" className="w-full h-auto object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[60px] md:py-[120px] bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-[#135291] rounded-xl md:rounded-[32px] p-8 md:p-10 flex flex-col justify-center text-white h-full min-h-[400px]">
              <h2 className="text-3xl font-bold mb-6">Community & Impact</h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed">We are a dedicated non-profit organization and ed-tech community. Our team of passionate volunteers works tirelessly to empower African talent.</p>
              <button onClick={scrollToVolunteer} className="bg-white text-[#135291] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center group w-fit">
                Join the team <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            {teamMembers.map((member, index) => (
               <div key={index} className="bg-white rounded-xl md:rounded-[24px] overflow-hidden border border-gray-100 flex flex-col h-full transition-all hover:border-[#135291]/30">
                  <div className="h-[400px] overflow-hidden relative bg-gray-50 flex items-center justify-center">
                    <img src={member.image} alt={member.name} loading="lazy" className={`w-full h-full ${member.name === "Temitope Abike" ? "object-contain p-20" : "object-cover object-top"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                  <div className="p-5 bg-white flex-grow flex flex-col justify-center text-center">
                      <h3 className="text-lg font-bold text-[#08223d] mb-0.5">{member.name}</h3>
                      <p className="text-xs text-[#135291] font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      <section id="volunteer-section" className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="lg:w-1/2 w-full">
              <span className="text-[#daa728] font-bold tracking-widest uppercase text-xs mb-4 block">Join Our Mission</span>
              <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6 block`}>Volunteer with us</h2>
              <p className={`${TYPOGRAPHY.body02} text-gray-600 mb-8`}>At Product Hub Africa, we believe in the power of giving back. If you have a desire to contribute, we invite you to join our volunteer program.</p>
            </div>
            <div className="lg:w-1/2 w-full mt-10 lg:mt-0">
              <div className="bg-[#135291] rounded-xl md:rounded-[32px] p-6 md:p-12 text-white relative overflow-hidden">
                {submitted ? (
                  <div className="text-center py-10 animate-fade-in">
                     <div className="w-20 h-20 bg-white/10 text-[#daa728] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Application Sent!</h3>
                    <p className="text-blue-100 mb-6">Thank you for your interest. We'll be in touch shortly.</p>
                    <button onClick={() => setSubmitted(false)} className="text-white underline font-bold">Send another application</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-2 block">Volunteer Form</h3>
                    <p className="text-blue-200 mb-8 text-sm block">We'll review your application and get back to you.</p>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClasses}>Full Name</label>
                          <input required type="text" placeholder="Your Name" className={inputClasses} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                        </div>
                        <div>
                          <label className={labelClasses}>Email</label>
                          <input required type="email" placeholder="email@address.com" className={inputClasses} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative">
                          <label className={labelClasses}>Department</label>
                          <select required className={selectClasses} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                            <option value="">Select Dept</option>
                            <option>Programs</option>
                            <option>Design</option>
                            <option>Technical</option>
                            <option>Community</option>
                          </select>
                        </div>
                        <div className="relative">
                          <label className={labelClasses}>Experience</label>
                          <select required className={selectClasses} value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                            <option value="">Select level</option>
                            <option>0 - 1 Year</option>
                            <option>1 - 3 Years</option>
                            <option>3+ Years</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button type="submit" disabled={isSubmitting} className="w-full h-[46px] bg-[#daa728] text-[#08223d] font-bold px-6 rounded-xl hover:bg-white transition-all flex justify-center items-center disabled:opacity-50">
                          {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : "Submit Application"}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
