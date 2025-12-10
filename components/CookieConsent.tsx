import React, { useState, useEffect } from 'react';
import { Button } from './Button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pha-cookie-consent');
    if (!consent) {
      // Small delay to ensure main content loads first
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pha-cookie-consent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('pha-cookie-consent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-32px)] max-w-[824px] bg-white border border-gray-200 rounded-[12px] p-4 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] animate-slide-up font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p className="font-bold text-[#08223d] mb-1">We value your privacy</p>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic to better serve our community. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
           <Button 
             variant="outline" 
             size="sm" 
             onClick={handleDecline}
             style={{ borderColor: '#d1d5db', color: '#374151' }}
           >
             Decline
           </Button>
           <Button size="sm" onClick={handleAccept}>Accept Cookies</Button>
        </div>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};