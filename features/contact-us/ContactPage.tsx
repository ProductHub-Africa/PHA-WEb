import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { TYPOGRAPHY } from '../../constants';
import { Mail, MapPin, Slack, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { CommunityOverlay } from '../../components/CommunityOverlay';

export const ContactPage: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div 
      className="w-full pb-[60px] md:pb-[120px] pt-[140px] md:pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <CommunityOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <Reveal width="100%" className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Get in touch</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>We'd love to hear from you</h1>
          <p className={`${TYPOGRAPHY.body02} text-gray-500`}>
             Have a question about our bootcamps, community, or partnerships? Our team is ready to answer all your questions.
          </p>
        </Reveal>

        <Reveal width="100%" className="bg-white rounded-xl md:rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row mb-24">
          
          {/* Contact Info Sidebar */}
          <div className="lg:w-5/12 bg-[#08223d] p-5 lg:p-14 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#135291] rounded-full blur-[60px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#daa728] rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-8 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-md md:rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-[#daa728]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email us</p>
                    <p className="font-medium text-lg">info@producthubafrica.org</p>
                    <p className="font-medium text-lg">producthubafrica@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-white/10 rounded-md md:rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-[#daa728]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Visit us</p>
                    <p className="font-medium text-lg leading-relaxed">
                      Lagos, Nigeria<br />
                      (Remote & Virtual Community)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-white/10 rounded-md md:rounded-xl flex items-center justify-center shrink-0">
                    <Slack className="text-[#daa728]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Slack</p>
                    <p className="font-medium text-lg">Join our Slack channel for 24/7 support</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-sm text-gray-400 mb-4">Follow us on social media</p>
                <div className="flex space-x-4">
                  <a href="https://x.com/ProductHubAfri" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Twitter size={18} /></a>
                  <a href="https://www.linkedin.com/company/product-hub-africa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Linkedin size={18} /></a>
                  <a href="https://www.instagram.com/producthubafrica/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Instagram size={18} /></a>
                  <a href="https://web.facebook.com/people/Product-Hub-Africa/61555965181457/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Facebook size={18} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-7/12 p-5 lg:p-14 bg-white">
            <h3 className="text-2xl font-bold text-[#08223d] mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="Doe" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="+234..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                 <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all text-gray-600">
                    <option>General Inquiry</option>
                    <option>Bootcamps</option>
                    <option>Partnership</option>
                    <option>Support</option>
                 </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-md md:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="Tell us how we can help..."></textarea>
              </div>

              <div className="pt-4">
                <Button size="lg">Send Message</Button>
              </div>
            </form>
          </div>
        </Reveal>

        {/* Big CTA Banner (Copied from Home) */}
        <Reveal width="100%">
          <div className="bg-[#135291] rounded-xl md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto min-h-[500px] transform hover:scale-[1.01] transition-transform duration-500">
            <div className="md:w-1/2 relative h-80 md:h-auto">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Meeting" />
              <div className="absolute inset-0 bg-blue-900 opacity-30 mix-blend-multiply"></div>
            </div>
            <div className="md:w-1/2 p-5 md:p-12 lg:p-20 flex flex-col justify-center text-white">
              <h2 className={`${TYPOGRAPHY.header02} mb-6`}>Landing Internship Roles as a Newbie in Tech</h2>
              <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                At product hub Africa, we understand the difficulties newbies in tech and techies in general face when trying to get an internship or a new role. We'll be having a twitter space on this topic sharing valuable insights.
              </p>
              <div className="flex justify-start">
                <Button size="lg" style={{ backgroundColor: '#daa728', color: '#08223d', width: 'auto' }} onClick={() => setIsOverlayOpen(true)}>Join Our Community</Button>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};