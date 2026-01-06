
import React, { useState } from 'react';
import { FACTORIES, NPI_PROJECTS, MUST_WIN_PROJECTS, DEMAND_FORECAST_DATA, OWNERS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LineChart, Line, Legend, AreaChart, Area, ComposedChart, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Rocket, Wrench, Box, ShoppingCart, TrendingUp, ShieldCheck, Activity, Target, AlertTriangle, Coins, Briefcase, Truck, Globe, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const BusinessStreams: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'lead' | 'produce' | 'order' | 'source'>('lead');

  // --- 模拟数据处理 ---
  const leadScatterData = MUST_WIN_PROJECTS.map(p => ({ x: p.stageValue, y: p.revenue5Y, z: p.revenue5Y, ...p }));
  const demandProfile = DEMAND_FORECAST_DATA.all;

  const renderKPI = (label: string, value: string, sub: string, status: string) => (
    <div className="glass-panel p-5 rounded-xl border border-slate-700/50">
        <div className="text-slate-400 text-xs font-bold uppercase mb-2">{label}</div>
        <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${status === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {sub}
            </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('streams.title')}</h1>
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-700 mt-4 md:mt-0">
              {[
                { id: 'lead', icon: Rocket, label: 'L2R' },
                { id: 'produce', icon: Wrench, label: 'P2P' },
                { id: 'order', icon: Box, label: 'O2C' },
                { id: 'source', icon: ShoppingCart, label: 'S2P' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold uppercase transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-accent-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
          </div>
      </div>

      {/* 1. LEAD TO RAMP UP (L2R) */}
      {activeTab === 'lead' && (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {renderKPI('Must-Win Conv.', '22%', 'Tgt: 30%', 'critical')}
                {renderKPI('NPI Phase Gate', '85%', 'On Track', 'good')}
                {renderKPI('Spec Deviation', '1.2%', 'High', 'critical')}
                {renderKPI('Pipeline Value', '$450M', '+12%', 'good')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-panel p-6 rounded-2xl h-96">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Target className="text-accent-purple" /> {t('streams.lead.pipeline')}</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis type="number" dataKey="x" name="Stage" domain={[0, 6]} tickFormatter={(v) => ['', 'Initial', 'Quote', 'DFM', 'Bid', 'Won'][v]} stroke="#94a3b8" />
                            <YAxis type="number" dataKey="y" name="Rev" unit="M" stroke="#94a3b8" />
                            <ZAxis type="number" dataKey="z" range={[100, 800]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Projects" data={leadScatterData}>
                                {leadScatterData.map((e, i) => <Cell key={i} fill={e.status === 'Critical' ? '#EF4444' : '#10B981'} />)}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Activity className="text-accent-blue" /> NPI Tracking</h3>
                    <table className="w-full text-xs text-left">
                        <thead className="text-slate-500 border-b border-slate-700 uppercase">
                            <tr>
                                <th className="p-3">Project</th>
                                <th className="p-3">Phase</th>
                                <th className="p-3 text-right">Deviation</th>
                                <th className="p-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NPI_PROJECTS.map(npi => (
                                <tr key={npi.id} className="border-b border-slate-800/50">
                                    <td className="p-3 font-bold text-white">{npi.name}</td>
                                    <td className="p-3 text-slate-400">{npi.apqpPhase}</td>
                                    <td className={`p-3 text-right font-mono ${npi.specDeviation > 1 ? 'text-red-400' : 'text-green-400'}`}>{npi.specDeviation}%</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${npi.status === 'At Risk' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{npi.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {/* 2. PLAN TO PRODUCE (P2P) */}
      {activeTab === 'produce' && (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {renderKPI('OEE Avg', '82%', 'Tgt: 85%', 'warning')}
                {renderKPI('MPS Achieve', '92%', 'Fav', 'good')}
                {renderKPI('COQ Total', '$150k', 'High', 'critical')}
                {renderKPI('Extra Hours', '550h', 'Alert', 'critical')}
            </div>
            
            <div className="glass-panel p-6 rounded-2xl h-[500px]">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2"><Activity className="text-accent-green" /> Workshop Delivery Matrix</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={FACTORIES}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis yAxisId="left" stroke="#94a3b8" />
                        <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#94a3b8" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="outputValue" name="Output ($k)" fill="#2979FF" barSize={40} />
                        <Line yAxisId="right" type="monotone" dataKey="oee" name="OEE %" stroke="#00E676" strokeWidth={3} />
                        <Line yAxisId="right" type="monotone" dataKey="scrapRate" name="Scrap %" stroke="#FF3333" strokeDasharray="5 5" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
      )}

      {/* 3. ORDER TO CASH (O2C) */}
      {activeTab === 'order' && (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {renderKPI('Avg DSO', '58 Days', 'Tgt: 45', 'critical')}
                {renderKPI('OTD (Sign)', '99.1%', 'Fav', 'good')}
                {renderKPI('Volatility', '12%', 'Med', 'warning')}
                {renderKPI('Overdue AR', '$1.2M', 'Risk', 'critical')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-panel p-6 rounded-2xl lg:col-span-2 h-80">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-accent-blue" /> Demand Correction Visual</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={demandProfile.data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                            <XAxis dataKey="month" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="forecast" name="Sales Forecast" stroke="#FFEA00" strokeDasharray="5 5" dot={false} />
                            <Line type="monotone" dataKey="actual" name="Actual / Corrected" stroke="#10B981" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="glass-panel p-6 rounded-2xl bg-red-900/10 border-red-500/20">
                    <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Cash Leakage Points</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">Discounts & Rebates</span>
                            <span className="text-red-400 font-bold">-$45k</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">Premium Freight</span>
                            <span className="text-red-400 font-bold">-$12k</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span className="text-slate-400 text-sm">Quality Claims</span>
                            <span className="text-red-400 font-bold">-$28k</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* 4. SOURCE TO PAY (S2P) */}
      {activeTab === 'source' && ( activeTab === 'source' && (
        <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {renderKPI('PPV Fav.', '$125k', '+2%', 'good')}
                {renderKPI('DPO Avg', '65 Days', 'Fav', 'good')}
                {renderKPI('IQC Pass', '96.5%', 'Alert', 'warning')}
                {renderKPI('MRO Spend', '$45k', 'Over', 'critical')}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Coins className="text-accent-yellow" /> Commodity Market Monitor</h3>
                    <div className="h-64 bg-slate-900/50 rounded-xl border border-slate-700 flex items-center justify-center italic text-slate-500">
                        [Chart: Copper & Gold Real-time Pricing Feed]
                    </div>
                 </div>
                 <div className="glass-panel p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Briefcase className="text-accent-blue" /> CER Requests (CapEx)</h3>
                    <table className="w-full text-xs text-left">
                        <thead className="text-slate-500 border-b border-slate-700">
                            <tr>
                                <th className="p-3">Project</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">ROI (Yrs)</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-800/50">
                                <td className="p-3 font-bold text-white">Automation Ph 2</td>
                                <td className="p-3 text-slate-400">$450k</td>
                                <td className="p-3 text-slate-400">1.8</td>
                                <td className="p-3"><span className="text-green-400 font-bold">Approved</span></td>
                            </tr>
                            <tr className="border-b border-slate-800/50">
                                <td className="p-3 font-bold text-white">Plating Tank Upgrade</td>
                                <td className="p-3 text-slate-400">$120k</td>
                                <td className="p-3 text-slate-400">2.5</td>
                                <td className="p-3"><span className="text-yellow-400 font-bold">Pending</span></td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessStreams;
