import type { Patient } from '../../../lib/mockData/patients';

// Upgraded to Neon Enterprise Styling to match Dashboard metrics
export const GetStatusStyles = (status: Patient['status']) => {
  switch (status) {
    case 'Stable': 
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
    case 'Observation': 
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
    case 'Critical': 
      // Added a subtle pulse for critical states, matching the "In Progress" dashboard logic
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)] animate-pulse';
    default: 
      return 'bg-white/5 text-slate-400 border border-white/10';
  }
};