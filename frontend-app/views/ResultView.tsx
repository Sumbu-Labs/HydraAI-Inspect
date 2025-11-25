import React, { useState, useRef } from 'react';
import { LayoutGrid, CircleDashed, LightbulbOff, Minimize2, Slash, Activity, AlertTriangle } from 'lucide-react';
import { Button, GlassCard, Gauge, Badge } from '../components/UI';
import { Damage, DamageSeverity, DamageType } from '../types';

interface ResultViewProps {
  damages: Damage[];
  score: number;
  vehicle: { label: string; plate: string; vin: string };
  onMint: () => void;
}

const getDamageIcon = (type: DamageType) => {
  switch (type) {
    case DamageType.SHATTERED_GLASS: return <LayoutGrid className="w-5 h-5" />;
    case DamageType.FLAT_TIRE: return <CircleDashed className="w-5 h-5" />;
    case DamageType.BROKEN_LAMP: return <LightbulbOff className="w-5 h-5" />;
    case DamageType.DENT: return <Minimize2 className="w-5 h-5" />;
    case DamageType.SCRATCH: return <Slash className="w-5 h-5" />;
    case DamageType.CRACK: return <Activity className="w-5 h-5" />;
    default: return <AlertTriangle className="w-5 h-5" />;
  }
};

const getSeverityColor = (severity: DamageSeverity | string) => {
  const severityUpper = String(severity).toUpperCase();
  switch (severityUpper) {
    case 'HIGH': return 'text-red-500 bg-red-500/10 border-red-500/20';
    case 'MEDIUM': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case 'LOW': return 'text-green-400 bg-green-400/10 border-green-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

const getSeverityBarColor = (severity: DamageSeverity | string) => {
  const severityUpper = String(severity).toUpperCase();
  switch (severityUpper) {
    case 'HIGH': return 'bg-red-500';
    case 'MEDIUM': return 'bg-orange-400';
    case 'LOW': return 'bg-green-400';
    default: return 'bg-gray-400';
  }
};

const getSeverityTextColor = (severity: DamageSeverity | string) => {
  const severityUpper = String(severity).toUpperCase();
  switch (severityUpper) {
    case 'HIGH': return 'text-red-500';
    case 'MEDIUM': return 'text-orange-400';
    case 'LOW': return 'text-green-400';
    default: return 'text-gray-400';
  }
};

export const ResultView: React.FC<ResultViewProps> = ({ damages, score, vehicle, onMint }) => {
  const [activeTab, setActiveTab] = useState('All');
  const listRef = useRef<HTMLDivElement>(null);

  // Calculate stats
  const totalDamages = damages.length;
  const avgConfidence = Math.round(damages.reduce((acc, d) => acc + d.confidence, 0) / (totalDamages || 1));
  const severityCounts = {
    HIGH: damages.filter(d => String(d.severity).toUpperCase() === 'HIGH').length,
    MEDIUM: damages.filter(d => String(d.severity).toUpperCase() === 'MEDIUM').length,
    LOW: damages.filter(d => String(d.severity).toUpperCase() === 'LOW').length,
  };

  const tabs = ['All', ...Array.from(new Set(damages.map(d => d.type)))];

  const filteredDamages = activeTab === 'All'
    ? damages
    : damages.filter(d => d.type === activeTab);

  const scrollToDamages = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-40 max-w-2xl mx-auto">
      {/* Vehicle Identity Section */}
      <GlassCard className="mb-8 !p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vehicle Identity</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="p-4">
            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Model</span>
            <span className="block text-base font-bold text-white">{vehicle.label}</span>
          </div>
          <div className="p-4">
            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">License Plate</span>
            <span className="block text-base font-bold text-white font-mono">{vehicle.plate}</span>
          </div>
          <div className="p-4">
            <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">VIN</span>
            <span className="block text-sm font-bold text-white font-mono">{vehicle.vin}</span>
          </div>
        </div>
      </GlassCard>

      {/* Header Gauge Section */}
      <div className="flex flex-col items-center py-8 relative">
        <div className="absolute inset-0 bg-cardano/10 blur-[100px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-full"></div>
        <Gauge score={score} size={240} />
        <div className="mt-6 flex gap-2 relative z-10">
          <Badge type="cardano">Hydra L2 Ready</Badge>
          {score > 80 && <Badge type="success">Excellent Condition</Badge>}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="text-center !p-4 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{totalDamages}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Issues Found</span>
        </GlassCard>
        <GlassCard className="text-center !p-4 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-cyan">{avgConfidence}%</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Avg Confidence</span>
        </GlassCard>
      </div>

      {/* Severity Breakdown */}
      <GlassCard className="mb-8 !p-0 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Severity Breakdown</h3>
        </div>
        <div className="flex divide-x divide-white/10">
          <div className="flex-1 p-4 text-center">
            <span className="block text-xl font-bold text-red-400">{severityCounts.HIGH}</span>
            <span className="text-[10px] text-gray-500 uppercase">High</span>
          </div>
          <div className="flex-1 p-4 text-center">
            <span className="block text-xl font-bold text-orange-400">{severityCounts.MEDIUM}</span>
            <span className="text-[10px] text-gray-500 uppercase">Medium</span>
          </div>
          <div className="flex-1 p-4 text-center">
            <span className="block text-xl font-bold text-green-400">{severityCounts.LOW}</span>
            <span className="text-[10px] text-gray-500 uppercase">Low</span>
          </div>
        </div>
      </GlassCard>

      <div className="flex justify-center mb-12">
        <Button variant="outline" onClick={scrollToDamages} className="rounded-full px-8 border-cyan/30 text-cyan hover:bg-cyan/10">
          View Detailed Damages
        </Button>
      </div>

      {/* Detailed Damages Section */}
      <div ref={listRef} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-bold">Detailed Damages</h3>
          <span className="text-xs text-gray-400">{filteredDamages.length} items</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${activeTab === tab
                ? 'bg-cyan text-navy border-cyan shadow-[0_0_10px_rgba(70,240,255,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Compact List */}
        <div className="grid gap-3">
          {filteredDamages.map(damage => (
            <GlassCard key={damage.id} className="!p-3 flex items-center gap-3 hover:bg-white/10 transition-colors group">
              <div className={`p-2.5 rounded-lg shrink-0 ${getSeverityColor(damage.severity)}`}>
                {getDamageIcon(damage.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-sm truncate transition-colors ${getSeverityTextColor(damage.severity)}`}>{damage.type}</h4>
                  <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${getSeverityColor(damage.severity)}`}>
                    {damage.confidence}%
                  </div>
                </div>
                <p className={`text-xs truncate mb-2 ${getSeverityTextColor(damage.severity)} opacity-60`}>{damage.location}</p>

                <div className="flex items-center gap-2">
                  <div className="w-full bg-navy-light h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full rounded-full ${getSeverityBarColor(damage.severity)}`}
                      style={{ width: `${damage.severityScore}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 w-8 text-right">{damage.severityScore}%</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Action Button - Static positioned at bottom of content */}
      <div className="mt-12 mb-4">
        <Button onClick={onMint} className="w-full py-4 text-lg shadow-[0_0_30px_rgba(0,51,173,0.5)]">
          Mint Certificate
        </Button>
        <p className="text-center text-xs text-gray-500 mt-3">
          This action will create a token on Hydra L2
        </p>
      </div>
    </div>
  );
};