import React from 'react';
import { TYPOGRAPHY, COLORS } from '../../constants';
import { Reveal } from '../../components/Reveal';
import { Button } from '../../components/Button';
import { Mail, Linkedin, Twitter, MapPin, Briefcase, Heart, ArrowRight } from 'lucide-react';

const teamMembers = [
  {
    name: "Victoria Oladosu",
    role: "Founder, Lead Community manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    country: "Nigerian"
  },
  {
    name: "Dosunmu Aishat",
    role: "Programs and Community Manager",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400",
    country: "Nigerian"
  },
  {
    name: "Osaite Emmanuel",
    role: "Lead Designer at PHA",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400",
    country: "Nigerian"
  },
  {
    name: "Adegboye Opeyemi",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=400",
    country: "Nigerian"
  },
  {
    name: "Product Hub Africa",
    role: "Content Specialist",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
    country: "Nigerian"
  },
];

export const AboutPage: React.FC = () => {
  const scrollToVolunteer = () => {
    const element = document.getElementById('volunteer-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section 
        className="w-full pt-[160px] pb-[80px] lg:pt-[220px] lg:pb-[140px]"
        style={{
          background: 'linear-gradient(to bottom, #f8fafc, #ffffff)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Left Content */}
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
                {/* Buttons removed as requested */}
              </Reveal>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 relative">
              <Reveal width="100%" delay={0.2}>
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl">
                   <img 
                     src="https://lh3.googleusercontent.com/d/1Peq9T1SXF_hyLRLiSU6KChYARZ0adr70" 
                     alt="Team Collaboration" 
                     className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000" 
                   />
                   <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply pointer-events-none"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#daa728]/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#135291]/10 rounded-full blur-3xl -z-10"></div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section */}
      <section className="bg-white py-[60px] md:py-[120px]">
         <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <Reveal width="100%" direction="right" className="h-full">
                <div className="relative h-full min-h-[400px]">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" alt="African Tech Team" className="rounded-xl md:rounded-[40px] shadow-2xl w-full h-full object-cover" />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#daa728] rounded-full flex items-center justify-center text-[#08223d] font-bold text-xl shadow-lg z-10 hidden md:flex">
                    PHA
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal width="100%">
                <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-8`}>Our Mission and Vision</h2>
                
                <div className="mb-10 space-y-6">
                    <p className={`${TYPOGRAPHY.body02}`}>
                      Our mission is to foster a thriving community of tech enthusiasts who are passionate about creating scalable, user-centered products that drive positive change not only in Africa but also beyond.
                    </p>
                    <p className={`${TYPOGRAPHY.body02}`}>
                      Our vision is to be the leading community in Africa, spearheading innovation and excellence in product development. We aspire to create a vibrant and inclusive ecosystem where diverse talents come together.
                    </p>
                </div>

                <div className="p-6 md:p-8 bg-blue-50/50 border-l-4 border-[#135291] rounded-r-xl">
                  <p className="text-[#08223d] italic text-lg leading-relaxed font-medium">
                    "By fostering a culture of collaboration and continuous learning, we envision a future where African tech products and solutions make a significant impact on a global scale."
                  </p>
                </div>
              </Reveal>
            </div>
         </div>
      </section>

      {/* Meet the Team Section - Redesigned Grid */}
      <section className="py-[60px] md:py-[120px] bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Card 1: CTA Card */}
              <div className="bg-[#5c46e6] rounded-[32px] p-8 md:p-10 flex flex-col justify-center text-white shadow-xl h-full min-h-[420px]">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our fantastic team</h2>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  These people work on making our product best.
                </p>
                <div>
                  <button 
                    onClick={scrollToVolunteer}
                    className="bg-white text-[#5c46e6] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center group"
                  >
                    Join the team <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Team Member Cards */}
              {teamMembers.map((member, index) => (
                 <div key={index} className="bg-white rounded-[24px] overflow-hidden shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group border border-gray-100 flex flex-col h-full min-h-[420px]">
                    <div className="h-[280px] overflow-hidden relative">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="pr-2">
                          <h3 className="text-lg font-bold text-[#08223d] mb-1">{member.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">{member.role}</p>
                        </div>
                        
                        <div className="flex space-x-2 shrink-0 pt-1">
                          <a href={`mailto:info@producthubafrica.org`} className="text-gray-400 hover:text-[#135291] transition-colors p-1" aria-label="Email">
                            <Mail size={18} />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-[#0077b5] transition-colors p-1" aria-label="LinkedIn">
                            <Linkedin size={18} />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-black transition-colors p-1" aria-label="Twitter">
                            <Twitter size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                 </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Volunteer Section - Updated Fields */}
      <section id="volunteer-section" className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              {/* Left Text */}
              <div className="lg:w-1/2 sticky top-24">
                <span className="text-[#daa728] font-bold tracking-widest uppercase text-sm mb-4 block">Join Our Mission</span>
                <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6`}>Volunteer with us</h2>
                <p className={`${TYPOGRAPHY.body02} text-gray-600 mb-8`}>
                  At Product Hub Africa, we believe in the power of giving back. If you have a desire to contribute to the community and make a meaningful impact, we invite you to join our volunteer program.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#135291] shrink-0">
                       <Briefcase size={22} />
                     </div>
                     <div>
                       <h4 className="font-bold text-[#08223d] text-lg mb-1">Gain Experience</h4>
                       <p className="text-sm text-gray-500 leading-relaxed">Work on real-world projects, collaborate with cross-functional teams, and build a portfolio that stands out.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#135291] shrink-0">
                       <Heart size={22} />
                     </div>
                     <div>
                       <h4 className="font-bold text-[#08223d] text-lg mb-1">Give Back</h4>
                       <p className="text-sm text-gray-500 leading-relaxed">Mentor upcoming talent, share your knowledge, and play a pivotal role in shaping the future of African tech.</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:w-1/2 w-full">
                <div className="bg-[#135291] rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#daa728] opacity-10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
                  
                  <h3 className="text-2xl font-bold mb-2 relative z-10">Fill out our volunteer form</h3>
                  <p className="text-blue-200 mb-8 text-sm relative z-10">We'll be in touch shortly after reviewing your application.</p>
                  
                  <form className="space-y-5 relative z-10">
                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Full Name</label>
                      <input type="text" placeholder="Tilda Teaser" className="w-full bg-[#0d3a67]/50 border border-[#2c74bc] rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] focus:border-transparent transition-all" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Email</label>
                      <input type="email" placeholder="tilda@mail.com" className="w-full bg-[#0d3a67]/50 border border-[#2c74bc] rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] focus:border-transparent transition-all" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Department</label>
                        <div className="relative">
                          <select className="w-full bg-[#0d3a67]/50 border border-[#2c74bc] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#daa728] focus:border-transparent appearance-none cursor-pointer">
                            <option className="text-gray-800">Select Department</option>
                            <option className="text-gray-800">Community Management</option>
                            <option className="text-gray-800">Events & Programs</option>
                            <option className="text-gray-800">Product Design</option>
                            <option className="text-gray-800">Social Media</option>
                            <option className="text-gray-800">Technical Team</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Years of Experience</label>
                        <div className="relative">
                          <select className="w-full bg-[#0d3a67]/50 border border-[#2c74bc] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#daa728] focus:border-transparent appearance-none cursor-pointer">
                            <option className="text-gray-800">Select Experience</option>
                            <option className="text-gray-800">0 - 1 Years</option>
                            <option className="text-gray-800">1 - 3 Years</option>
                            <option className="text-gray-800">3 - 5 Years</option>
                            <option className="text-gray-800">5+ Years</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                             <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">What motivates you to want to volunteer?</label>
                      <textarea rows={4} placeholder="Tell us about yourself and why you'd like to volunteer with us..." className="w-full bg-[#0d3a67]/50 border border-[#2c74bc] rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] focus:border-transparent transition-all resize-none"></textarea>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-[#daa728] text-[#08223d] font-bold px-6 py-4 rounded-xl hover:bg-white hover:text-[#135291] transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex justify-center items-center">
                        Submit your application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};