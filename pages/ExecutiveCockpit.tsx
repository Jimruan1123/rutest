
import React, { useState } from 'react';
import { EXECUTIVE_KPIS, ISSUES_MATRIX, CUSTOMER_PROFITABILITY, EBITDA_BRIDGE_DATA, REVENUE_EBIT_TREND, FINANCIAL_TABLE_DATA, DAILY_PULSE_DATA, EHS_RISKS, MUST_WIN_PROJECTS, ENGAGEMENT_TIMELINE, WBR_FINANCIAL_TABLE, CUSTOMER_COMPLAINTS_DATA, NEW_WON_PROJECTS_DATA } from '../constants';
import KPICard from '../components/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList, ComposedChart, Line, Legend } from 'recharts';
import { CircleAlert, Activity, ChevronRight, Users, Layers, ExternalLink, ArrowUpRight, ArrowDownRight, Info, CircleHelp, Globe, Flame, CheckCircle2, ChevronLeft, Lightbulb, Zap, Target, CalendarDays, TrendingUp, AlertTriangle, User, MessageSquareWarning, Award, Clock, Plus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTasks } from '../TaskContext';

interface ExecutiveCockpitProps {
  onNavigate: (page: string) => void;
}

type ViewMode = 'pulse' | 'dashboard' | 'wbr';

const ExecutiveCockpit: React.FC<ExecutiveCockpitProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [wbrStep, setWbrStep] = useState(0); // 0: Safety, 1: Key Focus, 2: Red Flags, 3: Finance, 4: Actions
  const { t } = useLanguage();
  const { openTaskModal, tasks } = useTasks();

  // Filter tasks for "Action Tracker Review"
  const recentCompletedTasks = tasks.filter(t => t.status === 'Closed').slice(0, 3);
  const overdueTasks = tasks.filter(t => (t.daysOverdue || 0) > 0).slice(0, 3);

  // Prepare Waterfall Data for Stacked Bar Approach
  let currentTotal = 0;
  const waterfallData = EBITDA_BRIDGE_DATA.map((item, index) => {
      const isTotal = index === 0 || index === EBITDA_BRIDGE_DATA.length - 1;
      let placeholder = 0;
      let val = 0;

      if (isTotal) {
          currentTotal = item.value;
          val = item.value;
          placeholder = 0;
      } else {
          const prevTotal = currentTotal;
          currentTotal += item.value;
          const isPositive = item.value >= 0;
          placeholder = isPositive ? prevTotal : currentTotal;
          val = Math.abs(item.value);
      }

      return {
          name: item.name,
          value: val,
          placeholder: placeholder,
          originalValue: item.value,
          fill: item.fill, // Assuming constants.ts has updated Neon colors
          isTotal: isTotal
      };
  });

  const criticalIssues = ISSUES_MATRIX.filter(i => i.urgency === 'High' && i.importance === 'High').length;

  const wbrSlides = [
      { id: 'safety', title: t('wbr.slide_safety'), icon: Flame, color: 'text-accent-green' },
      { id: 'keyfocus', title: t('wbr.slide_keyfocus'), icon: Target, color: 'text-accent-purple' },
      { id: 'redflags', title: t('wbr.slide_redflags'), icon: CircleAlert, color: 'text-accent-red' },
      { id: 'finance', title: t('wbr.slide_finance'), icon: Activity, color: 'text-accent-blue' },
      { id: 'actions', title: t('wbr.slide_actions'), icon: CheckCircle2, color: 'text-ennovi-yellow' },
  ];

  const nextSlide = () => {
      if (wbrStep < wbrSlides.length - 1) setWbrStep(wbrStep + 1);
  };

  const prevSlide = () => {
      if (wbrStep > 0) setWbrStep(wbrStep - 1);
  };

  // Filter for Key Focus Slide
  const criticalProjects = MUST_WIN_PROJECTS.filter(p => p.status === 'Critical' || p.revenue5Y > 30).slice(0, 4);
  const keyEvents = ENGAGEMENT_TIMELINE.filter(e => e.status === 'Future' || e.status === 'Past').slice(0, 4);
  
  // Current Month Labor Data (Assuming Aug is current)
  const currentMonthData = REVENUE_EBIT_TREND.find(d => d.month === 'Aug') || REVENUE_EBIT_TREND[0];

  // Custom Tooltip for Revenue Chart to color EBIT % Blue
  const CustomRevenueTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-xl text-xs z-[1000] relative">
          <p className="font-bold text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
             // Handle Unit Display
             let unit = entry.unit || '';
             if (entry.name === 'EBIT %') unit = '%';
             if (entry.name === 'Human Eff. (Act)' || entry.name === 'Human Eff. (Fcst)') unit = 'k/p';
             
             return (
                <div key={index} className="flex justify-between items-center gap-4 mb-1">
                  <span style={{ color: entry.color }}>{entry.name}:</span>
                  <span className={`font-mono font-bold ${entry.name === 'EBIT %' ? 'text-accent-blue' : 'text-slate-200'}`}>
                    {entry.value}{unit}
                  </span>
                </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const handleAssignTask = (item: any) => {
      openTaskModal({
          title: `Investigate: ${item.description}`,
          urgency: 'High',
          importance: 'High',
          ownerDept: 'Finance', // Default based on page context or item
          financialImpact: item.olPct,
          resolutionIdea: `Financial variance detected. Insight: ${item.insight}.`,
          autoGenerated: true,
          sourceStream: 'Produce' // Assuming financial data comes from production results mostly
      });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 w-full max-w-full">
      {/* Top Bar Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 bg-accent-blue/10 blur-[60px] rounded-full pointer-events-none"></div>
        
        <div className="mb-4 md:mb-0 relative z-10">
            <h1 className="text-3xl font-bold text-white tracking-tight">{t('cockpit.title')}</h1>
            <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,230,118,0.6)]"></span>
                <p className="text-slate-300 text-sm font-medium">{t('cockpit.subtitle')}</p>
            </div>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
            {/* View Mode Toggle Buttons */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                <button 
                    onClick={() => setViewMode('pulse')}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${viewMode === 'pulse' ? 'bg-accent-purple text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Zap size={14} /> {t('cockpit.daily_pulse')}
                </button>
                <button 
                    onClick={() => setViewMode('dashboard')}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${viewMode === 'dashboard' ? 'bg-accent-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Activity size={14} /> {t('cockpit.financial_health')}
                </button>
                <button 
                    onClick={() => setViewMode('wbr')}
                    className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${viewMode === 'wbr' ? 'bg-ennovi-yellow text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                    <Layers size={14} /> {t('cockpit.wbr_mode')}
                </button>
            </div>

            <div className="h-8 w-px bg-slate-700 mx-2"></div>

            {/* Critical Issues - Clickable Drill-down */}
            <div 
                onClick={() => onNavigate('action')}
                className="flex items-center gap-3 px-4 py-2 bg-accent-red/20 rounded-lg border border-accent-red/30 backdrop-blur-sm transition-all hover:bg-accent-red/30 cursor-pointer group/alert"
            >
                <div className="relative">
                    <CircleAlert className="text-accent-red" size={20} />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-red"></span>
                    </span>
                </div>
                <div>
                    <span className="block text-xl font-bold text-white leading-none">{criticalIssues}</span>
                </div>
            </div>
        </div>
      </div>

      {/* --- MODE 1: DAILY PULSE (GM Morning Brief) --- */}
      {viewMode === 'pulse' && (
          <div className="animate-fade-in space-y-6">
              {/* AI Summary Card */}
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-accent-blue bg-gradient-to-r from-slate-900 to-slate-800">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Lightbulb className="text-ennovi-yellow" size={20} />
                      {t('pulse.ai_summary')}
                  </h2>
                  <div className="text-slate-300 text-sm leading-relaxed font-medium">
                      {DAILY_PULSE_DATA.aiSummary.split('**').map((part, i) => 
                          i % 2 === 1 ? <span key={i} className="text-white font-bold bg-accent-blue/30 px-1 rounded">{part}</span> : part
                      )}
                  </div>
              </div>

              {/* Row 2: Revenue Status & Top Fires */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Pulse Card (MTD vs Outlook Pace) */}
                  <div className={`glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between border-t-4 ${DAILY_PULSE_DATA.mtdRevenue.status === 'bad' ? 'border-accent-red' : 'border-accent-green'}`}>
                      <div className="absolute top-0 right-0 p-8 bg-white/5 blur-[50px] rounded-full pointer-events-none"></div>
                      
                      <div className="relative z-10">
                          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('pulse.mtd_sales')}</div>
                          <div className="text-4xl font-black text-white mb-1 flex items-baseline gap-2">
                              ${(DAILY_PULSE_DATA.mtdRevenue.val / 1000).toFixed(1)}M
                              <span className={`text-sm font-bold px-2 py-0.5 rounded ${DAILY_PULSE_DATA.mtdRevenue.status === 'bad' ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
                                  {t('pulse.vs_schedule')}
                              </span>
                          </div>
                          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                              <div 
                                className={`h-full ${DAILY_PULSE_DATA.mtdRevenue.status === 'bad' ? 'bg-accent-red' : 'bg-accent-green'}`} 
                                style={{ width: `${(DAILY_PULSE_DATA.mtdRevenue.val / 13000) * 100}%` }} // Assuming 13M is total outlook for progress bar visual
                              ></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                              <span>Act: ${DAILY_PULSE_DATA.mtdRevenue.val}k</span>
                              <span>Target (Time): ${DAILY_PULSE_DATA.mtdRevenue.target}k</span>
                          </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-700/50">
                          <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-400 uppercase">{t('pulse.yesterday_sales')}</span>
                              <span className="text-xl font-bold text-white font-mono">${DAILY_PULSE_DATA.yesterdayRevenue}k</span>
                          </div>
                      </div>
                  </div>

                  {/* Today's Fires */}
                  <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border-t-4 border-accent-orange">
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Flame className="text-accent-orange" size={16} />
                          {t('pulse.top_fires')}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {DAILY_PULSE_DATA.topFires.map((fire, idx) => (
                              <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col justify-between h-full hover:border-accent-orange/50 transition-colors">
                                  <div>
                                      <div className="flex justify-between mb-2">
                                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                                              fire.status === 'Critical' ? 'bg-accent-red/20 text-accent-red border-accent-red/30' : 'bg-accent-blue/20 text-accent-blue border-accent-blue/30'
                                          }`}>
                                              {fire.status}
                                          </span>
                                      </div>
                                      <div className="text-white font-bold text-sm leading-tight mb-2">{fire.title}</div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
                                      <div className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-[10px] text-white">
                                          {fire.owner.charAt(0)}
                                      </div>
                                      <span className="text-[10px] text-slate-400">{fire.owner}</span>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Row 3: Complaints & New Won */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Complaints Board */}
                  <div className="glass-panel p-6 rounded-2xl border-t-4 border-accent-red">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <MessageSquareWarning className="text-accent-red" size={20} />
                              {t('pulse.complaints')}
                          </h3>
                          <div className="text-xs font-bold bg-accent-red/10 text-accent-red px-2 py-1 rounded">
                              {CUSTOMER_COMPLAINTS_DATA.length} Open
                          </div>
                      </div>
                      <div className="space-y-3">
                          {CUSTOMER_COMPLAINTS_DATA.map(cc => (
                              <div key={cc.id} className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 flex items-start gap-4">
                                  <div className="bg-slate-900 p-2 rounded-lg text-center min-w-[60px] border border-slate-600">
                                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Open</div>
                                      <div className="text-lg font-bold text-accent-red">{cc.daysOpen}</div>
                                      <div className="text-[9px] text-slate-500">Days</div>
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start mb-1">
                                          <span className="text-sm font-bold text-white">{cc.customer} - {cc.issue}</span>
                                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                              cc.status === 'Open' ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-yellow/20 text-accent-yellow'
                                          }`}>{cc.status}</span>
                                      </div>
                                      <p className="text-xs text-slate-400 mb-2">{cc.description}</p>
                                      <div className="flex items-center gap-2">
                                          <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                                              <User size={10} /> {cc.owner}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* NEW WON Projects Showcase */}
                  <div className="glass-panel p-6 rounded-2xl border-t-4 border-ennovi-yellow bg-gradient-to-br from-slate-900 to-slate-900/50">
                      <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                              <Award className="text-ennovi-yellow" size={20} />
                              {t('pulse.new_won')}
                          </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {NEW_WON_PROJECTS_DATA.map(project => (
                              <div key={project.id} className="relative group overflow-hidden rounded-xl border border-slate-600 hover:border-ennovi-yellow transition-all">
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
                                  <img src={project.image} alt={project.project} className="w-full h-32 object-cover opacity-60 group-hover:opacity-80 transition-opacity transform group-hover:scale-105 duration-500" />
                                  <div className="absolute bottom-0 left-0 w-full p-3 z-20">
                                      <div className="text-[10px] font-bold text-ennovi-yellow uppercase mb-1">{project.customer}</div>
                                      <div className="text-sm font-bold text-white leading-tight mb-2">{project.project}</div>
                                      <div className="flex justify-between items-center text-[10px] text-slate-300">
                                          <div className="flex flex-col">
                                              <span className="text-slate-500 uppercase font-bold text-[8px]">{t('pulse.revenue')}</span>
                                              <span className="font-mono font-bold">${project.revenue}M</span>
                                          </div>
                                          <div className="flex flex-col text-right">
                                              <span className="text-slate-500 uppercase font-bold text-[8px]">{t('pulse.sop')}</span>
                                              <span className="font-mono">{project.sop}</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* --- MODE 2: STANDARD DASHBOARD (Financial Health) --- */}
      {viewMode === 'dashboard' && (
        <div className="animate-fade-in space-y-6">
            {/* Financial Performance Table (Summary MTD/YTD) */}
            <div className="glass-panel p-0 rounded-2xl border border-slate-700/50 relative shadow-2xl">
                <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-900/40 backdrop-blur-md flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="p-2 bg-ennovi-yellow rounded-lg text-slate-900 shadow-lg shadow-ennovi-yellow/20">
                            <Activity size={20} />
                        </div>
                        {t('cockpit.financial_summary')}
                    </h3>
                    <div className="flex gap-4 items-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Unit: <span className="text-white">KUSD</span> / Comparison vs Last Year
                        </div>
                        <div className="flex gap-2 text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                            <Globe size={14} /> Global View
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 2xl:grid-cols-2 divide-y 2xl:divide-y-0 2xl:divide-x divide-slate-700/50">
                    {/* MTD Table */}
                    <div className="p-4 md:p-6 w-full relative">
                        <h4 className="text-sm font-bold text-accent-blue uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent-blue rounded-full"></span>
                            {t('cockpit.mtd')}
                        </h4>
                        <div className="overflow-x-auto md:overflow-visible">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-slate-500 text-[10px] md:text-[11px] uppercase tracking-wide text-right font-semibold">
                                        <th className="text-left py-2 pl-4 pr-2 w-[25%]">Item</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.act')}</th>
                                        <th className="py-2 px-2 w-[15%] hidden sm:table-cell">{t('cockpit.ol')}</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.vs_ol')}</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.vs_budget')}</th>
                                        <th className="py-2 px-2 w-[15%] hidden md:table-cell">{t('cockpit.vs_fy25')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/30">
                                    {FINANCIAL_TABLE_DATA.mtd.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors group h-16 border-b border-slate-800/30 last:border-0 relative z-0 hover:z-10">
                                            <td className="py-0 pl-4 pr-2 text-slate-200 font-bold text-xs md:text-sm align-middle leading-snug w-[25%]">{row.label}</td>
                                            <td className="py-0 px-2 text-right font-bold text-white font-mono text-xs md:text-base align-middle w-[15%]">{row.vals[0]}</td>
                                            <td className="py-0 px-2 text-right text-slate-400 font-mono hidden sm:table-cell text-xs md:text-sm align-middle w-[15%]">
                                                {row.vals[1]}
                                            </td>
                                            {row.vars.map((v, vIdx) => {
                                                const isVsOutlook = vIdx === 0;
                                                const isVsFy25 = vIdx === 2;
                                                const showTooltip = isVsOutlook && row.outlookAnalysis && row.outlookAnalysis.length > 0;

                                                return (
                                                    <td key={vIdx} className={`py-0 px-2 text-right align-middle relative w-[15%] ${isVsFy25 ? 'hidden md:table-cell' : ''}`}>
                                                        <div className="relative group/tooltip inline-block">
                                                            <div className={`flex items-center justify-end gap-0.5 font-medium ${v.dir === 'up' ? 'text-accent-green bg-accent-green/10' : 'text-accent-red bg-accent-red/10'} px-1.5 py-0.5 rounded-md w-fit ml-auto ${showTooltip ? 'cursor-help border-b border-dotted border-slate-500/50' : ''} text-[10px] md:text-xs`}>
                                                                {v.dir === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                                                {v.val}
                                                                {showTooltip && <CircleHelp size={10} className="text-slate-400 ml-1 opacity-50 hidden md:inline" />}
                                                            </div>
                                                            
                                                            {showTooltip && (
                                                                <div className="absolute bottom-full right-0 mb-2 w-72 bg-slate-900 border border-slate-500 rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[9999] pointer-events-none translate-y-2 group-hover/tooltip:translate-y-0 hidden md:block">
                                                                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 pb-2 border-b border-slate-700 flex justify-between items-center">
                                                                        <span>{t('cockpit.drivers')}</span>
                                                                        <Activity size={12} className="text-ennovi-yellow" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {row.outlookAnalysis && row.outlookAnalysis.map((item, i) => (
                                                                            <div key={i} className="flex justify-between items-center text-xs">
                                                                                <span className="text-slate-400 flex items-center gap-2">
                                                                                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-500 border border-slate-700">{i+1}</span>
                                                                                    {item.reason}
                                                                                </span>
                                                                                <span className={`font-mono font-bold ${item.impact.startsWith('+') || item.impact === '0.0%' ? 'text-slate-400' : 'text-accent-red'}`}>
                                                                                    {item.impact}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="absolute -bottom-1 right-4 w-3 h-3 bg-slate-900 border-r border-b border-slate-500 rotate-45"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* YTD Table */}
                    <div className="p-4 md:p-6 w-full">
                        <h4 className="text-sm font-bold text-accent-purple uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent-purple rounded-full"></span>
                            {t('cockpit.ytd')}
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-slate-500 text-[10px] md:text-[11px] uppercase tracking-wide text-right font-semibold">
                                        <th className="text-left py-2 pl-4 pr-2 w-[25%]">Item</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.act')}</th>
                                        <th className="py-2 px-2 w-[15%] hidden sm:table-cell">{t('cockpit.budget')}</th>
                                        <th className="py-2 px-2 w-[15%] hidden md:table-cell">{t('cockpit.fy25')}</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.vs_budget')}</th>
                                        <th className="py-2 px-2 w-[15%]">{t('cockpit.vs_fy25')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/30">
                                    {FINANCIAL_TABLE_DATA.ytd.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors group h-16 border-b border-slate-800/30 last:border-0">
                                            <td className="py-0 pl-4 pr-2 text-slate-200 font-bold text-xs md:text-sm align-middle leading-snug w-[25%]">{row.label}</td>
                                            {row.vals.map((val, vIdx) => (
                                                <td key={vIdx} className={`py-0 px-2 text-right align-middle w-[15%] text-xs md:text-sm ${
                                                    vIdx === 0 ? 'font-bold text-white font-mono md:text-base' : 
                                                    vIdx === 1 ? 'hidden sm:table-cell text-slate-400 font-mono' :
                                                    'hidden md:table-cell text-slate-400 font-mono'
                                                }`}>
                                                    {val}
                                                </td>
                                            ))}
                                            {row.vars.length > 0 ? row.vars.map((v, vIdx) => (
                                                <td key={vIdx} className="py-0 px-2 text-right align-middle relative group/tooltip w-[15%]">
                                                    <div className={`flex items-center justify-end gap-0.5 font-medium ${v.dir === 'up' ? 'text-accent-green bg-accent-green/10' : 'text-accent-red bg-accent-red/10'} px-1.5 py-0.5 rounded-md w-fit ml-auto text-[10px] md:text-xs`}>
                                                        {v.dir === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                                        {v.val}
                                                    </div>
                                                </td>
                                            )) : (
                                                <><td></td><td></td></>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* KPI Grid */}
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
                {EXECUTIVE_KPIS.map((kpi) => (
                    <KPICard key={kpi.id} kpi={kpi} wbrMode={false} />
                ))}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* EBITDA Bridge (Waterfall) */}
                <div className="glass-panel p-6 rounded-2xl col-span-2 border-t border-slate-700/50 min-w-0">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-ennovi-yellow" size={20} />
                            {t('cockpit.ebitda_bridge')}
                        </h3>
                        <div className="text-xs text-slate-400">Unit: $k</div>
                    </div>
                    <div className="h-72 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={waterfallData} margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 11, fill: '#cbd5e1'}} axisLine={false} tickLine={false} dy={10} />
                                <YAxis stroke="#94a3b8" tick={{fontSize: 12, fill: '#cbd5e1'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs">
                                                    <p className="font-bold text-white mb-1">{data.name}</p>
                                                    <p className="text-slate-300">Value: <span className={data.originalValue < 0 ? 'text-accent-red' : 'text-accent-green'}>{data.originalValue}</span></p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                    wrapperStyle={{ zIndex: 1000 }}
                                />
                                <ReferenceLine y={0} stroke="#64748b" />
                                <Bar dataKey="placeholder" stackId="a" fill="transparent" isAnimationActive={false} />
                                <Bar dataKey="value" stackId="a" radius={[4, 4, 4, 4]} maxBarSize={60}>
                                    {waterfallData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    <LabelList dataKey="originalValue" position="top" fill="#fff" fontSize={10} fontWeight="bold" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Customer Profitability Ranking (YTD) */}
                <div className="glass-panel p-6 rounded-2xl border-t border-slate-700/50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Users className="text-accent-blue" size={20} />
                            {t('cockpit.cust_profit')}
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {CUSTOMER_PROFITABILITY.map((cust, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-white font-medium">{cust.name}</span>
                                    <span className={`text-xs font-bold ${cust.margin < 12 ? 'text-accent-red' : 'text-accent-green'}`}>
                                        {cust.margin}% Margin
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                                    <div className="bg-accent-blue h-full" style={{width: `${cust.shareOfWallet}%`}} title="Share of Wallet"></div>
                                    <div className="bg-slate-700 h-full flex-1 opacity-20"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-500">
                                    <span>Rev: ${cust.revenue}k</span>
                                    <span>Share: {cust.shareOfWallet}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* YTD Revenue Trend vs Outlook vs Budget (Restored Chart) */}
                <div className="glass-panel p-6 rounded-2xl border-t border-slate-700/50 col-span-1 lg:col-span-3 min-w-0 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="text-accent-purple" size={20} />
                            {t('cockpit.rev_trend')}
                        </h3>
                        {/* 3 New Small KPI Cards inside the panel header area */}
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                <div className="p-1.5 bg-blue-500/10 rounded-full text-blue-400"><Users size={16} /></div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t('cockpit.dl_headcount')}</div>
                                    <div className="text-lg font-bold text-white">{currentMonthData?.dl || '-'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                <div className="p-1.5 bg-purple-500/10 rounded-full text-purple-400"><User size={16} /></div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t('cockpit.idl_headcount')}</div>
                                    <div className="text-lg font-bold text-white">{currentMonthData?.idl || '-'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                <div className="p-1.5 bg-ennovi-yellow/10 rounded-full text-ennovi-yellow"><TrendingUp size={16} /></div>
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase">{t('cockpit.efficiency')}</div>
                                    <div className="text-lg font-bold text-white">${currentMonthData?.efficiencyActual || currentMonthData?.efficiencyForecast}k</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-64 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={REVENUE_EBIT_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
                                <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 11}} />
                                <YAxis yAxisId="left" stroke="#94a3b8" tick={{fontSize: 11}} />
                                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{fontSize: 11}} tickFormatter={(val) => val} domain={[0, 30]} />
                                <Tooltip content={<CustomRevenueTooltip />} wrapperStyle={{ zIndex: 1000 }} />
                                
                                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#2979FF" strokeWidth={3} name="Actual Revenue" dot={{r:3, fill:'#2979FF'}} activeDot={{r:5}} />
                                <Line yAxisId="left" type="monotone" dataKey="outlook" stroke="#FFEA00" strokeWidth={2} strokeDasharray="5 5" name="Outlook" dot={false} />
                                <Line yAxisId="left" type="monotone" dataKey="budget" stroke="#ffffff" strokeOpacity={0.3} strokeWidth={2} strokeDasharray="3 3" name="Budget" dot={false} />
                                
                                {/* New Efficiency Lines on Right Axis */}
                                <Line yAxisId="right" type="monotone" dataKey="efficiencyActual" stroke="#E040FB" strokeWidth={2} name="Human Eff. (Act)" dot={{r:3}} connectNulls={false} />
                                <Line yAxisId="right" type="monotone" dataKey="efficiencyForecast" stroke="#E040FB" strokeWidth={2} strokeDasharray="3 3" name="Human Eff. (Fcst)" dot={false} />
                                
                                <Bar yAxisId="right" dataKey="ebitPct" name="EBIT %" barSize={30} radius={[4, 4, 0, 0]}>
                                    {REVENUE_EBIT_TREND.map((entry, index) => {
                                        let fill = '#00E676'; // Neon Green
                                        if (entry.ebitPct < entry.ebitOutlook) {
                                            fill = '#FF3333'; // Neon Red
                                        } else if (entry.ebitPct < entry.ebitBudget) {
                                            fill = '#FF9100'; // Neon Orange
                                        }
                                        return <Cell key={`cell-${index}`} fill={fill} fillOpacity={0.6} stroke={fill} />;
                                    })}
                                </Bar>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODE 3: WBR STORYLINE (Presentation) --- */}
      {viewMode === 'wbr' && (
          <div className="animate-slide-up flex flex-col gap-6">
              {/* Storyline Navigation Stepper */}
              <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                  <div className="flex gap-4">
                      {wbrSlides.map((slide, index) => (
                          <div 
                            key={slide.id} 
                            onClick={() => setWbrStep(index)}
                            className={`flex items-center gap-2 cursor-pointer transition-all ${wbrStep === index ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'}`}
                          >
                               <div className={`p-2 rounded-full ${wbrStep === index ? 'bg-slate-700' : 'bg-slate-800'}`}>
                                   <slide.icon size={16} className={slide.color} />
                               </div>
                               <span className={`text-sm font-bold uppercase ${wbrStep === index ? 'text-white' : 'text-slate-400'}`}>
                                   {slide.title}
                               </span>
                               {index < wbrSlides.length - 1 && <div className="w-8 h-0.5 bg-slate-700 mx-2"></div>}
                          </div>
                      ))}
                  </div>
                  <div className="flex gap-2">
                      <button onClick={prevSlide} disabled={wbrStep === 0} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30">
                          <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextSlide} disabled={wbrStep === wbrSlides.length - 1} className="flex items-center gap-2 px-4 py-2 rounded-full bg-ennovi-yellow text-slate-900 font-bold hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed">
                          {t('wbr.next')} <ChevronRight size={16} />
                      </button>
                  </div>
              </div>

              {/* SLIDE CONTENT */}
              <div className="min-h-[500px]">
                  {/* Slide 1: Safety */}
                  {wbrStep === 0 && (
                      <div className="grid grid-cols-2 gap-8 animate-fade-in">
                          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center items-center border-l-4 border-accent-green">
                              <h2 className="text-2xl font-bold text-white mb-2">Safety Performance</h2>
                              <div className="text-6xl font-black text-accent-green mb-2">120</div>
                              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Days Safe</div>
                          </div>
                          <div className="glass-panel p-8 rounded-2xl border-l-4 border-accent-orange">
                              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                  <Flame className="text-accent-orange" /> Potential Risks
                              </h2>
                              <div className="space-y-4">
                                  {EHS_RISKS.map((risk, idx) => (
                                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-accent-orange/30">
                                          <div className="flex justify-between mb-2">
                                              <span className="font-bold text-white">{risk.workshop}</span>
                                              <span className="text-xs bg-accent-orange/20 text-accent-orange px-2 py-1 rounded">{risk.risk}</span>
                                          </div>
                                          <div className="text-slate-300 text-sm">{risk.issue}</div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Slide 2: Key Focus (Must Win + Key Visits) */}
                  {wbrStep === 1 && (
                      <div className="grid grid-cols-2 gap-8 animate-fade-in">
                          {/* Must Win Projects Tracking */}
                          <div className="glass-panel p-8 rounded-2xl border-l-4 border-accent-purple">
                              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                  <Target className="text-accent-purple" /> {t('wbr.must_win_tracking')}
                              </h2>
                              <div className="space-y-4">
                                  {criticalProjects.map((p, idx) => (
                                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                          <div className="flex justify-between items-center mb-2">
                                              <span className="font-bold text-white">{p.productCategory} - {p.customer}</span>
                                              <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                                                  p.status === 'Critical' ? 'bg-accent-red/20 text-accent-red' : 
                                                  p.status === 'Delayed' ? 'bg-accent-orange/20 text-accent-orange' : 'bg-accent-green/20 text-accent-green'
                                              }`}>{p.status}</span>
                                          </div>
                                          <div className="flex justify-between text-xs text-slate-400">
                                               <span>Stage: {t(`stage.${p.stage.toLowerCase()}`)}</span>
                                               <span className="text-accent-green font-mono">${p.revenue5Y}M</span>
                                          </div>
                                          <div className="mt-2 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                              <div className={`h-full ${p.winProbability > 50 ? 'bg-accent-purple' : 'bg-slate-500'}`} style={{width: `${p.winProbability}%`}}></div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Key Visits & Events */}
                          <div className="glass-panel p-8 rounded-2xl border-l-4 border-accent-blue">
                              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                  <CalendarDays className="text-accent-blue" /> {t('wbr.key_visits')}
                              </h2>
                              <div className="space-y-4">
                                  {keyEvents.map((e, idx) => (
                                      <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-accent-blue/20 flex gap-4">
                                          <div className="flex flex-col items-center justify-center bg-slate-900 rounded p-2 min-w-[60px] border border-slate-700">
                                              <span className="text-xs font-bold text-slate-400">{e.date.split(' ')[0]}</span>
                                              <span className="text-lg font-bold text-white">{e.date.split(' ')[1]}</span>
                                          </div>
                                          <div>
                                              <div className="font-bold text-white text-sm mb-1">{e.title}</div>
                                              <div className="text-xs text-accent-blue mb-1">{e.partner}</div>
                                              <div className="text-[10px] text-slate-400 italic">"{e.status === 'Future' ? e.prep : e.outcome}"</div>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Slide 3: Red Flags (Critical KPIs Only) */}
                  {wbrStep === 2 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                          {EXECUTIVE_KPIS.filter(k => k.status === 'critical' || k.status === 'warning').map(kpi => (
                              <KPICard key={kpi.id} kpi={kpi} wbrMode={true} />
                          ))}
                          {EXECUTIVE_KPIS.filter(k => k.status === 'critical' || k.status === 'warning').length === 0 && (
                              <div className="col-span-3 text-center py-20 text-slate-500 italic">No Critical Red Flags Today</div>
                          )}
                      </div>
                  )}
                  
                  {/* Slide 4: Finance (Detailed Financial Table with Exceptions Highlighted) */}
                  {wbrStep === 3 && (
                       <div className="animate-fade-in grid grid-cols-1 xl:grid-cols-3 gap-6 h-[600px]">
                           {/* LEFT: Full Financial Table */}
                           <div className="xl:col-span-2 glass-panel rounded-2xl flex flex-col overflow-hidden">
                               <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
                                   <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                       <Activity className="text-accent-blue" size={20} />
                                       Monthly Financial Performance
                                   </h2>
                                   <div className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">Unit: KUSD / Comparison vs Last Year</div>
                               </div>
                               
                               <div className="flex-1 overflow-auto custom-scrollbar md:overflow-visible">
                                   <table className="w-full text-left text-xs whitespace-nowrap">
                                       <thead className="bg-slate-900 sticky top-0 z-10 text-slate-400 uppercase font-bold tracking-wider">
                                           <tr>
                                               <th className="p-3 w-10">#</th>
                                               <th className="p-3">Category</th>
                                               <th className="p-3">Description</th>
                                               <th className="p-3">Owner</th>
                                               <th className="p-3 text-right">OL (Act/Out)</th>
                                               <th className="p-3 text-right">OL %</th>
                                               <th className="p-3 text-right">Last Year</th>
                                               <th className="p-3 text-right">Total (YTD)</th>
                                           </tr>
                                       </thead>
                                       <tbody className="divide-y divide-slate-800/50">
                                           {WBR_FINANCIAL_TABLE.map((row, idx) => {
                                               const isCritical = row.status === 'critical';
                                               const isWarning = (row.status as string) === 'warning';
                                               const showTooltip = row.drivers && row.drivers.length > 0;
                                               
                                               return (
                                                   <tr 
                                                        key={idx} 
                                                        className={`transition-colors group hover:bg-slate-800/60 relative z-0 hover:z-20 ${
                                                            isCritical ? 'bg-accent-red/10' : ''
                                                        }`}
                                                   >
                                                       <td className="p-3 text-slate-500 font-mono text-[10px]">{idx + 1}</td>
                                                       <td className="p-3 text-slate-400 font-bold">{row.category}</td>
                                                       <td className={`p-3 font-bold ${isCritical ? 'text-accent-red neon-text' : 'text-slate-200'}`}>
                                                           {isCritical && <AlertTriangle size={12} className="inline mr-1 text-accent-red" />}
                                                           {row.description}
                                                       </td>
                                                       <td className="p-3">
                                                           {row.owner ? (
                                                               <div className="flex items-center gap-2">
                                                                   <img src={row.owner.avatar} className="w-5 h-5 rounded-full border border-slate-600" />
                                                                   <span className="text-slate-400">{row.owner.name}</span>
                                                               </div>
                                                           ) : (
                                                               <span className="text-slate-600">-</span>
                                                           )}
                                                       </td>
                                                       <td className="p-3 text-right font-mono text-slate-300">{row.olValue}</td>
                                                       <td className={`p-3 text-right font-mono font-bold relative group/tooltip ${isCritical ? 'text-accent-red' : isWarning ? 'text-accent-orange' : 'text-slate-400'}`}>
                                                           <div className="flex items-center justify-end gap-1 cursor-help">
                                                               {row.olPct}
                                                               {showTooltip && <Info size={12} className="opacity-50 hover:opacity-100" />}
                                                           </div>
                                                           
                                                           {/* Drivers Tooltip */}
                                                           {showTooltip && (
                                                                <div className="absolute bottom-full right-0 mb-2 w-72 bg-slate-900 border border-slate-500 rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 z-[9999] pointer-events-none translate-y-2 group-hover/tooltip:translate-y-0 text-left">
                                                                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 pb-2 border-b border-slate-700 flex justify-between items-center">
                                                                        <span>{t('cockpit.drivers')}</span>
                                                                        <Activity size={12} className="text-ennovi-yellow" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        {row.drivers && row.drivers.map((item, i) => (
                                                                            <div key={i} className="flex justify-between items-center text-xs">
                                                                                <span className="text-slate-400 flex items-center gap-2">
                                                                                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center font-bold text-slate-500 border border-slate-700">{i+1}</span>
                                                                                    {item.reason}
                                                                                </span>
                                                                                <span className="font-mono font-bold text-accent-red">
                                                                                    {item.impact}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="absolute -bottom-1 right-4 w-3 h-3 bg-slate-900 border-r border-b border-slate-500 rotate-45"></div>
                                                                </div>
                                                           )}
                                                       </td>
                                                       <td className="p-3 text-right font-mono text-slate-500">{row.lastYear}</td>
                                                       <td className="p-3 text-right font-mono text-white">{row.total}</td>
                                                   </tr>
                                               );
                                           })}
                                       </tbody>
                                   </table>
                               </div>
                           </div>

                           {/* RIGHT: AI Insights & Summary */}
                           <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
                               <div className="bg-slate-900/50 p-4 rounded-xl border border-accent-blue/30">
                                   <h3 className="text-sm font-bold text-accent-blue uppercase mb-3 flex items-center gap-2">
                                       <Zap size={16} /> Quick Summary
                                   </h3>
                                   <div className="space-y-4">
                                       <div className="flex justify-between items-center">
                                           <span className="text-xs text-slate-400">Total Revenue YTD</span>
                                           <span className="text-lg font-bold text-white">466.2 M</span>
                                       </div>
                                       <div className="flex justify-between items-center">
                                           <span className="text-xs text-slate-400">COPA YTD</span>
                                           <span className="text-lg font-bold text-accent-green">41.1 M</span>
                                       </div>
                                       <div className="h-px bg-slate-800"></div>
                                       <div className="flex justify-between items-center">
                                           <span className="text-xs text-slate-400">Red Flags Count</span>
                                           <span className="text-lg font-bold text-accent-red">5 Items</span>
                                       </div>
                                   </div>
                               </div>

                               <div className="flex-1 overflow-y-auto custom-scrollbar">
                                   <h3 className="text-sm font-bold text-ennovi-yellow uppercase mb-3 flex items-center gap-2">
                                       <Lightbulb size={16} /> AI Insights on Exceptions
                                   </h3>
                                   <div className="space-y-3">
                                       {WBR_FINANCIAL_TABLE.filter(r => r.status === 'critical').map((item, i) => (
                                           <div key={i} className="bg-slate-800/60 p-3 rounded-lg border-l-2 border-accent-red">
                                               <div className="text-xs font-bold text-accent-red mb-1">{item.description}</div>
                                               <div className="space-y-1 mt-2">
                                                   {item.drivers?.map((d, dIdx) => (
                                                       <div key={dIdx} className="flex justify-between text-[10px] text-slate-400">
                                                           <span>• {d.reason}</span>
                                                           <span className="text-red-400 font-bold">{d.impact}</span>
                                                       </div>
                                                   ))}
                                               </div>
                                               <div className="mt-3 pt-2 border-t border-slate-700/50 flex justify-between items-center">
                                                   <span className="text-[10px] text-slate-500">Var: {item.olPct}</span>
                                                   <button 
                                                        onClick={() => handleAssignTask(item)}
                                                        className="text-[10px] bg-accent-red/20 text-accent-red px-2 py-0.5 rounded hover:bg-accent-red/30 transition-colors flex items-center gap-1 font-bold border border-accent-red/30"
                                                   >
                                                       <Plus size={10} /> Assign Task
                                                   </button>
                                               </div>
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           </div>
                       </div>
                  )}

                  {/* Slide 5: Actions */}
                  {wbrStep === 4 && (
                      <div className="animate-fade-in glass-panel p-8 rounded-2xl border-l-4 border-ennovi-yellow">
                           <h2 className="text-2xl font-bold text-white mb-6">Action Tracker Review</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                   <h3 className="text-slate-400 text-sm font-bold uppercase mb-4">Overdue Actions</h3>
                                   <div className="space-y-4">
                                       {overdueTasks.map(t => (
                                           <div key={t.id} className="flex justify-between items-center p-3 bg-accent-red/10 rounded border border-accent-red/20">
                                               <div>
                                                   <div className="text-white font-medium text-sm">{t.title}</div>
                                                   <div className="text-xs text-slate-400">{t.owner.name}</div>
                                               </div>
                                               <span className="text-accent-red text-xs font-bold uppercase">Delayed {t.daysOverdue} Days</span>
                                           </div>
                                       ))}
                                       {overdueTasks.length === 0 && <div className="text-slate-500 text-sm italic">No overdue actions.</div>}
                                   </div>
                               </div>
                               <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                   <h3 className="text-slate-400 text-sm font-bold uppercase mb-4">Completed Recently</h3>
                                   <div className="space-y-4">
                                       {recentCompletedTasks.map(t => (
                                           <div key={t.id} className="flex justify-between items-center p-3 bg-accent-green/10 rounded border border-accent-green/20">
                                               <div>
                                                   <div className="text-white font-medium text-sm">{t.title}</div>
                                                   <div className="text-xs text-slate-400">{t.owner.name}</div>
                                               </div>
                                               <span className="text-accent-green text-xs font-bold uppercase">Closed</span>
                                           </div>
                                       ))}
                                       {recentCompletedTasks.length === 0 && (
                                           <div className="flex justify-between items-center p-3 bg-accent-green/10 rounded border border-accent-green/20">
                                               <span className="text-white font-medium">Molding 02 Repair</span>
                                               <span className="text-accent-green text-xs font-bold uppercase">Closed</span>
                                           </div>
                                       )}
                                   </div>
                               </div>
                           </div>
                      </div>
                  )}
              </div>
          </div>
      )}
    </div>
  );
};

export default ExecutiveCockpit;
