import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { Target, Eye, UserPlus, Users, Zap, BookOpen, Layers, Globe, GraduationCap, Briefcase } from 'lucide-react';

const partners = [
  { name: 'WealthWise', color: '#6B46C1' },
  { name: 'STEM-A-SCHOOL BY PHA', color: '#ECC94B' },
  { name: 'Alt_School', color: '#000000' },
  { name: 'Propel', color: '#3182CE' }
];

const courseTracks = [
  { title: 'Product Design', desc: 'Learn to create visually compelling and user-friendly digital products.', active: true },
  { title: 'Product Management', desc: 'Understand how to lead the development of products from conception to launch.', active: false },
  { title: 'Cyber Security', desc: 'Learn about protecting systems, networks, and data from digital attacks.', active: false },
  { title: 'Data Analytics', desc: 'Acquire the skills to collect, process, and analyze data to support decision-making.', active: false },
  { title: 'Technical Writing', desc: 'Develop the ability to communicate complex technical information clearly.', active: false },
  { title: 'Software Development', desc: 'Choose between Backend Development, focusing on server-side logic.', active: false },
];

const whyJoinCards = [
  { title: 'Meaningful Connections', icon: <Users size={24} />, desc: 'Connect with like-minded techies who are as passionate about product development as you are.', color: '#135291' },
  { title: 'Collaborate on projects', icon: <Layers size={24} />, desc: 'Collaboration is at the heart of what we do. As a member of our community, you will have access to exciting opportunities.', color: '#daa728' },
  { title: 'Non-stop Inspiration', icon: <Zap size={24} />, desc: 'Hear inspiring stories and success journeys from accomplished professionals.', color: '#d97706' },
  { title: 'Access to great resources', icon: <BookOpen size={24} />, desc: 'As a member of Product Hub Africa, you will have access to a wealth of resources and tools.', color: '#2a9d8f' },
  { title: 'Community support', icon: <UserPlus size={24} />, desc: 'Experience the power of a supportive community that encourages collaboration and growth.', color: '#3b82f6' },
];

const testimonials = [
  {
    name: 'Omoseyitan Ojomo',
    country: '🇳🇬',
    role: 'Graduate',
    text: 'Every moment of the bootcamp was impactful, helping me achieve my goals and build a strong professional network. I gained skills in prioritization, stakeholder management, and performance metrics analysis.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Efundunni Sowemimo',
    country: '🇳🇬',
    role: 'Lawyer / Newbie in Tech',
    text: 'As a lawyer and a newbie in tech, my most significant highlight was working on the capstone project with my group members, it was a rewarding experience putting all we had learnt to work on a product. It was a great initiative to have a collaborative task.',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Melusi Nyoni',
    country: '🇿🇼',
    role: 'Analyst',
    text: 'Coming from a rough diamond analyst background, my experience with Product Hub was fantastic, I was able to connect with colleagues and like minds and I learnt from industry experts making the whole learning journey enriching.',
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Temitope Dada',
    country: '🇳🇬',
    role: 'Product Manager',
    text: 'It was a wonderful journey, I had no experience whatsoever in Product Management. I learnt a lot and I have been able to connect with like minds and wonderful people and I believe this strategic relationship will enhance my growth.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Geoffrey Logovi',
    country: '🇹🇬',
    role: 'Developer Relations',
    text: 'Joining the bootcamp was transformative. It pushed me daily, expanding my skills in technical writing, creative thinking, and networking, and set a solid path in developer relations.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Nakitha Ineza',
    country: '🇷🇼',
    role: 'Graduate',
    text: 'The Bootcamp was interactive and enjoyable. I loved the group sessions where we tackled projects together, forming friendships. I gained crucial skills in detail, data cleansing, and research.',
    image: 'https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Mutiat Adepoju',
    country: '🇳🇬',
    role: 'Technical Writer',
    text: 'During the technical writing bootcamp, the highlight for me was the invaluable mentorship from our coach, who guided us through every step. I picked up new skills that truly sharpened my writing, and one of my proudest moments was writing the longest article during the program.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Confidence Ezeamaka',
    country: '🇳🇬',
    role: 'Graduate',
    text: 'I would like to emphasize that the Bootcamp was a very interactive and engaging program. I enjoyed the group sessions the most because we got to do hands on projects together, which fostered relationships that is still going on.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Prest Eyituoyor',
    country: '🇳🇬',
    role: 'Graduate',
    text: 'The facilitators were amazing, with a beginner-friendly approach that made learning enjoyable. The dedication of my classmates enriched the experience, and the lessons taught me more in a short time than I\'d imagined possible.',
    image: 'https://images.unsplash.com/photo-1546074177-ffdda98d214f?auto=format&fit=crop&q=80&w=200'
  }
];

export const HomePage: React.FC = () => {
  return (
    <div className="w-full font-sans overflow-x-hidden bg-white">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        /* Pause animation on hover */
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative pt-[180px] pb-[180px]"
        style={{
          background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
          backgroundSize: '30px 30px, 100% 100%'
        }}
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="lg:w-1/2 z-10 text-center lg:text-left">
            <Reveal width="100%">
              <span className="inline-block bg-blue-50 text-[#135291] px-4 py-2 rounded-full font-bold mb-6 tracking-wide text-sm border border-blue-100">
                Build Your Tech Career as a <span className="inline-block transition-all duration-300 border-b-2 border-[#daa728]">Tech Professional</span>
              </span>
            </Reveal>
            
            <Reveal width="100%" delay={0.1}>
              <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-8 leading-[1.1]`}>
                <span className="text-[#135291]">Ignite</span> Your Passion for <span style={{ color: COLORS.teal }}>Tech</span> at Product Hub Africa!
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0`}>
                Learn endlessly and level up your skills through live foundational courses, bootcamps, advanced trainings, refresher courses with real world live projects.
              </p>
            </Reveal>
            
            <Reveal width="100%" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg">Join the community</Button>
                <Button variant="outline" size="lg" style={{ borderColor: '#08223d', color: '#08223d' }}>Partner with us</Button>
              </div>
            </Reveal>
          </div>

          {/* Right Images Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 mt-8 lg:mt-0">
            <Reveal delay={0.2} direction="left" className="w-full">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 1" className="rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl transform hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.3} direction="down" className="w-full">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 2" className="rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.4} direction="up" className="w-full">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 3" className="rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.5} direction="right" className="w-full">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 4" className="rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted Partners - Endless Scroll */}
      <section className="py-[180px] bg-white border-y border-gray-50 overflow-hidden group">
        <div className="container mx-auto px-6 mb-16 text-center">
          <Reveal width="100%">
            <h3 className={`${TYPOGRAPHY.header03} font-bold text-[#08223d] mb-4`}>Our Trusted Partners</h3>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <p className={`${TYPOGRAPHY.body01} text-gray-500 max-w-2xl mx-auto`}>
              We are proud to collaborate with leading organizations and industry experts.
            </p>
          </Reveal>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <div className="flex animate-scroll w-[200%]">
             {/* First Set */}
            <div className="flex justify-around items-center w-1/2 px-4 gap-12">
              {partners.map((p, i) => (
                 <div key={`p1-${i}`} className="font-bold text-2xl md:text-3xl flex items-center gap-4 grayscale opacity-60 shrink-0" style={{ color: p.color }}>
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xs text-gray-300">Logo</div>
                   {p.name}
                 </div>
               ))}
               {/* Add more to fill space if needed */}
               {partners.map((p, i) => (
                 <div key={`p1-dup-${i}`} className="font-bold text-2xl md:text-3xl flex items-center gap-4 grayscale opacity-60 shrink-0" style={{ color: p.color }}>
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xs text-gray-300">Logo</div>
                   {p.name}
                 </div>
               ))}
            </div>
            {/* Second Set (Duplicate for smooth scroll) */}
            <div className="flex justify-around items-center w-1/2 px-4 gap-12">
               {partners.map((p, i) => (
                 <div key={`p2-${i}`} className="font-bold text-2xl md:text-3xl flex items-center gap-4 grayscale opacity-60 shrink-0" style={{ color: p.color }}>
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xs text-gray-300">Logo</div>
                   {p.name}
                 </div>
               ))}
               {partners.map((p, i) => (
                 <div key={`p2-dup-${i}`} className="font-bold text-2xl md:text-3xl flex items-center gap-4 grayscale opacity-60 shrink-0" style={{ color: p.color }}>
                   <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xs text-gray-300">Logo</div>
                   {p.name}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Mission & Vision Section */}
      <section className="py-[180px] bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#08223d] rounded-[40px] p-8 md:p-16 text-white shadow-2xl overflow-hidden relative">
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#135291] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#daa728] rounded-full blur-[80px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Column: Stats & Intro */}
              <div className="flex flex-col justify-center">
                 <Reveal width="100%">
                   <span className="text-[#daa728] font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
                   <h2 className={`${TYPOGRAPHY.header02} text-white mb-8`}>Driving Innovation Across Africa</h2>
                 </Reveal>
                 <Reveal width="100%" delay={0.1}>
                    <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                      We are more than just a tech hub; we are a movement. By connecting talent with opportunity, we are rewriting the narrative of African technology.
                    </p>
                 </Reveal>

                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 gap-6">
                    <Reveal delay={0.2} width="100%">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                         <div className="text-[#daa728] mb-2"><GraduationCap size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">200+</h4>
                         <p className="text-gray-400 text-sm">Students Trained</p>
                      </div>
                    </Reveal>
                    <Reveal delay={0.3} width="100%">
                       <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                         <div className="text-[#daa728] mb-2"><Globe size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">12+</h4>
                         <p className="text-gray-400 text-sm">African Countries</p>
                      </div>
                    </Reveal>
                    <Reveal delay={0.4} width="100%">
                       <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                         <div className="text-[#daa728] mb-2"><Briefcase size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">7+</h4>
                         <p className="text-gray-400 text-sm">Career Paths</p>
                      </div>
                    </Reveal>
                 </div>
              </div>

              {/* Right Column: Mission & Vision Cards */}
              <div className="flex flex-col gap-6 items-stretch">
                <Reveal delay={0.2} width="100%" className="h-full">
                   <div className="bg-white text-[#08223d] p-8 md:p-10 rounded-3xl relative overflow-hidden group h-full">
                      <div className="absolute right-0 top-0 p-6 text-gray-100 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                        <Target size={120} />
                      </div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-[#e7eef4] rounded-full flex items-center justify-center text-[#135291] mb-6">
                          <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                           To empower and inspire tech enthusiasts to create leading products. Whether you're a seasoned professional or just starting, we welcome you to a community that fosters growth.
                        </p>
                      </div>
                   </div>
                </Reveal>

                <Reveal delay={0.4} width="100%" className="h-full">
                   <div className="bg-[#135291] text-white p-8 md:p-10 rounded-3xl relative overflow-hidden group border border-white/10 h-full">
                      <div className="absolute right-0 top-0 p-6 text-white opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                        <Eye size={120} />
                      </div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#daa728] mb-6 backdrop-blur-md">
                          <Eye size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-blue-100 leading-relaxed font-medium">
                           We aspire to create a vibrant and inclusive ecosystem where diverse talents come together, share ideas, and contribute to the growth and transformation of the tech landscape.
                        </p>
                      </div>
                   </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-[180px] bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left Image Card */}
            <div className="lg:w-1/3">
              <Reveal width="100%" className="h-full">
                <div className="bg-[#f4a261] rounded-[32px] relative overflow-hidden min-h-[400px] lg:min-h-[600px] shadow-2xl h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=600" 
                    alt="Thinking Student" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </Reveal>
            </div>

            {/* Right Course Grid */}
            <div className="lg:w-2/3 py-8">
              <Reveal width="100%">
                <h2 className={`${TYPOGRAPHY.header02} text-[#135291] mb-6`}>
                  Get to learn the needed skill to kick start your career in tech
                </h2>
              </Reveal>
              <Reveal width="100%" delay={0.1}>
                <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-12`}>Kick start your career in Tech by joining enrolling in any of our classes in the following tracks</p>
              </Reveal>
              
              <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                {courseTracks.map((track, i) => (
                  <Reveal key={i} width="100%" delay={i * 0.1}>
                    <div 
                      className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer h-full ${
                        track.active 
                          ? 'bg-[#135291] border-[#135291] text-white shadow-xl' 
                          : 'bg-white border-gray-100 text-[#08223d] hover:bg-gray-50 hover:shadow-lg hover:border-gray-200'
                      }`}
                    >
                      <h3 className="font-bold text-xl mb-3">{track.title}</h3>
                      <p className={`text-[15px] leading-relaxed ${track.active ? 'text-blue-100' : 'text-gray-500'}`}>
                        {track.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us - Removed Hover Effects */}
      <section className="py-[180px] bg-[#fafafa]">
        <div className="container mx-auto px-6 text-center">
          <Reveal width="100%">
            <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6`}>Why you should join us?</h2>
          </Reveal>
          <Reveal width="100%" delay={0.1}>
            <p className={`${TYPOGRAPHY.body02} text-gray-500 max-w-3xl mx-auto mb-16`}>
              What makes us unique is our commitment to knowledge sharing and skill development. Through our regular meetups, workshops, and events, we provide a platform for you to learn.
            </p>
          </Reveal>
          
          <div className="flex flex-wrap justify-center gap-8">
            {whyJoinCards.slice(0, 3).map((card, i) => (
               <div key={i} className="w-full md:w-[30%]">
                 <Reveal width="100%" delay={i * 0.2} className="h-full">
                   <div className="border border-gray-100 p-10 rounded-3xl text-left bg-white h-full">
                     <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-opacity-10" style={{ backgroundColor: card.color + '20', color: card.color }}>
                       {card.icon}
                     </div>
                     <h4 className="font-bold text-[#08223d] text-xl mb-4">{card.title}</h4>
                     <p className="text-gray-500 text-[16px] leading-relaxed">{card.desc}</p>
                   </div>
                 </Reveal>
               </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
             {whyJoinCards.slice(3).map((card, i) => (
               <div key={i} className="w-full md:w-[30%]">
                 <Reveal width="100%" delay={(i + 3) * 0.2} className="h-full">
                   <div className="border border-gray-100 p-10 rounded-3xl text-left bg-white h-full">
                     <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-opacity-10" style={{ backgroundColor: card.color + '20', color: card.color }}>
                       {card.icon}
                     </div>
                     <h4 className="font-bold text-[#08223d] text-xl mb-4">{card.title}</h4>
                     <p className="text-gray-500 text-[16px] leading-relaxed">{card.desc}</p>
                   </div>
                 </Reveal>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Grid Layout with New Data */}
      <section className="py-[180px] bg-white">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <h2 className={`${TYPOGRAPHY.header02} font-bold text-center text-[#08223d] mb-4`}>What Our Graduates Are Saying</h2>
            <p className={`${TYPOGRAPHY.body01} text-center text-gray-500 max-w-3xl mx-auto mb-16`}>
              Discover how our alumni across Africa are testifying to the transformative impact of PHA training on their careers.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={i} width="100%" delay={i * 0.05}>
                <div className="relative group rounded-3xl overflow-hidden h-full min-h-[400px]">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-[#daa728]/20 mix-blend-overlay"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div className="mb-2 flex items-center gap-2">
                       <h4 className="font-bold text-xl">{t.name}</h4>
                       <span className="text-xl">{t.country}</span>
                    </div>
                    {/* <p className="text-xs font-bold uppercase tracking-wider text-[#daa728] mb-3">{t.role}</p> */}
                    <p className="text-sm text-gray-200 leading-relaxed opacity-90">
                      {t.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-[180px] bg-white">
        <div className="container mx-auto px-6">
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
      </section>

    </div>
  );
};