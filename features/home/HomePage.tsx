import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { CommunityOverlay } from '../../components/CommunityOverlay';
import { TYPOGRAPHY } from '../../constants';
import { Target, Eye, UserPlus, Users, Zap, BookOpen, Layers, Globe, GraduationCap, Briefcase, Quote } from 'lucide-react';

const partners = [
  { name: 'Alt_School', logo: 'https://lh3.googleusercontent.com/d/1pjaKvAb9hsaVAzjXAvciE-u_ZLnOYlm-' },
  { name: 'Propel', logo: 'https://lh3.googleusercontent.com/d/10DVZAwYsSJnnuVe27N2T8dSuGD2JemO3' },
  { name: 'STEM-A-SCHOOL BY PHA', logo: 'https://lh3.googleusercontent.com/d/1iPIpRNiMc4Qjq7SMJU0roYvq3uEcFCqM' },
  { name: 'WealthWise', logo: 'https://lh3.googleusercontent.com/d/1LKECFqvh__m-a405bDymwcVZvkhiaVbw' }
];

const courseTracks = [
  { title: 'Product Design', desc: 'Learn to create visually compelling and user-friendly digital products.', active: false },
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
    countryCode: 'ng',
    role: 'Graduate',
    text: 'Every moment of the bootcamp was impactful, helping me achieve my goals and build a strong professional network. I gained skills in prioritization, stakeholder management, and performance metrics analysis.',
    image: 'https://lh3.googleusercontent.com/d/1eVM5fsnfE2Ox_gwjSs01xPlpltRmjIHu'
  },
  {
    name: 'Efundunni Sowemimo',
    countryCode: 'ng',
    role: 'Lawyer / Newbie in Tech',
    text: 'As a lawyer and a newbie in tech, my most significant highlight was working on the capstone project with my group members, it was a rewarding experience putting all we had learnt to work on a product. It was a great initiative to have a collaborative task.',
    image: 'https://lh3.googleusercontent.com/d/1ZIMVu_9DgCgRndNcKWgYo0cdNmbEyysG'
  },
  {
    name: 'Melusi Nyoni',
    countryCode: 'zw',
    role: 'Analyst',
    text: 'Coming from a rough diamond analyst background, my experience with Product Hub was fantastic, I was able to connect with colleagues and like minds and I learnt from industry experts making the whole learning journey enriching.',
    image: 'https://lh3.googleusercontent.com/d/1yzbVKnVxCiahRnoP30TO-bQtfB_UObUb'
  },
  {
    name: 'Temitope Dada',
    countryCode: 'ng',
    role: 'Product Manager',
    text: 'It was a wonderful journey, I had no experience whatsoever in Product Management. I learnt a lot and I have been able to connect with like minds and wonderful people and I believe this strategic relationship will enhance my growth.',
    image: 'https://lh3.googleusercontent.com/d/1ZIMVu_9DgCgRndNcKWgYo0cdNmbEyysG'
  },
  {
    name: 'Geoffrey Logovi',
    countryCode: 'tg',
    role: 'Developer Relations',
    text: 'Joining the bootcamp was transformative. It pushed me daily, expanding my skills in technical writing, creative thinking, and networking, and set a solid path in developer relations.',
    image: 'https://lh3.googleusercontent.com/d/1s0UG5o87SfxNU-Qwjqz0AdSMvNmQjbOv'
  },
  {
    name: 'Nakitha Ineza',
    countryCode: 'rw',
    role: 'Graduate',
    text: 'The Bootcamp was interactive and enjoyable. I loved the group sessions where we tackled projects together, forming friendships. I gained crucial skills in detail, data cleansing, and research.',
    image: 'https://lh3.googleusercontent.com/d/1khcuK81pTly0UTMVBp4Rx-ojouHF0nFp'
  },
  {
    name: 'Mutiat Adepoju',
    countryCode: 'ng',
    role: 'Technical Writer',
    text: 'During the technical writing bootcamp, the highlight for me was the invaluable mentorship from our coach, who guided us through every step. I picked up new skills that truly sharpened my writing, and one of my proudest moments was writing the longest article during the program.',
    image: 'https://lh3.googleusercontent.com/d/1v3LZ2nKbF4_R0JAcaRpQ57CJ4CDnYKTv'
  },
  {
    name: 'Confidence Ezeamaka',
    countryCode: 'ng',
    role: 'Graduate',
    text: 'I would like to emphasize that the Bootcamp was a very interactive and engaging program. I enjoyed the group sessions the most because we got to do hands on projects together, which fostered relationships that is still going on.',
    image: 'https://lh3.googleusercontent.com/d/1RfKnNzfJtFpBr0T70q3A8SudX3HVjWSK'
  },
  {
    name: 'Prest Eyituoyor',
    countryCode: 'ng',
    role: 'Graduate',
    text: 'The facilitators were amazing, with a beginner-friendly approach that made learning enjoyable. The dedication of my classmates enriched the experience, and the lessons taught me more in a short time than I\'d imagined possible.',
    image: 'https://lh3.googleusercontent.com/d/1IA3PTO9nVaCmAwHQ8q45DB-SRtdhXpaa'
  }
];

export const HomePage: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
  // Typewriter Effect State
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = ["Tech Professional", "Product Designer", "Product Manager", "Software Engineer", "Data Analyst", "Technical Writer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setTimeout(() => {
      tick();
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed(75);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    } else {
        if(!isDeleting) setTypingSpeed(150);
    }
  };

  return (
    <div className="w-full font-sans overflow-x-hidden bg-white">
      <CommunityOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
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
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.7s step-end infinite;
        }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-flow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative pt-[110px] pb-[60px] md:py-[180px]"
        style={{
          background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
          backgroundSize: '30px 30px, 100% 100%'
        }}
      >
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <Reveal width="100%" className="lg:w-1/2 z-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center justify-center lg:justify-start bg-blue-50 text-[#135291] px-4 py-2 rounded-full font-bold mb-6 mt-3 tracking-wide text-[11px] sm:text-xs md:text-sm border border-blue-100 whitespace-nowrap">
                Build Your Tech Career as a <span className="inline-block transition-all duration-300 ml-1 overflow-hidden align-bottom">
                  {text}
                  <span className="animate-blink border-r-2 border-[#daa728] ml-0.5">&nbsp;</span>
                </span>
              </span>
            </div>
            
            <div>
              <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-8 leading-[1.1]`}>
                <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#135291] via-[#00c6ff] to-[#135291]">Ignite</span> Your Passion for <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#2a9d8f] via-[#00ffcc] to-[#2a9d8f]">Tech</span> at Product Hub Africa!
              </h1>
            </div>

            <div>
              <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0`}>
                Learn endlessly and level up your skills through live foundational courses, bootcamps, advanced trainings, refresher courses with real world live projects.
              </p>
            </div>
            
            <div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" onClick={() => setIsOverlayOpen(true)}>Join Our Community</Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  style={{ borderColor: '#08223d', color: '#08223d' }}
                  onClick={() => window.location.href = 'mailto:producthubafrica@gmail.com?subject=Partnership with Product Hub Africa'}
                >
                  Partner with us
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Right Images Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-0">
            <Reveal delay={0.2} direction="left" className="w-full">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 1" className="rounded-xl md:rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl transform hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.3} direction="down" className="w-full">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 2" className="rounded-xl md:rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.4} direction="up" className="w-full">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 3" className="rounded-xl md:rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.5} direction="right" className="w-full">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=600" alt="Tech 4" className="rounded-xl md:rounded-3xl object-cover w-full h-40 sm:h-56 md:h-72 shadow-xl hover:scale-[1.02] transition-transform duration-700" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted Partners - Endless Scroll - Removed Reveal */}
      <section className="py-[60px] md:py-[100px] bg-white border-y border-gray-50 overflow-hidden group">
        <div className="container mx-auto px-6 mb-16 text-center">
          <div>
            <h3 className={`${TYPOGRAPHY.header03} font-bold text-[#08223d] mb-4`}>Our Trusted Partners</h3>
            <p className={`${TYPOGRAPHY.body01} text-gray-500 max-w-2xl mx-auto`}>
              We are proud to collaborate with leading organizations and industry experts.
            </p>
          </div>
        </div>
        
        <div className="w-full overflow-hidden relative">
          <div className="flex animate-scroll w-max" style={{ willChange: 'transform' }}>
             {/* First Set */}
            <div className="flex items-center gap-12 px-6">
              {partners.map((p, i) => (
                 <div key={`p1-${i}`} className="flex items-center justify-center shrink-0 min-w-[150px] opacity-70 hover:opacity-100 transition-opacity duration-300">
                   <img 
                     src={p.logo} 
                     alt={p.name} 
                     loading="lazy"
                     className="h-12 md:h-16 w-auto object-contain" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
               ))}
               {partners.map((p, i) => (
                 <div key={`p1-dup-${i}`} className="flex items-center justify-center shrink-0 min-w-[150px] opacity-70 hover:opacity-100 transition-opacity duration-300">
                   <img 
                     src={p.logo} 
                     alt={p.name} 
                     loading="lazy"
                     className="h-12 md:h-16 w-auto object-contain" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
               ))}
            </div>
            {/* Second Set (Duplicate for smooth scroll) */}
            <div className="flex items-center gap-12 px-6">
               {partners.map((p, i) => (
                 <div key={`p2-${i}`} className="flex items-center justify-center shrink-0 min-w-[150px] opacity-70 hover:opacity-100 transition-opacity duration-300">
                   <img 
                     src={p.logo} 
                     alt={p.name} 
                     loading="lazy"
                     className="h-12 md:h-16 w-auto object-contain" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
               ))}
               {partners.map((p, i) => (
                 <div key={`p2-dup-${i}`} className="flex items-center justify-center shrink-0 min-w-[150px] opacity-70 hover:opacity-100 transition-opacity duration-300">
                   <img 
                     src={p.logo} 
                     alt={p.name} 
                     loading="lazy"
                     className="h-12 md:h-16 w-auto object-contain" 
                     referrerPolicy="no-referrer"
                   />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Mission & Vision Section */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#08223d] rounded-xl md:rounded-[40px] p-5 md:p-16 text-white shadow-2xl overflow-hidden relative transform-gpu">
            
            {/* Background Decoration - Optimized blurs */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#135291] rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2 will-change-transform"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#daa728] rounded-full blur-[50px] opacity-10 translate-y-1/2 -translate-x-1/2 will-change-transform"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left Column: Stats & Intro */}
              <div className="flex flex-col justify-center">
                 <Reveal width="100%">
                   <span className="text-[#daa728] font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
                   <h2 className={`${TYPOGRAPHY.header02} text-white mb-8`}>Driving Innovation Across Africa</h2>
                    <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                      We are more than just a tech hub; we are a movement. By connecting talent with opportunity, we are rewriting the narrative of African technology.
                    </p>

                   {/* Stats Grid */}
                   <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-xl md:rounded-2xl">
                         <div className="text-[#daa728] mb-2"><GraduationCap size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">200+</h4>
                         <p className="text-gray-400 text-sm">Students Trained</p>
                      </div>
                       <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-xl md:rounded-2xl">
                         <div className="text-[#daa728] mb-2"><Globe size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">12+</h4>
                         <p className="text-gray-400 text-sm">African Countries</p>
                      </div>
                       <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-6 rounded-xl md:rounded-2xl">
                         <div className="text-[#daa728] mb-2"><Briefcase size={28} /></div>
                         <h4 className="text-3xl font-bold mb-1">7+</h4>
                         <p className="text-gray-400 text-sm">Career Paths</p>
                      </div>
                   </div>
                 </Reveal>
              </div>

              {/* Right Column: Mission & Vision Cards */}
              <div className="flex flex-col gap-6 items-stretch">
                <Reveal delay={0.2} width="100%" className="h-full">
                   <div className="bg-white text-[#08223d] p-5 md:p-10 rounded-xl md:rounded-3xl relative overflow-hidden group h-full">
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
                   <div className="bg-[#135291] text-white p-5 md:p-10 rounded-xl md:rounded-3xl relative overflow-hidden group border border-white/10 h-full">
                      <div className="absolute right-0 top-0 p-6 text-white opacity-5 transform group-hover:scale-110 transition-transform duration-500">
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
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left Image Card */}
            <div className="lg:w-1/3">
              <Reveal width="100%" className="h-full">
                <div className="bg-[#f4a261] rounded-xl md:rounded-[32px] relative overflow-hidden min-h-[400px] lg:min-h-[600px] shadow-2xl h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600" 
                    alt="African Tech Professional" 
                    loading="lazy"
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
                <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-12`}>Kick start your career in Tech by joining enrolling in any of our classes in the following tracks</p>
                
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                  {courseTracks.map((track, i) => (
                    <div 
                      key={i}
                      className={`p-5 md:p-8 rounded-xl md:rounded-2xl border transition-all duration-300 cursor-pointer h-full group ${
                        track.active 
                          ? 'bg-[#135291] border-[#135291] text-white shadow-xl' 
                          : 'bg-white border-gray-100 text-[#08223d] hover:bg-[#135291] hover:text-white hover:border-[#135291]'
                      }`}
                    >
                      <h3 className="font-bold text-xl mb-3">{track.title}</h3>
                      <p className={`text-[15px] leading-relaxed ${track.active ? 'text-blue-100' : 'text-gray-500 group-hover:text-blue-100'}`}>
                        {track.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us - Removed Hover Effects */}
      <section className="py-[60px] md:py-[120px] bg-[#fafafa]">
        <div className="container mx-auto px-6 text-center">
          <Reveal width="100%">
            <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6`}>Why you should join us?</h2>
            <p className={`${TYPOGRAPHY.body02} text-gray-500 max-w-3xl mx-auto mb-16`}>
              What makes us unique is our commitment to knowledge sharing and skill development. Through our regular meetups, workshops, and events, we provide a platform for you to learn.
            </p>
          
            <div className="flex flex-wrap justify-center gap-8">
              {whyJoinCards.slice(0, 3).map((card, i) => (
                 <div key={i} className="w-full md:w-[30%]">
                   <div className="border border-gray-100 p-5 md:p-10 rounded-xl md:rounded-3xl text-left bg-white h-full">
                     <div className="w-16 h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 bg-opacity-10" style={{ backgroundColor: card.color + '20', color: card.color }}>
                       {card.icon}
                     </div>
                     <h4 className="font-bold text-[#08223d] text-xl mb-4">{card.title}</h4>
                     <p className="text-gray-500 text-[16px] leading-relaxed">{card.desc}</p>
                   </div>
                 </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-8">
               {whyJoinCards.slice(3).map((card, i) => (
                 <div key={i} className="w-full md:w-[30%]">
                   <div className="border border-gray-100 p-5 md:p-10 rounded-xl md:rounded-3xl text-left bg-white h-full">
                     <div className="w-16 h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 bg-opacity-10" style={{ backgroundColor: card.color + '20', color: card.color }}>
                       {card.icon}
                     </div>
                     <h4 className="font-bold text-[#08223d] text-xl mb-4">{card.title}</h4>
                     <p className="text-gray-500 text-[16px] leading-relaxed">{card.desc}</p>
                   </div>
                 </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials - Grid Layout with Same Height */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <span className="text-[#daa728] font-bold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
              <h2 className={`${TYPOGRAPHY.header02} font-bold text-[#08223d] mb-4`}>What Our Graduates Are Saying</h2>
              <p className={`${TYPOGRAPHY.body01} text-gray-500 max-w-3xl mx-auto`}>
                Discover how our alumni across Africa are testifying to the transformative impact of PHA training on their careers.
              </p>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="h-full bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <img 
                        src={t.image} 
                        alt={t.name} 
                        loading="lazy"
                        className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0D8ABC&color=fff`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-sm overflow-hidden flex items-center justify-center w-6 h-4">
                         <img 
                           src={`https://flagcdn.com/w40/${t.countryCode}.png`} 
                           alt={t.countryCode} 
                           loading="lazy"
                           className="w-full h-full object-cover"
                         />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#08223d] text-sm md:text-base leading-tight">{t.name}</h4>
                      <p className="text-xs text-[#135291] font-medium">{t.role}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex-grow">
                    <Quote size={20} className="text-[#daa728]/30 absolute -top-1 -left-1 transform -scale-x-100" />
                    <p className="text-[14px] text-gray-600 leading-relaxed pl-4 relative z-10 italic">
                      "{t.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Big CTA */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <div className="bg-[#135291] rounded-xl md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto min-h-[500px] transform hover:scale-[1.01] transition-transform duration-500">
              <div className="md:w-1/2 relative h-80 md:h-auto">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" loading="lazy" className="w-full h-full object-cover" alt="Meeting" />
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
      </section>

    </div>
  );
};