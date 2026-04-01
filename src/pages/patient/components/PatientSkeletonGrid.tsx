import * as React from 'react';

type IPatientSkeletonGridProps = object;

const PatientSkeletonGrid: React.FunctionComponent<IPatientSkeletonGridProps> = () => (
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm animate-pulse">
    <div className="flex gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-slate-200" />
      <div className="space-y-2 flex-1 pt-1">
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-3 mt-4">
      <div className="h-4 bg-slate-100 rounded w-3/4" />
      <div className="pt-4 border-t border-slate-50 flex justify-between">
        <div className="h-5 bg-slate-200 rounded-full w-20" />
        <div className="h-4 bg-slate-100 rounded w-16" />
      </div>
    </div>
  </div>
);

export default PatientSkeletonGrid;
