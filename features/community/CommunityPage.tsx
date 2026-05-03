import React from 'react';
import { Button } from '../../components/Button';
import { TYPOGRAPHY } from '../../constants';
import { Users, MessageCircle, Heart } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[60px] md:pb-[120px] pt-[140px] md:pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Our Pan-African Community</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-2xl mx-auto mb-10`}>
            Join 5,000+ members growing together, sharing opportunities, and building the future.
          </p>
          <Button size="lg">Join Discord Channel</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-5 md:p-10 bg-gray-50 rounded-xl transition-all">
            <Users className="mx-auto text-[#135291] mb-6" size={48} />
            <h3 className="font-bold text-2xl mb-4">Networking</h3>
            <p className="text-gray-500 text-lg">Connect with peers from 20+ African countries.</p>
          </div>
          <div className="text-center p-5 md:p-10 bg-gray-50 rounded-xl transition-all">
            <MessageCircle className="mx-auto text-[#daa728] mb-6" size={48} />
            <h3 className="font-bold text-2xl mb-4">Mentorship</h3>
            <p className="text-gray-500 text-lg">Get guidance from senior professionals in the field.</p>
          </div>
          <div className="text-center p-5 md:p-10 bg-gray-50 rounded-xl transition-all">
            <Heart className="mx-auto text-[#135291] mb-6" size={48} />
            <h3 className="font-bold text-2xl mb-4">Support</h3>
            <p className="text-gray-500 text-lg">A safe space to ask questions and grow.</p>
          </div>
        </div>
      </div>
    </div>
  );
};