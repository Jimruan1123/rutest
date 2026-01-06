
import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { Network, Handshake, Shield, Zap, TrendingUp, Users, Calendar, Megaphone, CheckCircle2, Factory, Filter } from 'lucide-react';
import { SUPPLIER_MATRIX_DATA, STRATEGIC_SUPPLIERS, STRATEGIC_CUSTOMERS, CUSTOMER_FUNNEL_DATA, ENGAGEMENT_TIMELINE } from '../constants';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ZAxis } from 'recharts';

const EntityHealth: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFunnelTier, setSelectedFunnelTier] = useState<string | null>(null);

  // Helper to translate tags
  const getTagLabel = (tag: string) => {
      const cleanTag = tag.replace('#', '');
      const transKey = `health.tag_${cleanTag.toLowerCase()}`;
      // Fallback if no translation found, just return original tag
      const translated = t(transKey, tag);
      return translated.startsWith('health.tag') ? tag : `#${translated}`;
  };

  const getPartnerColor = (subType: string) => {
      if (['Core', 'Strategic', 'Star'].includes(subType)) return 'border-ennovi-yellow shadow-[0_0_10px_rgba(255,215,0,0.1)]';
      if (['Important', 'CashCow'].includes(subType)) return 'border-blue-500';
      return 'border-slate-600';
  };

  // Filter customers based on Funnel Selection
  const filteredCustomers = selectedFunnelTier 
    ? STRATEGIC_CUSTOMERS.filter(c => {
        if (selectedFunnelTier.includes('Strategic')) return c.subType === 'Core';
        if (selectedFunnelTier.includes('Emerging')) return c.subType === 'Strategic';
        if (selectedFunnelTier.includes('Long Tail')) return c.subType === 'Important';
        return true;
    })
    : STRATEGIC_CUSTOMERS;

  // Combine and Sort Engagement Timeline
  const sortedTimeline = [...ENGAGEMENT_TIMELINE].sort((a, b) => {
      // Simple date parser for "MMM DD" format assuming current year
      const dateA = new Date(`${a.date} 2024`).getTime();
      const dateB = new Date(`${b.date} 2024`).getTime();
      return dateA - dateB;
  });

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <h1 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
          {t('health.title')}
      </h1>

      {/* 1. TOP: Ecosystem Pulse (Resilience & Relationship) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier Resilience */}
          <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-blue-500 relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                       <Shield size={16} className="text-blue-500" />
                       {t('health.supply_res')}
                   </div>
                   <div className="text-4xl font-bold text-white mb-1">85 <span className="text-sm font-normal text-slate-400">/ 100</span></div>
                   <div className="text-xs text-green-400 font-bold flex items-center gap-1">
                       <TrendingUp size={12} /> +2.5 vs Q2
                   </div>
               </div>
               <div className="flex gap-4">
                   <div className="text-right">
                       <div className="text-xs text-slate-500 font-bold uppercase">Tech Dep.</div>
                       <div className="text-lg font-bold text-white">High</div>
                   </div>
                   <div className="text-right">
                       <div className="text-xs text-slate-500 font-bold uppercase">Stability</div>
                       <div className="text-lg font-bold text-green-400">Stable</div>
                   </div>
               </div>
          </div>

          {/* Customer Relationship */}
          <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-purple-500 relative overflow-hidden group">
               <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div>
                   <div className="text-sm font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                       <Handshake size={16} className="text-purple-500" />
                       {t('health.share_wallet')}
                   </div>
                   <div className="text-4xl font-bold text-white mb-1">35%</div>
                   <div className="text-xs text-purple-400 font-bold flex items-center gap-1">
                       {t('health.nps')}: +50
                   </div>
               </div>
               <div className="text-right max-w-[150px]">
                   <div className="text-xs text-slate-400 leading-tight">
                       "Strategic Partner status confirmed for Next-Gen Platform"
                   </div>
               </div>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* LEFT: SUPPLIER STRATEGY */}
          <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Factory className="text-blue-500" size={24} />
                  {t('health.supplier_strategy')}
              </h2>

              {/* Matrix Chart */}
              <div className="glass-panel p-4 rounded-xl relative h-96">
                  <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 z-10">{t('health.supplier_matrix')}</div>
                  <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                          <XAxis type="number" dataKey="innovation" name="Innovation" stroke="#94a3b8" tick={{fontSize: 10}} domain={[0, 100]} label={{ value: t('health.x_axis'), position: 'bottom', fill: '#64748b', fontSize: 10 }} />
                          <YAxis type="number" dataKey="collaboration" name="Collaboration" stroke="#94a3b8" tick={{fontSize: 10}} domain={[0, 100]} label={{ value: t('health.y_axis'), angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                          <ZAxis type="number" dataKey="spend" range={[100, 600]} name="Spend" />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }} 
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs">
                                            <p className="font-bold text-white">{data.name}</p>
                                            <p className="text-slate-400">{data.category}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                          />
                          <ReferenceLine x={50} stroke="#64748b" strokeDasharray="3 3" />
                          <ReferenceLine y={50} stroke="#64748b" strokeDasharray="3 3" />
                          <Scatter name="Suppliers" data={SUPPLIER_MATRIX_DATA} fill="#3b82f6">
                              {SUPPLIER_MATRIX_DATA.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={
                                      entry.category === 'Star' ? '#eab308' : 
                                      entry.category === 'CashCow' ? '#3b82f6' : 
                                      entry.category === 'Question' ? '#a855f7' : '#ef4444'
                                  } />
                              ))}
                          </Scatter>
                      </ScatterChart>
                  </ResponsiveContainer>
                  {/* Quadrant Labels */}
                  <div className="absolute top-4 right-4 text-[10px] font-bold text-yellow-500 bg-yellow-900/20 px-1 rounded">STAR</div>
                  <div className="absolute top-4 left-12 text-[10px] font-bold text-purple-500 bg-purple-900/20 px-1 rounded">QUESTION</div>
                  <div className="absolute bottom-10 right-4 text-[10px] font-bold text-blue-500 bg-blue-900/20 px-1 rounded">CASH COW</div>
                  <div className="absolute bottom-10 left-12 text-[10px] font-bold text-red-500 bg-red-900/20 px-1 rounded">ELIMINATE</div>
              </div>

              {/* Strategic Profile Cards - Scrollable */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                  {STRATEGIC_SUPPLIERS.map(partner => (
                      <div key={partner.id} className={`glass-panel p-5 rounded-xl border-l-4 ${getPartnerColor(partner.subType)}`}>
                          <div className="flex justify-between items-start mb-3">
                              <div>
                                  <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-white">{partner.name}</span>
                                      <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 rounded-full">{partner.subType}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                      {partner.tags.map(tag => (
                                          <span key={tag} className="text-[10px] font-mono font-bold text-blue-300 bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-500/20">
                                              {getTagLabel(tag)}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                              <div className="text-right">
                                  <div className="text-xs text-slate-500 font-bold uppercase">{t('health.score')}</div>
                                  <div className={`text-xl font-bold font-mono ${partner.score >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>{partner.score}</div>
                              </div>
                          </div>
                          
                          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 mt-2">
                              <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 flex items-center gap-1">
                                  <Zap size={10} className="text-ennovi-yellow" /> {t('health.key_changes')}
                              </div>
                              {partner.changes.map((change, idx) => (
                                  <div key={idx} className="flex gap-2 text-xs mb-1 last:mb-0">
                                      <span className={`font-bold min-w-[70px] ${
                                          change.type === 'Risk' ? 'text-red-400' : 
                                          change.type === 'Tech' ? 'text-purple-400' : 'text-blue-400'
                                      }`}>
                                          {change.type}:
                                      </span>
                                      <span className="text-slate-300">{change.desc}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* RIGHT: CUSTOMER STRATEGY */}
          <div className="space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-2">
                  <Users className="text-purple-500" size={24} />
                  {t('health.cust_strategy')}
              </h2>

              {/* Value Pyramid (Funnel visual using stacked vertical layout with click interaction) */}
              <div className="glass-panel p-6 rounded-xl flex flex-col justify-center gap-2 h-96 relative bg-slate-900/40">
                  <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 flex items-center gap-2">
                      {t('health.cust_pyramid')}
                      {selectedFunnelTier && (
                          <button 
                            onClick={() => setSelectedFunnelTier(null)}
                            className="text-[10px] text-red-400 flex items-center hover:underline"
                          >
                              (Clear Filter)
                          </button>
                      )}
                  </div>
                  {CUSTOMER_FUNNEL_DATA.map((item, idx) => {
                      // Visual scaling width based on revenue share roughly
                      const widthClass = idx === 0 ? 'w-2/3' : idx === 1 ? 'w-3/4' : 'w-full';
                      const isSelected = selectedFunnelTier === item.tier;
                      const opacityClass = selectedFunnelTier && !isSelected ? 'opacity-40 grayscale' : 'opacity-100';
                      
                      const bgClass = idx === 0 ? 'bg-gradient-to-r from-ennovi-yellow/80 to-yellow-600/80 border-yellow-500/50' : 
                                      idx === 1 ? 'bg-gradient-to-r from-blue-600/60 to-blue-800/60 border-blue-500/50' : 
                                                  'bg-gradient-to-r from-purple-600/40 to-purple-800/40 border-purple-500/50';
                      
                      return (
                          <div 
                            key={idx} 
                            onClick={() => setSelectedFunnelTier(isSelected ? null : item.tier)}
                            className={`mx-auto ${widthClass} p-4 rounded-lg border shadow-lg relative group transition-all cursor-pointer hover:scale-105 ${bgClass} ${opacityClass}`}
                          >
                              <div className="flex justify-between items-center text-white pointer-events-none">
                                  <div>
                                      <div className="font-bold text-sm uppercase tracking-wide text-white shadow-black drop-shadow-md flex items-center gap-2">
                                          {item.tier}
                                          {isSelected && <Filter size={12} className="text-white animate-pulse" />}
                                      </div>
                                      <div className="text-[10px] text-white/80">{item.desc}</div>
                                  </div>
                                  <div className="text-right">
                                      <div className="text-lg font-bold shadow-black drop-shadow-md">{item.count}</div>
                                      <div className="text-[10px] font-mono">{item.growth}% Growth</div>
                                  </div>
                              </div>
                          </div>
                      );
                  })}
              </div>

              {/* Strategic Profile Cards - Filtered List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 min-h-[300px]">
                  {filteredCustomers.length === 0 ? (
                      <div className="text-center text-slate-500 py-10 italic">No customers match selection</div>
                  ) : filteredCustomers.map(partner => (
                      <div key={partner.id} className={`glass-panel p-5 rounded-xl border-l-4 ${getPartnerColor(partner.subType)} animate-fade-in`}>
                          <div className="flex justify-between items-start mb-3">
                              <div>
                                  <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-white">{partner.name}</span>
                                      <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 rounded-full">{partner.subType}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                      {partner.tags.map(tag => (
                                          <span key={tag} className="text-[10px] font-mono font-bold text-purple-300 bg-purple-900/30 px-1.5 py-0.5 rounded border border-purple-500/20">
                                              {getTagLabel(tag)}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                              <div className="text-right">
                                  <div className="text-xs text-slate-500 font-bold uppercase">{t('health.score')}</div>
                                  <div className={`text-xl font-bold font-mono ${partner.score >= 90 ? 'text-green-400' : 'text-blue-400'}`}>{partner.score}</div>
                              </div>
                          </div>
                          
                          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 mt-2">
                              <div className="text-[10px] text-slate-400 font-bold uppercase mb-2 flex items-center gap-1">
                                  <Zap size={10} className="text-ennovi-yellow" /> {t('health.key_changes')}
                              </div>
                              {partner.changes.map((change, idx) => (
                                  <div key={idx} className="flex gap-2 text-xs mb-1 last:mb-0">
                                      <span className={`font-bold min-w-[70px] ${
                                          change.type === 'Risk' ? 'text-red-400' : 
                                          change.type === 'Strategy' ? 'text-purple-400' : 'text-green-400'
                                      }`}>
                                          {change.type}:
                                      </span>
                                      <span className="text-slate-300">{change.desc}</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 4. BOTTOM: C-LEVEL ENGAGEMENT TIMELINE (Vertical & Chronological) */}
      <div className="glass-panel p-8 rounded-2xl border-t border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Network className="text-ennovi-yellow" size={24} />
              {t('health.timeline_title')}
          </h2>
          
          <div className="relative pl-8 border-l-2 border-slate-700 ml-4 space-y-8">
              {sortedTimeline.map((event, index) => {
                  const isFuture = event.status === 'Future';
                  return (
                      <div key={event.id} className="relative group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                          {/* Node on Timeline */}
                          <div className={`absolute -left-[41px] top-4 w-5 h-5 rounded-full border-4 border-slate-900 z-10 ${
                              isFuture ? 'bg-blue-500 ring-2 ring-blue-500/30' : 'bg-green-500 ring-2 ring-green-500/30'
                          }`}></div>
                          
                          {/* Card */}
                          <div className={`glass-panel p-4 rounded-xl border-l-4 transition-all hover:translate-x-2 ${
                              isFuture ? 'border-blue-500 bg-blue-900/10' : 'border-green-500 bg-green-900/10'
                          }`}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div>
                                      <div className="flex items-center gap-3 mb-1">
                                          <span className="text-sm font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">{event.date}</span>
                                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                              isFuture ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                                          }`}>
                                              {event.type}
                                          </span>
                                          {isFuture && <span className="text-[10px] text-slate-500 italic flex items-center gap-1"><Calendar size={10} /> Upcoming</span>}
                                      </div>
                                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                          {event.partner} <span className="text-slate-500 text-sm font-normal">| {event.title}</span>
                                      </h3>
                                  </div>
                                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 min-w-[200px]">
                                      <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                                          {isFuture ? 'Preparation / Focus' : 'Outcome / Result'}
                                      </div>
                                      <div className={`text-sm italic ${isFuture ? 'text-blue-200' : 'text-green-200'}`}>
                                          "{isFuture ? event.prep : event.outcome}"
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};

export default EntityHealth;
