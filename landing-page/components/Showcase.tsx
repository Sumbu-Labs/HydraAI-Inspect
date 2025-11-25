import React from 'react';
import { SectionWrapper, SectionHeading } from './ui/Common';
import { motion } from 'framer-motion';

interface ScreenData {
  src: string;
  alt: string;
  label: string;
}

const PhoneFrame: React.FC<{ src: string; alt: string; label: string; delay?: number }> = ({ src, alt, label, delay = 0 }) => (
  <div className="flex flex-col items-center group relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.3 }}
      className="relative mx-auto"
    >
      {/* Ambient Glow behind the phone */}
      <div className="absolute -inset-4 bg-cyan-400/20 blur-[40px] rounded-[3rem] opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>

      {/* Main Phone Chassis */}
      <div className="relative w-[280px] h-[580px] sm:w-[300px] sm:h-[620px] bg-navy-900 rounded-[2rem] border-[8px] border-gray-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden z-10 ring-1 ring-white/10 transform transition-transform duration-500 group-hover:-translate-y-2">

        {/* Inner Bezel */}
        {/* <div className="absolute inset-0 border-[6px] border-black rounded-[3rem] z-20 pointer-events-none"></div> */}

        {/* Screen Image */}
        <div className="w-full h-full bg-navy-950 relative rounded-[2rem] overflow-hidden pt-2">
          <img src={src} alt={alt} className="w-full h-full object-cover" />

          {/* Screen Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20 rounded-[2rem] opacity-30"></div>
        </div>
      </div>

      {/* Soft glow underneath */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-16 bg-cyan-300/20 blur-[60px] rounded-full opacity-80"></div>
      <div className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 w-48 h-12 bg-cardano/30 blur-[45px] rounded-full opacity-60"></div>
    </motion.div>

    {/* Label */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: delay + 0.4 }}
      className="mt-8 text-center"
    >
      <p className="text-base sm:text-lg font-medium text-white font-heading tracking-wide mb-2">{label}</p>
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
    </motion.div>
  </div>
);

const Showcase = () => {
  const screens: ScreenData[] = [
    { src: '/start-inspection.png', alt: 'HydraAI Start Screen', label: 'Start Inspection' },
    { src: '/upload-photos.png', alt: 'Upload Vehicle Photos', label: 'AI Capture' },
    { src: '/inspection-result.png', alt: 'Inspection Results', label: 'Instant Analysis' },
  ];

  return (
    <SectionWrapper id="demo" className="bg-navy-900 relative overflow-hidden py-32">
      {/* Decorative Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[80%] bg-gradient-to-b from-navy-900 via-cardano/10 to-navy-900 opacity-60 pointer-events-none blur-3xl" />

      <SectionHeading
        title="Designed for Speed"
        subtitle="Engineered for trust. A seamless interface built for inspectors and car owners."
      />

      <div className="flex flex-col xl:flex-row items-center justify-center gap-16 xl:gap-12 mt-16 relative z-10 px-4">
        {screens.map((screen, index) => (
          <PhoneFrame
            key={index}
            src={screen.src}
            alt={screen.alt}
            label={screen.label}
            delay={index * 0.15}
          />
        ))}
      </div>

      {/* Horizontal Connecting Line (Desktop) */}
      <div className="hidden xl:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -z-0 mt-12 pointer-events-none"></div>
    </SectionWrapper>
  );
};

export default Showcase;
