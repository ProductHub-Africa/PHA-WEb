import React from 'react';
import { TYPOGRAPHY } from '../../constants';

export const BlogPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[180px] pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-16 text-center`}>Latest Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
              <img src={`https://picsum.photos/400/250?random=${i}`} alt="Blog Post" className="w-full h-56 object-cover" />
              <div className="p-8">
                <span className="text-xs font-bold text-[#daa728] uppercase tracking-wider">Tech Trend</span>
                <h3 className="font-bold text-xl mt-3 mb-4 text-[#08223d]">The Future of Product Management in Africa</h3>
                <p className="text-gray-500 text-base mb-6">Exploring how the landscape is changing for digital builders...</p>
                <a href="#" className="text-[#135291] font-bold text-sm hover:underline">Read Article</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};