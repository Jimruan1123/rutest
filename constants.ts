
import { Owner, KPI, Factory, Issue, EHS_RISK, CIPProject, NPIProject, MustWinProject, CustomerDemandProfile, StrategicPartner } from './types';

export const OWNERS: Record<string, Owner> = {
  ops: { id: '1', name: 'David Zhang', role: 'Operations Director', department: 'Operations', avatar: 'https://i.pravatar.cc/150?u=david' },
  finance: { id: '2', name: 'Sarah Lin', role: 'Finance Controller', department: 'Finance', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  quality: { id: '3', name: 'Tom Wu', role: 'Quality Manager', department: 'Quality', avatar: 'https://i.pravatar.cc/150?u=tom' },
  supply: { id: '4', name: 'Michael Wang', role: 'SCM Manager', department: 'Supply Chain', avatar: 'https://i.pravatar.cc/150?u=michael' },
  sales: { id: '5', name: 'Lisa Chen', role: 'Sales Director', department: 'Sales', avatar: 'https://i.pravatar.cc/150?u=lisa' },
};

export const EXECUTIVE_KPIS: KPI[] = [
  { id: 'k_copa', title: 'COPA % MTD', value: '4.2', unit: '%', target: '5.0', trend: -0.8, status: 'warning', category: 'Financial', owner: OWNERS.finance, comment: 'Raw material price surge in copper.' },
  { id: 'k2', title: 'EBITDA Margin', value: '16.2', unit: '%', target: '15.0', trend: 1.5, status: 'good', category: 'Financial', owner: OWNERS.finance },
  { id: 'k_otif', title: 'OTIF', value: '94.5', unit: '%', target: '98.0', trend: -2.0, status: 'critical', category: 'Operational', owner: OWNERS.ops, comment: 'Shortage of PA66 resin delayed Stamping batches.', monetizationImpact: '-$45k Penalty Risk' },
  { id: 'k_scrap', title: 'Scrap Rate', value: '1.8', unit: '%', target: '1.2', trend: -0.4, status: 'warning', category: 'Operational', owner: OWNERS.quality },
  { id: 'k_cash', title: 'CCC Days', value: '62', unit: 'Days', target: '55', trend: -7, status: 'warning', category: 'Financial', owner: OWNERS.finance }
];

export const EHS_RISKS: EHS_RISK[] = [
  { id: 'r1', workshop: 'Stamping 02', issue: 'Guard Sensor Malfunction', risk: 'High', owner: 'David Zhang' },
  { id: 'r2', workshop: 'Plating 01', issue: 'Chemical Leakage Risk', risk: 'Medium', owner: 'Alex Gong' },
  { id: 'r3', workshop: 'Assembly 05', issue: 'Ergonomic Station Height', risk: 'Low', owner: 'Tom Wu' }
];

export const MUST_WIN_PROJECTS: MustWinProject[] = [
  { id: 'P001', productCategory: 'Connector', customer: 'Tesla', revenue5Y: 45, stage: 'Bidding', stageValue: 4, issue: 'Technical spec gap', status: 'Critical', winProbability: 65 },
  { id: 'P002', productCategory: 'Busbar', customer: 'BYD', revenue5Y: 32, stage: 'Won', stageValue: 5, issue: 'Ramp-up speed', status: 'On Track', winProbability: 100 },
  { id: 'P003', productCategory: 'Sensor', customer: 'Bosch', revenue5Y: 28, stage: 'Quoting', stageValue: 2, issue: 'Pricing pressure', status: 'Delayed', winProbability: 40 }
];

export const NPI_PROJECTS: NPIProject[] = [
  { id: 'npi1', name: 'Project Zeus', customer: 'Tesla', sopDate: '2025-03', status: 'At Risk', milestone: 'PV Testing', apqpPhase: 'Phase 4: Validation', specDeviation: 1.2, ytdLoss: 45 },
  { id: 'npi2', name: 'Falcon Gen 2', customer: 'SpaceX', sopDate: '2024-11', status: 'On Track', milestone: 'SOP Prep', apqpPhase: 'Phase 5: Launch', specDeviation: 0.2, ytdLoss: 12 }
];

export const FACTORIES: Factory[] = [
  { id: 'F1', name: 'Stamping', type: 'Stamping', oee: 82, scrapRate: 1.5, safetyIncidents: 0, mpsAchievement: 92, utilization: 85, otdRegular: 95, otdUrgent: 80, otdNpi: 100, outputValue: 4500, wipDays: 4.2, routingHours: 1200, clockedHours: 1450, extraHours: 250 },
  { id: 'F2', name: 'Plating', type: 'Plating', oee: 78, scrapRate: 2.1, safetyIncidents: 0, mpsAchievement: 88, utilization: 92, otdRegular: 90, otdUrgent: 75, otdNpi: 95, outputValue: 3200, wipDays: 5.8, routingHours: 800, clockedHours: 1100, extraHours: 300 }
];

export const DEMAND_FORECAST_DATA: Record<string, CustomerDemandProfile> = {
  all: {
    id: 'all', name: 'Total Factory', volatility: 12, correctionFactor: 0.92, historicalAccuracy: 88, biasDescription: 'Aggressive sales forecast',
    data: [
      { month: 'Jan', forecast: 1200, actual: 1150 }, { month: 'Feb', forecast: 1100, actual: 1050 },
      { month: 'Mar', forecast: 1300, actual: 1200 }, { month: 'Aug', forecast: 1500, actual: 1380 }
    ]
  }
};

export const STRATEGIC_PARTNERS: StrategicPartner[] = [
  { id: 's1', name: 'CopperCo Ltd', type: 'Supplier', subType: 'Strategic', score: 92, tags: ['#TechMonopoly', '#Stable'], changes: [{ type: 'Price', desc: 'Q4 Contract Re-neg' }] },
  { id: 'c1', name: 'Tesla Giga', type: 'Customer', subType: 'Core', score: 95, tags: ['#EVTransition', '#Agile'], changes: [{ type: 'Strategy', desc: 'Shift to LFP Batteries' }] }
];

export const ISSUES_MATRIX: Issue[] = [
  { id: 'i1', title: 'Press-Fit Tooling Crack', urgency: 'High', importance: 'High', owner: OWNERS.ops, status: 'Open', financialImpact: '$12k/day', type: 'Delivery', moneyAtRisk: 12000, sourceStream: 'Produce', dueDate: '2024-09-25' },
  { id: 'i2', title: 'PA66 Resin Shortage', urgency: 'High', importance: 'High', owner: OWNERS.supply, status: 'In Progress', financialImpact: 'Line Stop', type: 'Delivery', moneyAtRisk: 45000, sourceStream: 'Source', autoGenerated: true },
  { id: 'i3', title: 'Audit Non-Conformance', urgency: 'Low', importance: 'High', owner: OWNERS.quality, status: 'Open', financialImpact: 'Certification Risk', type: 'Quality', moneyAtRisk: 5000, sourceStream: 'Produce' }
];

export const CIP_KPI_STATS = [
  { label: 'YTD Savings', value: '$1.2M', trend: 15 },
  { label: 'Participation', value: '85%', trend: 10 },
  { label: 'Active Projects', value: '48', trend: 20 }
];

// Fix: Add missing properties to DAILY_PULSE_DATA
export const DAILY_PULSE_DATA = {
  aiSummary: "Yesterday's output was **stable** at $450k. **Tesla** volume is ramping up but **PA66 shortage** remains a critical bottleneck for next week.",
  topFires: [
    { title: 'Plating Line 2 Breakdown', owner: 'David Zhang', status: 'Critical' },
    { title: 'Overdue AR - Rivian', owner: 'Sarah Lin', status: 'High' }
  ],
  mtdRevenue: { val: 12500, target: 11000, status: 'good' },
  yesterdayRevenue: 450
};

// Fix: Export missing data for ExecutiveCockpit
export const CUSTOMER_PROFITABILITY = [
  { name: 'Tesla', margin: 18, shareOfWallet: 45, revenue: 12500 },
  { name: 'BYD', margin: 14, shareOfWallet: 30, revenue: 8500 },
  { name: 'Bosch', margin: 11, shareOfWallet: 15, revenue: 4200 },
];

export const EBITDA_BRIDGE_DATA = [
  { name: 'Budget', value: 1500, fill: '#64748b' },
  { name: 'Volume', value: 200, fill: '#00E676' },
  { name: 'Price', value: -150, fill: '#FF3333' },
  { name: 'Mix', value: 80, fill: '#00E676' },
  { name: 'Material', value: -120, fill: '#FF3333' },
  { name: 'EBITDA', value: 1510, fill: '#64748b' },
];

export const REVENUE_EBIT_TREND = [
  { month: 'Jan', revenue: 12000, outlook: 12200, budget: 11800, ebitPct: 15.2, ebitOutlook: 15.0, ebitBudget: 14.8, dl: 450, idl: 120, efficiencyActual: 24.5 },
  { month: 'Aug', revenue: 13500, outlook: 13000, budget: 12500, ebitPct: 16.2, ebitOutlook: 15.5, ebitBudget: 15.0, dl: 480, idl: 125, efficiencyActual: 26.2 },
];

export const FINANCIAL_TABLE_DATA = {
  mtd: [
    { label: 'Net Sales', vals: ['12,500', '12,200'], vars: [{ val: '+2.4%', dir: 'up' }, { val: '+3.5%', dir: 'up' }, { val: '+5.0%', dir: 'up' }], outlookAnalysis: [{ reason: 'High demand Tesla', impact: '+2.0%' }] },
    { label: 'Gross Margin', vals: ['3,200', '3,100'], vars: [{ val: '+3.2%', dir: 'up' }, { val: '-1.2%', dir: 'down' }, { val: '+2.0%', dir: 'up' }] },
  ],
  ytd: [
    { label: 'Net Sales', vals: ['95,000', '92,000', '90,000'], vars: [{ val: '+3.2%', dir: 'up' }, { val: '+5.5%', dir: 'up' }] },
  ]
};

export const ENGAGEMENT_TIMELINE = [
  { id: 'e1', date: 'Aug 15', title: 'Tesla Giga Visit', partner: 'Tesla', type: 'Visit', status: 'Past', outcome: 'Confirmed Phase 2 allocation', prep: 'Review capacity' },
  { id: 'e2', date: 'Sep 05', title: 'QBR BYD', partner: 'BYD', type: 'Meeting', status: 'Future', outcome: 'N/A', prep: 'Prepare cost-down roadmap' },
];

export const WBR_FINANCIAL_TABLE = [
  { category: 'Revenue', description: 'Net Sales', owner: OWNERS.sales, olValue: '12,500', olPct: '+2.4%', lastYear: '11,800', total: '95,000', status: 'good' },
  { category: 'Cost', description: 'Material Variance', owner: OWNERS.supply, olValue: '-450', olPct: '-12.0%', lastYear: '-380', total: '-2,500', status: 'critical', drivers: [{ reason: 'Copper spike', impact: '-5.0%' }] },
];

export const CUSTOMER_COMPLAINTS_DATA = [
  { id: 'c1', customer: 'Tesla', issue: 'Packaging Damage', daysOpen: 4, status: 'Open', description: 'Box deformation in transit to Berlin.', owner: 'Tom Wu' },
];

export const NEW_WON_PROJECTS_DATA = [
  { id: 'nw1', project: 'Zeus Controller', customer: 'Tesla', revenue: 15, sop: '2025-Q1', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=200&auto=format&fit=crop' },
];

// Fix: Export missing data for EntityHealth
export const SUPPLIER_MATRIX_DATA = [
  { name: 'CopperCo', innovation: 85, collaboration: 92, spend: 500, category: 'Star' },
  { name: 'ResinWorks', innovation: 45, collaboration: 40, spend: 300, category: 'Eliminate' },
];

export const STRATEGIC_SUPPLIERS = [
  { id: 's1', name: 'CopperCo Ltd', subType: 'Strategic', tags: ['#TechMonopoly', '#Stable'], score: 92, changes: [{ type: 'Price', desc: 'Q4 Contract Re-neg' }] },
];

export const STRATEGIC_CUSTOMERS = [
  { id: 'c1', name: 'Tesla Giga', subType: 'Core', tags: ['#EVTransition', '#Agile'], score: 95, changes: [{ type: 'Strategy', desc: 'Shift to LFP Batteries' }] },
];

export const CUSTOMER_FUNNEL_DATA = [
  { tier: 'Strategic (Core)', desc: '80% Revenue Contribution', count: 5, growth: 12 },
  { tier: 'Emerging', desc: 'Next Gen Platforms', count: 12, growth: 25 },
  { tier: 'Long Tail', desc: 'Transactional', count: 45, growth: -5 },
];

// Fix: Export missing data for ActionCenter
export const DEPT_CIP_PERFORMANCE = [
  { department: 'Operations', share: 45, actual: 540, target: 500 },
  { department: 'Supply Chain', share: 25, actual: 300, target: 350 },
  { department: 'Quality', share: 20, actual: 240, target: 200 },
  { department: 'Finance', share: 10, actual: 120, target: 100 },
];

export const CIP_HEROES = [
  { rank: 1, name: 'John Doe', department: 'Operations', contribution: 'Waste Reduction', savings: 150000, avatar: 'https://i.pravatar.cc/150?u=john' },
];

export const TOP_INNOVATORS = [
  { rank: 1, name: 'Alice Smith', department: 'Engineering', patents: 4, score: 95, avatar: 'https://i.pravatar.cc/150?u=alice' },
];

export const TOP_COMPLETED_CIP = [
  { id: 'cip1', name: 'Automation Phase 1', owner: 'David Zhang', validatedSavings: 450000 },
];

export const TOP_ONGOING_CIP = [
  { id: 'cip2', name: 'Logistics Optimization', owner: 'Michael Wang', projectedSavings: 200000 },
];

export const RESOURCE_BOTTLENECKS = [
  { owner: 'David Zhang', open: 12, overdue: 4 },
  { owner: 'Tom Wu', open: 8, overdue: 1 },
];
