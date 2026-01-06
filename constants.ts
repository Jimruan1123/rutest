
import { KPI, Factory, Issue, CIPProject, Owner, MaterialTrend, WIPItem, CustomerProfitability, NPIProject, MustWinProject, ProductionLoss, CapacityConstraint, InventoryDataCollection, CapacityTrend, COQBreakdown, COQHistory, ProductionVariance, OutputFluctuation, ProductProfitability, OperationalIssue, DemandForecast, CoreCustomerStatus, CrossModuleImpact, SalesRisk, CashFlowWaterfallItem, CustomerDemandProfile, CostPassThroughDetail, YearDownEvent, PremiumFreightDetail, MROTrend, SupplierBadPerf, CERRequest, SpendingTrend, IQCLineStop, ProcurementException, ProcurementCategorySpend, COPABreakdown, CustomerPenalty, StrategicPartner, MatrixData, EngagementEvent, CustomerFunnelItem, CommodityData, MarketIntelligence, DailyPulseData, RiskPropagation, MatrixMetric, CIPStat, CIPDepartmentStat, CIPHero, InnovationStar, CustomerComplaint, NewWonProject } from './types';

// Neon Palette Hex Codes (Matching Tailwind Config)
const COLOR_RED = '#FF3333';
const COLOR_GREEN = '#00E676';
const COLOR_BLUE = '#2979FF';
const COLOR_YELLOW = '#FFEA00';
const COLOR_PURPLE = '#E040FB';
const COLOR_ORANGE = '#FF9100';
const COLOR_SLATE = '#64748b';

// Mock data reflecting ENNOVI Hangzhou (Interconnect Solutions / EV Focus / Tier N Supplier)
export const OWNERS: Record<string, Owner> = {
  cfo: { id: '1', name: 'Sarah Lin', role: 'Finance Dir', department: 'Finance', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200' },
  ops: { id: '2', name: 'David Zhang', role: 'Ops GM', department: 'Operations', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' },
  sales: { id: '3', name: 'Jessica Chen', role: 'Sales VP', department: 'Sales', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200' },
  supply: { id: '4', name: 'Michael Wang', role: 'Supply Chain', department: 'SCM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200' },
  quality: { id: '5', name: 'Tom Wu', role: 'Quality Dir', department: 'Quality', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200' },
  hr: { id: '6', name: 'Lisa Li', role: 'HR Mgr', department: 'HR', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200' },
  pd: { id: '7', name: 'Alex Gong', role: 'Prod. Dir', department: 'Production', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200' },
  pm: { id: '8', name: 'Kevin Su', role: 'PM Dir', department: 'Program Mgt', avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=200&h=200' },
  tooling: { id: '9', name: 'Tooling Mgr', role: 'Tooling', department: 'Engineering', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200' },
};

export const DAILY_PULSE_DATA: DailyPulseData = {
    date: 'Sep 20, 2024',
    mtdRevenue: { val: 8200, target: 8666, status: 'bad' }, 
    yesterdayRevenue: 425,
    todayRisks: { count: 3, desc: 'Mat. Shortage, Rush Order' },
    openActions: 5,
    aiSummary: "Good morning. MTD Revenue ($8.2M) is currently trailing the Outlook progress target ($8.7M) by 5%. Focus on accelerating PGI for Tesla orders. Customer Complaints regarding 'Plating Peeling' require immediate QA attention.",
    topFires: [
        { title: 'Resin PA66 Shortage', owner: 'Michael Wang', status: 'Critical' },
        { title: 'Stamping 02 Feeder Jam', owner: 'David Zhang', status: 'In Progress' },
        { title: 'BYD Rush Order (5k units)', owner: 'Jessica Chen', status: 'New' },
    ]
};

export const CUSTOMER_COMPLAINTS_DATA: CustomerComplaint[] = [
    { id: 'cc1', customer: 'Tesla', issue: 'Connector Housing Crack', status: 'D3 Submitted', owner: 'Tom Wu', daysOpen: 3, description: 'Batch #20240915 found cracking during assembly.' },
    { id: 'cc2', customer: 'Bosch', issue: 'Plating Thickness Low', status: 'Open', owner: 'David Zhang', daysOpen: 1, description: 'Au thickness < 0.8um on terminal tips.' },
    { id: 'cc3', customer: 'Valeo', issue: 'Labeling Error', status: 'D8 Submitted', owner: 'Jessica Chen', daysOpen: 10, description: 'Wrong barcode format on box label.' }
];

export const NEW_WON_PROJECTS_DATA: NewWonProject[] = [
    { id: 'nw1', project: 'Gen4 High-Voltage Busbar', customer: 'Tesla', revenue: 45, sop: 'Jun 2025', image: 'https://images.unsplash.com/photo-1622676006700-642630d7b293?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 'nw2', project: 'ADAS Sensor Housing', customer: 'Waymo', revenue: 12, sop: 'Mar 2025', image: 'https://images.unsplash.com/photo-1594911762128-4b72479e00c3?auto=format&fit=crop&q=80&w=300&h=200' },
    { id: 'nw3', project: 'Battery Interconnect', customer: 'CATL', revenue: 28, sop: 'Jan 2026', image: 'https://images.unsplash.com/photo-1563544955328-fefce27148a7?auto=format&fit=crop&q=80&w=300&h=200' }
];

// Reverted to Summary View for the Main Dashboard
export const FINANCIAL_TABLE_DATA = {
  mtd: [
    { 
      label: 'Part Revenue', 
      vals: ['11,200', '11,500'], 
      vars: [
        { val: '-2.6%', dir: 'down' }, // vs Outlook
        { val: '+1.5%', dir: 'up' },   // vs Budget
        { val: '+4.0%', dir: 'up' }    // vs FY25
      ],
      outlookAnalysis: [
         { reason: 'Vol delay (Tesla)', impact: '-3.0%' }, 
         { reason: 'Mix Improvement', impact: '+0.4%' },
         { reason: 'Spot Order (BYD)', impact: '+0.0%' }
      ]
    },
    { 
      label: 'EBIT before Corp. charge (含 EBIT%)', 
      vals: ['1,680 (15.0%)', '1,840 (16.0%)'], 
      vars: [
        { val: '-8.7%', dir: 'down' },
        { val: '-5.0%', dir: 'down' },
        { val: '-1.2%', dir: 'down' }
      ],
      outlookAnalysis: [
         { reason: 'Vol De-leverage', impact: '-4.2%' },
         { reason: 'Prem. Freight', impact: '-3.0%' },
         { reason: 'Mat. Indexing', impact: '-1.5%' }
      ]
    },
    { 
      label: 'Total Revenue', 
      vals: ['12,450', '12,600'], 
      vars: [
        { val: '-1.2%', dir: 'down' },
        { val: '+0.5%', dir: 'up' },
        { val: '+3.0%', dir: 'up' }
      ],
      outlookAnalysis: [
         { reason: 'Part Rev Impact', impact: '-1.0%' },
         { reason: 'Scrap Sales', impact: '-0.2%' },
         { reason: 'FX Translation', impact: '0.0%' }
      ]
    },
  ],
  ytd: [
    { 
      label: 'Part Revenue', 
      vals: ['89,000', '85,000', '140,000'], 
      vars: [
        { val: '+4.7%', dir: 'up' },   // vs Budget
        { val: '-36.4%', dir: 'down' } // vs FY25 (Comparison)
      ] 
    },
    { 
      label: 'EBIT before Corp. charge (含 EBIT%)', 
      vals: ['13,350 (15.0%)', '11,900 (14.0%)', '22,000'], 
      vars: [
        { val: '+12.2%', dir: 'up' },
        { val: '-39.3%', dir: 'down' }
      ]
    },
    { 
      label: 'Total Revenue', 
      vals: ['98,500', '95,000', '160,000'], 
      vars: [
        { val: '+3.7%', dir: 'up' },
        { val: '-38.4%', dir: 'down' }
      ]
    },
  ]
};

// Updated WBR_FINANCIAL_TABLE with ~27 line items and Drivers for negative variances
export const WBR_FINANCIAL_TABLE = [
    // Top Line
    { category: 'Top Line', description: 'MTD Sales Revenue to Target', owner: OWNERS.sales, olValue: '12,450', olPct: '-1.2%', lastYear: '11,000', total: '98,500', status: 'warning', drivers: [{ reason: 'Tesla vol delay', impact: '-1.0%' }, { reason: 'Mix (Less Busbar)', impact: '-0.2%' }, { reason: 'FX Impact', impact: '0.0%' }] },
    { category: 'Top Line', description: 'CNDN', owner: OWNERS.sales, olValue: '-741', olPct: '-5.9%', lastYear: '-650', total: '-5,900', status: 'critical', drivers: [{ reason: 'Cust. Price Adj.', impact: '-4.0%' }, { reason: 'Rebate Accrual', impact: '-1.9%' }, { reason: 'Vol Variance', impact: '0.0%' }] },
    { category: 'Top Line', description: 'Target Tooling Sales', owner: OWNERS.sales, olValue: '450', olPct: '-10.0%', lastYear: '400', total: '3,600', status: 'warning', drivers: [{ reason: 'Project A32 delay', impact: '-10%' }] },
    { category: 'Top Line', description: 'Target Scrap Sales', owner: OWNERS.ops, olValue: '120', olPct: '+20.0%', lastYear: '90', total: '960', status: 'good' },
    
    // PPV
    { category: 'PPV', description: 'PURCHASE PRICE VARIANCE', owner: OWNERS.supply, olValue: '125', olPct: '+25.0%', lastYear: '80', total: '1,000', status: 'good' },
    { category: 'PPV', description: 'Material Inflation', owner: OWNERS.supply, olValue: '-50', olPct: '-25.0%', lastYear: '-30', total: '-400', status: 'critical', drivers: [{ reason: 'Copper Price', impact: '-20%' }, { reason: 'Resin Index', impact: '-5%' }, { reason: 'Supplier Hike', impact: '0.0%' }] },
    
    // COPA
    { category: 'COPA', description: 'Parts COPA w/o CNDN', owner: OWNERS.cfo, olValue: '4,200', olPct: '+2.4%', lastYear: '3,800', total: '33,600', status: 'good' },
    { category: 'COPA', description: 'Parts COPA% w/o CNDN', owner: OWNERS.cfo, olValue: '33.7%', olPct: '+1.2%', lastYear: '32.0%', total: '34.1%', status: 'good' },
    
    // Indirect COS
    { category: 'Indirect COS', description: 'Total Freight Cost', owner: OWNERS.supply, olValue: '-180', olPct: '-20.0%', lastYear: '-140', total: '-1,440', status: 'critical', drivers: [{ reason: 'Premium Freight', impact: '-15%' }, { reason: 'Fuel Surcharge', impact: '-3%' }, { reason: 'Route Change', impact: '-2%' }] },
    { category: 'Indirect COS', description: 'MTD Unplanned Freight Cost', owner: OWNERS.supply, olValue: '-45', olPct: '-350%', lastYear: '-5', total: '-360', status: 'critical', drivers: [{ reason: 'Tesla Rush Order', impact: '-300%' }, { reason: 'Line Down Avoid', impact: '-50%' }] },
    { category: 'Indirect COS', description: 'MTD TOOLS & CONSUMABLE', owner: OWNERS.ops, olValue: '-30', olPct: '+14.3%', lastYear: '-32', total: '-240', status: 'good' },
    { category: 'Indirect COS', description: 'MRO (辅料)', owner: OWNERS.ops, olValue: '-45', olPct: '-12.5%', lastYear: '-38', total: '-360', status: 'warning', drivers: [{ reason: 'Prev. Maint.', impact: '-8%' }, { reason: 'Unexpected Breakdown', impact: '-4.5%' }] },
    { category: 'Indirect COS', description: 'RECYCLE PACKAGING', owner: OWNERS.ops, olValue: '-10', olPct: '+16.7%', lastYear: '-12', total: '-80', status: 'good' },
    { category: 'Indirect COS', description: 'CONSUMPTION OF ELECTROPLATE RAW', owner: OWNERS.ops, olValue: '-150', olPct: '-7.1%', lastYear: '-130', total: '-1,200', status: 'warning', drivers: [{ reason: 'Gold Salt Price', impact: '-5%' }, { reason: 'Over-plating', impact: '-2.1%' }] },
    { category: 'Indirect COS', description: 'INVENTORY - SCRAP', owner: OWNERS.quality, olValue: '-25', olPct: '-25.0%', lastYear: '-18', total: '-200', status: 'critical', drivers: [{ reason: 'Stamping Setup', impact: '-20%' }, { reason: 'Material Flaw', impact: '-5%' }] },
    { category: 'Indirect COS', description: 'INDIRECT MATERIALS', owner: OWNERS.supply, olValue: '-20', olPct: '-11.1%', lastYear: '-15', total: '-160', status: 'warning', drivers: [{ reason: 'Pkg Price Hike', impact: '-10%' }, { reason: 'Usage Increase', impact: '-1.1%' }] },
    { category: 'Indirect COS', description: 'SORTING COST', owner: OWNERS.quality, olValue: '-15', olPct: '-200%', lastYear: '-2', total: '-120', status: 'critical', drivers: [{ reason: 'Quality Wall (Tesla)', impact: '-150%' }, { reason: '3rd Party Sort', impact: '-50%' }] },
    { category: 'Indirect COS', description: 'EVALUATION TESTING EXP', owner: OWNERS.quality, olValue: '-10', olPct: '+33.3%', lastYear: '-15', total: '-80', status: 'good' },
    { category: 'Indirect COS', description: 'WARRANTY CHARGES/COST', owner: OWNERS.quality, olValue: '-35', olPct: '-75.0%', lastYear: '-10', total: '-280', status: 'critical', drivers: [{ reason: 'Field Claim (Bosch)', impact: '-70%' }, { reason: 'Admin Fee', impact: '-5%' }] },
    { category: 'Indirect COS', description: 'Aging Inventory', owner: OWNERS.supply, olValue: '-50', olPct: '-66.7%', lastYear: '-20', total: '-400', status: 'critical', drivers: [{ reason: 'Ecolab Obsolete', impact: '-60%' }, { reason: 'Slow Moving', impact: '-6.7%' }] },
    
    // DL & IDL
    { category: 'DL & IDL COST', description: 'MTD DL Staff Cost', owner: OWNERS.hr, olValue: '-1,200', olPct: '-4.3%', lastYear: '-1,100', total: '-9,600', status: 'warning', drivers: [{ reason: 'Overtime (Rush)', impact: '-4%' }, { reason: 'Wage Adj.', impact: '-0.3%' }] },
    { category: 'DL & IDL COST', description: 'IDL Staff Cost', owner: OWNERS.hr, olValue: '-800', olPct: '0.0%', lastYear: '-750', total: '-6,400', status: 'good' },
    { category: 'DL & IDL COST', description: 'MTN - MACHINERY & EQUIP', owner: OWNERS.ops, olValue: '-60', olPct: '-20.0%', lastYear: '-45', total: '-480', status: 'warning', drivers: [{ reason: 'Press 04 Repair', impact: '-15%' }, { reason: 'Spare Parts', impact: '-5%' }] },
    { category: 'DL & IDL COST', description: 'WATER & ELECTRICITY', owner: OWNERS.pd, olValue: '-120', olPct: '-9.1%', lastYear: '-100', total: '-960', status: 'warning', drivers: [{ reason: 'Utility Rate', impact: '-5%' }, { reason: 'Prod Volume', impact: '-4.1%' }] },
    
    // SA
    { category: 'SA', description: 'Bad Debt Provision', owner: OWNERS.cfo, olValue: '-5', olPct: 'N/A', lastYear: '0', total: '-40', status: 'critical', drivers: [{ reason: 'Cust. Bankruptcy', impact: '-100%' }] },
    
    // Tooling
    { category: 'Tooling', description: 'Tooling Revenue', owner: OWNERS.tooling, olValue: '200', olPct: '-20.0%', lastYear: '150', total: '1,600', status: 'warning', drivers: [{ reason: 'Acceptance Delay', impact: '-20%' }] },
    { category: 'Tooling', description: 'Tooling Margin', owner: OWNERS.tooling, olValue: '40', olPct: '-20.0%', lastYear: '30', total: '320', status: 'warning', drivers: [{ reason: 'Revenue Miss', impact: '-20%' }] },
];

export const FACTORIES: Factory[] = [
  { id: 'S1', name: 'Stamping 01', type: 'Stamping', oee: 92, scrapRate: 0.8, safetyIncidents: 0, mpsAchievement: 98, utilization: 90, otdRegular: 99, otdUrgent: 95, otdNpi: 90, outputValue: 1200, wipDays: 4.5, routingHours: 1800, clockedHours: 1950, extraHours: 45 },
  { id: 'S2', name: 'Stamping 02', type: 'Stamping', oee: 81, scrapRate: 1.5, safetyIncidents: 1, mpsAchievement: 85, utilization: 88, otdRegular: 92, otdUrgent: 80, otdNpi: 75, outputValue: 1500, wipDays: 6.2, routingHours: 2100, clockedHours: 2400, extraHours: 120 },
  { id: 'M1', name: 'Molding 01', type: 'Molding', oee: 88, scrapRate: 1.2, safetyIncidents: 0, mpsAchievement: 95, utilization: 85, otdRegular: 98, otdUrgent: 90, otdNpi: 88, outputValue: 2100, wipDays: 3.5, routingHours: 2800, clockedHours: 2900, extraHours: 60 },
  { id: 'P1', name: 'Plating 01', type: 'Plating', oee: 94, scrapRate: 0.4, safetyIncidents: 0, mpsAchievement: 96, utilization: 95, otdRegular: 98, otdUrgent: 95, otdNpi: 92, outputValue: 3200, wipDays: 2.5, routingHours: 1500, clockedHours: 1550, extraHours: 30 },
  { id: 'P2', name: 'Plating 02', type: 'Plating', oee: 78, scrapRate: 2.8, safetyIncidents: 1, mpsAchievement: 75, utilization: 98, otdRegular: 80, otdUrgent: 50, otdNpi: 70, outputValue: 3500, wipDays: 12.5, routingHours: 1600, clockedHours: 2100, extraHours: 250 },
  { id: 'P3', name: 'Plating 03', type: 'Plating', oee: 90, scrapRate: 0.2, safetyIncidents: 0, mpsAchievement: 99, utilization: 92, otdRegular: 100, otdUrgent: 100, otdNpi: 98, outputValue: 2800, wipDays: 2.0, routingHours: 1400, clockedHours: 1420, extraHours: 20 },
];

export const EXECUTIVE_KPIS: KPI[] = [
  {
    id: 'k_copa',
    title: 'COPA % (MTD)',
    value: 45,
    unit: '%',
    target: 0,
    trend: 12.5,
    status: 'good',
    category: 'SupplyChain',
    owner: OWNERS.supply,
    comment: 'Strong performance driven by favorable material indexing.',
    monetizationImpact: '$120k Savings'
  },
  {
    id: 'k2',
    title: 'EBITDA Margin',
    value: 16.2,
    unit: '%',
    target: 18.0,
    trend: -1.5,
    status: 'critical',
    category: 'Financial',
    owner: OWNERS.cfo,
    comment: 'Lower than PY due to negative mix shift (less Busbar volume).',
    monetizationImpact: '-$150k vs Budget'
  },
  {
    id: 'k1',
    title: 'ROE',
    value: 12.8,
    unit: '%',
    target: 14.5,
    trend: 1.5,
    status: 'warning',
    category: 'Financial',
    owner: OWNERS.cfo,
    comment: 'Recovering nicely from last year lows, asset turnover improved.',
    monetizationImpact: 'Improving Capital Eff.'
  },
  {
    id: 'k_cash',
    title: 'Cashflow Days',
    value: 32,
    unit: 'Days',
    target: 45,
    trend: -5,
    status: 'critical',
    category: 'Financial',
    owner: OWNERS.cfo,
    comment: 'Worse than PY. Heavy inventory build for Q4 launch impacting cash.',
    monetizationImpact: 'Operating Cash Tight'
  },
  {
    id: 'k5',
    title: 'OTIF',
    value: 94.5,
    unit: '%',
    target: 98.0,
    trend: 2.0,
    status: 'warning',
    category: 'Operational',
    owner: OWNERS.ops,
    comment: 'Better than last year, but Plating 02 downtime caused recent dip.',
    monetizationImpact: 'Customer Line Down Risk'
  },
];

export const REVENUE_EBIT_TREND = [
    { month: 'Jan', revenue: 11200, outlook: 11000, budget: 11500, ebitPct: 15.5, ebitOutlook: 15.0, ebitBudget: 16.0, dl: 420, idl: 110, efficiencyActual: 21.3, efficiencyForecast: null },
    { month: 'Feb', revenue: 10800, outlook: 10800, budget: 11200, ebitPct: 14.8, ebitOutlook: 15.0, ebitBudget: 15.5, dl: 425, idl: 112, efficiencyActual: 20.1, efficiencyForecast: null },
    { month: 'Mar', revenue: 12500, outlook: 12000, budget: 12000, ebitPct: 16.2, ebitOutlook: 15.5, ebitBudget: 16.0, dl: 430, idl: 112, efficiencyActual: 23.0, efficiencyForecast: null },
    { month: 'Apr', revenue: 13800, outlook: 13500, budget: 12500, ebitPct: 17.0, ebitOutlook: 16.0, ebitBudget: 16.5, dl: 440, idl: 115, efficiencyActual: 24.8, efficiencyForecast: null },
    { month: 'May', revenue: 12800, outlook: 13000, budget: 12800, ebitPct: 15.8, ebitOutlook: 16.0, ebitBudget: 16.2, dl: 445, idl: 115, efficiencyActual: 22.8, efficiencyForecast: null },
    { month: 'Jun', revenue: 11500, outlook: 12000, budget: 12000, ebitPct: 14.5, ebitOutlook: 15.5, ebitBudget: 16.0, dl: 442, idl: 114, efficiencyActual: 20.6, efficiencyForecast: null },
    { month: 'Jul', revenue: 12200, outlook: 12500, budget: 12500, ebitPct: 15.2, ebitOutlook: 15.5, ebitBudget: 16.0, dl: 450, idl: 118, efficiencyActual: 21.4, efficiencyForecast: null },
    { month: 'Aug', revenue: 12600, outlook: 12800, budget: 13000, ebitPct: 14.9, ebitOutlook: 15.5, ebitBudget: 16.5, dl: 460, idl: 120, efficiencyActual: 21.7, efficiencyForecast: 21.7 },
    { month: 'Sep', revenue: 13200, outlook: 13000, budget: 12800, ebitPct: 15.5, ebitOutlook: 15.8, ebitBudget: 16.2, dl: 465, idl: 122, efficiencyActual: null, efficiencyForecast: 22.5 },
    { month: 'Oct', revenue: 13500, outlook: 13400, budget: 13000, ebitPct: 16.0, ebitOutlook: 16.2, ebitBudget: 16.5, dl: 470, idl: 125, efficiencyActual: null, efficiencyForecast: 22.7 },
    { month: 'Nov', revenue: 14000, outlook: 13800, budget: 13500, ebitPct: 16.5, ebitOutlook: 16.5, ebitBudget: 16.8, dl: 480, idl: 125, efficiencyActual: null, efficiencyForecast: 23.1 },
    { month: 'Dec', revenue: 13800, outlook: 13600, budget: 13200, ebitPct: 16.2, ebitOutlook: 16.0, ebitBudget: 16.5, dl: 480, idl: 125, efficiencyActual: null, efficiencyForecast: 22.8 },
];

export const ISSUES_MATRIX: Issue[] = [
  { id: 'i1', title: 'Press-Fit Die #04 Crack', urgency: 'High', importance: 'High', owner: OWNERS.ops, ownerDept: 'Operations', dueDate: '2024-09-02', progress: 40, status: 'Open', financialImpact: '$12k/hr downtime', type: 'Delivery', is8D: true, daysOverdue: 2, moneyAtRisk: 12000, sourceStream: 'Produce', autoGenerated: false },
  { id: 'i5', title: 'Au Plating Thickness Variance', urgency: 'High', importance: 'High', owner: OWNERS.quality, ownerDept: 'Quality', dueDate: '2024-08-30', progress: 10, status: 'Escalated', financialImpact: '$40k/mo Gold Loss', type: 'Quality', is8D: true, daysOverdue: 5, moneyAtRisk: 40000, sourceStream: 'Produce', autoGenerated: true },
  { id: 'i2', title: 'Resin PA66 Shortage Risk', urgency: 'High', importance: 'High', owner: OWNERS.supply, ownerDept: 'SCM', dueDate: '2024-09-05', progress: 60, status: 'In Progress', financialImpact: 'Potential Line Stop', type: 'Delivery', moneyAtRisk: 25000, sourceStream: 'Source', autoGenerated: true },
  { id: 'i3', title: 'IATF 16949 Audit Findings', urgency: 'Low', importance: 'High', owner: OWNERS.quality, ownerDept: 'Quality', dueDate: '2024-09-20', progress: 20, status: 'Open', financialImpact: 'Certification Risk', type: 'Quality', moneyAtRisk: 0, sourceStream: 'Produce' },
  { id: 'i6', title: 'Molding 02 Cycle Time Gap', urgency: 'Low', importance: 'High', owner: OWNERS.ops, ownerDept: 'Operations', dueDate: '2024-09-15', progress: 0, status: 'Open', financialImpact: '$5k/mo Efficiency', type: 'Cost', moneyAtRisk: 5000, sourceStream: 'Produce' },
  { id: 'i4', title: 'Clean Room 5S Audit', urgency: 'Low', importance: 'Low', owner: OWNERS.ops, ownerDept: 'Operations', dueDate: '2024-09-10', progress: 100, status: 'Closed', financialImpact: 'Minimal', type: 'Safety', moneyAtRisk: 0, sourceStream: 'Produce' },
];

export const EHS_RISKS = [
    { id: 'r1', workshop: 'Stamping 02', issue: 'Press Guard Sensor Intermittent', risk: 'High', owner: 'David Zhang' },
    { id: 'r2', workshop: 'Plating 02', issue: 'H2SO4 Pump Vibration', risk: 'Medium', owner: 'Michael Wang' }
];

export const CIP_PROJECTS: (CIPProject & { globalSupport?: boolean })[] = [
  { id: 'c1', name: 'Plating Au Recovery System', stage: 'Execution', projectedSavings: 240000, validatedSavings: 0, owner: 'David Zhang', globalSupport: true, department: 'Operations', year: 2024 },
  { id: 'c2', name: 'Auto-AOI for Press-Fit Pins', stage: 'Finance Validation', projectedSavings: 120000, validatedSavings: 115000, owner: 'Eng Team', department: 'R&D', year: 2024 },
  { id: 'c3', name: 'Cu Scrap Recycling Loop', stage: 'Completed', projectedSavings: 60000, validatedSavings: 62500, owner: 'Supply Team', department: 'SCM', year: 2024 },
  { id: 'c4', name: 'Molding Heating Energy Saver', stage: 'Idea', projectedSavings: 45000, validatedSavings: 0, owner: 'Faciltiy Mgr', department: 'Facility', year: 2024 },
];

export const CUSTOMER_PROFITABILITY: CustomerProfitability[] = [
  { name: 'Tesla', revenue: 4500, margin: 22, shareOfWallet: 45 },
  { name: 'Bosch', revenue: 3200, margin: 18, shareOfWallet: 30 },
  { name: 'Denso', revenue: 1800, margin: 15, shareOfWallet: 15 },
  { name: 'Valeo', revenue: 1200, margin: 11, shareOfWallet: 10 },
  { name: 'Local Tier 2', revenue: 500, margin: 8, shareOfWallet: 5 },
];

export const COQ_BREAKDOWN_DATA: COQBreakdown[] = [
    { category: 'Prevention', value: 8500, percentage: 15 },
    { category: 'Appraisal', value: 12000, percentage: 22 },
    { category: 'Internal Failure', value: 24500, percentage: 45 },
    { category: 'External Failure', value: 9800, percentage: 18 },
];

// UPDATED: COQ Details with specific financial values for the list breakdown
export const COQ_CATEGORY_DETAILS = {
    'Prevention': [
        { name: 'Design Reviews', value: 3500 },
        { name: 'Process Training', value: 2000 },
        { name: 'APQP Planning', value: 1800 },
        { name: 'Preventive Maint.', value: 1200 }
    ],
    'Appraisal': [
        { name: 'In-Process Insp.', value: 5000 },
        { name: 'Lab Testing', value: 4000 },
        { name: 'Supplier Audits', value: 1500 },
        { name: 'Calibration', value: 1500 }
    ],
    'Internal Failure': [
        { name: 'Scrap (Material)', value: 12500 },
        { name: 'Rework Labor', value: 6500 },
        { name: 'Downtime', value: 3500 },
        { name: 'Re-inspection', value: 2000 }
    ],
    'External Failure': [
        { name: 'Customer Returns', value: 4500 },
        { name: 'Warranty Claims', value: 2800 },
        { name: 'Sorting at Cust.', value: 1500 },
        { name: 'Penalties', value: 1000 }
    ]
};

export const COQ_HISTORY_DATA: COQHistory[] = [
    { month: 'Jan', value: 65, target: 45, pctOfSales: 2.5 },
    { month: 'Feb', value: 72, target: 45, pctOfSales: 2.8 },
    { month: 'Mar', value: 58, target: 45, pctOfSales: 2.2 },
    { month: 'Apr', value: 52, target: 45, pctOfSales: 2.0 },
    { month: 'May', value: 48, target: 45, pctOfSales: 1.8 },
    { month: 'Jun', value: 45, target: 45, pctOfSales: 1.6 },
];

export const PRODUCTION_VARIANCE_DATA: ProductionVariance[] = [
    { workshop: 'Molding 03', varianceValue: -1500, reason: 'Efficiency Gain (Cycle Time)' },
    { workshop: 'Assembly 02', varianceValue: -500, reason: 'Labor Saving' },
    { workshop: 'Stamping 01', varianceValue: 200, reason: 'Minor Setup Adj.' },
    { workshop: 'Molding 04', varianceValue: 800, reason: 'Material Waste' },
    { workshop: 'Stamping 02', varianceValue: 1200, reason: 'Die Repair Cost' },
    { workshop: 'Plating 02', varianceValue: 3500, reason: 'Au Over-consumption' },
];

export const DAILY_OUTPUT_FLUCTUATION: OutputFluctuation[] = Array.from({length: 30}, (_, i) => {
    const day = i + 1;
    const isWeekend = (day % 7 === 6) || (day % 7 === 0);
    const base = isWeekend ? 40 : 90; 
    
    return {
        date: `D${day}`,
        stamping: base + Math.floor(Math.random() * 20 - 10),
        molding: base + Math.floor(Math.random() * 15 - 5),
        plating: base + Math.floor(Math.random() * 25 - 12),
        assembly: base + Math.floor(Math.random() * 10 - 2),
    };
});

export const SUPPLIER_PPV_DISTRIBUTION = [
    { supplier: 'Supplier A', ppv: 125000, type: 'Fav' },
    { supplier: 'Supplier B', ppv: 45000, type: 'Fav' },
    { supplier: 'Supplier C', ppv: -12000, type: 'Unfav' },
    { supplier: 'Supplier D', ppv: -5000, type: 'Unfav' },
    { supplier: 'Others', ppv: 15000, type: 'Fav' }
];

export const YEAR_DOWN_EVENTS: YearDownEvent[] = [
    { id: 'yd1', customer: 'Tesla', description: 'Annual Contract 3%', date: '2024-10-01', amount: 350, type: 'Year-Down' },
    { id: 'yd2', customer: 'Bosch', description: 'Vol Rebate Tier 2', date: '2024-11-15', amount: 120, type: 'Rebate' },
    { id: 'yd3', customer: 'BYD', description: 'Q4 Price Adj', date: '2024-12-01', amount: 180, type: 'Year-Down' },
    { id: 'yd4', customer: 'Valeo', description: 'SOP+2 Productivity', date: '2025-01-01', amount: 90, type: 'Year-Down' },
];

// ---------------- NEWLY ADDED CONSTANTS ----------------

export const EBITDA_BRIDGE_DATA = [
  { name: 'Budget', value: 2500, fill: '#64748b' },
  { name: 'Vol', value: 450, fill: '#10B981' },
  { name: 'Mix', value: -120, fill: '#EF4444' },
  { name: 'Price', value: -80, fill: '#EF4444' },
  { name: 'Mat', value: 300, fill: '#10B981' },
  { name: 'Ops', value: -50, fill: '#EF4444' },
  { name: 'SG&A', value: -20, fill: '#EF4444' },
  { name: 'Actual', value: 2980, fill: '#2979FF' },
];

export const MUST_WIN_PROJECTS: MustWinProject[] = [
    { id: 'MW1', productCategory: 'Busbar', customer: 'Tesla', revenue5Y: 450, stage: 'Won', stageValue: 5, issue: 'Capacity Ramp', status: 'On Track', winProbability: 100 },
    { id: 'MW2', productCategory: 'Interconnect', customer: 'Bosch', revenue5Y: 120, stage: 'Bidding', stageValue: 4, issue: 'Price Gap', status: 'Critical', winProbability: 60 },
    { id: 'MW3', productCategory: 'Connector', customer: 'Valeo', revenue5Y: 80, stage: 'Quoting', stageValue: 2, issue: 'Tech Spec', status: 'Delayed', winProbability: 30 },
    { id: 'MW4', productCategory: 'Sensor', customer: 'Waymo', revenue5Y: 200, stage: 'DFM', stageValue: 3, issue: 'Design Change', status: 'On Track', winProbability: 50 },
    { id: 'MW5', productCategory: 'Busbar', customer: 'BYD', revenue5Y: 300, stage: 'Won', stageValue: 5, issue: 'SOP Urgency', status: 'On Track', winProbability: 100 },
];

// ---------------- UPDATED CONSTANTS FOR ENTITY HEALTH (Data Tripled) ----------------

export const ENGAGEMENT_TIMELINE: EngagementEvent[] = [
    // Past
    { id: 'e1', date: 'Aug 01', title: 'Strategy Alignment', partner: 'Tesla', type: 'Meeting', status: 'Past', outcome: 'Gen 5 Spec Locked' },
    { id: 'e1_2', date: 'Aug 05', title: 'Price Negotiation Round 1', partner: 'Bosch', type: 'Negotiation', status: 'Past', outcome: 'Gap narrowed to 2%' },
    { id: 'e2', date: 'Aug 10', title: 'Escalation Resolution', partner: 'BYD', type: 'Meeting', status: 'Past', outcome: 'Delivery Plan Agreed' },
    { id: 'e2_2', date: 'Aug 15', title: 'QBR with Tesla', partner: 'Tesla', type: 'Meeting', status: 'Past', outcome: 'Confirmed vol +10%' },
    { id: 'e3_2', date: 'Aug 20', title: 'Supplier Summit', partner: 'Baosteel', type: 'Negotiation', status: 'Past', outcome: 'Price locked for Q4' },
    { id: 'e3', date: 'Sep 01', title: 'Quality Audit Close-out', partner: 'Denso', type: 'Audit', status: 'Past', outcome: 'Grade A Achieved' },
    
    // Future
    { id: 'e4', date: 'Sep 25', title: 'Annual Process Audit', partner: 'Waymo', type: 'Audit', status: 'Future', prep: 'Line 3 clean-up' },
    { id: 'e5', date: 'Oct 05', title: 'Executive Visit (CEO)', partner: 'Valeo', type: 'Visit', status: 'Future', prep: 'Factory Tour Route' },
    { id: 'e6', date: 'Oct 15', title: 'Global Contract Renewal', partner: 'Dupont', type: 'Negotiation', status: 'Future', prep: 'Vol. consolidation' },
    { id: 'e7', date: 'Oct 20', title: 'Tech Day @ Munich', partner: 'BMW', type: 'Visit', status: 'Future', prep: 'New Demo Kits' },
    { id: 'e8', date: 'Nov 01', title: 'Supplier Innovation Awards', partner: 'Bosch', type: 'Meeting', status: 'Future', prep: 'Speech Draft' },
    { id: 'e9', date: 'Dec 10', title: 'Year-End Partner Dinner', partner: 'Strategic Suppliers', type: 'Meeting', status: 'Future', prep: 'Gifts & Awards' },
];

export const SUPPLIER_MATRIX_DATA: MatrixData[] = [
    { name: 'Dupont', innovation: 90, collaboration: 85, spend: 500, category: 'Star' },
    { name: 'Baosteel', innovation: 40, collaboration: 80, spend: 400, category: 'CashCow' }, // Cash Cow: Low Innov, High Collab
    { name: 'Local Plater', innovation: 30, collaboration: 40, spend: 100, category: 'Eliminate' },
    { name: 'Wieland', innovation: 85, collaboration: 75, spend: 350, category: 'Star' },
    { name: 'DOWA', innovation: 80, collaboration: 40, spend: 280, category: 'Question' }, // Question: High Innov, Low Collab
    { name: 'BASF', innovation: 40, collaboration: 85, spend: 450, category: 'CashCow' }, // Cash Cow
    { name: 'Tanaka', innovation: 95, collaboration: 40, spend: 200, category: 'Question' }, // Question
    { name: 'Kyocera', innovation: 75, collaboration: 45, spend: 150, category: 'Question' },
    { name: 'Local Stamping', innovation: 20, collaboration: 30, spend: 80, category: 'Eliminate' }, // Eliminate: Low, Low
    { name: 'K&S', innovation: 88, collaboration: 90, spend: 300, category: 'Star' },
    { name: 'Aurubis', innovation: 35, collaboration: 78, spend: 420, category: 'CashCow' }, // Cash Cow
    { name: 'Logistics Co A', innovation: 40, collaboration: 85, spend: 120, category: 'CashCow' },
];

export const STRATEGIC_SUPPLIERS: StrategicPartner[] = [
    { id: 'sp1', name: 'Dupont', type: 'Supplier', subType: 'Strategic', score: 92, tags: ['TechMonopoly', 'Stable'], changes: [{ type: 'Tech', desc: 'New Resin Gen' }] },
    { id: 'sp2', name: 'Baosteel', type: 'Supplier', subType: 'Core', score: 85, tags: ['PriceHard', 'Cap'], changes: [{ type: 'Risk', desc: 'Price Hike' }] },
    { id: 'sp3', name: 'Wieland', type: 'Supplier', subType: 'Strategic', score: 90, tags: ['TechHungry', 'Stable'], changes: [{ type: 'Strategy', desc: 'E-Mobility Focus' }] },
    { id: 'sp4', name: 'BASF', type: 'Supplier', subType: 'Core', score: 88, tags: ['PriceHard', 'Stable'], changes: [{ type: 'Financial', desc: 'Q3 Revenue Dip' }] },
    { id: 'sp5', name: 'DOWA', type: 'Supplier', subType: 'Strategic', score: 82, tags: ['TechMonopoly', 'CashTight'], changes: [{ type: 'Risk', desc: 'Leadtime Ext' }] },
    { id: 'sp6', name: 'Local Pkg', type: 'Supplier', subType: 'Important', score: 75, tags: ['Agile', 'Replaceable'], changes: [{ type: 'Management', desc: 'New GM' }] },
];

export const STRATEGIC_CUSTOMERS: StrategicPartner[] = [
    { id: 'sc1', name: 'Tesla', type: 'Customer', subType: 'Core', score: 95, tags: ['TechHungry', 'EVTransition'], changes: [{ type: 'Strategy', desc: 'Gen 5 Platform' }] },
    { id: 'sc2', name: 'BYD', type: 'Customer', subType: 'Core', score: 88, tags: ['PriceKiller', 'Agile'], changes: [{ type: 'Risk', desc: 'Vol. Swing' }] },
    { id: 'sc3', name: 'Bosch', type: 'Customer', subType: 'Core', score: 92, tags: ['Stable', 'TechHungry'], changes: [{ type: 'Tech', desc: 'Radar Gen 4' }] },
    { id: 'sc4', name: 'Continental', type: 'Customer', subType: 'Core', score: 85, tags: ['PriceKiller', 'Stable'], changes: [{ type: 'Financial', desc: 'Budget Cut' }] },
    { id: 'sc5', name: 'Rivian', type: 'Customer', subType: 'Strategic', score: 80, tags: ['EVTransition', 'CashTight'], changes: [{ type: 'Risk', desc: 'Ramp Delay' }] },
    { id: 'sc6', name: 'Aptiv', type: 'Customer', subType: 'Important', score: 86, tags: ['Agile', 'TechHungry'], changes: [{ type: 'Strategy', desc: 'HV Connectors' }] },
];

export const NPI_PROJECTS: NPIProject[] = [
    { id: 'NPI1', name: 'Gen5 Busbar', customer: 'Tesla', sopDate: '2024-11', status: 'On Track', milestone: 'PPAP', apqpPhase: 'Phase 4: Validation', specDeviation: 0, monthlyLoss: 0, ytdLoss: 15, qualityIssue: 'None' },
    { id: 'NPI2', name: 'Radar Housing', customer: 'Bosch', sopDate: '2025-02', status: 'At Risk', milestone: 'Tooling', apqpPhase: 'Phase 3: Process Design', specDeviation: 1.5, monthlyLoss: 12, ytdLoss: 45, qualityIssue: 'Dim. unstable', riskDetails: 'Tooling vendor delay' },
    { id: 'NPI3', name: 'HV Connector', customer: 'BYD', sopDate: '2024-12', status: 'Delayed', milestone: 'PV Testing', apqpPhase: 'Phase 4: Validation', specDeviation: 0.5, monthlyLoss: 5, ytdLoss: 20, qualityIssue: 'Leakage' },
];

export const PRODUCTION_LOSSES: ProductionLoss[] = [
    { id: 'PL1', type: 'Machine', description: 'Press 04 Motor Fail', workshop: 'Stamping', duration: 12, lossAmount: 15, rootCause: 'Bearing seizure' },
    { id: 'PL2', type: 'Quality', description: 'Au Plating Peeling', workshop: 'Plating', duration: 24, lossAmount: 45, rootCause: 'Chemical imbalance' },
];

export const CAPACITY_CONSTRAINTS: CapacityConstraint[] = [
    { id: 'CC1', process: 'Stamping 02', constraintRatio: 0.95, reason: 'High Vol Tesla', owner: 'David Zhang', eta: 'Oct 2024' },
    { id: 'CC2', process: 'Plating Au', constraintRatio: 0.92, reason: 'Line Speed Limit', owner: 'Alex Gong', eta: 'Nov 2024' },
];

export const INVENTORY_DATA: InventoryDataCollection = {
    all: {
        history: [{ month: 'Jan', totalValue: 5000, target: 4500 }, { month: 'Feb', totalValue: 5200, target: 4500 }, { month: 'Mar', totalValue: 4800, target: 4500 }],
        aging: [{ range: '0-30', value: 3000, description: 'Fresh' }, { range: '31-90', value: 1200, description: 'Slow' }, { range: '>180', value: 600, description: 'Obsolete' }]
    },
    roh: {
        history: [], aging: [{ range: '0-30', value: 1500, description: 'Resin' }, { range: '>180', value: 200, description: 'Old Metal' }]
    },
    wip: {
        history: [], aging: [{ range: '0-30', value: 1000, description: 'WIP' }]
    },
    fg: {
        history: [], aging: [{ range: '0-30', value: 500, description: 'FG' }]
    }
};

export const CAPACITY_TREND_DATA: CapacityTrend[] = [
    { month: 'Jun', actualOutput: 90, plannedOutput: 95, dilEfficiency: 88, idlEfficiency: 90 },
    { month: 'Jul', actualOutput: 92, plannedOutput: 95, dilEfficiency: 89, idlEfficiency: 91 },
    { month: 'Aug', actualOutput: 94, plannedOutput: 95, dilEfficiency: 92, idlEfficiency: 92 },
];

export const DEMAND_FORECAST_BY_CUSTOMER: Record<string, CustomerDemandProfile> = {
    all: { 
        id: 'all', name: 'All Customers', type: 'Core', volatility: 10, 
        data: [
            { month: 'Jan', forecast: 11000, actual: 11200 },
            { month: 'Feb', forecast: 10500, actual: 10800 },
            { month: 'Mar', forecast: 12000, actual: 12500 },
            { month: 'Apr', forecast: 13500, actual: 13800 },
            { month: 'May', forecast: 13000, actual: 12800 },
            { month: 'Jun', forecast: 12000, actual: 11500 }, 
            { month: 'Jul', forecast: 12500, actual: 12200 }, 
            { month: 'Aug', forecast: 13000, actual: 12600 }, // Cutoff index 7 (Aug)
            { month: 'Sep', forecast: 13500, actual: null as any }, 
            { month: 'Oct', forecast: 14000, actual: null as any },
            { month: 'Nov', forecast: 14500, actual: null as any },
            { month: 'Dec', forecast: 13800, actual: null as any }
        ],
        correctionFactor: 0.98,
        historicalAccuracy: 95,
        biasDescription: 'Stable with minor deviations.'
    },
    tesla: { 
        id: 'tesla', name: 'Tesla', type: 'Core', volatility: 15, 
        data: [
            { month: 'Jan', forecast: 3500, actual: 3600 },
            { month: 'Feb', forecast: 3600, actual: 3700 },
            { month: 'Mar', forecast: 3800, actual: 4000 },
            { month: 'Apr', forecast: 4200, actual: 4400 },
            { month: 'May', forecast: 4300, actual: 4300 },
            { month: 'Jun', forecast: 4000, actual: 3800 }, 
            { month: 'Jul', forecast: 4200, actual: 4500 }, 
            { month: 'Aug', forecast: 4500, actual: 4800 }, 
            { month: 'Sep', forecast: 4600, actual: null as any }, 
            { month: 'Oct', forecast: 4800, actual: null as any },
            { month: 'Nov', forecast: 5200, actual: null as any },
            { month: 'Dec', forecast: 5000, actual: null as any }
        ],
        correctionFactor: 1.05,
        historicalAccuracy: 88,
        biasDescription: 'Under-forecasting due to rapid ramp-up.'
    },
    bosch: { 
        id: 'bosch', name: 'Bosch', type: 'Core', volatility: 5, 
        data: [
            { month: 'Jan', forecast: 2900, actual: 2950 },
            { month: 'Feb', forecast: 2950, actual: 2900 },
            { month: 'Mar', forecast: 3000, actual: 3000 },
            { month: 'Apr', forecast: 3000, actual: 3050 },
            { month: 'May', forecast: 3050, actual: 3000 },
            { month: 'Jun', forecast: 3000, actual: 3000 }, 
            { month: 'Jul', forecast: 3000, actual: 2900 }, 
            { month: 'Aug', forecast: 3100, actual: 3050 }, 
            { month: 'Sep', forecast: 3100, actual: null as any }, 
            { month: 'Oct', forecast: 3100, actual: null as any },
            { month: 'Nov', forecast: 3150, actual: null as any },
            { month: 'Dec', forecast: 3050, actual: null as any }
        ],
        correctionFactor: 1.0,
        historicalAccuracy: 98,
        biasDescription: 'Highly accurate forecasts.'
    },
    byd: { 
        id: 'byd', name: 'BYD', type: 'Core', volatility: 20, 
        data: [
            { month: 'Jan', forecast: 1200, actual: 1000 },
            { month: 'Feb', forecast: 1500, actual: 1200 },
            { month: 'Mar', forecast: 1800, actual: 1500 },
            { month: 'Apr', forecast: 2000, actual: 1800 },
            { month: 'May', forecast: 2200, actual: 2000 },
            { month: 'Jun', forecast: 2000, actual: 1800 }, 
            { month: 'Jul', forecast: 2200, actual: 1500 }, 
            { month: 'Aug', forecast: 2500, actual: 2800 }, 
            { month: 'Sep', forecast: 2600, actual: null as any }, 
            { month: 'Oct', forecast: 2800, actual: null as any },
            { month: 'Nov', forecast: 3200, actual: null as any },
            { month: 'Dec', forecast: 3000, actual: null as any }
        ],
        correctionFactor: 0.85,
        historicalAccuracy: 75,
        biasDescription: 'High volatility, tendency to over-order.'
    },
    rivian: { 
        id: 'rivian', name: 'Rivian', type: 'Other', volatility: 45, 
        data: [
            { month: 'Jan', forecast: 1000, actual: 500 },
            { month: 'Feb', forecast: 1500, actual: 600 },
            { month: 'Mar', forecast: 2000, actual: 800 },
            { month: 'Apr', forecast: 3000, actual: 1200 },
            { month: 'May', forecast: 4000, actual: 1500 },
            { month: 'Jun', forecast: 4500, actual: 2000 }, 
            { month: 'Jul', forecast: 5000, actual: 2200 }, 
            { month: 'Aug', forecast: 5500, actual: 2500 }, 
            { month: 'Sep', forecast: 6000, actual: null as any }, 
            { month: 'Oct', forecast: 7000, actual: null as any },
            { month: 'Nov', forecast: 8000, actual: null as any },
            { month: 'Dec', forecast: 9000, actual: null as any }
        ],
        correctionFactor: 0.6,
        historicalAccuracy: 45,
        biasDescription: 'Startup Optimism: Consistently over-estimates ramp-up speed.'
    },
    continental: { 
        id: 'continental', name: 'Continental', type: 'Core', volatility: 8, 
        data: [
            { month: 'Jan', forecast: 1800, actual: 2200 },
            { month: 'Feb', forecast: 1900, actual: 2300 },
            { month: 'Mar', forecast: 2000, actual: 2500 },
            { month: 'Apr', forecast: 1900, actual: 2400 },
            { month: 'May', forecast: 2000, actual: 2600 },
            { month: 'Jun', forecast: 2100, actual: 2700 }, 
            { month: 'Jul', forecast: 2000, actual: 2600 }, 
            { month: 'Aug', forecast: 2200, actual: 2800 }, 
            { month: 'Sep', forecast: 2300, actual: null as any }, 
            { month: 'Oct', forecast: 2300, actual: null as any },
            { month: 'Nov', forecast: 2400, actual: null as any },
            { month: 'Dec', forecast: 2200, actual: null as any }
        ],
        correctionFactor: 1.25,
        historicalAccuracy: 80,
        biasDescription: 'Sandbagging: Systematic under-forecasting vs actual pull.'
    },
    valeo: { 
        id: 'valeo', name: 'Valeo', type: 'Other', volatility: 25, 
        data: [
            { month: 'Jan', forecast: 2500, actual: 2400 },
            { month: 'Feb', forecast: 2500, actual: 2300 },
            { month: 'Mar', forecast: 2400, actual: 2000 },
            { month: 'Apr', forecast: 2400, actual: 1800 },
            { month: 'May', forecast: 2300, actual: 1500 },
            { month: 'Jun', forecast: 2300, actual: 1200 }, 
            { month: 'Jul', forecast: 2200, actual: 1000 }, 
            { month: 'Aug', forecast: 2200, actual: 800 }, 
            { month: 'Sep', forecast: 2100, actual: null as any }, 
            { month: 'Oct', forecast: 2000, actual: null as any },
            { month: 'Nov', forecast: 1900, actual: null as any },
            { month: 'Dec', forecast: 1800, actual: null as any }
        ],
        correctionFactor: 0.7,
        historicalAccuracy: 60,
        biasDescription: 'Legacy Decline: Forecast lagging behind EOL drop.'
    },
};

export const CORE_CUSTOMER_STATUS: CoreCustomerStatus[] = [
    { id: 'c1', name: 'Tesla', type: 'OEM', otd: 99.5, overdueDays: 5, yearDownHitRate: 100, volatility: 15 },
    { id: 'c2', name: 'Bosch', type: 'Tier1', otd: 98.0, overdueDays: 15, yearDownHitRate: 90, volatility: 5 },
    { id: 'c3', name: 'BYD', type: 'OEM', otd: 97.5, overdueDays: 30, yearDownHitRate: 85, volatility: 20 },
    // New Customers Added
    { id: 'c4', name: 'Rivian', type: 'New Energy', otd: 96.0, overdueDays: 45, yearDownHitRate: 60, volatility: 45 },
    { id: 'c5', name: 'Continental', type: 'Tier1', otd: 99.0, overdueDays: 10, yearDownHitRate: 98, volatility: 8 },
    { id: 'c6', name: 'Valeo', type: 'Tier1', otd: 98.5, overdueDays: 20, yearDownHitRate: 88, volatility: 25 },
];

export const SALES_RISKS: SalesRisk[] = [
    { id: 'sr1', customer: 'BYD', amount: 450, days: 45, type: 'Overdue', rating: 'B' },
    { id: 'sr2', customer: 'Local T2', amount: 120, days: 90, type: 'Dispute', rating: 'C' },
];

export const CASH_LEAKAGE_WATERFALL: CashFlowWaterfallItem[] = [
    { name: 'Gross Sales', value: 20000, fill: '#64748b' },
    { name: 'Rebates', value: -500, fill: '#EF4444' },
    { name: 'Year-Down', value: -300, fill: '#EF4444' },
    { name: 'Freight', value: -200, fill: '#EF4444' },
    { name: 'Penalties', value: -80, fill: '#EF4444' },
    { name: 'Scrap', value: 150, fill: '#10B981' },
    { name: 'Net Sales', value: 19070, fill: '#2979FF' },
];

export const COST_PASS_THROUGH_DETAILS: CostPassThroughDetail[] = [
    { customer: 'Tesla', impactAmount: 500, recoveredAmount: 450, gap: 50, status: 'Recovered' },
    { customer: 'Bosch', impactAmount: 300, recoveredAmount: 200, gap: 100, status: 'Negotiating' },
];

export const PREMIUM_FREIGHT_DATA: PremiumFreightDetail[] = [
    { id: 'pf1', customer: 'Tesla', mode: 'Air', amount: 45, reason: 'Line Down Avoidance' },
    { id: 'pf2', customer: 'BYD', mode: 'Express Truck', amount: 15, reason: 'Short Leadtime' },
];

export const CER_REQUESTS: CERRequest[] = [
    { id: 'cer1', project: 'Plating Line 3 Upgrade', amount: 450000, status: 'Pending', requestDate: '2024-09-01', type: 'Capacity', department: 'Production', reason: 'Tesla vol increase' },
    { id: 'cer2', project: 'AOI Machine', amount: 120000, status: 'Approved', requestDate: '2024-08-15', type: 'Quality', department: 'Quality', reason: 'Reduce inspection labor' },
];

export const SPENDING_TRENDS_YTD: SpendingTrend[] = [
    { month: 'Jun', mroMaint: 12, mroTools: 8, mroConsumables: 15, mroBudget: 40, sparesActual: 10, sparesBudget: 12, sparesDriver: 'Pump Fail' },
    { month: 'Jul', mroMaint: 15, mroTools: 10, mroConsumables: 18, mroBudget: 40, sparesActual: 15, sparesBudget: 12, sparesDriver: 'Motor Burn' },
    { month: 'Aug', mroMaint: 18, mroTools: 12, mroConsumables: 20, mroBudget: 40, sparesActual: 20, sparesBudget: 12, sparesDriver: 'Sensor Repl' },
];

export const IQC_LINE_STOPS: IQCLineStop[] = [
    { id: 'iqc1', material: 'Resin PA66', supplier: 'Dupont', duration: 4, date: 'Aug 12' },
    { id: 'iqc2', material: 'Cu Strip', supplier: 'Baosteel', duration: 2, date: 'Aug 25' },
];

export const PROCUREMENT_EXCEPTIONS: ProcurementException[] = [
    { id: 'pe1', type: 'Budget', message: 'MRO Over Budget', value: '+$10k', severity: 'High' },
    { id: 'pe2', type: 'Supplier', message: 'Supplier C Quality Dip', value: '85%', severity: 'Medium' },
];

export const PROCUREMENT_CATEGORY_SPEND: ProcurementCategorySpend[] = [
    { category: 'Metal', amount: 4500 },
    { category: 'Resin', amount: 2200 },
    { category: 'Outsourced', amount: 1500 },
    { category: 'Packaging', amount: 800 },
];

export const COPA_CUSTOMER_BREAKDOWN: COPABreakdown[] = [
    { name: 'Tesla', value: 45 },
    { name: 'Bosch', value: 25 },
    { name: 'BYD', value: 15 },
    { name: 'Others', value: 15 },
];

export const CUSTOMER_PENALTIES: CustomerPenalty[] = [
    { id: 'cp1', customer: 'Bosch', type: 'Quality Claim', amount: 15, date: 'Aug 05', description: 'Connector crack', status: 'Open' },
    { id: 'cp2', customer: 'BYD', type: 'Logistics', amount: 5, date: 'Aug 20', description: 'Late delivery (4hrs)', status: 'Closed' },
];

export const GLOBAL_COMMODITY_TRENDS: CommodityData[] = [
    { month: 'Jun', gold: 1950, silver: 23, copper: 8500 },
    { month: 'Jul', gold: 1980, silver: 24, copper: 8600 },
    { month: 'Aug', gold: 2020, silver: 25, copper: 8800 },
];

export const MARKET_INTEL_ALERTS: MarketIntelligence[] = [
    { id: 'mi1', title: 'Copper price surge expected Q4', date: 'Sep 01', severity: 'High', source: 'LME' },
    { id: 'mi2', title: 'Resin supply shortage in Asia', date: 'Aug 28', severity: 'Medium', source: 'Supplier' },
];

export const OPERATIONAL_ISSUES_DATA: OperationalIssue[] = [
    { id: 'op1', workshop: 'Stamping', issue: 'Feeder Jam frequent', category: 'Equipment', daysOpen: 12, status: 'Escalated', owner: 'Maint. Team', action: 'Parts ordered' },
    { id: 'op2', workshop: 'Plating', issue: 'Bath contamination', category: 'Method', daysOpen: 3, status: 'Open', owner: 'Process Eng', action: 'Analyzing' },
];

export const BOTTOM_PROFIT_PRODUCTS: ProductProfitability[] = [
    { id: 'p1', name: 'Old Gen Connector', customer: 'Valeo', revenue: 50, margin: -5, marginTarget: 10 },
    { id: 'p2', name: 'Legacy Housing', customer: 'Tier 2', revenue: 30, margin: 2, marginTarget: 15 },
];

export const CROSS_MODULE_IMPACTS: CrossModuleImpact[] = [
    { id: 'cm1', customer: 'Tesla', fluctuation: '+20% Vol', impactLevel: 'High', productionAction: 'Add Weekend Shift', status: 'Confirmed' },
    { id: 'cm2', customer: 'BYD', fluctuation: '-15% Vol', impactLevel: 'Medium', productionAction: 'Reduce OT', status: 'Pending' },
    // New Impact Items
    { id: 'cm3', customer: 'Rivian', fluctuation: '+45% Forecast Bias', impactLevel: 'High', productionAction: 'Review Safety Stock', status: 'Confirmed' },
    { id: 'cm4', customer: 'Continental', fluctuation: '+2% Vol (Stable)', impactLevel: 'Low', productionAction: 'No Change', status: 'Confirmed' },
    { id: 'cm5', customer: 'Valeo', fluctuation: '-25% EOL Drop', impactLevel: 'Medium', productionAction: 'Manpower Release', status: 'Pending' },
];

export const SCRAP_SALES_MTD = { value: 120, target: 100, trend: 20 };

export const CUSTOMER_FUNNEL_DATA: CustomerFunnelItem[] = [
    { tier: 'Strategic (Top 3)', count: 3, revenueShare: 65, growth: 15, desc: 'Core Growth Engine' },
    { tier: 'Emerging (Next 5)', count: 5, revenueShare: 25, growth: 8, desc: 'Future Stars' },
    { tier: 'Long Tail', count: 40, revenueShare: 10, growth: 2, desc: 'Maintain / Optimize' },
];

export const CIP_KPI_STATS: CIPStat[] = [
    { label: 'Savings', value: '$1.2M', trend: 15 },
    { label: 'Participation', value: '45%', trend: 5 },
    { label: 'Count', value: '32', trend: 10 },
];

export const DEPT_CIP_PERFORMANCE: CIPDepartmentStat[] = [
    { department: 'Ops', share: 45, target: 500, actual: 550 },
    { department: 'SCM', share: 25, target: 300, actual: 280 },
    { department: 'Eng', share: 20, target: 200, actual: 250 },
    { department: 'Quality', share: 10, target: 100, actual: 120 },
];

export const CIP_HEROES: CIPHero[] = [
    { rank: 1, name: 'David Z.', department: 'Ops', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100', contribution: 'Auto-AOI Project', savings: 120000 },
    { rank: 2, name: 'Sarah L.', department: 'Finance', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100', contribution: 'Cash Flow Opt', savings: 85000 },
    { rank: 3, name: 'Mike W.', department: 'SCM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100', contribution: 'Freight Redux', savings: 60000 },
    { rank: 4, name: 'Emily R.', department: 'Quality', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100', contribution: 'Scrap Reduction', savings: 45000 },
    { rank: 5, name: 'James K.', department: 'Eng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', contribution: 'Energy Saving', savings: 32000 },
];

export const TOP_INNOVATORS: InnovationStar[] = [
    { rank: 1, name: 'Alex G.', department: 'R&D', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100', score: 98, patents: 3 },
    { rank: 2, name: 'Tom W.', department: 'Quality', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100', score: 92, patents: 1 },
    { rank: 3, name: 'Lisa M.', department: 'Ops', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100', score: 88, patents: 1 },
    { rank: 4, name: 'Robert C.', department: 'Eng', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100', score: 85, patents: 0 },
    { rank: 5, name: 'Jessica T.', department: 'SCM', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100', score: 82, patents: 0 },
];

export const TOP_COMPLETED_CIP: CIPProject[] = [
    { id: 'c1', name: 'Plating Au Recovery', stage: 'Completed', projectedSavings: 240000, validatedSavings: 250000, owner: 'David Zhang' },
    { id: 'c2', name: 'Scrap Loop', stage: 'Completed', projectedSavings: 60000, validatedSavings: 62000, owner: 'Mike Wang' },
    { id: 'c5', name: 'Packaging Optimization', stage: 'Completed', projectedSavings: 30000, validatedSavings: 35000, owner: 'Logistics Team' },
    { id: 'c6', name: 'Lighting LED Upgrade', stage: 'Completed', projectedSavings: 15000, validatedSavings: 18000, owner: 'Facility Team' },
    { id: 'c7', name: 'Office Paperless', stage: 'Completed', projectedSavings: 5000, validatedSavings: 6000, owner: 'Admin' },
    { id: 'c11', name: 'Water Recycling System', stage: 'Completed', projectedSavings: 20000, validatedSavings: 22000, owner: 'Facility Team' },
    { id: 'c12', name: 'Mold Maint. Cycle Opt', stage: 'Completed', projectedSavings: 45000, validatedSavings: 48000, owner: 'Tooling Dept' },
    { id: 'c13', name: 'AGV Implementation Ph1', stage: 'Completed', projectedSavings: 80000, validatedSavings: 75000, owner: 'Logistics' },
    { id: 'c14', name: 'Compressor Heat Recovery', stage: 'Completed', projectedSavings: 25000, validatedSavings: 28000, owner: 'Facility Team' },
    { id: 'c15', name: 'Solder Paste Waste Redux', stage: 'Completed', projectedSavings: 12000, validatedSavings: 15000, owner: 'Production' },
];

export const TOP_ONGOING_CIP: CIPProject[] = [
    { id: 'c3', name: 'Auto-AOI', stage: 'Execution', projectedSavings: 120000, validatedSavings: 0, owner: 'Eng Team' },
    { id: 'c4', name: 'Molding Energy', stage: 'Idea', projectedSavings: 45000, validatedSavings: 0, owner: 'Facility' },
    { id: 'c8', name: 'Forklift Optimization', stage: 'Execution', projectedSavings: 25000, validatedSavings: 0, owner: 'Warehouse' },
    { id: 'c9', name: 'Coolant Recycling', stage: 'Finance Validation', projectedSavings: 40000, validatedSavings: 38000, owner: 'EHS Team' },
    { id: 'c10', name: 'AI Scheduling', stage: 'Idea', projectedSavings: 80000, validatedSavings: 0, owner: 'IT Dept' },
    { id: 'c16', name: 'Solar Panel Installation', stage: 'Execution', projectedSavings: 60000, validatedSavings: 0, owner: 'Facility' },
    { id: 'c17', name: 'Smart Metering Project', stage: 'Execution', projectedSavings: 15000, validatedSavings: 0, owner: 'Facility' },
    { id: 'c18', name: 'Digital SOP Rollout', stage: 'Finance Validation', projectedSavings: 30000, validatedSavings: 0, owner: 'Ops Excellence' },
    { id: 'c19', name: 'Supplier Kanban System', stage: 'Idea', projectedSavings: 50000, validatedSavings: 0, owner: 'SCM Team' },
    { id: 'c20', name: 'Robot Arm Retrofit', stage: 'Execution', projectedSavings: 90000, validatedSavings: 0, owner: 'Automation' },
];

export const RESOURCE_BOTTLENECKS = [
    { owner: 'Ops Team', open: 12, overdue: 4 },
    { owner: 'Quality', open: 8, overdue: 2 },
    { owner: 'SCM', open: 5, overdue: 1 },
    { owner: 'Sales', open: 7, overdue: 3 },
];