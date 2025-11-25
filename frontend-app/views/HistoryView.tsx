import React from 'react';
import { ChevronRight, Search, Trash2 } from 'lucide-react';
import { GlassCard } from '../components/UI';
import { InspectionRecord } from '../types';

// Use public folder image
const carThumbnail = '/car-pp.png';

interface HistoryViewProps {
  inspections: InspectionRecord[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ inspections, onSelect, onDelete }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-24">
      <div className="sticky top-0 z-30 bg-[#0A0F24]/95 backdrop-blur-xl pt-2 pb-4 border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0 md:static md:border-none md:bg-transparent">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold">History</h2>
          <div className="text-xs text-gray-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">{inspections.length} RECORDS</div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by plate, VIN or ID..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-cyan/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="space-y-3">
        {inspections.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <p className="text-gray-500">No inspections found.</p>
          </div>
        ) : (
          inspections.map((inspection) => (
            <GlassCard
              key={inspection.id}
              className="!p-3 flex items-center gap-4 active:scale-[0.98] transition-transform hover:bg-white/10 group cursor-pointer border-white/5"
              onClick={() => onSelect(inspection.id)}
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shrink-0 border border-white/10 relative">
                <img
                  src={inspection.imageUrl || carThumbnail}
                  alt={inspection.vehicle.label}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = carThumbnail;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm text-white truncate">{inspection.vehicle.label}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[11px] text-gray-500 font-mono">{inspection.vehicle.plate}</p>
                  <span className="text-[10px] text-gray-600">•</span>
                  <span className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${inspection.status === 'Minted'
                    ? 'bg-cardano/10 text-cyan border-cardano/30 shadow-[0_0_8px_rgba(0,51,173,0.2)]'
                    : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                    }`}>
                    {inspection.status === 'Minted' && <div className="w-1 h-1 rounded-full bg-cyan animate-pulse"></div>}
                    {inspection.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border shadow-lg ${inspection.score > 70
                  ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-green-500/10'
                  : 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-orange-500/10'
                  }`}>
                  {inspection.score}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(`Delete inspection for ${inspection.vehicle.label}?`)) {
                      onDelete(inspection.id);
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                  title="Delete inspection"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <ChevronRight className="text-gray-600 w-4 h-4 group-hover:text-white transition-colors" />
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};