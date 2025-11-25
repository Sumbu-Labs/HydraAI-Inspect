import React, { useState } from 'react';
import { 
  Copy, ExternalLink, Share2, Download, 
  LayoutGrid, CircleDashed, LightbulbOff, Minimize2, Slash, Activity, AlertTriangle, 
  ChevronDown, Car, Calendar, ShieldCheck, Hash 
} from 'lucide-react';
import { Button, GlassCard, Badge, GradientText } from '../components/UI';
import { InspectionRecord, DamageType, DamageSeverity } from '../types';
import QRCode from 'react-qr-code';

interface TokenViewProps {
  inspection: InspectionRecord;
  onBack: () => void;
}

const getDamageIcon = (type: DamageType) => {
  switch (type) {
    case DamageType.SHATTERED_GLASS: return <LayoutGrid className="w-4 h-4" />;
    case DamageType.FLAT_TIRE: return <CircleDashed className="w-4 h-4" />;
    case DamageType.BROKEN_LAMP: return <LightbulbOff className="w-4 h-4" />;
    case DamageType.DENT: return <Minimize2 className="w-4 h-4" />;
    case DamageType.SCRATCH: return <Slash className="w-4 h-4" />;
    case DamageType.CRACK: return <Activity className="w-4 h-4" />;
    default: return <AlertTriangle className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: DamageSeverity) => {
  switch (severity) {
    case DamageSeverity.HIGH: return 'text-red-500 bg-red-500/10 border-red-500/20';
    case DamageSeverity.MEDIUM: return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    case DamageSeverity.LOW: return 'text-green-400 bg-green-400/10 border-green-400/20';
  }
};

export const TokenView: React.FC<TokenViewProps> = ({ inspection, onBack }) => {
  const [showDamages, setShowDamages] = useState(false);
  const mockAssetId = `asset1${Math.random().toString(36).substr(2, 15)}`;

  const metadata = {
    "721": {
      "<policy_id>": {
        "HydraInspectVCT": {
          "name": inspection.vehicle.label,
          "vin": inspection.vehicle.vin,
          "score": inspection.score,
          "damages": inspection.damages.map(d => ({
            "type": d.type,
            "severity": d.severity,
            "location": d.location
          })),
          "date": inspection.date,
          "standard": "CIP-68"
        }
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700 pb-40 md:pb-12">
      {/* Page Header */}
      <div className="flex flex-col items-center text-center mb-8 md:mb-12">
        <Badge type="success" className="mb-3 shadow-[0_0_15px_rgba(74,222,128,0.3)] px-4 py-1 text-sm">
            Successfully Minted on Hydra L2
        </Badge>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            Vehicle Certificate <GradientText>Token</GradientText>
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base max-w-md">
            Immutable proof of vehicle condition secured by the Cardano blockchain.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: The Visual Certificate Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group perspective-1000 w-full max-w-sm mx-auto lg:max-w-none">
                {/* Glow Effect behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cardano to-cyan rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative aspect-[3/4] w-full bg-[#0A0F24] rounded-[1.8rem] border border-white/20 overflow-hidden flex flex-col shadow-2xl">
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-cyan/10 pointer-events-none z-10"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cardano/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

                    {/* Card Header */}
                    <div className="p-6 relative z-20">
                        <div className="flex justify-between items-start mb-4">
                             <Badge type="cardano" className="backdrop-blur-md bg-black/30">CIP-68</Badge>
                             <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                                 <Hash className="w-3 h-3" />
                                 <span>{mockAssetId.substr(0, 8)}...</span>
                             </div>
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white leading-tight">{inspection.vehicle.label}</h3>
                        <p className="text-sm text-gray-400 font-mono mt-1 opacity-80">{inspection.vehicle.vin}</p>
                    </div>

                    {/* Card Body: QR Code */}
                    <div className="flex-1 flex items-center justify-center relative z-20 p-4">
                        <div className="p-4 bg-white rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                            <QRCode value={`hydra:${inspection.txHash}`} size={160} />
                        </div>
                    </div>

                    {/* Card Footer: Stats */}
                    <div className="p-6 relative z-20 bg-gradient-to-t from-black/80 to-transparent">
                         <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                             <div>
                                 <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Score</span>
                                 <span className={`text-2xl font-display font-bold ${inspection.score > 70 ? 'text-green-400' : 'text-orange-400'}`}>
                                     {inspection.score}
                                 </span>
                             </div>
                             <div>
                                 <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Damages</span>
                                 <span className="text-xl font-display font-bold text-white">
                                     {inspection.damages.length}
                                 </span>
                             </div>
                             <div className="text-right">
                                 <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Date</span>
                                 <span className="text-sm font-mono font-bold text-white block mt-1">
                                     {new Date(inspection.date).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                                 </span>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Action Buttons: Visible on Mobile under Card, Desktop below layout */}
            <div className="w-full max-w-sm mx-auto lg:max-w-none flex flex-col gap-3 mt-6 lg:flex-row lg:mt-6">
                <div className="flex gap-3 w-full">
                  <Button className="flex-1 gap-2 bg-gradient-to-r from-cardano to-cyan border-none shadow-[0_0_20px_rgba(0,51,173,0.4)]" onClick={() => {}}>
                      <Share2 className="w-4 h-4" /> Share VCT
                  </Button>
                  <Button variant="secondary" className="flex-none gap-2 border-white/20 hover:bg-white/10">
                      <Download className="w-4 h-4" />
                  </Button>
                </div>
                {/* Mobile Only Explorer Link */}
                 <Button variant="outline" className="lg:hidden w-full gap-2 border-white/10 text-gray-400 hover:text-white text-sm" onClick={() => window.open(`https://cardanoscan.io/transaction/${inspection.txHash}`, '_blank')}>
                     View on Explorer <ExternalLink className="w-3 h-3" />
                </Button>
            </div>
        </div>

        {/* Right Column: Details & Metadata */}
        <div className="lg:col-span-7 space-y-6">
            
            {/* Vehicle Identity Grid */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Car className="w-4 h-4" /> Vehicle Metadata
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <GlassCard className="!p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Model</span>
                        <span className="text-sm font-bold text-white truncate">{inspection.vehicle.label}</span>
                    </GlassCard>
                    <GlassCard className="!p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Plate Number</span>
                        <span className="text-sm font-mono text-cyan truncate">{inspection.vehicle.plate}</span>
                    </GlassCard>
                    <GlassCard className="!p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">VIN</span>
                        <span className="text-sm font-mono text-gray-300 truncate">{inspection.vehicle.vin}</span>
                    </GlassCard>
                     <GlassCard className="!p-4 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Inspection Date</span>
                        <span className="text-sm font-mono text-gray-300 truncate">{inspection.date}</span>
                    </GlassCard>
                </div>
            </div>

            {/* Collapsible Certified Damages */}
            <div className="space-y-3">
                 <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Certified Findings
                </h3>
                <GlassCard className="!p-0 overflow-hidden">
                    <button 
                        onClick={() => setShowDamages(!showDamages)}
                        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${inspection.score > 70 ? 'from-green-500/20 to-green-900/20 text-green-400' : 'from-orange-500/20 to-orange-900/20 text-orange-400'}`}>
                                <Activity className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                                <span className="block text-sm font-bold text-white">
                                    {inspection.damages.length} Issues Certified
                                </span>
                                <span className="text-[10px] text-gray-500">Expand to view details</span>
                            </div>
                        </div>
                        <div className={`transition-transform duration-300 p-2 rounded-full bg-white/5 ${showDamages ? 'rotate-180' : ''}`}>
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        </div>
                    </button>
                    
                    {/* Expanded List */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showDamages ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-2 space-y-2 bg-black/20 border-t border-white/5">
                            {inspection.damages.map((d, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className={`p-2 rounded-lg ${getSeverityColor(d.severity)}`}>
                                        {getDamageIcon(d.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-bold text-white truncate">{d.type}</span>
                                            <Badge type={d.severity === DamageSeverity.HIGH ? 'warning' : 'success'} >{d.confidence}%</Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">{d.location}</p>
                                    </div>
                                </div>
                            ))}
                             {inspection.damages.length === 0 && (
                                <div className="p-4 text-center text-sm text-gray-500">No damages found. Vehicle is in perfect condition.</div>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </div>

            {/* On-Chain Metadata Block */}
            <div className="space-y-3">
                 <div className="flex justify-between items-end">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Hash className="w-4 h-4" /> On-Chain Data
                    </h3>
                    <button className="text-[10px] flex items-center gap-1 text-cyan hover:text-white transition-colors">
                        <Copy className="w-3 h-3" /> Copy JSON
                    </button>
                 </div>
                 <div className="rounded-xl bg-[#050814] border border-white/10 p-4 overflow-x-auto shadow-inner relative group">
                     <div className="absolute top-0 left-0 w-1 h-full bg-cardano/50"></div>
                     <pre className="text-[11px] font-mono leading-relaxed">
                        <span className="text-purple-400">{"{"}</span>
                        {"\n  "}<span className="text-cyan">"721"</span>: <span className="text-purple-400">{"{"}</span>
                        {"\n    "}<span className="text-cyan">"&lt;policy_id&gt;"</span>: <span className="text-purple-400">{"{"}</span>
                        {"\n      "}<span className="text-cyan">"HydraInspectVCT"</span>: <span className="text-purple-400">{"{"}</span>
                        {"\n        "}<span className="text-cyan">"name"</span>: <span className="text-green-400">"{inspection.vehicle.label}"</span>,
                        {"\n        "}<span className="text-cyan">"vin"</span>: <span className="text-green-400">"{inspection.vehicle.vin}"</span>,
                        {"\n        "}<span className="text-cyan">"score"</span>: <span className="text-orange-300">{inspection.score}</span>,
                        {"\n        "}<span className="text-cyan">"standard"</span>: <span className="text-green-400">"CIP-68"</span>
                        {"\n      "}<span className="text-purple-400">{"}"}</span>
                        {"\n    "}<span className="text-purple-400">{"}"}</span>
                        {"\n  "}<span className="text-purple-400">{"}"}</span>
                        {"\n"}<span className="text-purple-400">{"}"}</span>
                     </pre>
                 </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:grid grid-cols-2 gap-4 pt-4">
                <Button variant="secondary" className="gap-2 justify-center" onClick={() => window.open(`https://cardanoscan.io/transaction/${inspection.txHash}`, '_blank')}>
                     View on Explorer <ExternalLink className="w-4 h-4" />
                </Button>
                 <Button variant="outline" className="gap-2 justify-center text-gray-400 hover:text-white" onClick={onBack}>
                     Close
                </Button>
            </div>

        </div>
      </div>
    </div>
  );
};