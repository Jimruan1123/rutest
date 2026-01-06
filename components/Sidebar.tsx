
import React from 'react';
import { LayoutDashboard, Factory, Activity, SquareCheck, Settings, LogOut, ClipboardList } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, isOpen, onClose }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'cockpit', label: t('nav.cockpit'), icon: LayoutDashboard },
    { id: 'streams', label: t('nav.streams'), icon: Factory },
    { id: 'health', label: t('nav.health'), icon: Activity },
    { id: 'action', label: t('nav.action'), icon: SquareCheck },
  ];

  const handleNavClick = (id: string) => {
    setPage(id);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-20 flex items-center justify-center border-b border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex items-center gap-3">
             <div className="relative w-9 h-9 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#FFD700]">
                    <path d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z" />
                </svg>
                <span className="absolute font-bold text-slate-900 text-lg pt-0.5">E</span>
             </div>
             <span className="text-xl font-bold tracking-tight text-white">ENNOVI</span>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase mb-4 px-3 tracking-widest">{t('menu.menu')}</div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                currentPage === item.id
                  ? 'bg-[#FFD700] text-slate-900 font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-1">
          <button 
            onClick={() => handleNavClick('implementation')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group mb-2 ${
                currentPage === 'implementation'
                  ? 'bg-blue-600 text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'text-blue-400 hover:bg-blue-900/30'
            }`}
          >
              <ClipboardList size={20} />
              <span>{t('nav.implementation')}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors hover:bg-slate-800 rounded-lg">
              <Settings size={20} />
              <span>{t('menu.settings')}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors hover:bg-slate-800 rounded-lg">
              <LogOut size={20} />
              <span>{t('menu.logout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
