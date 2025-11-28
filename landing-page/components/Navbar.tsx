import React, { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { Button } from './ui/Common';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-cardano mr-3 flex items-center justify-center shadow-[0_0_10px_rgba(70,240,255,0.4)]">
              <span className="text-white font-bold font-heading">H</span>
            </div>
            <span className="text-xl font-bold font-heading tracking-wide text-white">
              HydraAI <span className="text-cyan-400">Inspect</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="https://sumbu-labs.gitbook.io/hydra-ai-inspect" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                Docs
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/Sumbu-Labs/HydraAI-Inspect" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://app.hydra-ai.sumbu.xyz/" target="_blank" rel="noreferrer">
              <Button variant="secondary" className="!py-2 !px-4 text-sm">Launch App</Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3 px-3">
              <Button variant="secondary" className="w-full justify-center" onClick={() => window.open('https://app.hydra-ai.sumbu.xyz/', '_blank')}>Launch App</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;