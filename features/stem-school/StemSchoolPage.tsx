import React from 'react';
import { TYPOGRAPHY } from '../../constants';

export const StemSchoolPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[180px] pt-[200px] text-center"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>STEM School</h1>
        <p className="text-gray-600 mb-12 text-xl">Programs tailored for younger students (K-12) to ignite passion in Science, Technology, Engineering, and Math.</p>
        <div className="p-16 bg-[#e7eef4] rounded-3xl inline-block">
          <p className="font-bold text-2xl text-[#135291]">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};