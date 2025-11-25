import React from 'react';
import { SectionWrapper, SectionHeading, Button } from './ui/Common';
import { QrCode, ExternalLink } from 'lucide-react';

const TokenPreview = () => {
   return (
      <SectionWrapper id="token" className="bg-navy-900">
         <div className="flex flex-col lg:flex-row items-center gap-16">

            <div className="flex-1">
               <SectionHeading
                  align="left"
                  title="The Vehicle Certificate Token (VCT)"
                  subtitle="More than just a PDF. A living, immutable asset on the Cardano blockchain that proves the vehicle's condition."
               />
               <ul className="space-y-4 mb-8 text-gray-300">
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                     <span>Verifiable on-chain metadata</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                     <span>Timestamped proof of condition</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                     <span>Transferable with vehicle ownership</span>
                  </li>
               </ul>
               <Button variant="secondary" icon={ExternalLink}>View Sample Token</Button>
            </div>

            {/* The NFT Card */}
            <div className="flex-1 flex justify-center">
               <div className="relative w-80 md:w-96 h-[500px] bg-gradient-to-b from-gray-900 to-black rounded-2xl p-1 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,51,173,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-navy-900 rounded-xl overflow-hidden flex flex-col relative">

                     {/* NFT Header Image */}
                     <div className="h-48 bg-gray-800 relative">
                        <img src="/toyota-camry-22.jpg" alt="Car" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-xs text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">
                           ID: #8821A
                        </div>
                     </div>

                     {/* Metadata */}
                     <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <h4 className="text-lg font-bold text-white font-heading">Toyota Camry '22</h4>
                              <p className="text-xs text-gray-500">Policy: 8a72...99b1</p>
                           </div>
                           <div className="text-right">
                              <div className="text-2xl font-bold text-cyan-400 font-heading">94<span className="text-sm text-gray-500">/100</span></div>
                              <div className="text-[10px] text-gray-400 uppercase tracking-wider">Score</div>
                           </div>
                        </div>

                        {/* Damages List */}
                        <div className="space-y-2 mb-4">
                           <div className="flex justify-between text-sm border-b border-white/5 pb-1">
                              <span className="text-gray-400">Front Bumper</span>
                              <span className="text-red-400 font-mono">Scratch (Minor)</span>
                           </div>
                           <div className="flex justify-between text-sm border-b border-white/5 pb-1">
                              <span className="text-gray-400">Left Door</span>
                              <span className="text-green-400 font-mono">Clean</span>
                           </div>
                           <div className="flex justify-between text-sm border-b border-white/5 pb-1">
                              <span className="text-gray-400">Windshield</span>
                              <span className="text-green-400 font-mono">Clean</span>
                           </div>
                        </div>

                        {/* Footer / QR */}
                        <div className="mt-auto pt-4 flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-white p-1 rounded">
                                 <QrCode className="w-full h-full text-black" />
                              </div>
                              <div className="text-[10px] text-gray-500">
                                 Scan to verify<br />on Cardano
                              </div>
                           </div>
                           <div className="h-8 w-8 rounded-full bg-cardano flex items-center justify-center text-white font-bold text-xs">
                              H
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </SectionWrapper>
   );
};

export default TokenPreview;
