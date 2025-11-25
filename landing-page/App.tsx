import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import Showcase from './components/Showcase';
import TechStack from './components/TechStack';
import TokenPreview from './components/TokenPreview';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-cyan-400/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Process />
        <Showcase />
        <TechStack />
        <TokenPreview />
        <Benefits />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
