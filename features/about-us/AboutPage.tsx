import React from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Reveal } from '../../components/Reveal';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full overflow-hidden font-sans">
      
      {/* Hero Section */}
      <section 
        className="w-full py-[60px] lg:py-[180px]"
        style={{
          background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
          backgroundSize: '30px 30px, 100% 100%'
        }}
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <Reveal width="100%">
              <h1 className={`${TYPOGRAPHY.header01} text-[#135291] mb-8`}>
                Empowering Tech Innovators to Shape the Future.
              </h1>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <p className={`${TYPOGRAPHY.body02} mb-6`}>
                Product Hub Africa is a vibrant community of tech enthusiasts, united by our passion for creating scalable, user-centered products that drive positive change.
              </p>
            </Reveal>
            <Reveal width="100%" delay={0.4}>
              <p className={`${TYPOGRAPHY.body02}`}>
                We are a community of talented product developers, designers, managers, and enthusiasts from diverse backgrounds. Together, we form a dynamic network where ideas collide, collaborations thrive, and innovation flourishes.
              </p>
            </Reveal>
          </div>
          
          {/* Diamond Grid Visualization */}
          <div className="lg:w-1/2 relative min-h-[500px] lg:mt-[60px]">
             {/* Dashed Line SVG path simulation */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 500 400">
               <path d="M100 350 Q 250 350 350 200 T 450 50" fill="none" stroke="#daa728" strokeWidth="2" strokeDasharray="8 8" />
             </svg>
             
             <div className="relative z-10 w-full h-full flex justify-center items-center">
               {/* Images wrapped in rotated divs */}
               <Reveal delay={0.2} className="absolute top-10 right-10 z-10">
                 <div className="w-40 h-40 transform rotate-45 overflow-hidden rounded-xl md:rounded-3xl border-8 border-white shadow-xl">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transform -rotate-45 scale-150" alt="About 1" />
                 </div>
               </Reveal>
               
               <Reveal delay={0.4} className="absolute top-1/2 left-1/4 transform -translate-y-1/2 z-20">
                 <div className="w-48 h-48 rotate-45 overflow-hidden rounded-xl md:rounded-3xl border-8 border-white shadow-xl">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transform -rotate-45 scale-150" alt="About 2" />
                 </div>
               </Reveal>

               <Reveal delay={0.6} className="absolute bottom-10 right-1/3 z-10">
                 <div className="w-40 h-40 rotate-45 overflow-hidden rounded-xl md:rounded-3xl border-8 border-white shadow-xl">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transform -rotate-45 scale-150" alt="About 3" />
                 </div>
               </Reveal>
               
               <Reveal delay={0.8} className="absolute top-20 left-10 z-0">
                  <div className="w-28 h-28 rotate-45 overflow-hidden rounded-xl md:rounded-3xl border-8 border-white shadow-xl opacity-80">
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover transform -rotate-45 scale-150" alt="About 4" />
                 </div>
               </Reveal>
             </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Dark Section */}
      <section className="bg-white py-[60px] md:py-[120px]">
         <div className="container mx-auto px-6 flex flex-col lg:flex-row items-stretch gap-16">
            <div className="lg:w-1/2">
              <Reveal width="100%" direction="right" className="h-full">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" alt="Tunnel Vision" className="rounded-xl md:rounded-3xl shadow-2xl w-full h-full object-cover" />
              </Reveal>
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <Reveal width="100%">
                <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-8`}>Our Mission and Vision</h2>
              </Reveal>
              
              <div className="mb-10">
                <Reveal width="100%" delay={0.2}>
                  <p className={`${TYPOGRAPHY.body02} mb-6`}>
                    Our mission is to foster a thriving community of tech enthusiasts who are passionate about creating scalable, user-centered products that drive positive change not only in Africa but also beyond.
                  </p>
                </Reveal>
                <Reveal width="100%" delay={0.4}>
                  <p className={`${TYPOGRAPHY.body02}`}>
                    Our vision is to be the leading community in Africa, spearheading innovation and excellence in product development. We aspire to create a vibrant and inclusive ecosystem where diverse talents come together.
                  </p>
                </Reveal>
              </div>

              <Reveal width="100%" delay={0.6}>
                <div className="p-5 md:p-8 bg-gray-50 border-l-8 border-[#daa728] rounded-r-xl md:rounded-r-2xl">
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    "By fostering a culture of collaboration and continuous learning, we envision a future where African tech products and solutions make a significant impact on a global scale."
                  </p>
                </div>
              </Reveal>
            </div>
         </div>
      </section>

    </div>
  );
};