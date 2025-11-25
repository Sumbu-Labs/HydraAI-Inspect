import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  isLoading,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden rounded-xl px-6 py-3 font-display font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-gradient-to-r from-cardano to-blue-600 text-white shadow-[0_0_20px_rgba(0,51,173,0.4)] hover:shadow-[0_0_30px_rgba(70,240,255,0.3)]",
    secondary: "bg-navy-light text-cyan border border-cyan/30 hover:bg-cyan/10 hover:border-cyan",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl ${onClick ? 'cursor-pointer hover:bg-white/10 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cardano ${className}`}>
    {children}
  </span>
);

export const Badge: React.FC<{ children: React.ReactNode; type?: 'success' | 'warning' | 'info' | 'cardano' }> = ({ children, type = 'info' }) => {
  const styles = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    warning: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    cardano: "bg-cardano/20 text-cyan border-cardano/50"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[type]}`}>
      {children}
    </span>
  );
};

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full h-2 bg-navy-light rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-cardano to-cyan transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export const Gauge: React.FC<{ score: number; size?: number }> = ({ score, size = 120 }) => {
  const radius = (size / 2) - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = 'text-green-500';
  if (score < 70) color = 'text-orange-500';
  if (score < 40) color = 'text-red-500';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-navy-light"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(70,240,255,0.3)]`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-display font-bold text-white">{score}</span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Score</span>
      </div>
    </div>
  );
};

export const BottomDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4 sm:p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-sm mx-auto bg-[#0A0F24] border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,51,173,0.3)] animate-in slide-in-from-bottom duration-300 ring-1 ring-white/10">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/10 rounded-full" />
        {title && <h3 className="text-center text-lg font-display font-bold text-white mb-6 mt-2">{title}</h3>}
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};