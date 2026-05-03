
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button';
import { Reveal } from '../../components/Reveal';
import { CommunityOverlay } from '../../components/CommunityOverlay';
import { PartnerOverlay } from '../../components/PartnerOverlay';
import { TYPOGRAPHY } from '../../constants';
import { Target, Eye, UserPlus, Users, Zap, BookOpen, Layers, Globe, GraduationCap, Quote, ChevronDown, ChevronUp } from 'lucide-react';

const partners = [
  { name: 'Alt_School', logo: 'https://lh3.googleusercontent.com/d/1pjaKvAb9hsaVAzjXAvciE-u_ZLnOYlm-' },
  { name: 'Propel', logo: 'https://logo.clearbit.com/propel.community' },
  { name: 'STEM-A-SCHOOL BY PHA', logo: 'https://lh3.googleusercontent.com/d/1iPIpRNiMc4Qjq7SMJU0roYvq3uEcFCqM' },
  { name: 'WealthWise', logo: 'https://lh3.googleusercontent.com/d/1LKECFqvh__m-a405bDymwcVZvkhiaVbw' }
];

const courseTracks = [
  { title: 'Product Design', desc: 'Learn to create visually compelling and user-friendly digital products.' },
  { title: 'Product Management', desc: 'Understand how to lead the development of products from conception to launch.' },
  { title: 'Cyber Security', desc: 'Learn about protecting systems, networks, and data from digital attacks.' },
  { title: 'Data Analytics', desc: 'Acquire the skills to collect, process, and analyze data to support decision-making.' },
  { title: 'Technical Writing', desc: 'Develop the ability to communicate complex technical information clearly.' },
  { title: 'Software Development', desc: 'Choose between Backend Development, focusing on server-side logic.' },
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
    role: 'Graduate',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'Every moment of the bootcamp was impactful, helping me achieve my goals and build a strong professional network. I gained skills in prioritization, stakeholder management, and performance metrics analysis.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114742/Omoseyitan_Ibiponmisola_Ojomo_cemhrx.png'
  },
  {
    name: 'Efundunni Sowemimo',
    role: 'Lawyer / Newbie in Tech',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'As a lawyer and a newbie in tech, my most significant highlight was working on the capstone project with my group members, it was a rewarding experience putting all we had learnt to work on a product. It was a great initiative to have a collaborative task.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114737/Efundunni_Sowemimo_ra8hgp.png'
  },
  {
    name: 'Melusi Nyoni',
    role: 'Analyst',
    country: 'South Africa',
    company: 'PHA Alumni',
    content: 'Coming from a rough diamond analyst background, my experience with Product Hub was fantastic, I was able to connect with colleagues and like minds and I learnt from industry experts making the whole learning journey enriching.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114738/Melusi_Nyoni_cypzey.png'
  },
  {
    name: 'Temitope Dada',
    role: 'Product Manager',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'It was a wonderful journey, I had no experience whatsoever in Product Management. I learnt a lot and I have been able to connect with like minds and wonderful people and I believe this strategic relationship will enhance my growth.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114737/Efundunni_Sowemimo-1_mxkzll.png'
  },
  {
    name: 'Geoffrey Logovi',
    role: 'Developer Relations',
    country: 'Ghana',
    company: 'PHA Alumni',
    content: 'Joining the bootcamp was transformative. It pushed me daily, expanding my skills in technical writing, creative thinking, and networking, and set a solid path in developer relations.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114737/Geoffrey_Logovi_zginmg.png'
  },
  {
    name: 'Nakitha Ineza',
    role: 'Graduate',
    country: 'Rwanda',
    company: 'PHA Alumni',
    content: 'The Bootcamp was interactive and enjoyable. I loved the group sessions where we tackled projects together, forming friendships. I gained crucial skills in detail, data cleansing, and research.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114741/Nakitha_Ineza_i5amt7.png'
  },
  {
    name: 'Mutiat Adepoju',
    role: 'Technical Writer',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'During the technical writing bootcamp, the highlight for me was the invaluable mentorship from our coach, who guided us through every step. I picked up new skills that truly sharpened my writing, and one of my proudest moments was writing the longest article during the program.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114739/Mutiat_Adepoju_ilo8hu.png'
  },
  {
    name: 'Confidence Ezeamaka',
    role: 'Graduate',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'I would like to emphasize that the Bootcamp was a very interactive and engaging program. I enjoyed the group sessions the most because we got to do hands on projects together, which fostered relationships that is still going on.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114736/Confidence_Ezeamaka_rraogw.png'
  },
  {
    name: 'Prest Eyituoyor',
    role: 'Graduate',
    country: 'Nigeria',
    company: 'PHA Alumni',
    content: 'The facilitators were amazing, with a beginner-friendly approach that made learning enjoyable. The dedication of my classmates enriched the experience, and the lessons taught me more in a short time than I\'d imagined possible.',
    image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767114743/Prest_Eyituoyor_vvk01s.png'
  }
];

const countryFlags: Record<string, string> = {
  'Nigeria': 'https://flagcdn.com/w40/ng.png',
  'South Africa': 'https://flagcdn.com/w40/za.png',
  'Ghana': 'https://flagcdn.com/w40/gh.png',
  'Rwanda': 'https://flagcdn.com/w40/rw.png',
};

export const HomePage: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

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
    if (isDeleting) setTypingSpeed(75);
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

  const LogoComponent = ({ className = "h-[1em] inline-block align-baseline ml-2" }) => (
    <img 
      src="/logo.svg" 
      alt="Product Hub Africa" 
      className={className}
    />
  );

  return (
    <div className="w-full font-sans overflow-x-hidden bg-white">
      <CommunityOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      <PartnerOverlay isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { animation: scroll 15s linear infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 0.7s step-end infinite; }
        @keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-text { background-size: 200% auto; animation: gradient-flow 3s ease-in-out infinite; }
      `}</style>

      {/* Hero Section - Padding set to 140px on desktop */}
      <section className="relative pt-[100px] pb-[100px] md:pt-[140px] md:pb-[200px] bg-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <Reveal width="100%" className="lg:w-[40%] z-10 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center bg-blue-50 text-[#135291] px-4 py-2 rounded-full font-bold mb-6 mt-3 tracking-wide text-xs border border-blue-100">
                Build Your Tech Career as a <span className="inline-block transition-all duration-300 ml-1 overflow-hidden align-bottom">
                  {text}<span className="animate-blink border-r-2 border-[#daa728] ml-0.5">&nbsp;</span>
                </span>
              </span>
            </div>
            <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-8 leading-[1.1]`}>
              <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#135291] via-[#00c6ff] to-[#135291]">Ignite</span> Your Passion for <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-[#2a9d8f] via-[#00ffcc] to-[#2a9d8f]">Tech</span> at <span className="text-[#135291]">Product Hub Africa</span>!
            </h1>
            <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0`}>
              Learn endlessly and level up your skills through live foundational courses, bootcamps, and advanced trainings with real-world projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => setIsOverlayOpen(true)}>Join Our Community</Button>
              <Button variant="outline" size="lg" style={{ borderColor: '#08223d', color: '#08223d' }} onClick={() => setIsPartnerOpen(true)}>Partner with us</Button>
            </div>
          </Reveal>

          <div className="lg:w-[60%] mt-8 lg:mt-0">
             <img 
               src="https://res.cloudinary.com/dv7yvatu2/image/upload/v1767113104/PHA_Hero_Imag_te6vxv.png" 
               alt="Product Hub Africa Hero" 
               className="w-full h-auto object-contain" 
             />
          </div>
        </div>
      </section>

      {/* Trusted Partners - 0px padding on desktop */}
      <section className="py-[60px] md:py-[0px] bg-white border-y border-gray-50 overflow-hidden">
        <div className="w-full overflow-hidden relative">
          <div className="flex animate-scroll w-max items-center">
            <div className="flex items-center gap-[60px] px-6">
              {partners.concat(partners).concat(partners).concat(partners).map((p, i) => (
                <div key={i} className="flex items-center justify-center shrink-0 min-w-[150px] md:min-w-[180px] opacity-70">
                  <img src={p.logo} alt={p.name} className="h-12 md:h-16 w-auto object-contain" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#08223d] card-radius p-6 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="flex flex-col justify-center">
                <span className="text-[#daa728] font-bold tracking-widest uppercase text-xs mb-4 block">Who We Are</span>
                <h2 className={`${TYPOGRAPHY.header02} text-white mb-8`}>Driving Innovation Across Africa</h2>
                <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                  We are more than just a tech hub; we are a movement. By connecting talent with opportunity, we are rewriting the narrative of African technology.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <GraduationCap size={24} className="text-[#daa728] mb-2" />
                    <h4 className="text-2xl font-bold">200+</h4>
                    <p className="text-gray-400 text-xs">Students Trained</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <Globe size={24} className="text-[#daa728] mb-2" />
                    <h4 className="text-2xl font-bold">12+</h4>
                    <p className="text-gray-400 text-xs">Countries</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-white text-[#08223d] p-8 card-radius relative overflow-hidden h-full border border-gray-100">
                  <Target size={32} className="text-[#135291] mb-6" />
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To empower and inspire tech enthusiasts to create leading products through community-led growth and inclusive education.
                  </p>
                </div>
                <div className="bg-[#135291] text-white p-8 card-radius relative overflow-hidden h-full border border-white/10">
                  <Eye size={32} className="text-[#daa728] mb-6" />
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    To be the leading pan-African ecosystem where diverse talents collaborate to solve global challenges with local insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-stretch items-start">
            <div className="lg:w-1/3 w-full">
              <div className="bg-gray-50 card-radius overflow-hidden min-h-[300px] h-full w-full border border-gray-100">
                <img 
                  src="https://res.cloudinary.com/dv7yvatu2/image/upload/v1767113881/Frame_1686560362_1_t50cvz.png" 
                  alt="Tech Skills" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className={`${TYPOGRAPHY.header02} text-[#135291] mb-6`}>Learn the Skills to Start Your Career</h2>
              <p className={`${TYPOGRAPHY.body02} text-gray-500 mb-10`}>Kick start your career in Tech by enrolling in our expert-led bootcamps.</p>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                {courseTracks.map((track, i) => (
                  <div key={i} className="p-6 card-radius border border-gray-100 bg-white hover:border-[#135291] transition-all">
                    <h3 className="font-bold text-lg mb-2">{track.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{track.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-[60px] md:py-[120px] bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-6`}>Why You Should Join Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whyJoinCards.map((card, i) => (
              <div key={i} className="bg-white p-8 card-radius border border-gray-100 text-left">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ backgroundColor: card.color + '15', color: card.color }}>{card.icon}</div>
                <h4 className="font-bold text-lg mb-3">{card.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="mb-3 block text-[#daa728] font-bold tracking-widest uppercase text-xs">Testimonials</span>
            <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-4`}>What Our Graduates Are Saying</h2>
            <p className="text-gray-500 leading-relaxed">Discover how our alumni across Africa are testifying to the transformative impact of PHA training on their careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllTestimonials ? testimonials : testimonials.slice(0, 3)).map((t, i) => (
              <Reveal key={i} delay={i * 0.05} width="100%">
                <div className="p-8 bg-gray-50 card-radius border border-gray-100 relative h-full flex flex-col hover:border-[#daa728] transition-colors group">
                  <div className="text-[#daa728] mb-6 group-hover:scale-110 transition-transform origin-left"><Quote size={32} /></div>
                  <p className="text-gray-600 mb-8 italic leading-relaxed flex-grow">"{t.content}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-[#08223d] text-sm truncate">{t.name}</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{t.role}</p>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        {countryFlags[t.country] && (
                          <img 
                            src={countryFlags[t.country]} 
                            alt={t.country} 
                            title={t.country}
                            className="h-4 w-auto object-contain rounded-sm shadow-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
             <button 
               onClick={() => setShowAllTestimonials(!showAllTestimonials)}
               className="inline-flex items-center gap-2 text-[#135291] font-bold hover:gap-3 transition-all group"
             >
               {showAllTestimonials ? (
                 <>View less <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" /></>
               ) : (
                 <>View more testimonials <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" /></>
               )}
             </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[60px] md:py-[120px] bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#135291] card-radius overflow-hidden flex flex-col md:flex-row h-auto min-h-[400px]">
            <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white">
              <h2 className={`${TYPOGRAPHY.header02} mb-6`}>Ready to Build?</h2>
              <p className="text-blue-100 mb-8 text-lg">Join a community of 5,000+ members and start your journey today.</p>
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="lg" 
                  style={{ borderColor: 'white', color: 'white' }} 
                  onClick={() => setIsOverlayOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Community" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
