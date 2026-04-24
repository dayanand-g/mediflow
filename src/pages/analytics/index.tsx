import * as React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { OVERVIEW_STATS, DEMOGRAPHICS, DEPARTMENTS } from '../../lib/mockData/statsData';
import { motion } from 'framer-motion';

type IAnalyticsProps = object;

const Analytics: React.FunctionComponent<IAnalyticsProps> = () => {
  return (
    <main className="relative mx-auto mt-4 mb-6 px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] min-h-[85vh] rounded-[2.5rem] w-[calc(100%-2rem)] max-w-[1440px]">
      
      {/* Background nebula glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-violet-500/5 to-transparent blur-3xl pointer-events-none rounded-t-[2.5rem]" />

      <div className="relative z-10 space-y-10">
        {/* HEADER SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 px-2"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Analytics</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-medium tracking-wide">
            Real-time clinic performance and demographic telemetry.
          </p>
        </motion.header>

        {/* TOP ROW: KEY METRICS */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {OVERVIEW_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                key={stat.id} 
                className="relative group bg-[#0A0F1C] rounded-[2rem] p-6 border border-white/5 hover:border-white/10 transition-all shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Card Hover Sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full border ${
                    stat.isPositive 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {stat.trend}
                  </div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-4xl font-black text-white tracking-tighter">{stat.value}</h2>
                  <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mt-2">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* BOTTOM SECTION: CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT CARD: DEMOGRAPHICS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-[#0A0F1C] rounded-[2rem] border border-white/5 shadow-2xl p-6 md:p-8 space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">Patient Demographics</h2>
              <Activity className="w-5 h-5 text-cyan-500/50" />
            </div>
            
            <div className="space-y-6">
              {DEMOGRAPHICS.map((item) => (
                <div key={item.id} className="space-y-2.5 group">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-300 group-hover:text-white transition-colors">{item.age}</span>
                    <span className="text-cyan-400">{item.percentage}%</span>
                  </div>
                  {/* Neon Data Strip */}
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className={`h-full rounded-full ${item.color} shadow-[0_0_10px_currentColor] opacity-80 group-hover:opacity-100`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARD: DEPARTMENT CAPACITY */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#0A0F1C] rounded-[2rem] border border-white/5 shadow-2xl p-6 md:p-8 space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">Department Capacity</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/5 text-slate-400 border border-white/10 rounded-full">
                Live Metrics
              </span>
            </div>

            <div className="space-y-6">
              {DEPARTMENTS.map((dept, idx) => (
                <div key={dept.id} className="flex items-center gap-4 group">
                  <div className="w-1/3">
                    <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{dept.name}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{dept.patients} active</p>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-4">
                    {/* Neon Metering Bar */}
                    <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${dept.capacity}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 + (idx * 0.1) }}
                        className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${
                          dept.capacity > 90 ? 'bg-rose-500 text-rose-500' : 
                          dept.capacity > 70 ? 'bg-amber-400 text-amber-400' : 
                          'bg-emerald-400 text-emerald-400'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-300 w-8 text-right">
                      {dept.capacity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default Analytics;
