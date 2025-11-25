import React from 'react';
import { Zap, Scan, Fingerprint, Car } from 'lucide-react';
import { Button, GradientText } from '../components/UI';

export const OnboardingView: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center h-full min-h-[80vh] relative pb-32 md:pb-0">
      {/* Ambient Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cardano/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Spacer for vertical centering */}
      <div className="flex-1" />

      {/* Hero Section */}
      <div className="text-center space-y-8 relative z-10 flex flex-col items-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-cardano to-cyan opacity-20 blur-2xl rounded-full animate-pulse-fast" />
          <div className="relative w-full h-full rounded-3xl bg-[#0A0F24] border border-white/10 flex items-center justify-center shadow-2xl">
            <Car className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
             <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan"></span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white">
            Hydra<GradientText>AI</GradientText>
          </h1>
          <p className="text-gray-500 font-mono text-xs tracking-[0.2em] uppercase">
            Web3 Vehicle Inspection
          </p>
        </div>

        {/* Minimal Feature Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Zap className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-gray-200">Instant L2</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Scan className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-gray-200">AI Analysis</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <Fingerprint className="w-4 h-4 text-cyan" />
            <span className="text-sm font-medium text-gray-200">CIP-68 NFT</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer Action - Sticky on Mobile */}
      <div className="w-full max-w-xs z-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fixed bottom-10 left-0 right-0 mx-auto px-6 md:relative md:bottom-auto md:px-0 md:mb-8">
        <Button 
          onClick={onStart} 
          className="w-full py-4 text-lg shadow-[0_0_50px_rgba(0,51,173,0.5)] hover:shadow-[0_0_70px_rgba(70,240,255,0.4)]"
        >
          Start Inspection
        </Button>
        <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest">
          Secure • Transparent • Verifiable
        </p>
      </div>
    </div>
  );
};