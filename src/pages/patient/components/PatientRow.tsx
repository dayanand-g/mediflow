import * as React from 'react';
import type { Patient } from '@/lib/mockData/patients';
import { GetStatusStyles } from './GetStatusStyles';

interface IPatientRowProps {
  patient: Patient;
  onStatusChange: (id: string, newStatus: Patient['status'], name: string) => void;
}

// Custom Select Component for Status
const StatusSelector = ({ patient, onStatusChange }: IPatientRowProps) => (
  <select
    value={patient.status}
    onChange={(e) => onStatusChange(patient.id, e.target.value as Patient['status'], patient.name)}
    className={`
      inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold tracking-wider 
      ring-1 ring-inset cursor-pointer appearance-none outline-none transition-all duration-300
      ${GetStatusStyles(patient.status)}
      ${patient.status === 'Critical' 
        ? 'animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)] ring-rose-500/50 scale-105' 
        : 'hover:scale-105 active:scale-95'}
    `}
  >
    <option value="Stable">Stable</option>
    <option value="Observation">Observation</option>
    <option value="Critical">Critical</option>
  </select>
);

const PatientRow: React.FunctionComponent<IPatientRowProps> = React.memo(({ patient, onStatusChange }: IPatientRowProps) => (
  <div className="group flex flex-wrap md:flex-nowrap items-center justify-between p-4 gap-y-3 md:gap-y-0 hover:bg-white/[0.02] border-b border-white/[0.02] transition-colors">
    
    {/* 1. Name & ID (Top Left on Mobile) */}
    <div className="w-1/2 md:w-1/3 order-1 pr-2">
      <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">
        {patient.name}
      </h3>
      <p className="text-xs font-bold tracking-wide text-cyan-500/50 uppercase mt-0.5">
        {patient.id}
      </p>
    </div>

    {/* 2. Condition & Demographics (Top Right on Mobile) */}
    <div className="w-1/2 md:w-1/4 order-2 text-right md:text-left pl-2 md:pl-0">
      <p className="text-sm font-semibold text-slate-300 truncate">
        {patient.condition}
      </p>
      <p className="text-[11px] md:text-xs font-medium text-slate-500 mt-0.5">
        {patient.gender}, {patient.age} yrs
      </p>
    </div>

    {/* 3. Status Selector (Bottom Left on Mobile) */}
    <div className="w-1/2 md:w-1/4 order-3 flex justify-start mt-1 md:mt-0">
      <StatusSelector patient={patient} onStatusChange={onStatusChange} />
    </div>

    {/* 4. Last Visit (Bottom Right on Mobile) */}
    <div className="w-1/2 md:w-auto order-4 flex items-center justify-end mt-1 md:mt-0">
      <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-500 md:text-slate-600">
        <span className="md:hidden mr-1">Visited:</span>
        {patient.lastVisit}
      </span>
    </div>

  </div>
));

export default PatientRow;
