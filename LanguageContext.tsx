
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // General
  'app.title': { en: 'ENNOVI Command Center', zh: 'ENNOVI 经营指挥系统' },
  'menu.menu': { en: 'Menu', zh: '导航菜单' },
  'menu.settings': { en: 'Settings', zh: '设置' },
  'menu.logout': { en: 'Logout', zh: '退出登录' },
  'header.simulator': { en: 'Profit Simulator', zh: '利润模拟器' },
  'header.role': { en: 'General Manager (Hangzhou)', zh: '总经理 (杭州工厂)' },
  'header.ehs_safe': { en: 'Safety First', zh: '安全第一' },
  'header.days_safe': { en: 'Days Safe', zh: '安全生产天数' },
  'header.risk_heatmap': { en: 'Risk Heatmap', zh: '风险热力图' },
  'header.workshops_at_risk': { en: 'Workshops at Risk', zh: '高风险车间' },
  'header.risk_details': { en: 'Risk Details', zh: '风险详情' },
  
  // Sidebar
  'nav.cockpit': { en: 'Executive Cockpit', zh: '经营指挥舱' },
  'nav.streams': { en: 'Business Streams', zh: '业务流看板' },
  'nav.health': { en: 'Entity Health', zh: '实体健康诊断' },
  'nav.action': { en: 'Action Center', zh: '行动作战室' },
  'nav.implementation': { en: 'Project Implementation', zh: '项目实施计划' },

  // Cockpit
  'cockpit.title': { en: 'Executive Cockpit', zh: '经营指挥舱' },
  'cockpit.subtitle': { en: 'Hangzhou Plant • Week 34, 2024', zh: '杭州工厂 • 2024年第34周' },
  'cockpit.critical_issues': { en: 'Critical Issues', zh: '紧急异常' },
  'cockpit.wbr_mode': { en: 'WBR Storyline', zh: '周会故事线' },
  'cockpit.daily_pulse': { en: 'Daily GM Pulse', zh: '总经理早报' },
  'cockpit.financial_health': { en: 'Financial Health', zh: '财务月报' },
  'cockpit.ebitda_bridge': { en: 'EBITDA Bridge (Mix & Volume)', zh: 'EBITDA 差异分析 (产品组合与销量)' },
  'cockpit.cust_profit': { en: 'Customer Profitability (YTD)', zh: '客户盈利能力排行 (YTD)' },
  'cockpit.rev_trend': { en: 'YTD Revenue vs Outlook vs Budget', zh: 'YTD 销售额趋势 (实际 vs 展望 vs 预算)' },
  'cockpit.action_tracker': { en: "Last Week's Actions Tracker", zh: '上周决议追踪' },
  'cockpit.tracker.closed': { en: 'CLOSED', zh: '已闭环' },
  'cockpit.tracker.delayed': { en: 'DELAYED', zh: '已延期' },
  'cockpit.financial_summary': { en: 'Financial Performance Summary', zh: '财务业绩摘要' },
  'cockpit.mtd': { en: 'MTD', zh: '月度 (MTD)' },
  'cockpit.ytd': { en: 'YTD', zh: '年度 (YTD)' },
  'cockpit.act': { en: 'Act', zh: '实际' },
  'cockpit.ol': { en: 'Outlook', zh: '展望' },
  'cockpit.budget': { en: 'Budget', zh: '预算' },
  'cockpit.fy25': { en: 'FY25', zh: '25财年' },
  'cockpit.vs_ol': { en: 'vs OL', zh: 'vs 展望' },
  'cockpit.vs_budget': { en: 'vs Budget', zh: 'vs 预算' },
  'cockpit.vs_fy25': { en: 'vs 25财年', zh: 'vs 25财年' },
  'cockpit.drivers': { en: 'Top 3 Drivers', zh: 'TOP 3 驱动因素' },

  // Daily Pulse
  'pulse.mtd_sales': { en: 'MTD Sales Revenue', zh: 'MTD 累计销售额' },
  'pulse.yesterday_sales': { en: 'Yesterday Sales (PGI+Hub)', zh: '昨日销售额 (PGI+Hub)' },
  'pulse.vs_schedule': { en: 'vs OL Progress', zh: 'vs OL 进度' },
  'pulse.today_risks': { en: "Today's Risks", zh: '今日风险' },
  'pulse.actions_open': { en: 'Open Actions', zh: '待办事项' },
  'pulse.ai_summary': { en: 'AI Executive Summary', zh: 'AI 运营摘要' },
  'pulse.top_fires': { en: 'Top 3 Fires to Extinguish', zh: '今日必救之火 (Top 3)' },
  'pulse.complaints': { en: 'Customer Complaints Tracking', zh: '客户投诉处理跟踪' },
  'pulse.new_won': { en: 'NEW WON Projects', zh: '新获项目展示 (NEW WON)' },
  'pulse.revenue': { en: 'Revenue', zh: '生命周期营收' },
  'pulse.sop': { en: 'SOP', zh: '量产时间' },

  // WBR Storyline
  'wbr.slide_safety': { en: '1. Safety First', zh: '1. 安全第一 (EHS)' },
  'wbr.slide_keyfocus': { en: '2. Key Focus', zh: '2. 关键聚焦' },
  'wbr.slide_redflags': { en: '3. Red Flags & Exceptions', zh: '3. 异常报告 (红灯项)' },
  'wbr.slide_finance': { en: '4. Financial Health', zh: '4. 财务健康 (P&L)' },
  'wbr.slide_actions': { en: '5. Action Review', zh: '5. 决议追踪' },
  'wbr.must_win_tracking': { en: 'Must Win Projects', zh: '必赢项目追踪' },
  'wbr.key_visits': { en: 'Key Visits & Events', zh: '重要来访与活动' },
  'wbr.next': { en: 'Next Slide', zh: '下一页' },
  'wbr.prev': { en: 'Previous', zh: '上一页' },

  // KPI Titles
  'kpi.k_copa': { en: 'COPA % (MTD)', zh: 'COPA % (MTD 实际)' },
  'kpi.k2': { en: 'EBITDA Margin', zh: 'EBITDA 利润率' },
  'kpi.k1': { en: 'ROE', zh: '净资产收益率 (ROE)' },
  'kpi.k_cash': { en: 'Cashflow Days', zh: '经营现金流支撑天数' },
  'kpi.k5': { en: 'OTIF (On-Time In-Full)', zh: '准时交付率 (OTIF)' }, 
  
  // KPI Status
  'kpi.target': { en: 'Target', zh: '目标' },
  'kpi.vs_last_week': { en: 'vs last week', zh: '周环比' },
  'kpi.vs_py': { en: 'vs PY', zh: '同比去年' },
  'kpi.missed_target': { en: 'Missed Target', zh: '未达标' },
  'kpi.impact': { en: 'Monetized Impact', zh: '财务影响金额' },

  // Cockpit Labor Metrics
  'cockpit.dl_headcount': { en: 'DL Headcount (MTD)', zh: 'DL 人数 (当月)' },
  'cockpit.idl_headcount': { en: 'IDL Headcount (MTD)', zh: 'IDL 人数 (当月)' },
  'cockpit.efficiency': { en: 'Human Efficiency (Rev/HC)', zh: '人效 (销售额/总人数)' },

  // Streams
  'streams.title': { en: 'Business Streams', zh: '业务流看板' },
  'streams.mode_stream': { en: 'Stream View', zh: '业务流视图' },
  'streams.mode_matrix': { en: 'Matrix View', zh: '矩阵视图' },
  'streams.matrix_quality': { en: 'Global Quality', zh: '全流程质量' },
  'streams.matrix_cost': { en: 'Global Cost', zh: '全流程成本' },
  'streams.matrix_inventory': { en: 'Global Inventory', zh: '全流程库存' },
  
  'streams.tab.lead': { en: 'Lead to Ramp Up', zh: '新品上市爬坡' },
  'streams.tab.produce': { en: 'Plan to Produce', zh: '制造与交付' },
  'streams.tab.order': { en: 'Order to Cash', zh: '销售与回款' },
  'streams.tab.source': { en: 'Source to Pay', zh: '采购与支出' },
  
  'streams.lead.mustwin': { en: 'Must-Win Conversion', zh: '必赢项目转化率' },
  'streams.lead.opps': { en: 'Opportunities', zh: '机会数量' },
  'streams.lead.npi_complete': { en: 'NPI Phase Comp.', zh: 'NPI 阶段完成率' },
  'streams.lead.ramp_cap': { en: 'Ramp Capacity', zh: '爬坡产能达成率' },
  'streams.lead.deviation': { en: 'Spec Deviation', zh: '新产品规格偏差(质量)' },
  'streams.lead.pipeline': { en: 'Project Pipeline Stages', zh: '项目阶段漏斗分布' },
  'streams.lead.category_mix': { en: 'Category Mix', zh: '产品类别占比' },
  'streams.lead.customer_mix': { en: 'Customer Mix', zh: '客户占比' },
  'streams.lead.view_by': { en: 'View By:', zh: '视图:' },
  'streams.lead.view_cat': { en: 'Category', zh: '类别' },
  'streams.lead.view_cust': { en: 'Customer', zh: '客户' },
  'streams.lead.project_list': { en: 'Must Win Project Tracking', zh: '必赢项目详细跟踪' },
  'streams.lead.win_prob': { en: 'Win %', zh: '赢单率' },
  'streams.lead.prob_filter': { en: 'Min Probability:', zh: '赢单率筛选:' },
  'streams.lead.filter_all': { en: 'All', zh: '全部' },

  'streams.mustwin.title': { en: 'Pipeline & Opportunities', zh: '线索与必赢项目 (Must Win)' },
  'streams.npi.title': { en: 'NPI Execution & Quality', zh: 'NPI 交付与质量爬坡' },
  'streams.npi.loss': { en: 'Monthly Loss', zh: '月度损耗金额' },
  'streams.npi.issue': { en: 'Quality Issue', zh: '质量/偏差问题' },
  
  // Stages
  'stage.initial': { en: 'Initial', zh: '初期接触' },
  'stage.quote': { en: 'Quoting', zh: '报价中' },
  'stage.dfm': { en: 'DFM', zh: 'DFM阶段' },
  'stage.bid': { en: 'Bidding', zh: '竞标中' },
  'stage.won': { en: 'Won/Ramp', zh: '获胜/爬坡' },
  
  // Produce - Global KPIs
  'streams.produce.mps': { en: 'MPS Achievement', zh: '月初主生产计划达成率' },
  'streams.produce.mps_def': { en: 'Def: Qualified Batches / Planned Batches (Excl. Ad-hoc)', zh: '口径：实际合格批次 / 计划批次 (不含插单)' },
  'streams.produce.coq': { en: 'COQ Total', zh: 'COQ 总金额' },
  'streams.produce.coq_def': { en: 'Def: Internal + External + Appraisal + Prevention', zh: '口径：内部损失+外部损失+鉴定+预防成本' },
  'streams.produce.coq_pct': { en: '% of Production Value', zh: '占产值比例' },
  'streams.produce.util': { en: 'Capacity Utilization', zh: '产能利用率' },
  'streams.produce.otd': { en: 'OTD (Delivery)', zh: '订单交付及时率' },
  'streams.produce.inv_days': { en: 'Inventory Days', zh: '库存周转天数' },
  'streams.produce.wip_fg': { en: 'WIP + FG', zh: '在制品 + 成品' },
  'streams.produce.kitting': { en: 'Material Kitting Rate', zh: '物料齐套率' },
  'streams.produce.kitting_desc': { en: 'Link to Source-to-Pay', zh: '关联采购模块' },
  'streams.produce.vs_lm': { en: 'vs LM', zh: 'vs 上月' },
  'streams.produce.gap': { en: 'Gap', zh: '缺口' },
  
  // QCD Headers
  'streams.produce.section_q': { en: 'Quality Assurance (Q)', zh: '质量保证 (Q)' },
  'streams.produce.section_c': { en: 'Cost Control (C)', zh: '成本控制 (C)' },
  'streams.produce.section_d': { en: 'Delivery & Flow (D)', zh: '交付与流转 (D)' },

  // Produce - Charts & Metrics
  'streams.produce.eff_chart': { en: 'Production Efficiency & Capacity', zh: '生产效率与产能利用' },
  'streams.produce.trend_chart': { en: 'Capacity & Labor Efficiency Trend', zh: '产能与人效趋势' },
  'streams.produce.aging': { en: 'Inventory Aging & History', zh: '库存库龄与历史趋势' },
  'streams.produce.aging_val': { en: 'Value by Aging Bucket', zh: '库龄金额占比' },
  'streams.produce.history_trend': { en: 'Historical Trend', zh: '历史趋势' },
  'streams.produce.variance_ranking': { en: 'Production Variance Ranking', zh: '车间生产差异变动排名' },
  'streams.produce.dil': { en: 'DIL Eff.', zh: '直人效率' },
  'streams.produce.idl': { en: 'IDL Eff.', zh: '间人效率' },
  'streams.produce.planned': { en: 'Planned Cap.', zh: '计划产能' },
  'streams.produce.actual': { en: 'Actual', zh: '实际产出' },
  'streams.produce.select_workshop': { en: 'Select Workshop:', zh: '选择车间:' },
  'streams.produce.all_workshops': { en: 'All Workshops', zh: '全部车间' },
  'streams.produce.coq_breakdown': { en: 'COQ Breakdown', zh: '质量成本 (COQ) 分解' },
  'streams.produce.coq_history': { en: 'COQ History Trend', zh: 'COQ 历史趋势 (月度)' },
  'streams.produce.daily_flux': { en: 'Daily Output Fluctuation (MTD)', zh: '工序日产出波动 (MTD)' },
  'streams.produce.bottom_profit': { en: 'Bottom 10 Profitability (Top 100 Rev)', zh: '利润倒数 TOP10 (销售额前100中)' },
  'streams.produce.ops_issues': { en: 'Operational Issues (>7 Days)', zh: '长期未决异常看板 (>7天)' },
  
  // Inventory Types
  'streams.produce.inv_all': { en: 'All', zh: '全部' },
  'streams.produce.inv_roh': { en: 'ROH', zh: '原材料' },
  'streams.produce.inv_wip': { en: 'WIP', zh: '在制品' },
  'streams.produce.inv_fg': { en: 'FG', zh: '成品' },

  // Produce - Exceptions & Matrix
  'streams.produce.losses': { en: 'Top 10 Production Losses (MTD)', zh: 'TOP 10 生产损失 (月累计)' },
  'streams.produce.constraints': { en: 'Top Capacity Constraints', zh: '产能瓶颈工序' },
  'streams.produce.root_cause': { en: 'Root Cause Breakdown', zh: '异常根因分类' },
  'streams.produce.tracking': { en: 'Issue Resolution Tracking', zh: '预警处理进度' },
  'streams.produce.loss_type': { en: 'Loss Type', zh: '损失类型' },
  'streams.produce.duration': { en: 'Duration', zh: '时长(H)' },
  'streams.produce.amount': { en: 'Amount', zh: '金额' },
  'streams.produce.matrix': { en: 'Workshop Performance Matrix', zh: '车间交付绩效矩阵' },
  'streams.produce.output': { en: 'Output ($k)', zh: '产值' },
  'streams.produce.wip_days': { en: 'WIP Days', zh: 'WIP周转天数' },
  'streams.produce.routing_hours': { en: 'Routing Hrs', zh: '标准工时' },
  'streams.produce.clocked_hours': { en: 'Clocked Hrs', zh: '刷卡工时' },
  'streams.produce.efficiency': { en: 'Efficiency', zh: '人效比' },
  'streams.produce.extra_hours': { en: 'Extra Hrs', zh: '额外工时' },

  // Order to Cash Upgraded
  'streams.order.otd': { en: 'OTD (Cust. Sign)', zh: '当月 OTD (客户签收)' },
  'streams.order.ar_turn': { en: 'AR Turnover', zh: '应收账款周转率' },
  'streams.order.demand_vol': { en: 'Demand Volatility', zh: '客户需求波动率' },
  'streams.order.hub_ach': { en: 'Hub/PGI Achieve', zh: 'PGI/HUB 达成率' },
  'streams.order.overdue': { en: 'Overdue AR', zh: '逾期 AR' },
  'streams.order.dispute': { en: 'Dispute AR', zh: '争议款金额' },
  'streams.order.cashflow': { en: 'Cash Flow', zh: '现金流' },
  'streams.order.oem_otd': { en: 'Core OEM OTD', zh: '核心主机厂 OTD' },
  'streams.order.days': { en: 'Days', zh: '天数' },
  'streams.order.risk_zone': { en: 'High Risk Warning Zone', zh: '高风险预警专区' },
  'streams.order.demand_anal': { en: 'Demand Forecast vs Actual', zh: '需求预测与实际对比 (YTD)' },
  'streams.order.impact_list': { en: 'Cross-Module Synergy: Demand Impact', zh: '跨模块协同: 需求波动影响清单' },
  'streams.order.impact_prod': { en: 'Production Action', zh: '生产响应措施' },
  'streams.order.forecast': { en: 'Forecast', zh: '计划需求' },
  'streams.order.actual': { en: 'Actual', zh: '实际需求' },
  'streams.order.oem_status': { en: 'OEM & Key Account Status', zh: '主机厂与核心客户状态' },
  'streams.order.yeardown': { en: 'Year-down Hit', zh: '年降达成' },
  'streams.order.module_demand': { en: 'Module 1: Demand Management', zh: '模块一：需求管理' },
  'streams.order.module_cash_add': { en: 'Module 2A: Cash Flow - Value Creation (Inflow)', zh: '模块二(A)：现金流 - 增值 (流入)' },
  'streams.order.module_cash_reduce': { en: 'Module 2B: Cash Flow - Value Leakage (Outflow)', zh: '模块二(B)：现金流 - 减值 (流失/年降)' },
  'streams.order.waterfall_title': { en: 'Net Sales Realization Waterfall', zh: '净销售额实现分析 (瀑布图)' },
  
  // Order to Cash New additions
  'streams.order.select_cust': { en: 'Customer', zh: '客户' },
  'streams.order.other_cust': { en: 'Others', zh: '其他客户' },
  'streams.order.volatility': { en: 'Volatility', zh: '波动率' },
  'streams.order.total_ar': { en: 'Total AR', zh: '应收总额' },
  'streams.order.total_overdue': { en: 'Total Overdue', zh: '逾期总额' },
  'streams.order.unrecovered': { en: 'Unrecovered Gap', zh: '未传导金额缺口' },
  'streams.order.total_impact': { en: 'Total Impact', zh: '需传导总额' },
  'streams.order.recovered': { en: 'Recovered', zh: '已回收' },
  'streams.order.gap': { en: 'Gap', zh: '缺口' },
  'streams.order.scrap_sales': { en: 'Scrap Sales (MTD)', zh: '废料销售收入 (MTD)' },
  'streams.order.scrap_target': { en: 'Target', zh: '目标' },
  'streams.order.yeardown_sched': { en: 'Year-Down & Rebate Schedule', zh: '年降与返利计划 (未来12个月)' },
  'streams.order.effective_date': { en: 'Effective', zh: '生效日期' },
  'streams.order.impact_amt': { en: 'Impact', zh: '影响金额' },
  'streams.order.premium_freight': { en: 'Premium Freight', zh: '超额运费' },
  'streams.order.freight_mode': { en: 'Mode', zh: '方式' },
  'streams.order.penalties': { en: 'Customer Penalties & Claims', zh: '客户罚款与索赔' },
  'streams.order.penalty_type': { en: 'Type', zh: '类型' },
  'streams.order.view_health': { en: 'View Health', zh: '查看画像' },

  // Source to Pay Optimized V2
  'streams.source.mat_otd': { en: 'Mat. Delivery (OTD)', zh: '合格物料交付及时率' },
  'streams.source.copa': { en: 'Cost Variance (COPA)', zh: '采购成本偏差率 (COPA)' },
  'streams.source.ppv': { en: 'PPV (MTD)', zh: 'PPV (MTD)' },
  'streams.source.mro_amt': { en: 'MRO Amount (MTD)', zh: 'MRO 金额 (MTD)' },
  'streams.source.cer_amt': { en: 'CER Amount (MTD)', zh: 'CER 金额 (MTD)' },
  'streams.source.spares_amt': { en: 'Spares (MTD)', zh: '备件采购 (MTD)' },

  'streams.source.spending_mod': { en: 'Spending & Budget Control', zh: 'Spending 管控详情' },
  'streams.source.cer_list': { en: 'CER Detailed List', zh: 'CER 详细清单及状态' },
  'streams.source.trend_mro_spares': { en: 'MRO & Spares History (YTD)', zh: 'MRO 与备件请购历史趋势 (YTD)' },
  'streams.source.procure_mod': { en: 'Procurement Execution', zh: '采购执行详情' },
  'streams.source.slow_rate': { en: 'Slow Moving Rate', zh: '库存物料呆滞率' },
  'streams.source.dpo_days': { en: 'DPO', zh: '应付账款周转天数' },
  'streams.source.iqc_stops': { en: 'Line Stops (IQC Issues)', zh: '来料质量导致的生产停线' },
  'streams.source.exception_zone': { en: 'Exceptions & Warnings', zh: '异常预警区' },
  'streams.source.delay_list': { en: 'Delayed Materials', zh: '交付延迟物料' },
  'streams.source.bad_supply': { en: 'Non-Conforming Suppliers', zh: '不合格供应商' },
  'streams.source.over_budget': { en: 'Over-Budget Items', zh: '超预算采购项' },
  'streams.source.sim_impact': { en: 'Simulate Impact', zh: '推演影响' },
  
  // New translations for detailed spending
  'streams.source.cer_type': { en: 'Type', zh: '类型' },
  'streams.source.dept': { en: 'Dept', zh: '部门' },
  'streams.source.reason': { en: 'Reason', zh: '原因' },
  'streams.source.mro_maint': { en: 'Maintenance', zh: '设备维护' },
  'streams.source.mro_tools': { en: 'Tools', zh: '工具夹具' },
  'streams.source.mro_consumables': { en: 'Consumables', zh: '辅料消耗' },
  'streams.source.mro_budget': { en: 'Budget Limit', zh: '月度预算' },
  'streams.source.spares_driver': { en: 'Key Cost Driver', zh: '核心成本驱动' },
  'streams.source.view_mro': { en: 'View: MRO Analysis', zh: '视图: MRO 结构分析' },
  'streams.source.view_spares': { en: 'View: Spares Drivers', zh: '视图: 备件故障关联' },
  'streams.source.copa_cust': { en: 'COPA Contribution by Customer', zh: 'COPA 贡献占比 (分客户)' },
  'streams.source.spend_cat': { en: 'MTD Spend by Category', zh: 'MTD 采购金额分类' },
  'streams.source.metal': { en: 'Metal', zh: '金属' },
  'streams.source.resin': { en: 'Resin', zh: '树脂' },
  'streams.source.outsourced': { en: 'Outsourced', zh: '外购件' },
  'streams.source.packaging': { en: 'Packaging', zh: '包材' },
  
  // Commodity Monitor
  'streams.source.commodities': { en: 'International Raw Material Market Monitor', zh: '国际原材料市场价格监测' },
  'streams.source.market_intel': { en: 'Market Intelligence & Alerts', zh: '市场情报与预警' },
  'streams.source.gold': { en: 'Gold (USD/oz)', zh: '黄金 (USD/oz)' },
  'streams.source.silver': { en: 'Silver (USD/oz)', zh: '白银 (USD/oz)' },
  'streams.source.copper': { en: 'Copper (USD/Ton)', zh: '铜 (USD/Ton)' },

  // Health Dashboard V3 (Strategic Ecosystem)
  'health.title': { en: 'Strategic Ecosystem & Engagement', zh: '生态伙伴肖像与战略动态' },
  'health.pulse_title': { en: 'Ecosystem Pulse', zh: '生态健康度总览' },
  'health.supply_res': { en: 'Supply Chain Resilience', zh: '供应链韧性指数' },
  'health.share_wallet': { en: 'Core Customer Share of Wallet', zh: '核心客户钱包份额' },
  'health.nps': { en: 'NPS', zh: '净推荐值' },
  'health.supplier_strategy': { en: 'Supplier Strategic Profile', zh: '供应商战略肖像' },
  'health.supplier_matrix': { en: 'Innovation vs Collaboration Matrix', zh: '供应商能力矩阵 (创新x配合)' },
  'health.cust_strategy': { en: 'Customer Strategic Profile', zh: '客户战略肖像' },
  'health.cust_pyramid': { en: 'Value Pyramid', zh: '客户价值梯队' },
  'health.timeline_title': { en: 'Executive Engagement Timeline', zh: 'C-Level 高层互动时间轴' },
  'health.engagement_past': { en: 'Recent Engagements', zh: '近期互动' },
  'health.engagement_future': { en: 'Upcoming', zh: '未来计划' },
  'health.key_changes': { en: 'Key Strategic Changes', zh: '近期关键变化' },
  'health.x_axis': { en: 'Innovation Cap.', zh: '技术/创新能力' },
  'health.y_axis': { en: 'Collaboration', zh: '合作配合度' },
  'health.tag_tech': { en: 'TechMonopoly', zh: '技术垄断' },
  'health.tag_price': { en: 'PriceHard', zh: '价格强硬' },
  'health.tag_stable': { en: 'Stable', zh: '财务稳健' },
  'health.tag_cap': { en: 'CapacityLimit', zh: '产能瓶颈' },
  'health.tag_cash': { en: 'CashTight', zh: '资金紧张' },
  'health.tag_ev': { en: 'EVTransition', zh: '转型新能源' },
  'health.tag_pricekill': { en: 'PriceKiller', zh: '极度压价' },
  'health.tag_techhungry': { en: 'TechHungry', zh: '追求新技术' },
  'health.tag_agile': { en: 'Agile', zh: '需求变更快' },
  'health.tag_star': { en: 'StarProject', zh: '明星项目' },
  'health.score': { en: 'Health Score', zh: '健康评分' },

  // Action Center Upgrades
  'action.title': { en: 'Ops Excellence Center', zh: '卓越运营行动中心' },
  'action.tab_tasks': { en: 'Task Matrix', zh: '任务矩阵' },
  'action.tab_cip': { en: 'CIP Innovation', zh: 'CIP 持续改进' },
  'action.q1': { en: 'Urgent & Important (8D Required)', zh: '重要且紧急 (需8D报告)' },
  'action.q2': { en: 'Important, Not Urgent (CIP)', zh: '重要不紧急 (立项CIP)' },
  'action.q3': { en: 'Urgent, Not Important', zh: '紧急不重要' },
  'action.q4': { en: 'Not Urgent, Not Important', zh: '不紧急不重要' },
  'action.avg_res_time': { en: 'Avg Resolution Time (Days)', zh: '平均问题解决天数' },
  'action.bottleneck_anal': { en: 'Resource Bottleneck Analysis', zh: '资源瓶颈分析' },
  'action.8d_status': { en: '8D Report Status', zh: '8D 报告状态' },
  'action.assign': { en: 'Assign', zh: '指派' },
  'action.edit': { en: 'Edit', zh: '编辑' },
  'action.convert_cip': { en: 'Launch CIP', zh: '发起 CIP' },
  'action.global_support': { en: 'Global Support', zh: '全球支持' },
  'action.cip_pipeline': { en: 'CIP Project Pipeline', zh: 'CIP 持续改进项目库' },
  'action.new_task': { en: 'New Task', zh: '新建任务' },
  'action.create_task': { en: 'Create Task', zh: '创建任务' },
  'action.update_task': { en: 'Update Task', zh: '更新任务' },
  'action.overdue_ranking': { en: 'Task Overdue Ranking', zh: '任务超期排行' },
  
  'action.form.title': { en: 'Task Title', zh: '任务标题' },
  'action.form.urgency': { en: 'Urgency', zh: '紧急度' },
  'action.form.importance': { en: 'Importance', zh: '重要度' },
  'action.form.duedate': { en: 'Due Date', zh: '截止日期' },
  'action.form.dept': { en: 'Owner Dept', zh: '责任部门' },
  'action.form.owner': { en: 'Owner Name', zh: '责任人' },
  'action.form.high': { en: 'High', zh: '高' },
  'action.form.low': { en: 'Low', zh: '低' },
  'action.form.resolution': { en: 'Resolution Idea', zh: '解决思路' },
  'action.form.progress': { en: 'Progress %', zh: '当前进展' },
  
  'cip.title': { en: 'CIP Innovation Dashboard', zh: 'CIP 创新改善看板' },
  'cip.kpi_savings': { en: 'YTD Savings', zh: 'YTD 总节约金额' },
  'cip.kpi_participation': { en: 'Participation Rate', zh: '全员参与率' },
  'cip.kpi_count': { en: 'Total Projects', zh: 'CIP 项目总数' },
  'cip.share': { en: 'Savings Share by Dept', zh: '各部门 CIP 金额占比' },
  'cip.target_vs_act': { en: 'Target vs Actual', zh: '各部门 CIP 目标达成' },
  'cip.hero_board': { en: 'Improvement Heroes (Top 5)', zh: '改善英雄榜 (Top 5)' },
  'cip.innovation_stars': { en: 'Innovation Stars (Patents)', zh: '创新专利评分 (Top 5)' },
  'cip.completed_projects': { en: 'Top 10 Completed Projects', zh: 'TOP 10 已结案项目 (收益)' },
  'cip.ongoing_projects': { en: 'Top 10 Ongoing Projects', zh: 'TOP 10 进行中项目 (预期收益)' },
  
  'action.table.name': { en: 'Project Name', zh: '项目名称' },
  'action.table.stage': { en: 'Stage', zh: '阶段' },
  'action.table.owner': { en: 'Owner', zh: '负责人' },
  'action.table.savings': { en: 'Proj. Savings', zh: '预计节约' },
  'action.table.validated': { en: 'Validated', zh: '已验证' },
  
  // Money First Action Center
  'action.money_at_risk': { en: 'Money at Risk', zh: '当前待挽回损失金额' },
  'action.auto_scan': { en: 'Auto-Scan Risks', zh: '智能扫描业务流风险' },
  'action.scanning': { en: 'Scanning...', zh: '扫描中...' },
  'action.source_stream': { en: 'Source Stream', zh: '来源业务流' },
  'action.impact': { en: 'Financial Impact', zh: '财务影响' },
  'action.auto_detected': { en: 'Auto-Detected', zh: '系统自动生成' },
  'action.manual': { en: 'Manual Entry', zh: '人工录入' },
  
  // Issues Translation
  'issue.i1': { en: 'Press-Fit Die #04 Crack', zh: '压接模具 #04 开裂' },
  'issue.i2': { en: 'Resin PA66 Shortage Risk', zh: 'PA66 树脂短缺风险' },
  'issue.i3': { en: 'IATF 16949 Audit Findings', zh: 'IATF 16949 审核不符合项' },
  'issue.i4': { en: 'Clean Room 5S Audit', zh: '洁净室 5S 检查' },
  'issue.i5': { en: 'Au Plating Thickness Variance', zh: '镀金厚度变异' },
  'issue.i6': { en: 'Molding 02 Cycle Time Gap', zh: '注塑02线 周期差异' },

  // Risk Items
  'risk.r1': { en: 'Press Guard Sensor Intermittent', zh: '冲压安全光幕信号不稳定' },
  'risk.r2': { en: 'H2SO4 Pump Vibration', zh: '硫酸泵异常振动' },

  // Simulator
  'sim.title': { en: 'Profit Simulator', zh: '利润模拟器' },
  'sim.reduce_inv': { en: 'Inventory Reduction', zh: '降低库存' },
  'sim.reduce_dso': { en: 'DSO Reduction', zh: '缩短回款天数' },
  'sim.vol_increase': { en: 'Volume Increase', zh: '产量提升' },
  'sim.mat_price': { en: 'Mat. Price Impact', zh: '原材料价格波动' },
  'sim.impact_ebitda': { en: 'EBITDA Impact', zh: '对 EBITDA 影响' },
  'sim.cash_unlocked': { en: 'Cash Unlocked', zh: '释放现金流' },
  'sim.create_plan': { en: 'Create Action Plan', zh: '生成行动计划' },
  
  // Simulator Expanded
  'sim.section_revenue': { en: 'Revenue & Margin', zh: '收入与毛利' },
  'sim.section_ops': { en: 'Operational Costs', zh: '运营成本优化' },
  'sim.section_wc': { en: 'Working Capital', zh: '营运资金' },
  'sim.price_change': { en: 'Avg Price Change', zh: '平均价格变动' },
  'sim.labor_eff': { en: 'Labor Efficiency', zh: '人工效率提升' },
  'sim.freight_save': { en: 'Freight Optimization', zh: '物流运费节省' },
  'sim.scrap_reduce': { en: 'Scrap Reduction', zh: '废品率降低' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); 

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = (key: string, defaultText?: string) => {
    return translations[key]?.[language] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
