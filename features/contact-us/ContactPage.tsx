import React from 'react';
import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { TYPOGRAPHY } from '../../constants';
import { Mail, MapPin, Slack, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[120px] pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Get in touch</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>We'd love to hear from you</h1>
          <p className={`${TYPOGRAPHY.body02} text-gray-500`}>
             Have a question about our bootcamps, community, or partnerships? Our team is ready to answer all your questions.
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row mb-24">
          
          {/* Contact Info Sidebar */}
          <div className="lg:w-5/12 bg-[#08223d] p-10 lg:p-14 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#135291] rounded-full blur-[60px] opacity-40 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#daa728] rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-8 flex-1">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-[#daa728]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email us</p>
                    <p className="font-medium text-lg">info@producthubafrica.org</p>
                    <p className="font-medium text-lg">producthubafrica@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
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
                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
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
                  <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Twitter size={18} /></a>
                  <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Linkedin size={18} /></a>
                  <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Instagram size={18} /></a>
                  <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#daa728] hover:text-[#08223d] transition-all"><Facebook size={18} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-7/12 p-10 lg:p-14 bg-white">
            <h3 className="text-2xl font-bold text-[#08223d] mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="Doe" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="+234..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                 <select className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all text-gray-600">
                    <option>General Inquiry</option>
                    <option>Bootcamps</option>
                    <option>Partnership</option>
                    <option>Support</option>
                 </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all placeholder-gray-400" placeholder="Tell us how we can help..."></textarea>
              </div>

              <div className="pt-4">
                <Button size="lg">Send Message</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Big CTA Banner (Copied from Home) */}
        <Reveal width="100%">
          <div className="bg-[#135291] rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto min-h-[500px] transform hover:scale-[1.01] transition-transform duration-500">
            <div className="md:w-1/2 relative h-80 md:h-auto">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Meeting" />
              <div className="absolute inset-0 bg-blue-900 opacity-30 mix-blend-multiply"></div>
            </div>
            <div className="md:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white">
              <Reveal delay={0.2} width="100%">
                <h2 className={`${TYPOGRAPHY.header02} mb-6`}>Landing Internship Roles as a Newbie in Tech</h2>
              </Reveal>
              <Reveal delay={0.4} width="100%">
                <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                  At product hub Africa, we understand the difficulties newbies in tech and techies in general face when trying to get an internship or a new role. We'll be having a twitter space on this topic sharing valuable insights.
                </p>
              </Reveal>
              <Reveal delay={0.6} width="100%">
                <div className="flex justify-start">
                  <Button size="lg" style={{ backgroundColor: '#daa728', color: '#08223d', width: 'auto' }}>Join the community</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};