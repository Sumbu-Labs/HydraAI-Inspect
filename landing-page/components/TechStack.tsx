import React from 'react';
import { SectionWrapper, SectionHeading, GlassCard } from './ui/Common';
import { Cpu, Database, Network, Lock, Code, Box } from 'lucide-react';

const TechStack = () => {
   return (
      <SectionWrapper id="tech">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* AI Column */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
                  <Cpu className="text-cyan-400" /> The AI Engine
               </h3>
               <GlassCard className="h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                     <Code size={100} />
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div className="flex items-start gap-4">
                        <div className="bg-blue-500/20 p-2 rounded text-blue-400"><Cpu size={24} /></div>
                        <div>
                           <h4 className="text-white font-bold text-lg">YOLO11m Fine-Tuned</h4>
                           <p className="text-gray-400 text-sm mt-1">State-of-the-art object detection model specifically trained on 50k+ vehicle damage datasets.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-blue-500/20 p-2 rounded text-blue-400"><Database size={24} /></div>
                        <div>
                           <h4 className="text-white font-bold text-lg">Supported Detection</h4>
                           <div className="flex flex-wrap gap-2 mt-2">
                              {['Shattered Glass', 'Flat Tire', 'Broken Lamp', 'Dent', 'Scratch', 'Crack'].map(tag => (
                                 <span key={tag} className="text-xs px-2 py-1 rounded bg-blue-900/50 border border-blue-500/30 text-blue-200 font-mono">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </GlassCard>
            </div>

            {/* Blockchain Column */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
                  <Network className="text-cardano" /> The Blockchain Layer
               </h3>
               <GlassCard className="h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                     <Box size={100} />
                  </div>
                  <div className="space-y-6 relative z-10">
                     <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2 rounded text-indigo-400"><Network size={24} /></div>
                        <div>
                           <h4 className="text-white font-bold text-lg">Cardano Hydra L2</h4>
                           <p className="text-gray-400 text-sm mt-1">Isomorphic state channels enable high throughput and low latency for enterprise-grade inspection batches.</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-indigo-500/20 p-2 rounded text-indigo-400"><Lock size={24} /></div>
                        <div>
                           <h4 className="text-white font-bold text-lg">CIP-68 Standard</h4>
                           <p className="text-gray-400 text-sm mt-1">Utilizes the advanced metadata standard for rich, updatable NFTs that represent the vehicle's living history.</p>
                        </div>
                     </div>
                  </div>
               </GlassCard>
            </div>

         </div>
      </SectionWrapper>
   );
};

export default TechStack;
