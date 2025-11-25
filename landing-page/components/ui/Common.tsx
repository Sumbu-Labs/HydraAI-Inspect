import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon: Icon, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-heading font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-cardano hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(0,51,173,0.5)] border border-blue-500/30",
    secondary: "bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(70,240,255,0.1)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
      {Icon && <Icon className="ml-2 w-5 h-5" />}
    </button>
  );
};

export const SectionWrapper: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`relative py-20 md:py-32 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string; hoverEffect?: boolean }> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`glass-panel rounded-2xl p-6 ${hoverEffect ? 'hover:border-cyan-400/30 transition-colors duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const SectionHeading: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-heading font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
