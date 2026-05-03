import React from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Reveal } from '../../components/Reveal';

const faqs = [
  {
    question: "What is Product Hub Africa?",
    answer: "Product Hub Africa is a community-driven organization focused on empowering tech talents across Africa through education, mentorship, and career development in product management, design, and software engineering."
  },
  {
    question: "Are the bootcamps suitable for beginners?",
    answer: "Yes! Our bootcamps are designed to accommodate various skill levels. We have foundational courses specifically tailored for beginners who are just starting their tech journey."
  },
  {
    question: "Do you offer certificates upon completion?",
    answer: "Yes, upon successful completion of our bootcamps and projects, participants receive a verified certificate from Product Hub Africa."
  },
  {
    question: "Is there a community I can join?",
    answer: "Absolutely. We have a vibrant community of over 5,000 tech enthusiasts on Discord and Slack where we share opportunities, resources, and host events."
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer flexible payment plans for our paid bootcamps to make education accessible to everyone."
  }
];

export const FAQPage: React.FC = () => {
  return (
    <div 
      className="w-full pb-[60px] md:pb-[120px] pt-[140px] md:pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <Reveal width="100%" className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Support</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Frequently Asked Questions</h1>
          <p className={`${TYPOGRAPHY.body02} text-gray-500`}>
            Everything you need to know about our programs and community.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Reveal key={index} width="100%" delay={index * 0.1}>
              <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 transition-all">
                <h3 className={`${TYPOGRAPHY.header03} text-lg mb-3 text-[#08223d]`}>{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};