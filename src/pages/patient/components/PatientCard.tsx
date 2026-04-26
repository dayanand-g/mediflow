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
  // Reduced padding and border-radius on mobile to maximize screen real estate
  <div className="group relative bg-[#0A0F1C] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-300 overflow-hidden">
    
    {/* Subtle hover sweep */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 flex justify-between items-start mb-3 md:mb-4">
      {/* Added min-w-0 and truncate to prevent long names from breaking the card */}
      <div className="min-w-0 flex-1 pr-2">
        <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight truncate">
          {patient.name}
        </h3>
        <p className="text-[10px] md:text-xs font-medium tracking-wide text-slate-500 mt-1 uppercase truncate">
          <span className="text-cyan-500/70">{patient.id}</span> • {patient.gender}, {patient.age} yrs
        </p>
      </div>
    </div>

    <div className="relative z-10 space-y-3 md:space-y-4">
      
      {/* Condition Section */}
      <div className="flex items-center gap-2.5 md:gap-3 text-xs md:text-sm text-slate-300">
        <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 shrink-0">
          <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </div>
        <span className="font-semibold tracking-wide truncate">{patient.condition}</span>
      </div>

      {/* Footer Section: Added flex-wrap and gap-y for safe stacking on tiny screens */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-3 md:pt-4 border-t border-white/[0.02]">
        
        {/* If StatusSelector is a custom dropdown, letting it dictate width, shrink-0 prevents it from squishing */}
        <div className="shrink-0">
          <StatusSelector patient={patient} onStatusChange={onStatusChange} />
        </div>

        <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-500 ml-auto">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-slate-600 shrink-0" />
          <span className="whitespace-nowrap">{patient.lastVisit}</span>
        </div>
      </div>
      
    </div>
  </div>
));

export default PatientCard;
