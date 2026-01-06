
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, DollarSign, RotateCcw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface WhatIfSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatIfSidebar: React.FC<WhatIfSidebarProps> = ({ isOpen, onClose }) => {
  // 1. Revenue & Margin
  const [volumeIncrease, setVolumeIncrease] = useState(0); 
  const [priceChange, setPriceChange] = useState(0); 
  const [matPriceIncrease, setMatPriceIncrease] = useState(0); 

  // 2. Operational
  const [laborEfficiency, setLaborEfficiency] = useState(0); // % improvement
  const [freightSavings, setFreightSavings] = useState(0); // % reduction
  const [scrapReduction, setScrapReduction] = useState(0); // % reduction

  // 3. Working Capital
  const [inventoryReduction, setInventoryReduction] = useState(0);
  const [dsoReduction, setDsoReduction] = useState(0);

  const { t } = useLanguage();

  const handleReset = () => {
      setVolumeIncrease(0);
      setPriceChange(0);
      setMatPriceIncrease(0);
      setLaborEfficiency(0);
      setFreightSavings(0);
      setScrapReduction(0);
      setInventoryReduction(0);
      setDsoReduction(0);
  };

  const calculateSavings = () => {
    // Base Baseline (Annualized USD) based on ~12.5M monthly rev
    const BASE_REV = 150000000;
    const BASE_MAT = 75000000; // 50%
    const BASE_LABOR = 18000000; // 12%
    const BASE_FREIGHT = 3000000; // 2%
    const BASE_SCRAP = 2250000; // 1.5%
    const BASE_INV = 20000000; // Balance Sheet
    const BASE_AR = 25000000; // Balance Sheet

    // Impact Calculations
    
    // 1. Revenue
    // Volume Impact: (Rev * Vol% * 0.25 Margin)
    const volImpact = BASE_REV * (volumeIncrease / 100) * 0.25;
    // Price Impact: (Rev * Price%) - direct bottom line
    const priceImpact = BASE_REV * (priceChange / 100);
    // Material Price: -(Mat * Price%)
    const matImpact = -(BASE_MAT * (matPriceIncrease / 100));

    // 2. Operations
    const laborSave = BASE_LABOR * (laborEfficiency / 100);
    const freightSave = BASE_FREIGHT * (freightSavings / 100);
    const scrapSave = BASE_SCRAP * (scrapReduction / 100);

    // 3. Working Capital Costs (Carrying Cost 15%)
    // Inventory Carrying Cost Savings
    const invCarryingSave = BASE_INV * (inventoryReduction / 100) * 0.15;
    
    // Total EBITDA Impact
    const totalImpact = volImpact + priceImpact + matImpact + laborSave + freightSave + scrapSave + invCarryingSave;
    
    // Cash Unlocked (Balance Sheet impact)
    // Inventory Cash
    const invCash = BASE_INV * (inventoryReduction / 100);
    // AR Cash (Linear reduction approximation)
    const arCash = BASE_AR * (dsoReduction / 90); // Assuming 90 days baseline roughly for calculation scaling

    return { 
        totalImpact: totalImpact.toFixed(0), 
        cashUnlocked: (invCash + arCash).toFixed(0) 
    };
  };

  const { totalImpact, cashUnlocked } = calculateSavings();

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-slate-900 shadow-2xl transform transition-transform duration-300 z-[60] border-l border-slate-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900 flex-shrink-0">
        <h2 className="text-white font-bold flex items-center gap-2">
            <RefreshCcw size={18} className="text-ennovi-yellow" />
            {t('sim.title')}
        </h2>
        <div className="flex items-center gap-2">
            <button onClick={handleReset} className="text-slate-500 hover:text-white transition-colors" title="Reset All">
                <RotateCcw size={16} />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors ml-2">
                <X size={20} />
            </button>
        </div>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto flex-1 custom-scrollbar">
        
        {/* Section 1: Revenue & Margin */}
        <div>
            <div className="text-xs text-slate-500 font-bold uppercase mb-4 tracking-wider border-b border-slate-800 pb-1">{t('sim.section_revenue')}</div>
            <div className="space-y-5">
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.vol_increase')}
                        <span className="text-green-400">+{volumeIncrease}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="20" step="1" 
                        value={volumeIncrease} 
                        onChange={(e) => setVolumeIncrease(Number(e.target.value))}
                        className="w-full accent-green-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.price_change')}
                        <span className={priceChange >= 0 ? 'text-green-400' : 'text-red-400'}>{priceChange > 0 ? '+' : ''}{priceChange}%</span>
                    </label>
                    <input 
                        type="range" min="-5" max="5" step="0.5" 
                        value={priceChange} 
                        onChange={(e) => setPriceChange(Number(e.target.value))}
                        className={`w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer ${priceChange >= 0 ? 'accent-green-500' : 'accent-red-500'}`}
                    />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.mat_price')}
                        <span className="text-red-400">{matPriceIncrease}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="10" step="0.5" 
                        value={matPriceIncrease} 
                        onChange={(e) => setMatPriceIncrease(Number(e.target.value))}
                        className="w-full accent-red-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>

        {/* Section 2: Operations */}
        <div>
             <div className="text-xs text-slate-500 font-bold uppercase mb-4 tracking-wider border-b border-slate-800 pb-1">{t('sim.section_ops')}</div>
             <div className="space-y-5">
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.labor_eff')}
                        <span className="text-blue-400">+{laborEfficiency}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="15" step="1" 
                        value={laborEfficiency} 
                        onChange={(e) => setLaborEfficiency(Number(e.target.value))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.freight_save')}
                        <span className="text-blue-400">{freightSavings}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="20" step="1" 
                        value={freightSavings} 
                        onChange={(e) => setFreightSavings(Number(e.target.value))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.scrap_reduce')}
                        <span className="text-blue-400">{scrapReduction}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="30" step="2" 
                        value={scrapReduction} 
                        onChange={(e) => setScrapReduction(Number(e.target.value))}
                        className="w-full accent-blue-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>

        {/* Section 3: Working Capital */}
        <div>
            <div className="text-xs text-slate-500 font-bold uppercase mb-4 tracking-wider border-b border-slate-800 pb-1">{t('sim.section_wc')}</div>
            <div className="space-y-5">
                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.reduce_inv')}
                        <span className="text-ennovi-yellow">{inventoryReduction}%</span>
                    </label>
                    <input 
                        type="range" min="0" max="30" step="1" 
                        value={inventoryReduction} 
                        onChange={(e) => setInventoryReduction(Number(e.target.value))}
                        className="w-full accent-ennovi-yellow h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div>
                    <label className="flex justify-between text-sm font-bold text-slate-300 mb-2">
                        {t('sim.reduce_dso')}
                        <span className="text-ennovi-yellow">{dsoReduction} days</span>
                    </label>
                    <input 
                        type="range" min="0" max="30" step="1" 
                        value={dsoReduction} 
                        onChange={(e) => setDsoReduction(Number(e.target.value))}
                        className="w-full accent-ennovi-yellow h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* Footer Results */}
      <div className="p-5 border-t border-slate-800 bg-slate-900 flex-shrink-0">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-4">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{t('sim.impact_ebitda')}</div>
                    <div className={`text-3xl font-bold flex items-baseline gap-1 ${Number(totalImpact) >= 0 ? 'text-white' : 'text-red-400'}`}>
                        {Number(totalImpact) >= 0 ? '+' : ''}${Number(totalImpact).toLocaleString()}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">{t('sim.cash_unlocked')}</div>
                    <div className="text-xl font-bold text-green-400 flex items-baseline gap-1 justify-end">
                        ${Number(cashUnlocked).toLocaleString()}
                    </div>
                </div>
            </div>
            
            {/* Visual Bar for Impact */}
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${Number(totalImpact) >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{width: `${Math.min(Math.abs(Number(totalImpact)) / 10000000 * 100, 100)}%`}}></div>
            </div>
        </div>

        <button className="w-full py-3 bg-ennovi-yellow hover:bg-yellow-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
            <DollarSign size={18} />
            {t('sim.create_plan')}
        </button>
      </div>
    </div>
  );
};

export default WhatIfSidebar;
