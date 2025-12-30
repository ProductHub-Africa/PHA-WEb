
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY } from '../../constants';
import { BookOpen, Code, Layout, ShieldCheck, Database, Palette } from 'lucide-react';

interface MegaMenuProps {
  onItemClick?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onItemClick }) => {
  const courses = [
    { title: 'Product Management', id: 'product-management', icon: <Layout size={20} />, version: '2.5' },
    { title: 'Product Design', id: 'product-design', icon: <Palette size={20} />, version: '2.5' },
    { title: 'Data Analytics', id: 'data-analytics', icon: <Database size={20} />, version: '2.5' },
    { title: 'Cybersecurity', id: 'cybersecurity', icon: <ShieldCheck size={20} />, version: '2.5' },
    { title: 'Technical Writing', id: 'technical-writing', icon: <BookOpen size={20} />, version: '2.5' },
    { title: 'Software Engineering', id: 'software-engineering', icon: <Code size={20} />, version: '2.5' },
  ];

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white z-50 rounded-2xl border border-gray-200 p-8 overflow-hidden shadow-2xl animate-fade-in">
      <div className="grid grid-cols-12 gap-10">
        
        {/* Intro Section */}
        <div className="col-span-12 md:col-span-4 bg-[#f8fafc] -m-8 p-8 flex flex-col justify-center border-r border-gray-100">
          <h3 
            className={`${TYPOGRAPHY.header03} font-bold mb-3`}
            style={{ color: COLORS.primary[700] }}
          >
            Explore Bootcamps
          </h3>
          <p className={`${TYPOGRAPHY.body01} text-gray-500 mb-6`}>
            Accelerate your career with our hands-on 6-week programs led by industry experts.
          </p>
          <Link 
            to="/bootcamps" 
            className="font-bold hover:underline inline-flex items-center transition-all hover:gap-2"
            style={{ color: COLORS.primary[500] }}
            onClick={onItemClick}
          >
            View All Programs &rarr;
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-2">
          {courses.map((course, index) => (
            <Link 
              key={index} 
              to={`/bootcamps/${course.id}`}
              className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
              onClick={onItemClick}
            >
              <div 
                className="p-3 rounded-full shrink-0 mt-1 transition-all group-hover:scale-110"
                style={{ backgroundColor: COLORS.primary[50], color: COLORS.primary[600] }}
              >
                {course.icon}
              </div>
              <div>
                <h4 className={`${TYPOGRAPHY.bodySmall01} font-bold text-gray-900 group-hover:text-[#114b84]`}>
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
