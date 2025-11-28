import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { Button } from './ui/Common';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-navy-900">

      {/* --- BACKGROUND ORNAMENTS START --- */}

      {/* 1. Deep Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#111835_0%,_#0A0F24_100%)]" />

      {/* 2. Grain Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>

      {/* 3. The Neon Mesh / Wave Ornament */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160%] h-[800px] opacity-80" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#46F0FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#46F0FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0033AD" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0033AD" stopOpacity="0" />
              <stop offset="50%" stopColor="#46F0FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0033AD" stopOpacity="0" />
            </linearGradient>
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#grid-grad)" />
            </mask>
          </defs>

          {/* Flowing Mesh Lines - Creating the "Digital Landscape" look */}
          <g className="mix-blend-screen">
            {/* Primary Curve */}
            <motion.path
              d="M-100,600 C200,500 600,750 720,650 C840,550 1240,400 1540,500"
              stroke="url(#line-glow)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            {/* Secondary Echo Curves */}
            <motion.path
              d="M-100,650 C250,580 580,800 720,700 C860,600 1200,480 1540,580"
              stroke="url(#line-glow)"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.2 }}
            />
            <motion.path
              d="M-100,700 C300,660 560,850 720,750 C880,650 1160,560 1540,660"
              stroke="url(#line-glow)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, delay: 0.4 }}
            />

            {/* Vertical Perspective Lines (The "Net" effect) */}
            {[...Array(15)].map((_, i) => {
              const x = 100 + i * 90;
              return (
                <motion.path
                  key={i}
                  d={`M${x},800 C${x + (x - 720) * 0.2},600 ${x + (x - 720) * 0.5},400 720,200`}
                  stroke="#0033AD"
                  strokeWidth="1"
                  strokeOpacity="0.15"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ delay: 1 + i * 0.05 }}
                />
              );
            })}
          </g>

          {/* Ambient Glow Center */}
          <circle cx="720" cy="600" r="300" fill="#0033AD" filter="url(#glow-blur)" opacity="0.2" />
          <defs>
            <filter id="glow-blur" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="80" result="coloredBlur" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* Top Highlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      {/* --- BACKGROUND ORNAMENTS END --- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#46F0FF]" />
            <span className="text-xs md:text-sm font-medium text-cyan-400 tracking-wide uppercase">Powered by Cardano Hydra L2</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6"
          >
            AI-Powered Vehicle <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-cardano pb-2">Inspection Certainty</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            Instant damage detection driven by advanced computer vision.
            Immutable certificates minted securely on Cardano’s Hydra Layer 2 protocol.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button
              variant="primary"
              icon={ArrowRight}
              className="w-full sm:w-auto"
              onClick={() => window.open('https://app.hydra-ai.sumbu.xyz/', '_blank')}
            >
              Launch App
            </Button>
            <Button
              variant="outline"
              icon={Play}
              className="w-full sm:w-auto"
              onClick={() => setIsVideoOpen(true)}
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium"
          >
            <span>Powered by Cardano</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>Hydra Layer 2</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>YOLO11m AI</span>
          </motion.div>
        </div>

        {/* Visual Content (Car Sedan Silhouette) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 w-full aspect-[4/3] glass-panel rounded-2xl p-2 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(0,51,173,0.3)] overflow-hidden bg-navy-900/40 backdrop-blur-md">
            {/* Abstract Dashboard UI */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="px-3 py-1 bg-black/40 rounded backdrop-blur text-xs text-cyan-400 border border-cyan-500/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Scanning System Active
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />)}
              </div>
            </div>

            {/* Sedan Outline Illustration using CSS/SVG */}
            <svg viewBox="0 0 400 250" className="w-full h-full opacity-90">
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0033AD" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#46F0FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0033AD" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="scanField" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#46F0FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#46F0FF" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Scaled Group: 0.85 scale to provide padding, translated to maintain center */}
              <g transform="translate(30, 20) scale(0.85)">

                {/* Wheels (Subtle) */}
                <circle cx="103" cy="185" r="22" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                <circle cx="297" cy="185" r="22" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.3" fill="none" />
                <circle cx="103" cy="185" r="8" fill="#46F0FF" fillOpacity="0.2" />
                <circle cx="297" cy="185" r="8" fill="#46F0FF" fillOpacity="0.2" />

                {/* Modern Sedan Shape */}
                <path
                  d="M50 180 Q50 160 60 155 L110 140 L160 95 Q200 90 250 95 L310 135 Q330 140 350 145 L350 170 L350 185 L325 185 A 28 28 0 0 0 269 185 L131 185 A 28 28 0 0 0 75 185 L50 180 Z"
                  fill="rgba(0, 51, 173, 0.05)"
                  stroke="url(#carGradient)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Internal Body Lines for Detail */}
                <path d="M115 140 L305 135" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.2" fill="none" />
                <path d="M160 95 L160 185" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.1" fill="none" />
                <path d="M250 95 L250 185" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.1" fill="none" />
                <path d="M60 165 L100 165" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.1" fill="none" /> {/* Headlight hint */}
                <path d="M340 150 L350 150" stroke="#46F0FF" strokeWidth="1" strokeOpacity="0.1" fill="none" /> {/* Taillight hint */}

                {/* Scanning Lines (Inside group to match scale) */}
                <motion.line
                  x1="40" y1="0" x2="40" y2="250"
                  stroke="#46F0FF"
                  strokeWidth="2"
                  strokeOpacity="0.8"
                  animate={{ x1: [30, 370, 30], x2: [30, 370, 30] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* Scanning Gradient Field behind the line */}
                <motion.rect
                  x="0" y="0" width="60" height="250"
                  fill="url(#scanField)"
                  opacity="0.2"
                  animate={{ x: [-30, 310, -30] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Damage Points */}

                {/* 1. Dent - Middle/Door */}
                <motion.circle cx="180" cy="160" r="4" fill="#FF4646" animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <line x1="180" y1="160" x2="210" y2="130" stroke="#FF4646" strokeWidth="1" />
                  {/* Reduced font size to 9, compact width */}
                  <rect x="210" y="116" width="66" height="18" fill="rgba(0,0,0,0.8)" rx="4" stroke="#FF4646" strokeWidth="0.5" />
                  <text x="216" y="128" fill="#FF4646" fontSize="9" fontFamily="monospace" fontWeight="bold">Dent: 98%</text>
                </motion.g>

                {/* 2. Scratch - Rear - Repositioned Left/Up to stay inside bounds */}
                <motion.circle cx="310" cy="150" r="4" fill="#FF4646" animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                  {/* Connector goes Left and Up to pull label into safe area */}
                  <line x1="310" y1="150" x2="280" y2="115" stroke="#FF4646" strokeWidth="1" />
                  <rect x="280" y="101" width="76" height="18" fill="rgba(0,0,0,0.8)" rx="4" stroke="#FF4646" strokeWidth="0.5" />
                  <text x="286" y="113" fill="#FF4646" fontSize="9" fontFamily="monospace" fontWeight="bold">Scratch: 92%</text>
                </motion.g>
              </g>
            </svg>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cardano/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Elements behind */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cardano rounded-full blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400 rounded-full blur-[80px] opacity-20"></div>
        </motion.div>

      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-navy-950">
              {/* <p>Video demo link will be placed here</p> */}
              <iframe
                width="100%"
                height="100%"
                src="https://drive.google.com/file/d/1XhIqfNY6lKyW0H3jmTb72X5CPnD2uEQB/preview"
                title="HydraAI Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;