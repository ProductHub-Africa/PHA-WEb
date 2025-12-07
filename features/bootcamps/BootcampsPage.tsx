import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { Calendar, Clock, Monitor, Check, ArrowLeft, Shield, Lock } from 'lucide-react';

const courses = [
  { 
    id: 'product-management',
    title: 'Product Management', 
    desc: 'Learn to define, manage, and ship world-class products. Master the entire product lifecycle from ideation to launch.',
    details: '6 Weeks • Weekends • Live',
    price: '₦150,000',
    outcomes: [
      'Master the Product Development Lifecycle (PDLC)',
      'Learn user research and persona creation',
      'Create product roadmaps and strategy documents',
      'Understand agile methodologies and Scrum',
      'Work with cross-functional teams (Engineering, Design)',
      'Build a comprehensive portfolio project'
    ]
  },
  { 
    id: 'product-design',
    title: 'Product Design (UI/UX)', 
    desc: 'Master the art of user-centric design and prototyping. Create beautiful, functional interfaces that users love.',
    details: '6 Weeks • Weekends • Live',
    price: '₦150,000',
    outcomes: [
      'Master Figma for UI Design and Prototyping',
      'Conduct User Research and Usability Testing',
      'Create Wireframes and High-Fidelity Mockups',
      'Understand Design Systems and Typography',
      'Learn Accessibility standards (WCAG)',
      'Design a complete mobile app or website case study'
    ]
  },
  { 
    id: 'cybersecurity',
    title: 'Cybersecurity', 
    desc: 'Protect digital assets with defensive security strategies. Learn to identify vulnerabilities and secure networks.',
    details: '6 Weeks • Weekends • Live',
    price: '₦200,000',
    outcomes: [
      'Understand Network Security fundamentals',
      'Learn Penetration Testing and Ethical Hacking',
      'Master Risk Assessment and Compliance',
      'Secure Web Applications against OWASP Top 10',
      'Incident Response and Threat Analysis',
      'Hands-on labs with real-world scenarios'
    ]
  },
  { 
    id: 'data-analytics',
    title: 'Data Analytics', 
    desc: 'Turn raw data into actionable business insights. Master tools like Excel, SQL, and Power BI.',
    details: '6 Weeks • Weekends • Live',
    price: '₦180,000',
    outcomes: [
      'Master Data Cleaning and Transformation',
      'Advanced Excel and Spreadsheet modeling',
      'SQL for Database querying',
      'Data Visualization with Power BI or Tableau',
      'Statistical Analysis for Business',
      'Capstone project analyzing real business data'
    ]
  },
  { 
    id: 'technical-writing',
    title: 'Technical Writing', 
    desc: 'Communicate complex technical concepts clearly. Bridge the gap between developers and end-users.',
    details: '4 Weeks • Weekends • Live',
    price: '₦100,000',
    outcomes: [
      'Create API Documentation and User Guides',
      'Master Markdown and Documentation tools',
      'Understand Information Architecture',
      'Edit and Proofread technical content',
      'Collaborate with Engineering teams',
      'Build a portfolio of technical articles and docs'
    ]
  },
  { 
    id: 'software-engineering',
    title: 'Software Engineering', 
    desc: 'Choose between Frontend or Backend Development. Build robust, scalable applications.',
    details: '6 Weeks • Weekends • Live',
    price: '₦200,000',
    outcomes: [
      'Master HTML, CSS, and JavaScript/TypeScript',
      'Frontend with React OR Backend with Node.js',
      'Version Control with Git and GitHub',
      'API Development and Integration',
      'Database Management (SQL/NoSQL)',
      'Deploy full-stack applications'
    ]
  },
];

export const BootcampsPage: React.FC = () => {
  const { courseId } = useParams();
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);

  // Find active course if ID exists
  const activeCourse = courseId ? courses.find(c => c.id === courseId) : null;

  // Render Paystack Modal Simulation
  const PaystackModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsPaystackOpen(false)}></div>
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative z-10 animate-scale-up shadow-2xl">
        <div className="bg-white p-6 border-b border-gray-100 flex justify-between items-center">
           <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" alt="Paystack" className="h-6" />
           <button onClick={() => setIsPaystackOpen(false)}><span className="text-gray-400 font-bold text-xl">&times;</span></button>
        </div>
        <div className="p-8 text-center">
           <p className="text-gray-500 mb-2">{activeCourse?.title} Bootcamp</p>
           <h3 className="text-3xl font-bold text-[#08223d] mb-8">{activeCourse?.price}</h3>
           
           <form className="space-y-4 text-left">
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
               <input type="email" placeholder="example@mail.com" className="w-full border border-gray-300 rounded p-3 text-sm" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
               <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded p-3 text-sm" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded p-3 text-sm" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV</label>
                  <input type="text" placeholder="123" className="w-full border border-gray-300 rounded p-3 text-sm" />
               </div>
             </div>
             <button type="button" className="w-full bg-[#3bb75e] text-white font-bold py-4 rounded hover:bg-[#2fa04e] transition-colors mt-4 flex items-center justify-center gap-2">
               <Lock size={16} /> Pay {activeCourse?.price}
             </button>
           </form>
           
           <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
             <Shield size={12} /> Secured by Paystack
           </div>
        </div>
      </div>
    </div>
  );

  // If Course Detail View
  if (activeCourse) {
    return (
      <div 
        className="w-full pb-[120px] pt-[150px]"
        style={{
          background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
          backgroundSize: '30px 30px, 100% 100%'
        }}
      >
        {isPaystackOpen && <PaystackModal />}
        
        <div className="container mx-auto px-6">
          <Link to="/bootcamps" className="inline-flex items-center text-gray-500 hover:text-[#135291] mb-8 font-medium transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Bootcamps
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Cohort 2.5</span>
              <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>{activeCourse.title}</h1>
              <p className={`${TYPOGRAPHY.body02} text-gray-600 mb-8 text-lg leading-relaxed`}>
                {activeCourse.desc}
              </p>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-12 shadow-sm">
                <h3 className={`${TYPOGRAPHY.header03} mb-6`}>What you will learn</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeCourse.outcomes?.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-600">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-3xl p-8 border border-gray-100">
                <h3 className={`${TYPOGRAPHY.header03} mb-4`}>Prerequisites</h3>
                <p className="text-gray-600">
                  No prior experience required! We start from the basics. All you need is a laptop, internet connection, and the willingness to learn.
                </p>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-28">
                <div className="text-center mb-8">
                  <p className="text-gray-500 text-sm mb-2">Tuition Fee</p>
                  <h2 className="text-4xl font-bold text-[#08223d]">{activeCourse.price}</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-[#daa728]" />
                      <span className="font-medium text-gray-700">Duration</span>
                    </div>
                    <span className="font-bold text-[#08223d]">6 Weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Monitor size={20} className="text-[#daa728]" />
                      <span className="font-medium text-gray-700">Format</span>
                    </div>
                    <span className="font-bold text-[#08223d]">Live Virtual</span>
                  </div>
                </div>

                <Button fullWidth size="lg" onClick={() => setIsPaystackOpen(true)}>Enroll Now</Button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secure payment via Paystack. Installment plans available on request.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Course List View
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
        <div className="text-center mb-20">
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Our Bootcamps</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-3xl mx-auto`}>
            Intensive, hands-on programs designed to take you from beginner to job-ready in weeks.
          </p>
        </div>

        {/* Format Info */}
        <div className="bg-[#fbf6ea] border border-[#eed79c] rounded-3xl p-10 mb-20">
          <h2 className={`${TYPOGRAPHY.header03} text-[#08223d] mb-8 text-center`}>The 6-Week Cohort Format</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#daa728] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                <Monitor size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Live Virtual Classes</h3>
              <p className="text-gray-600">Interactive sessions led by industry experts every weekend.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#daa728] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                <Clock size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Hands-on Projects</h3>
              <p className="text-gray-600">Build a real-world portfolio with weekly practical assignments.</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-[#daa728] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                <Calendar size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3">Mentorship</h3>
              <p className="text-gray-600">Direct access to facilitators and career guidance.</p>
            </div>
          </div>
        </div>

        {/* Course List - No hover effects on cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col">
              <div className="h-56 bg-gray-100 relative">
                 <img src={`https://picsum.photos/seed/${course.id}/400/300`} alt={course.title} className="w-full h-full object-cover" />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#08223d]">
                   {course.price}
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className={`${TYPOGRAPHY.header03} text-[#08223d] mb-3`}>{course.title}</h3>
                <p className={`${TYPOGRAPHY.body01} text-gray-500 mb-6 flex-1`}>{course.desc}</p>
                <div className="text-xs font-bold uppercase tracking-wider text-[#135291] bg-[#e7eef4] inline-block py-2 px-4 rounded-full mb-8 self-start">
                  {course.details}
                </div>
                <Link to={`/bootcamps/${course.id}`}>
                  <Button fullWidth>Enroll Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};