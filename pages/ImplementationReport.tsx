
import React from 'react';
import { Target, Users, Wrench, ShieldAlert, Rocket, Timer, TrendingUp, CheckCircle2, Database, LayoutPanelTop, Monitor, UsersRound } from 'lucide-react';

const ImplementationReport: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-fade-in">
      
      {/* HERO: Strategic Intent */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/30 p-10 shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30 uppercase tracking-widest">Roadmap 2025</span>
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">EHZ 数据驱动运营体系<br /><span className="text-blue-400 italic font-medium text-4xl">3P + 1T Framework</span></h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            构建一个全员参与、闭环管理、工具支撑的标准化运营体系。从根本上解决 EHZ 数据孤岛和责任不清晰的问题。
          </p>
        </div>
      </section>

      {/* FRAMEWORK DETAILS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all">
            <Target className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">PURPOSE (目标)</h3>
            <p className="text-sm text-slate-400">统一全厂的数字化语境，确保所有人围绕一套真实的数据源进行决策，消除灰色地带。</p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-all">
            <TrendingUp className="text-purple-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">PROCESS (流程)</h3>
            <p className="text-sm text-slate-400">建立 WBR (周报) 和 MBR (月报) 的标准化 SOP，引入“风险智能扫描”和“自动分配”机制。</p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 hover:border-green-500/50 transition-all">
            <UsersRound className="text-green-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">PEOPLE (人员)</h3>
            <p className="text-sm text-slate-400">明确每一个 KPI 的 OWNER。引入“数字化操作员”角色，负责跨部门的数据协同和真实性核实。</p>
          </div>

          <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700 hover:border-yellow-500/50 transition-all">
            <Wrench className="text-yellow-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">TOOLS (工具)</h3>
            <p className="text-sm text-slate-400">即本指挥系统。打通 SAP, MES, CRM 数据底层，实现由“人找数”向“数找人”的工具进化。</p>
          </div>
      </section>

      {/* ROADMAP TIMELINE */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3"><Timer className="text-accent-blue" /> 执行三部曲</h2>
        <div className="relative pl-8 border-l-2 border-slate-800 space-y-12">
            <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></div>
                <h4 className="text-white font-bold text-lg mb-2">M1: 敏捷迭代 - “看得见”</h4>
                <p className="text-slate-400 text-sm max-w-xl">通过 1 个月时间快速整合现有 BI 看板，先解决高层对整体业务节奏的把控问题。确立核心数据 OWNER。</p>
            </div>
            <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-purple-500 ring-4 ring-purple-500/20"></div>
                <h4 className="text-white font-bold text-lg mb-2">M2: 深度治理 - “管得严”</h4>
                <p className="text-slate-400 text-sm max-w-xl">打通底层数据库，引入 WBR 自动化流程。将系统异常项与 Action Center 强制挂钩，任何红灯项必须有对应的改善计划。</p>
            </div>
            <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-green-500 ring-4 ring-green-500/20"></div>
                <h4 className="text-white font-bold text-lg mb-2">M3: 文化沉淀 - “想得深”</h4>
                <p className="text-slate-400 text-sm max-w-xl">全员习惯数据化汇报。系统开始具备预测性能力（如库龄预警、产能自动平衡），数字化团队从成本中心转型为业务增值中心。</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ImplementationReport;
