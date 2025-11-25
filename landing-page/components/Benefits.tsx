import React from 'react';
import { BENEFITS } from '../constants';
import { SectionWrapper, SectionHeading, GlassCard } from './ui/Common';

const Benefits = () => {
  return (
    <SectionWrapper id="benefits">
      <SectionHeading 
        title="A New Standard for Integrity" 
        subtitle="Whether you are buying, selling, or insuring, HydraAI brings certainty to the process."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((item, index) => (
          <GlassCard key={index} className="hover:bg-white/5 transition-colors">
            <div className="flex items-start gap-4">
               <div className="p-2 bg-cyan-900/20 rounded-lg text-cyan-400">
                  <item.icon size={24} />
               </div>
               <div>
                  <h4 className="text-lg font-bold text-white font-heading mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
               </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Benefits;
