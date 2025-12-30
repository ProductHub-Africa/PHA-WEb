import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { TYPOGRAPHY } from '../../constants';
import { Calendar, Clock, Monitor, Check, ArrowLeft, Users, BookOpen, Star, Briefcase } from 'lucide-react';
import { PartnerOverlay } from '../../components/PartnerOverlay';

interface Course {
  id: string;
  title: string;
  desc: string;
  details: string;
  outcomes: string[];
}

const courses: Course[] = [
  { id: 'product-management', title: 'Product Management', desc: 'Master the lifecycle of successful products.', details: '6 Weeks • Weekends • Live', outcomes: ['Strategy', 'Roadmapping', 'Agile'] },
  { id: 'data-analytics', title: 'Data Analytics', desc: 'Turn data into powerful business insights.', details: '6 Weeks • Weekends • Live', outcomes: ['SQL', 'Visualization', 'Python'] },
  { id: 'ui-ux', title: 'UI/UX', desc: 'Design user-centric digital experiences.', details: '6 Weeks • Weekends • Live', outcomes: ['Figma', 'Prototyping', 'UX Research'] },
  { id: 'mobile-dev', title: 'Mobile development', desc: 'Build modern mobile apps.', details: '8 Weeks • Weekends • Live', outcomes: ['React Native', 'Swift', 'Flutter'] },
  { id: 'web-dev', title: 'Web Development', desc: 'Full-stack web solutions.', details: '8 Weeks • Weekends • Live', outcomes: ['React', 'NodeJS', 'CSS'] },
  { id: 'virtual-assistance', title: 'Virtual/Assistance', desc: 'Essential digital administrative support.', details: '4 Weeks • Weekends • Live', outcomes: ['Admin', 'CRM', 'Communication'] },
  { id: 'qa-testing', title: 'Software Testing / Quality Assurance', desc: 'Ensure software excellence.', details: '6 Weeks • Weekends • Live', outcomes: ['Manual', 'Automation', 'CI/CD'] },
  { id: 'cybersecurity', title: 'Cybersecurity', desc: 'Protect systems and data.', details: '6 Weeks • Weekends • Live', outcomes: ['Network', 'Defense', 'Hacking'] },
  { id: 'business-analytics', title: 'Business Analytics', desc: 'Solve business problems with data.', details: '6 Weeks • Weekends • Live', outcomes: ['Modeling', 'Forecasting', 'Strategy'] }
];

const mentors = [
  { name: 'Oluyomi Olushola', role: 'Product Manager', company: 'Unifonic Dubai', image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767125527/Olushola_Oluyomi_Micheal_z0wy0m.png' },
  { name: 'Adegboye Opeyemi', role: 'UI/UX Engineer AI', company: 'Techlerator UK', image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767125522/adegboye_opeyemi_ninaao.png' },
  { name: 'Innocent Ugochukwu', role: 'Programs Manager', company: 'Product Hub Africa', image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767125526/inncoent_Ugochukwu_u3yumx.png' },
  { name: 'Blessing Iyare', role: 'Lead Project Coordinator', company: 'Ei Consulting United States', image: 'https://res.cloudinary.com/dv7yvatu2/image/upload/v1767127118/Blessing_Iyare_r0xpdb.jpg' }
];

export const BootcampsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const activeCourse = courseId ? courses.find(c => c.id === courseId) : null;
  const displayCourses = activeCourse ? [activeCourse] : courses;

  return (
    <div className="w-full bg-white pt-[120px] md:pt-[180px]">
      <div className="container mx-auto px-6">
        <PartnerOverlay isOpen={isPartnerOpen} onClose={() => setIsPartnerOpen(false)} />
        
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          {activeCourse && (
            <Link to="/bootcamps" className="inline-flex items-center text-[#135291] font-bold mb-6 hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to all courses
            </Link>
          )}
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>
            {activeCourse ? activeCourse.title : 'Intensive Cohort-Based Learning'}
          </h1>
          <p className={`${TYPOGRAPHY.body02} text-gray-500`}>
            Our curriculum is built on industry standards and taught by active professionals. Get hands-on with live projects and peer reviews.
          </p>
        </div>

        {/* Highlight Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Live Sessions', icon: <Monitor size={20} /> },
            { label: 'Project Based', icon: <Briefcase size={20} /> },
            { label: 'Job Support', icon: <Users size={20} /> },
            { label: 'Certification', icon: <Star size={20} /> }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-[#135291]">{item.icon}</div>
              <span className="font-bold text-sm text-[#08223d]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {displayCourses.map((course) => (
             <div key={course.id} className="bg-white card-radius border border-gray-100 flex flex-col h-full hover:border-[#135291] transition-all overflow-hidden shadow-none">
               <div className="p-6 md:p-8 flex-grow">
                 <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#135291] mb-6">
                    <BookOpen size={20} />
                 </div>
                 <h3 className="font-bold text-xl text-[#08223d] mb-3">{course.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed mb-6">{course.desc}</p>
                 
                 <div className="flex flex-wrap gap-2 mb-6">
                   <div className="flex items-center text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                     <Calendar size={12} className="mr-1.5" /> {course.details.split('•')[0].trim()}
                   </div>
                   <div className="flex items-center text-[11px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                     <Clock size={12} className="mr-1.5" /> Weekends
                   </div>
                 </div>

                 <div className="space-y-3">
                   {course.outcomes.map((outcome, idx) => (
                     <div key={idx} className="flex items-start text-xs text-gray-600">
                       <Check size={14} className="text-[#3bb75e] mr-2 shrink-0 mt-0.5" />
                       <span>{outcome}</span>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="p-6 border-t border-gray-50">
                 <Button fullWidth>Enroll Now</Button>
               </div>
             </div>
          ))}
        </div>

        {/* Meet Your Mentors */}
        <section className="py-20 border-t border-gray-50">
          <div className="text-center mb-16">
            <h2 className={`${TYPOGRAPHY.header02} text-[#08223d] mb-4`}>Learn from Industry Experts</h2>
            <p className="text-gray-500">Mentors with experience from Africa's top unicorns and global tech firms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {mentors.map((mentor, i) => (
              <div key={i} className="text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border border-gray-100 mb-6 group-hover:border-[#135291] transition-colors">
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <h4 className="font-bold text-base md:text-lg text-[#08223d]">{mentor.name}</h4>
                <p className="text-xs md:text-sm text-[#135291] font-medium">{mentor.role}</p>
                <p className="text-[10px] md:text-xs text-gray-400 mt-1 uppercase tracking-wider">{mentor.company}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16 pb-20">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-12"
              onClick={() => setIsPartnerOpen(true)}
            >
              Become a Mentor
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};