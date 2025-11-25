import React, { useEffect, useState } from 'react';
import { Car, Zap, Server, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { GradientText } from '../components/UI';

const steps = [
  { icon: Car, text: 'Processing images' },
  { icon: Zap, text: 'Detecting damages' },
  { icon: FileText, text: 'Generating report' },
  { icon: Server, text: 'Preparing Hydra L2 batch' },
];

export const AnalysisView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Small delay after last step
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center w-full max-w-md mx-auto animate-in fade-in duration-700">
      {/* Central Glowing Animation */}
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        <div className="absolute inset-0 bg-cyan/20 rounded-full blur-[60px] animate-pulse"></div>
        
        {/* Spinning rings */}
        <div className="absolute inset-0 border border-white/10 rounded-full"></div>
        <div className="absolute inset-4 border-2 border-transparent border-t-cyan/50 rounded-full animate-spin duration-[3s]"></div>
        <div className="absolute inset-8 border-2 border-transparent border-b-cardano/50 rounded-full animate-spin-slow direction-reverse"></div>
        <div className="absolute inset-12 border border-white/5 rounded-full bg-[#0A0F24]/80 backdrop-blur-sm"></div>
        
        {/* Center Icon */}
        <div className="relative z-10">
           <Car className="w-12 h-12 text-white mb-2 mx-auto" />
           <div className="text-xs font-mono text-cyan animate-pulse">ANALYZING...</div>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold mb-8">
        AI Inspection <GradientText>Running</GradientText>
      </h2>

      {/* Steps List */}
      <div className="w-full space-y-0 relative max-w-xs mx-auto">
         {/* Vertical Line */}
         <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/5 -z-10"></div>

        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const Icon = step.icon;

          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 p-4 transition-all duration-500 ${
                isActive ? 'opacity-100 scale-105' : 
                isCompleted ? 'opacity-60' : 'opacity-30'
              }`}
            >
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive ? 'bg-cyan text-navy shadow-[0_0_15px_rgba(70,240,255,0.5)]' : 
                isCompleted ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-400 border border-white/10'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                 isActive ? <Loader2 className="w-5 h-5 animate-spin" /> :
                 <Icon className="w-4 h-4" />}
              </div>
              
              <div className="flex-1 text-left">
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{step.text}</span>
                {isActive && (
                  <div className="h-0.5 w-12 bg-gradient-to-r from-cyan to-transparent mt-1 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};