import React from 'react';
import { Loader2 } from 'lucide-react';
import { GradientText } from '../components/UI';

export const LoadingView: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
            <div className="relative">
                <div className="absolute inset-0 bg-cyan/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-cyan animate-spin relative z-10" />
            </div>
            <h3 className="mt-6 text-xl font-display font-bold text-white">
                Hydra<GradientText>AI</GradientText>
            </h3>
            <p className="text-gray-400 text-sm mt-2 animate-pulse">Processing...</p>
        </div>
    );
};
