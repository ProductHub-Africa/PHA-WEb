import React from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Reveal } from '../../components/Reveal';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[60px] md:pb-[120px] pt-[140px] md:pt-[200px]"
      style={{
        background: 'linear-gradient(to bottom, #f0f6fa, #ffffff)'
      }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal width="100%" className="mb-16">
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: October 2023</p>
          
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              At Product Hub Africa, accessible from https://producthubafrica.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Product Hub Africa and how we use it.
            </p>
            
            <h3 className="text-[#135291] font-bold text-xl mb-4 mt-8">Information We Collect</h3>
            <p className="mb-6">
              We collect personal information that you voluntarily provide to us when you register for a bootcamp, join our community, or contact us. This may include your name, email address, phone number, and professional details.
            </p>

            <h3 className="text-[#135291] font-bold text-xl mb-4 mt-8">How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, operate, and maintain our website and services</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you regarding updates and marketing</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h3 className="text-[#135291] font-bold text-xl mb-4 mt-8">Third Party Privacy Policies</h3>
            <p className="mb-6">
              Product Hub Africa's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
            </p>

            <h3 className="text-[#135291] font-bold text-xl mb-4 mt-8">Consent</h3>
            <p className="mb-6">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};