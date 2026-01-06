
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExecutiveCockpit from './pages/ExecutiveCockpit';
import BusinessStreams from './pages/BusinessStreams';
import EntityHealth from './pages/EntityHealth';
import ActionCenter from './pages/ActionCenter';
import ImplementationReport from './pages/ImplementationReport';
import WhatIfSidebar from './components/WhatIfSidebar';
import GlobalTaskModal from './components/GlobalTaskModal';
import { Bell, Calculator, Globe, ShieldCheck, Flame, User, AlertTriangle, Menu } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { TaskProvider } from './TaskContext';
import { EHS_RISKS } from './constants';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('cockpit');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  const handleNavigation = (page: string) => {
    if (page === 'simulator') {
      setIsSimulatorOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cockpit': return <ExecutiveCockpit onNavigate={handleNavigation} />;
      case 'streams': return <BusinessStreams onNavigate={handleNavigation} />;
      case 'health': return <EntityHealth />;
      case 'action': return <ActionCenter />;
      case 'implementation': return <ImplementationReport />;
      default: return <ExecutiveCockpit onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden">
      {/* Manufacturing Background Overlay - International Enterprise Tech Theme (Deep Blue/Slate) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none scale-105 blur-[2px]" 
        style={{
            // High-end Industry 4.0 / Smart Factory Image (Robotic Arm / Automation in Blue Light)
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.8, 
        }}
      ></div>
      
      {/* Overlay Gradient - Deep Slate to Subtle Blue for "Command Center" feel */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-blue-900/30 pointer-events-none"></div>
      
      {/* Additional subtle noise texture for realism (Film grain effect) */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setPage={handleNavigation} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div className="md:ml-64 ml-0 flex flex-col relative z-10 transition-all duration-300 min-h-screen min-w-0">
        {/* Header */}
        <header className="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40 px-4 md:px-8 flex justify-between items-center shadow-lg">
            
            <div className="flex items-center gap-4 min-w-0">
                {/* Mobile Menu Toggle */}
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden text-slate-300 hover:text-white p-1 hover:bg-slate-800 rounded transition-colors flex-shrink-0"
                >
                  <Menu size={24} />
                </button>

                {/* Breadcrumbs or Title */}
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <div className="text-ennovi-yellow text-xs font-bold uppercase tracking-widest mb-1 truncate">ENNOVI Hangzhou</div>
                  <div className="text-white font-bold capitalize text-xl tracking-tight truncate">{t(`nav.${currentPage}`, currentPage)}</div>
                </div>
            </div>

            {/* Middle: EHS Safety Badge (Lag Indicator + Predictive Heatmap) */}
            <div className="hidden xl:flex items-center gap-6 flex-shrink-0">
                <div className="flex items-center gap-3 bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
                   <ShieldCheck className="text-emerald-400" size={24} />
                   <div className="flex flex-col">
                      <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider">{t('header.ehs_safe')}</span>
                      <span className="text-white font-bold text-sm">120 {t('header.days_safe')}</span>
                   </div>
                </div>

                {/* EHS Risk Heatmap (Predictive) with Tooltip */}
                <div className="group relative">
                    <div className="flex items-center gap-3 bg-orange-900/40 px-4 py-2 rounded-lg border border-orange-500/30 cursor-help transition-colors hover:bg-orange-900/50 backdrop-blur-sm">
                       <Flame className="text-orange-500" size={24} />
                       <div className="flex flex-col">
                          <span className="text-orange-400 font-bold uppercase text-xs tracking-wider">{t('header.risk_heatmap')}</span>
                          <span className="text-white font-bold text-sm">{EHS_RISKS.length} {t('header.workshops_at_risk')}</span>
                       </div>
                    </div>
                    
                    {/* Tooltip / Drilldown Tip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-72 bg-slate-900/95 border border-orange-500/30 rounded-xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-xl">
                        {/* Triangle arrow */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900 border-l border-t border-orange-500/30 rotate-45"></div>
                        
                        <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-3 border-b border-slate-700 pb-2 flex items-center gap-2">
                             <Flame size={12} /> {t('header.risk_details')}
                        </div>
                        <div className="space-y-3">
                            {EHS_RISKS.map((risk) => (
                                <div key={risk.id} className="bg-slate-800/50 p-2 rounded border-l-2 border-orange-500">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-white text-xs font-bold">{risk.workshop}</span>
                                        <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 rounded">{risk.risk}</span>
                                    </div>
                                    <div className="text-slate-400 text-[11px] leading-tight mb-1">{t(`risk.${risk.id}`, risk.issue)}</div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                        <User size={10} /> {risk.owner}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 flex-shrink-0">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-sm font-bold border border-slate-600 bg-slate-800/50 hover:bg-slate-700 px-4 py-2 rounded-full hover:border-ennovi-yellow hover:text-ennovi-yellow backdrop-blur-sm"
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">{language === 'en' ? '中文 / EN' : 'EN / 中文'}</span>
                  <span className="sm:hidden">{language === 'en' ? '中' : 'EN'}</span>
                </button>

                <button 
                    onClick={() => setIsSimulatorOpen(true)}
                    className="flex items-center gap-2 text-slate-300 hover:text-ennovi-yellow transition-colors text-sm font-bold bg-slate-800/50 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-600 hover:border-ennovi-yellow backdrop-blur-sm hidden sm:flex"
                >
                    <Calculator size={18} />
                    <span className="hidden sm:inline">{t('header.simulator')}</span>
                </button>
                
                <div className="relative cursor-pointer p-2 hover:bg-slate-800 rounded-full transition-colors">
                    <div className="text-slate-300 hover:text-white relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-white tracking-tight">Frank Liu</div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{t('header.role')}</div>
                    </div>
                    <div className="w-10 h-10 bg-slate-700 rounded-full overflow-hidden border-2 border-slate-500 shadow-md">
                         <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>

        {/* Smart Alerts Ticker (GM Optimization) */}
        <div className="h-8 bg-blue-900/30 border-b border-blue-500/20 flex items-center overflow-hidden flex-shrink-0">
            <div className="px-4 flex items-center gap-2 h-full bg-slate-900/80 z-10 border-r border-blue-500/30">
                <AlertTriangle size={12} className="text-ennovi-yellow animate-pulse" />
                <span className="text-[10px] font-bold uppercase text-blue-300 whitespace-nowrap">Smart Alerts</span>
            </div>
            <div className="flex-1 overflow-hidden relative ticker-container">
                 <div className="animate-slide-left whitespace-nowrap text-xs font-medium text-slate-300 flex gap-12 px-4">
                     <span>⚠️ <strong>Predictive Risk:</strong> Copper price surge (+4%) may impact Q4 Gross Margin by 0.5%.</span>
                     <span>⚠️ <strong>Inventory:</strong> Resin stock low in Asia region, potential impact on Stamping 02 in 5 days.</span>
                     <span>ℹ️ <strong>Opportunity:</strong> Tesla Shanghai ramping up Model Y, potential +15% volume in Nov.</span>
                 </div>
            </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar min-w-0">
            {renderPage()}
        </main>
      </div>

      {/* Global Modals & Slide-outs */}
      <WhatIfSidebar isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
      <GlobalTaskModal />
      
      {/* Styles for ticker */}
      <style>{`
        @keyframes slide-left {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        .animate-slide-left {
            animation: slide-left 25s linear infinite;
        }
        .ticker-container:hover .animate-slide-left {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </TaskProvider>
  );
};

export default App;
