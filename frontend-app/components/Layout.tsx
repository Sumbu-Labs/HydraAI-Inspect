import React from 'react';
import { History, Settings, PlusCircle, Car } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {

  const NavItem = ({ view, icon: Icon, label, isFab = false }: { view: AppView, icon: any, label: string, isFab?: boolean }) => {
    const isActive = currentView === view;

    if (isFab) {
      return (
        <button
          onClick={() => onChangeView(view)}
          className="relative -top-6 bg-gradient-to-tr from-cardano to-cyan text-white p-4 rounded-full shadow-[0_0_30px_rgba(70,240,255,0.5)] hover:scale-110 hover:shadow-[0_0_50px_rgba(70,240,255,0.7)] transition-all border-[6px] border-[#0A0F24] active:scale-95"
        >
          <Icon className="w-7 h-7" />
        </button>
      );
    }

    return (
      <button
        onClick={() => onChangeView(view)}
        className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 relative group active:scale-90 ${isActive ? 'text-cyan' : 'text-gray-500 hover:text-gray-300'}`}
      >
        <div className={`relative ${isActive ? '' : 'opacity-50 group-hover:opacity-100 transition-opacity'}`}>
          <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_12px_rgba(70,240,255,0.8)]' : ''}`} />
          {isActive && <div className="absolute inset-0 bg-cyan blur-md opacity-20 rounded-full"></div>}
        </div>
        <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F24] text-white flex flex-col md:flex-row max-w-[1920px] mx-auto">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-navy-light/30 backdrop-blur-lg p-6 sticky top-0 h-screen z-50">
        <button onClick={() => onChangeView(AppView.ONBOARDING)} className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cardano to-cyan flex items-center justify-center">
            <Car className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl">HydraAI</h1>
            <span className="text-xs text-cyan tracking-widest">INSPECT</span>
          </div>
        </button>

        <nav className="flex flex-col gap-4">
          <button onClick={() => onChangeView(AppView.HISTORY)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.HISTORY ? 'bg-white/10 text-cyan border border-white/10' : 'text-gray-400 hover:bg-white/5'}`}>
            <History className="w-5 h-5" />
            <span>History</span>
          </button>
          <button onClick={() => onChangeView(AppView.UPLOAD)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.UPLOAD ? 'bg-white/10 text-cyan border border-white/10' : 'text-gray-400 hover:bg-white/5'}`}>
            <PlusCircle className="w-5 h-5" />
            <span>New Inspection</span>
          </button>
          <button onClick={() => onChangeView(AppView.SETTINGS)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === AppView.SETTINGS ? 'bg-white/10 text-cyan border border-white/10' : 'text-gray-400 hover:bg-white/5'}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-br from-cardano/20 to-transparent border border-cardano/30">
            <h3 className="text-sm font-bold text-cyan mb-1">Hydra L2 Active</h3>
            <p className="text-xs text-gray-400">Node Status: Synced</p>
            <div className="w-full h-1 bg-navy-light mt-2 rounded-full overflow-hidden">
              <div className="w-full h-full bg-green-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 sticky top-0 z-40 bg-[#0A0F24]/80 backdrop-blur-md border-b border-white/5">
          <button onClick={() => onChangeView(AppView.ONBOARDING)} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cardano to-cyan flex items-center justify-center shadow-[0_0_15px_rgba(70,240,255,0.2)]">
              <Car className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg">HydraAI</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></span>
            <span className="text-[10px] text-gray-300 font-mono font-bold tracking-wider">L2 LIVE</span>
          </div>
        </header>

        <div className="p-4 md:p-8 md:max-w-[1080px] md:mx-auto min-h-[calc(100vh-80px)] md:min-h-screen pb-24 md:pb-8">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        {currentView !== AppView.ONBOARDING && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0F24]/95 backdrop-blur-xl border-t border-white/10 px-8 py-3 flex justify-between items-end z-50 safe-area-pb shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <NavItem view={AppView.HISTORY} icon={History} label="History" />
            <NavItem view={AppView.UPLOAD} icon={PlusCircle} label="New" isFab />
            <NavItem view={AppView.SETTINGS} icon={Settings} label="Settings" />
          </nav>
        )}
      </main>
    </div>
  );
};