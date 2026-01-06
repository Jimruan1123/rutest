
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
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none scale-105 blur-[2px]" 
        style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1, 
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-blue-900/30 pointer-events-none"></div>

      <Sidebar 
        currentPage={currentPage} 
        setPage={handleNavigation} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="md:ml-64 ml-0 flex flex-col relative z-10 transition-all duration-300 min-h-screen min-w-0">
        <header className="h-20 bg-slate-900/60 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40 px-4 md:px-8 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4 min-w-0">
                <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-slate-300 p-1 rounded transition-colors flex-shrink-0">
                  <Menu size={24} />
                </button>
                <div className="flex flex-col min-w-0 overflow-hidden">
                  <div className="text-ennovi-yellow text-xs font-bold uppercase tracking-widest mb-1 truncate">ENNOVI Hangzhou</div>
                  <div className="text-white font-bold capitalize text-xl tracking-tight truncate">{t(`nav.${currentPage}`, currentPage)}</div>
                </div>
            </div>

            <div className="hidden xl:flex items-center gap-6 flex-shrink-0">
                <div className="flex items-center gap-3 bg-emerald-900/40 px-4 py-2 rounded-lg border border-emerald-500/30">
                   <ShieldCheck className="text-emerald-400" size={24} />
                   <div className="flex flex-col">
                      <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider">{t('header.ehs_safe')}</span>
                      <span className="text-white font-bold text-sm">120 {t('header.days_safe')}</span>
                   </div>
                </div>
                <div className="flex items-center gap-3 bg-orange-900/40 px-4 py-2 rounded-lg border border-orange-500/30">
                   <Flame className="text-orange-500" size={24} />
                   <div className="flex flex-col">
                      <span className="text-orange-400 font-bold uppercase text-xs tracking-wider">{t('header.risk_heatmap')}</span>
                      <span className="text-white font-bold text-sm">{EHS_RISKS.length} {t('header.workshops_at_risk')}</span>
                   </div>
                </div>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
                <button onClick={toggleLanguage} className="flex items-center gap-2 text-slate-300 hover:text-white transition-all text-sm font-bold border border-slate-600 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Globe size={16} />
                  <span>{language === 'en' ? '中文' : 'EN'}</span>
                </button>
                <button onClick={() => setIsSimulatorOpen(true)} className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-ennovi-yellow font-bold bg-slate-800/50 px-4 py-2 rounded-full border border-slate-600 backdrop-blur-sm">
                    <Calculator size={18} />
                    <span>{t('header.simulator')}</span>
                </button>
                <div className="flex items-center gap-3 border-l border-slate-700 pl-6">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-white">Frank Liu</div>
                        <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('header.role')}</div>
                    </div>
                    <div className="w-10 h-10 bg-slate-700 rounded-full border-2 border-slate-500 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" alt="Profile" />
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar min-w-0">
            {renderPage()}
        </main>
      </div>

      <WhatIfSidebar isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
      <GlobalTaskModal />
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
