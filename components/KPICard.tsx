
import React from 'react';
import { ArrowUpRight, ArrowDownRight, TriangleAlert } from 'lucide-react';
import { KPI } from '../types';
import { useLanguage } from '../LanguageContext';

interface KPICardProps {
  kpi: KPI;
  wbrMode: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, wbrMode }) => {
  const { t } = useLanguage();
  const isNegative = kpi.trend < 0;
  
  const translatedTitle = t(`kpi.${kpi.id}`, kpi.title);

  // In WBR mode, we emphasize the failure and the owner
  if (wbrMode) {
    if (kpi.status === 'good') return null; // Hide good KPIs in WBR mode

    return (
      <div className="bg-gradient-to-br from-red-900/40 to-slate-900 border border-red-500/50 rounded-xl p-5 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all animate-fade-in">
        {/* Glow Effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600 blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div>
            <h3 className="text-slate-300 text-xs font-bold uppercase tracking-wider">{translatedTitle}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">{kpi.value}</span>
                <span className="text-sm font-medium text-slate-400">{kpi.unit}</span>
            </div>
             <div className="text-xs text-slate-500 mt-1">{t('kpi.target')}: <span className="text-slate-300">{kpi.target}</span></div>
          </div>
          <img src={kpi.owner.avatar} alt={kpi.owner.name} className="w-12 h-12 rounded-full border-2 border-red-500 shadow-lg object-cover" title={`Owner: ${kpi.owner.name}`} />
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-red-500/30 relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <TriangleAlert size={14} className="text-red-500" />
                <span className="text-red-300 font-bold text-xs uppercase tracking-wide">{t('kpi.missed_target')}</span>
            </div>
            <p className="text-slate-200 text-sm italic mb-2 leading-relaxed">"{kpi.comment}"</p>
            {kpi.monetizationImpact && (
                <div className="text-xs font-mono font-bold text-ennovi-yellow bg-yellow-500/10 px-2 py-1.5 rounded border border-yellow-500/20 inline-block">
                    {t('kpi.impact')}: {kpi.monetizationImpact}
                </div>
            )}
        </div>
      </div>
    );
  }

  // Normal Mode
  return (
    <div className="glass-panel rounded-xl p-5 hover:border-slate-500 transition-all hover:translate-y-[-2px] hover:shadow-lg group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-slate-400 group-hover:text-slate-200 transition-colors text-sm font-bold uppercase tracking-wide h-10 line-clamp-2">{translatedTitle}</h3>
        <span className={`p-1.5 rounded-full ${kpi.status === 'critical' ? 'bg-red-500/10' : kpi.status === 'warning' ? 'bg-orange-500/10' : 'bg-emerald-500/10'}`}>
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${kpi.status === 'critical' ? 'bg-red-500 shadow-red-500' : kpi.status === 'warning' ? 'bg-orange-500 shadow-orange-500' : 'bg-emerald-500 shadow-emerald-500'}`}></div>
        </span>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white tracking-tight">{kpi.value}</span>
        <span className="text-sm font-medium text-slate-500">{kpi.unit}</span>
      </div>

      <div className="flex items-center justify-between mt-4 border-t border-slate-700/50 pt-3">
         <div className="flex items-center gap-2">
            <div className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${isNegative ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {isNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                <span>{Math.abs(kpi.trend)}%</span>
            </div>
            <span className="text-[10px] uppercase text-slate-600 font-bold">{t('kpi.vs_py')}</span>
         </div>
         {/* Mini Impact Badge for Critical items even in normal mode */}
         {kpi.status === 'critical' && (
             <span className="text-[10px] font-mono text-red-400 opacity-80">! Impact High</span>
         )}
      </div>
    </div>
  );
};

export default KPICard;
