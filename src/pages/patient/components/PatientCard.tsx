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
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer appearance-none outline-none ${GetStatusStyles(patient.status)}`}
  >
    <option value="Stable">Stable</option>
    <option value="Observation">Observation</option>
    <option value="Critical">Critical</option>
  </select>
);

const PatientCard: React.FunctionComponent<ItemProps> = React.memo(({ patient, onStatusChange }: ItemProps) => (
  <div className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 leading-tight">{patient.name}</h3>
        <p className="text-sm text-slate-500">{patient.id} • {patient.gender}, {patient.age}</p>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Activity className="w-4 h-4 text-slate-400" />
        <span className="font-medium">{patient.condition}</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <StatusSelector patient={patient} onStatusChange={onStatusChange} />
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          {patient.lastVisit}
        </div>
      </div>
    </div>
  </div>
));

export default PatientCard;
