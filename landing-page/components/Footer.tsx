import React from 'react';
import { Button } from './ui/Common';
import { Github, Twitter, Disc } from 'lucide-react';

const Footer = () => {
   return (
      <footer className="bg-navy-900 pt-20 border-t border-white/10 relative overflow-hidden">

         {/* Decorative Background */}
         <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cardano rounded-full blur-[120px]" />
         </div>

         {/* CTA Section */}
         <div className="max-w-4xl mx-auto text-center px-4 mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
               Ready to modernize vehicle inspection?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button variant="primary" onClick={() => window.open('http://localhost:3001', '_blank')}>Launch App</Button>
               <a href="https://github.com/Sumbu-Labs/HydraAI-Inspect" target="_blank" rel="noreferrer">
                  <Button variant="outline" icon={Github}>Open Source</Button>
               </a>
            </div>
         </div>

         {/* Links Section */}
         <div className="max-w-7xl mx-auto px-4 py-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">

            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-cardano flex items-center justify-center font-bold text-white">H</div>
               <span className="text-xl font-bold text-white font-heading">HydraAI</span>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
               <a href="#" className="hover:text-white transition-colors">Documentation</a>
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>

            <div className="flex gap-4">
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
               <a href="https://github.com/Sumbu-Labs/HydraAI-Inspect" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors"><Disc size={20} /></a> {/* Discord proxy */}
            </div>
         </div>

         <div className="text-center py-6 bg-black/20 text-xs text-gray-600 relative z-10">
            &copy; {new Date().getFullYear()} <a href="https://sumbu.xyz/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Sumbu Labs</a>. Built on <a href="https://cardano.org/" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Cardano</a>.
         </div>
      </footer>
   );
};

export default Footer;