import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { BookOpen, Code, PenTool, Layout, ShieldCheck, Database } from 'lucide-react';

export const MegaMenu: React.FC = () => {
  const courses = [
    { title: 'Product Management', icon: <Layout size={20} />, version: '2.5' },
    { title: 'Product Design', icon: <PenTool size={20} />, version: '2.5' },
    { title: 'Data Analytics', icon: <Database size={20} />, version: '2.5' },
    { title: 'Cybersecurity', icon: <ShieldCheck size={20} />, version: '2.5' },
    { title: 'Technical Writing', icon: <BookOpen size={20} />, version: '2.5' },
    { title: 'Software Engineering', icon: <Code size={20} />, version: '2.5' },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white shadow-2xl z-50 rounded-2xl border border-gray-100 p-8 overflow-hidden">
      <div className="grid grid-cols-12 gap-10">
        
        {/* Intro Section */}
        <div className="col-span-12 md:col-span-4 bg-[#f8fafc] -m-8 p-8 flex flex-col justify-center">
          <h3 className={`${TYPOGRAPHY.header03} font-bold text-[${COLORS.primary[700]}] mb-3`}>
            Explore Bootcamps
          </h3>
          <p className={`${TYPOGRAPHY.body01} text-gray-500 mb-6`}>
            Accelerate your career with our hands-on 6-week programs led by industry experts.
          </p>
          <Link to="/bootcamps" className={`text-[${COLORS.primary[500]}] font-bold hover:underline inline-flex items-center`}>
            View All Programs &rarr;
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-2">
          {courses.map((course, index) => (
            <Link 
              key={index} 
              to={`/bootcamps/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-blue-50/50 transition-colors"
            >
              <div 
                className="p-3 rounded-full shrink-0 mt-1 transition-colors group-hover:bg-blue-100"
                style={{ backgroundColor: COLORS.primary[50], color: COLORS.primary[600] }}
              >
                {course.icon}
              </div>
              <div>
                <h4 className={`${TYPOGRAPHY.bodySmall01} font-bold text-gray-900 group-hover:text-[${COLORS.primary[600]}]`}>
                  {course.title}
                </h4>
                <span className={`${TYPOGRAPHY.bodySmall02} text-gray-400`}>
                  Cohort v{course.version} Open
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};