import * as React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { OVERVIEW_STATS, DEMOGRAPHICS, DEPARTMENTS } from '../../lib/mockData/statsData';

type IAnalyticsProps = object;

const Analytics: React.FunctionComponent<IAnalyticsProps> = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-slate-50 min-h-screen">
      
      {/* Header Section */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-slate-500 text-sm">
          Clinic performance and patient demographics overview.
        </p>
      </header>

      {/* Top Row: Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OVERVIEW_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{stat.value}</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left card section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Patient Demographics</h2>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          
          <div className="space-y-4">
            {DEMOGRAPHICS.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.age}</span>
                  <span className="text-slate-500">{item.percentage}%</span>
                </div>
                {/* CSS Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${item.color} transition-all duration-1000 ease-out`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right card section */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Department Capacity</h2>
            <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">Current Month</span>
          </div>

          <div className="space-y-5">
            {DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="flex items-center gap-4">
                <div className="w-1/3">
                  <h3 className="text-sm font-semibold text-slate-900 truncate">{dept.name}</h3>
                  <p className="text-xs text-slate-500">{dept.patients} patients</p>
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  {/* CSS Progress Bar */}
                  <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                        dept.capacity > 90 ? 'bg-rose-500' : 
                        dept.capacity > 70 ? 'bg-amber-500' : 
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${dept.capacity}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-8 text-right">
                    {dept.capacity}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Analytics;
