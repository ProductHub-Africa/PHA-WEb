
import React from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Reveal } from '../../components/Reveal';
import { Mail, Linkedin, Twitter, Briefcase, Heart, ArrowRight, User } from 'lucide-react';

const teamMembers = [
  {
    name: "Victoria Oladosu",
    role: "Founder, Lead Community manager",
    image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Oladosu_Victoria_dpc5be.jpg",
    country: "Nigerian"
  },
  {
    name: "Dosunmu Aishat",
    role: "Programs, Community Manager",
    image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Dosunmu_Aeesha_taobia.jpg",
    country: "Nigerian"
  },
  {
    name: "Osaite Emmanuel",
    role: "Lead Designer",
    image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110878/Emmanuel_Osaite_gqhu4f.jpg",
    country: "Nigerian"
  },
  {
    name: "Adegboye Opeyemi",
    role: "Head of Operations, Digital Designer",
    image: "https://res.cloudinary.com/dv7yvatu2/image/upload/v1766044618/Adegboye_Opeyemi_xukkuc.jpg",
    country: "Nigerian"
  },
  {
    name: "Temitope Abike",
    role: "Content Specialist",
    image: "https://trainings.producthubafrica.org/wp-content/uploads/2024/10/PHA-logo-160x54.png",
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
        className="w-full pt-[140px] md:pt-[220px] pb-0 md:pb-[140px]"
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
              </Reveal>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 relative">
              <Reveal width="100%" delay={0.2}>
                <div className="relative rounded-xl md:rounded-[32px] overflow-hidden border border-gray-100">
                   <img 
                     src="https://res.cloudinary.com/dv7yvatu2/image/upload/v1767110880/PHA_Hero_ABout_dcngjb.png" 
                     alt="About PHA" 
                     loading="eager"
                     fetchPriority="high"
                     className="w-full h-auto object-cover" 
                   />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Section - pt-5 on mobile to provide 20px gap from hero image */}
      <section className="bg-white pt-5 md:pt-[120px] pb-[60px] md:pb-[120px]">
         <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="lg:w-1/2">
              <Reveal width="100%" direction="right" className="h-full">
                <div className="relative h-full min-h-[300px] md:min-h-[400px]">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800" loading="lazy" alt="African Tech Team" className="rounded-xl md:rounded-[40px] w-full h-full object-cover border border-gray-50" />
                </div>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal width="100%">
                <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6 md:mb-8`}>Our Mission and Vision</h2>
                
                <div className="mb-8 md:mb-10 space-y-6">
                    <p className={`${TYPOGRAPHY.body02}`}>
                      Our mission is to foster a thriving community of tech enthusiasts who are passionate about creating scalable, user-centered products that drive positive change not only in Africa but also beyond.
                    </p>
                    <p className={`${TYPOGRAPHY.body02}`}>
                      Our vision is to be the leading community in Africa, spearheading innovation and excellence in product development. We aspire to create a vibrant and inclusive ecosystem where diverse talents come together.
                    </p>
                </div>

                <div className="p-6 md:p-8 bg-blue-50/50 border-l-4 border-[#135291] rounded-r-xl">
                  <p className="text-[#08223d] italic text-base md:text-lg leading-relaxed font-medium">
                    "By fostering a culture of collaboration and continuous learning, we envision a future where African tech products and solutions make a significant impact on a global scale."
                  </p>
                </div>
              </Reveal>
            </div>
         </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-[60px] md:py-[120px] bg-[#f8fafc]">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Card 1: CTA Card */}
              <div className="bg-[#135291] rounded-xl md:rounded-[32px] p-8 md:p-10 flex flex-col justify-center text-white h-full min-h-[400px]">
                <h2 className="text-3xl font-bold mb-6">Community & Impact</h2>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  We are a dedicated non-profit organization and ed-tech community. Our team of passionate volunteers works tirelessly to empower African talent through world-class education and mentorship.
                </p>
                <div>
                  <button 
                    onClick={scrollToVolunteer}
                    className="bg-white text-[#135291] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center group"
                  >
                    Join the team <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Team Member Cards */}
              {teamMembers.map((member, index) => (
                 <div key={index} className="bg-white rounded-xl md:rounded-[24px] overflow-hidden border border-gray-100 flex flex-col h-full transition-all hover:border-[#135291]/30">
                    <div className="h-[400px] overflow-hidden relative bg-gray-50 flex items-center justify-center">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        loading="lazy"
                        className={`w-full h-full ${
                          member.name === "Temitope Abike" 
                            ? "object-contain p-20" 
                            : "object-cover object-top"
                        }`} 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                    
                    <div className="p-5 bg-white flex-grow flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div className="pr-2">
                          <h3 className="text-lg font-bold text-[#08223d] mb-0.5">{member.name}</h3>
                          <p className="text-xs text-[#135291] font-bold uppercase tracking-wider">{member.role}</p>
                        </div>
                        
                        <div className="flex space-x-1 shrink-0 pt-1">
                          <a href="#" className="text-gray-400 hover:text-[#135291] transition-colors p-1.5" aria-label="LinkedIn">
                            <Linkedin size={16} />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-black transition-colors p-1.5" aria-label="Twitter">
                            <Twitter size={16} />
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

      {/* Volunteer Section */}
      <section id="volunteer-section" className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              {/* Left Text */}
              <div className="lg:w-1/2">
                <span className="text-[#daa728] font-bold tracking-widest uppercase text-xs mb-4 block">Join Our Mission</span>
                <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6`}>Volunteer with us</h2>
                <p className={`${TYPOGRAPHY.body02} text-gray-600 mb-8`}>
                  At Product Hub Africa, we believe in the power of giving back. If you have a desire to contribute to the community and make a meaningful impact, we invite you to join our volunteer program.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#135291] shrink-0">
                       <Briefcase size={22} />
                     </div>
                     <div>
                       <h4 className="font-bold text-[#08223d] text-lg mb-1">Gain Experience</h4>
                       <p className="text-sm text-gray-500 leading-relaxed">Work on real-world projects, collaborate with cross-functional teams, and build a portfolio that stands out.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#135291] shrink-0">
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
                <div className="bg-[#135291] rounded-xl md:rounded-[32px] p-6 md:p-12 text-white relative overflow-hidden">
                  <h3 className="text-2xl font-bold mb-2 relative z-10">Volunteer Form</h3>
                  <p className="text-blue-200 mb-8 text-sm relative z-10">We'll review your application and get back to you.</p>
                  
                  <form className="space-y-5 relative z-10">
                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Full Name</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Email</label>
                      <input type="email" placeholder="email@address.com" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Department</label>
                        <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#daa728] appearance-none cursor-pointer">
                          <option className="text-gray-800">Select Dept</option>
                          <option className="text-gray-800">Programs</option>
                          <option className="text-gray-800">Design</option>
                          <option className="text-gray-800">Technical</option>
                          <option className="text-gray-800">Community</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Experience</label>
                        <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#daa728] appearance-none cursor-pointer">
                          <option className="text-gray-800">Select level</option>
                          <option className="text-gray-800">0 - 1 Year</option>
                          <option className="text-gray-800">1 - 3 Years</option>
                          <option className="text-gray-800">3+ Years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Motivation</label>
                      <textarea rows={3} placeholder="Why volunteer?" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-[#daa728] transition-all resize-none"></textarea>
                    </div>

                    <div className="pt-2">
                      <button type="submit" className="w-full bg-[#daa728] text-[#08223d] font-bold px-6 py-4 rounded-xl hover:bg-white transition-all flex justify-center items-center">
                        Submit Application
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
