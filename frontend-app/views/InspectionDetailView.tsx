
import React from 'react';
import {
  ArrowLeft, RefreshCw, Trash2, Share2, ExternalLink,
  ShieldCheck, Calendar, Car, Activity,
  LayoutGrid, CircleDashed, LightbulbOff, Minimize2, Slash, AlertTriangle,
  Copy, CheckCircle2, Box, Hash, FileJson
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { Button, GlassCard, Gauge, Badge, GradientText } from '../components/UI';
import { InspectionRecord, Damage, DamageSeverity, DamageType } from '../types';

interface InspectionDetailViewProps {
  inspection: InspectionRecord;
  onBack: () => void;
  onReRun: () => void;
  onDelete: () => void;
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

export const InspectionDetailView: React.FC<InspectionDetailViewProps> = ({
  inspection,
  onBack,
  onReRun,
  onDelete
}) => {
  const isMinted = inspection.status === 'Minted';

  // Calculate stats
  const totalDamages = inspection.damages.length;
  const avgConfidence = Math.round(inspection.damages.reduce((acc, d) => acc + d.confidence, 0) / (totalDamages || 1));
  const severityCounts = {
    HIGH: inspection.damages.filter(d => String(d.severity).toUpperCase() === 'HIGH').length,
    MEDIUM: inspection.damages.filter(d => String(d.severity).toUpperCase() === 'MEDIUM').length,
    LOW: inspection.damages.filter(d => String(d.severity).toUpperCase() === 'LOW').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" onClick={onBack} className="!p-2 rounded-full hover:bg-white/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">Inspection Details</h1>
        </div>

        <GlassCard className="relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-white">{inspection.vehicle.label}</h2>
                <Badge type={isMinted ? 'cardano' : 'warning'}>{inspection.status}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Car className="w-4 h-4" /> {inspection.vehicle.plate}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {inspection.date}</span>
              </div>
            </div>
            {isMinted && (
              <div className="hidden md:flex items-center gap-2 bg-cardano/20 px-3 py-1.5 rounded-full border border-cardano/50">
                <CheckCircle2 className="w-4 h-4 text-cyan" />
                <span className="text-xs font-bold text-cyan uppercase">Verified on Hydra L2</span>
              </div>
            )}
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cardano/20 to-transparent rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        </GlassCard>
      </div>

      {/* 2. Full AI Analysis Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Score Gauge */}
        <GlassCard className="md:col-span-1 flex flex-col items-center justify-center py-8 bg-gradient-to-b from-white/5 to-navy">
          <Gauge score={inspection.score} size={160} />
          <div className="mt-4 text-center">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Condition Score</p>
            <p className="text-xs text-gray-500 mt-1">Based on weighted severity</p>
          </div>
        </GlassCard>

        {/* Stats Breakdown */}
        <GlassCard className="md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <ShieldCheck className="text-cyan w-5 h-5" />
            <h3 className="font-bold text-lg">AI Analysis Summary</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-navy-light p-3 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-bold text-white">{totalDamages}</span>
              <span className="text-[10px] text-gray-400 uppercase">Damages</span>
            </div>
            <div className="bg-navy-light p-3 rounded-xl border border-white/5 text-center">
              <span className="block text-2xl font-bold text-cyan">{avgConfidence}%</span>
              <span className="text-[10px] text-gray-400 uppercase">Avg Conf.</span>
            </div>
            <div className="bg-navy-light p-3 rounded-xl border border-white/5 text-center col-span-2 sm:col-span-2 flex items-center justify-around">
              <div className="text-center">
                <span className="block text-lg font-bold text-red-400">{severityCounts.HIGH}</span>
                <span className="text-[10px] text-gray-500 uppercase">High</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <span className="block text-lg font-bold text-orange-400">{severityCounts.MEDIUM}</span>
                <span className="text-[10px] text-gray-500 uppercase">Med</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <span className="block text-lg font-bold text-green-400">{severityCounts.LOW}</span>
                <span className="text-[10px] text-gray-500 uppercase">Low</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 3. Complete Damage List */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-bold flex items-center gap-2">
          <Activity className="text-cyan w-5 h-5" />
          Detailed Findings
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {inspection.damages.map((damage) => (
            <GlassCard key={damage.id} className="flex flex-col gap-3 group hover:bg-white/10 transition-colors !p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getSeverityColor(damage.severity)}`}>
                    {getDamageIcon(damage.type)}
                  </div>
                  <div>
                    <h4 className={`font-bold text-base transition-colors ${getSeverityTextColor(damage.severity)}`}>{damage.type}</h4>
                    <p className={`text-xs font-mono uppercase tracking-wider ${getSeverityTextColor(damage.severity)} opacity-60`}>{damage.location}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold border ${getSeverityColor(damage.severity)}`}>
                  {damage.confidence}%
                </div>
              </div>

              <div className="space-y-1.5 mt-1">
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span className="uppercase tracking-wider">Severity</span>
                  <span>{damage.severity}</span>
                </div>
                <div className="w-full bg-navy-light h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full ${getSeverityBarColor(damage.severity)} shadow-[0_0_10px_currentColor]`}
                    style={{ width: `${damage.severityScore}%` }}
                  ></div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* 4. Vehicle Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-bold flex items-center gap-2">
          <Car className="text-cyan w-5 h-5" />
          Vehicle Identity
        </h3>
        <GlassCard className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Model</label>
            <p className="text-white font-medium">{inspection.vehicle.label}</p>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">License Plate</label>
            <p className="text-white font-mono bg-navy-light px-2 py-1 rounded border border-white/10 w-fit mt-1">
              {inspection.vehicle.plate}
            </p>
          </div>
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">VIN</label>
            <p className="text-white font-mono bg-navy-light px-2 py-1 rounded border border-white/10 w-fit mt-1 text-xs">
              {inspection.vehicle.vin}
            </p>
          </div>
        </GlassCard>
      </div>

      {/* 5. Token Section (Conditional) */}
      {isMinted && (
        <div className="space-y-6 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-display font-bold text-white">
              Vehicle Certificate <GradientText>Token</GradientText>
            </h3>
            <div className="hidden md:block">
              <Badge type="cardano">CIP-68 Standard</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NFT Card */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-cardano to-cyan rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <GlassCard className="relative bg-[#0A0F24] !border-white/20 overflow-hidden flex flex-col h-full min-h-[450px]">
                {/* Holographic Shine */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 via-white/0 to-transparent pointer-events-none z-10"></div>

                <div className="flex justify-between items-start mb-6 relative z-20">
                  <div>
                    <Badge type="cardano">Hydra L2</Badge>
                    <h3 className="font-bold text-xl leading-tight mt-3">{inspection.vehicle.label}</h3>
                    <p className="text-gray-400 text-xs font-mono">{inspection.vehicle.vin}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${inspection.score > 70 ? 'text-green-400' : 'text-orange-400'}`}>{inspection.score}</div>
                    <div className="text-[10px] text-gray-400 uppercase">Score</div>
                  </div>
                </div>

                <div className="flex justify-center my-auto py-6 relative z-20">
                  <div className="p-3 bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <QRCode value={`hydra:${inspection.txHash}`} size={140} />
                  </div>
                </div>

                <div className="mt-auto border-t border-white/10 pt-4 relative z-20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Token ID</span>
                    <button className="text-cyan hover:text-white transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-mono text-xs text-gray-300 truncate">asset1...9x2837465</p>
                  <div className="flex justify-between mt-4">
                    <div className="text-center">
                      <span className="block font-bold text-white">{totalDamages}</span>
                      <span className="text-[10px] text-gray-500 uppercase">Damages</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-bold text-white">{inspection.date}</span>
                      <span className="text-[10px] text-gray-500 uppercase">Minted</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-bold text-cyan">Testnet</span>
                      <span className="text-[10px] text-gray-500 uppercase">Network</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Transaction Details & Actions */}
            <div className="space-y-4">
              <GlassCard>
                <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan" />
                  Transaction Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Tx Hash</span>
                    <span className="text-cyan font-mono truncate max-w-[150px]">{inspection.txHash}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Block</span>
                    <span className="text-white font-mono">#4,829,102</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Fee</span>
                    <span className="text-white font-mono">0.14 ADA</span>
                  </div>
                </div>
              </GlassCard>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="w-full gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="w-4 h-4" /> Explorer
                </Button>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl">
                <div className="flex gap-3">
                  <Box className="text-blue-400 w-5 h-5 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-blue-300">Hydra Head #42</h5>
                    <p className="text-xs text-gray-400 mt-1">
                      This VCT is secured on a Hydra Head L2 channel. Final settlement to L1 happens upon head closure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer Buttons */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4">
        <Button variant="secondary" className="flex-1 gap-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" /> Back to History
        </Button>
        <div className="flex gap-4 flex-1">
          <Button variant="outline" className="flex-1 gap-2 text-cyan border-cyan/30 hover:bg-cyan/10" onClick={onReRun}>
            <RefreshCw className="w-4 h-4" /> Re-run Analysis
          </Button>
          <Button variant="ghost" className="gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
