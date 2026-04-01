import type { Patient } from '../../../lib/mockData/patients';

export const GetStatusStyles = (status: Patient['status']) => {
  switch (status) {
    case 'Stable': return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
    case 'Observation': return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    case 'Critical': return 'bg-rose-50 text-rose-700 ring-rose-600/20';
    default: return 'bg-slate-50 text-slate-700 ring-slate-600/20';
  }
};


