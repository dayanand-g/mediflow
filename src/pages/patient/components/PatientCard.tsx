import * as React from 'react';
import type { Patient } from '@/lib/mockData/patients';
import { Activity, Clock } from 'lucide-react';
import { GetStatusStyles } from './GetStatusStyles';

interface ItemProps {
  patient: Patient;
  onStatusChange: (id: string, newStatus: Patient['status'], name: string) => void;
}

// Custom Select Component for Status
const StatusSelector = ({ patient, onStatusChange }: ItemProps) => (
  <select
    value={patient.status}
    onChange={(e) => onStatusChange(patient.id, e.target.value as Patient['status'], patient.name)}
    className={`
      inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest
      ring-1 ring-inset cursor-pointer appearance-none outline-none transition-all duration-500
      ${GetStatusStyles(patient.status)}
      ${patient.status === 'Critical' 
        ? 'bg-rose-500 text-white ring-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-110' 
        : 'backdrop-blur-md hover:bg-white/10'}
    `}
  >
    <option value="Stable">Stable</option>
    <option value="Observation">Observation</option>
    <option value="Critical">Critical</option>
  </select>
);

const PatientCard: React.FunctionComponent<ItemProps> = React.memo(({ patient, onStatusChange }: ItemProps) => (
  <div className="group relative bg-[#0A0F1C] rounded-[2rem] p-6 border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-300 overflow-hidden">
    {/* Subtle hover sweep */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{patient.name}</h3>
        <p className="text-xs font-medium tracking-wide text-slate-500 mt-1 uppercase">
          <span className="text-cyan-500/70">{patient.id}</span> • {patient.gender}, {patient.age}
        </p>
      </div>
    </div>
    <div className="relative z-10 space-y-4">
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
          <Activity className="w-4 h-4" />
        </div>
        <span className="font-semibold tracking-wide">{patient.condition}</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.02]">
        <StatusSelector patient={patient} onStatusChange={onStatusChange} />
        <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-600" />
          {patient.lastVisit}
        </div>
      </div>
    </div>
  </div>
));

export default PatientCard;
