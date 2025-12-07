import React from 'react';
import { Button } from '../../components/Button';
import { TYPOGRAPHY } from '../../constants';

export const ContactPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[180px] pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-12 text-center`}>Get in Touch</h1>
          <form className="space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea rows={5} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-[#135291] outline-none transition-all" placeholder="How can we help?"></textarea>
            </div>
            <Button fullWidth size="lg">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};