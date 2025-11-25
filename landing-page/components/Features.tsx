import React from 'react';
import { FEATURES } from '../constants';
import { SectionWrapper, SectionHeading, GlassCard } from './ui/Common';

const Features = () => {
  return (
    <SectionWrapper id="features" className="bg-navy-900/50">
      <SectionHeading 
        title="Why HydraAI Inspect?" 
        subtitle="Combining state-of-the-art computer vision with the most secure and scalable blockchain infrastructure."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <GlassCard key={index} className="group relative overflow-hidden text-center md:text-left">
             <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cardano/0 group-hover:from-cyan-400/5 group-hover:to-cardano/5 transition-all duration-500" />
             
             <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300 mx-auto md:mx-0">
                  <feature.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
             </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Features;
