import React from 'react';
import { ToggleLeft, ToggleRight, Wifi, Info, Github, Globe } from 'lucide-react';
import { GlassCard, Button } from '../components/UI';

export const SettingsView: React.FC = () => {
  const [isMockMode, setIsMockMode] = React.useState(true);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-display font-bold mb-6">Settings</h2>

      {/* Network Status */}
      <GlassCard className="bg-gradient-to-r from-navy-light to-cardano/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-full">
            <Wifi className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Hydra Node Status</h3>
            <p className="text-xs text-green-400">Online • 45ms Latency</p>
          </div>
        </div>
      </GlassCard>

      {/* General Settings */}
      <div className="space-y-4">
        <h3 className="text-sm text-gray-400 uppercase font-bold tracking-wider pl-2">Development</h3>

        <GlassCard className="flex justify-between items-center">
          <div>
            <p className="font-medium">Mock Mode</p>
            <p className="text-xs text-gray-400">Use simulated Hydra transactions</p>
          </div>
          <button onClick={() => setIsMockMode(!isMockMode)} className="text-cyan transition-all">
            {isMockMode ? <ToggleRight className="w-8 h-8 fill-current/20" /> : <ToggleLeft className="w-8 h-8 text-gray-600" />}
          </button>
        </GlassCard>

        <GlassCard className="space-y-3">
          <p className="font-medium mb-2">API Endpoint</p>
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 font-mono text-xs text-gray-400 break-all">
            wss://hydra-testnet.cardano.org/node-1
          </div>
        </GlassCard>
      </div>

      {/* Info */}
      <div className="space-y-4 mt-8">
        <h3 className="text-sm text-gray-400 uppercase font-bold tracking-wider pl-2">About</h3>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <Info className="w-4 h-4" />
            <span>Version 1.0.0-alpha</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <Globe className="w-4 h-4" />
            <span>HydraAI Protocol V2</span>
          </div>
        </GlassCard>

        <Button variant="outline" className="w-full gap-2" onClick={() => window.open('https://github.com/Sumbu-Labs/HydraAI-Inspect', '_blank')}>
          <Github className="w-4 h-4" /> View Source
        </Button>
      </div>
    </div>
  );
};