import React, { useState } from 'react';
import { FAQS } from '../constants';
import { SectionWrapper, SectionHeading } from './ui/Common';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-navy-900/50">
      <SectionHeading title="Frequently Asked Questions" />
      
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
            <button 
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full p-5 text-left flex items-center justify-between focus:outline-none"
            >
              <span className="font-medium text-white text-lg">{faq.question}</span>
              {activeIndex === index ? <Minus className="text-cyan-400" /> : <Plus className="text-gray-400" />}
            </button>
            
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-5 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FAQ;
