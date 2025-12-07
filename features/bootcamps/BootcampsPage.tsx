import React from 'react';
import { Button } from '../../components/Button';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { Calendar, Clock, Monitor } from 'lucide-react';

const courses = [
  { 
    title: 'Product Management', 
    desc: 'Learn to define, manage, and ship world-class products.',
    details: '6 Weeks • Weekends • Live'
  },
  { 
    title: 'Product Design (UI/UX)', 
    desc: 'Master the art of user-centric design and prototyping.',
    details: '6 Weeks • Weekends • Live'
  },
  { 
    title: 'Cybersecurity', 
    desc: 'Protect digital assets with defensive security strategies.',
    details: '6 Weeks • Weekends • Live'
  },
  { 
    title: 'Data Analytics', 
    desc: 'Turn raw data into actionable business insights.',
    details: '6 Weeks • Weekends • Live'
  },
  { 
    title: 'Technical Writing', 
    desc: 'Communicate complex technical concepts clearly.',
    details: '4 Weeks • Weekends • Live'
  },
];

export const BootcampsPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[180px] pt-[200px]"
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

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-56 bg-gray-200">
                 <img src={`https://picsum.photos/400/300?random=${idx + 10}`} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className={`${TYPOGRAPHY.header03} text-[#08223d] mb-3`}>{course.title}</h3>
                <p className={`${TYPOGRAPHY.body01} text-gray-500 mb-6 flex-1`}>{course.desc}</p>
                <div className="text-xs font-bold uppercase tracking-wider text-[#135291] bg-[#e7eef4] inline-block py-2 px-4 rounded-full mb-8 self-start">
                  {course.details}
                </div>
                <Button fullWidth>Enroll Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};