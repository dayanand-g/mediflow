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
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer appearance-none outline-none ${GetStatusStyles(patient.status)}`}
  >
    <option value="Stable">Stable</option>
    <option value="Observation">Observation</option>
    <option value="Critical">Critical</option>
  </select>
);

const PatientRow: React.FunctionComponent<IPatientRowProps> = React.memo(({ patient, onStatusChange }: IPatientRowProps) => (
  <div className="flex items-center justify-between bg-white p-4 hover:bg-slate-50 border-b border-slate-100 transition-colors">
    <div className="w-1/3">
      <h3 className="text-sm font-semibold text-slate-900">{patient.name}</h3>
      <p className="text-xs text-slate-500">{patient.id}</p>
    </div>
    <div className="w-1/4">
      <p className="text-sm text-slate-900">{patient.condition}</p>
      <p className="text-xs text-slate-500">{patient.gender}, {patient.age} yrs</p>
    </div>
    <div className="w-1/4 flex justify-start">
      <StatusSelector patient={patient} onStatusChange={onStatusChange} />
    </div>
    <div className="w-auto flex items-center justify-end gap-4">
      <span className="text-xs text-slate-500 hidden sm:block">{patient.lastVisit}</span>
    </div>
  </div>
));

export default PatientRow;
