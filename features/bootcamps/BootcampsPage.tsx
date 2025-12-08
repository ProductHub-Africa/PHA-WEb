import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TYPOGRAPHY } from '../../constants';
import { Calendar, Clock, Monitor, Check, ArrowLeft, Shield, Lock } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  desc: string;
  details: string;
  price: string;
  outcomes: string[];
}

const courses: Course[] = [
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

interface PaystackModalProps {
  course: Course | undefined;
  onClose: () => void;
}

const PaystackModal: React.FC<PaystackModalProps> = ({ course, onClose }) => (
  <div 
    className="fixed inset-0 z-[100] flex items-center justify-center p-4" 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="modal-title"
  >
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
    <div className="bg-white w-full max-w-md rounded-xl md:rounded-2xl overflow-hidden relative z-10 animate-scale-up shadow-2xl">
      <div className="bg-white p-5 md:p-6 border-b border-gray-100 flex justify-between items-center">
         <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Paystack_Logo.png" alt="Paystack" className="h-6" />
         <button onClick={onClose} aria-label="Close modal"><span className="text-gray-400 font-bold text-xl">&times;</span></button>
      </div>
      <div className="p-5 md:p-8 text-center">
         <p className="text-gray-500 mb-2">{course?.title} Bootcamp</p>
         <h3 id="modal-title" className="text-3xl font-bold text-[#08223d] mb-8">{course?.price}</h3>
         
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
             <Lock size={16} /> Pay {course?.price}
           </button>
         </form>
         <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
           <Shield size={12} /> Secured by Paystack
         </p>
      </div>
    </div>
  </div>
);

export const BootcampsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const activeCourse = courseId ? courses.find(c => c.id === courseId) : null;
  const displayCourses = activeCourse ? [activeCourse] : courses;

  return (
    <div 
      className="w-full pb-[60px] md:pb-[120px] pt-[140px] md:pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {activeCourse && (
            <Link to="/bootcamps" className="inline-flex items-center text-[#135291] font-bold mb-6 hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to all courses
            </Link>
          )}
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>
            {activeCourse ? activeCourse.title : 'Accelerate Your Tech Career'}
          </h1>
          <p className={`${TYPOGRAPHY.body02} text-gray-500`}>
            {activeCourse ? activeCourse.desc : 'Join our intensive, hands-on bootcamps designed to take you from beginner to professional in just weeks.'}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course) => (
             <div key={course.id} className="bg-white rounded-xl md:rounded-[20px] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
               <div className="p-5 md:p-8 pb-0">
                 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#135291] mb-6 group-hover:bg-[#135291] group-hover:text-white transition-colors">
                    <Monitor size={24} />
                 </div>
                 <h3 className="font-bold text-2xl text-[#08223d] mb-3">{course.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed mb-6 h-20 overflow-hidden">{course.desc}</p>
                 
                 <div className="flex flex-wrap gap-3 mb-6">
                   <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                     <Calendar size={12} className="mr-1.5" /> 6 Weeks
                   </div>
                   <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
                     <Clock size={12} className="mr-1.5" /> Weekends
                   </div>
                 </div>

                 <div className="space-y-3 mb-8">
                   {course.outcomes.slice(0, 3).map((outcome, idx) => (
                     <div key={idx} className="flex items-start text-sm text-gray-600">
                       <Check size={16} className="text-[#3bb75e] mr-2 shrink-0 mt-0.5" />
                       <span>{outcome}</span>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="mt-auto p-5 md:p-8 pt-0 border-t border-gray-50">
                 <div className="flex items-end justify-between mb-6 mt-6">
                   <div>
                     <p className="text-xs text-gray-400 font-bold uppercase">Total Fee</p>
                     <p className="text-2xl font-bold text-[#08223d]">{course.price}</p>
                   </div>
                 </div>
                 <Button fullWidth onClick={() => setSelectedCourse(course)}>Enroll Now</Button>
               </div>
             </div>
          ))}
        </div>

      </div>

      {selectedCourse && (
        <PaystackModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};