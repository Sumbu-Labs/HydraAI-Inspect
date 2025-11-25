import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { SectionWrapper, SectionHeading } from './ui/Common';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Process = () => {
  return (
    <SectionWrapper id="process">
      <SectionHeading 
        title="From Photo to Blockchain" 
        subtitle="A seamless flow designed for speed, accuracy, and trust."
      />

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-navy-800 border border-cyan-500/30 flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(70,240,255,0.1)] group hover:border-cyan-400 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-cyan-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cardano text-white flex items-center justify-center text-sm font-bold border border-navy-900">
                    {step.id}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-heading">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>

              {/* Mobile Arrow */}
              {index !== PROCESS_STEPS.length - 1 && (
                <div className="md:hidden my-4 text-gray-600">
                  <ChevronRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Process;
