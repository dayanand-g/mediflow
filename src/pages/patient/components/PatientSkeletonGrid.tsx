import * as React from 'react';

type IPatientSkeletonGridProps = object;

const PatientSkeletonGrid: React.FunctionComponent<IPatientSkeletonGridProps> = () => (
  <div className="bg-[#0A0F1C] rounded-[2rem] p-6 border border-white/5 shadow-2xl animate-pulse">
    <div className="flex gap-4 mb-6">
      <div className="w-12 h-12 rounded-full bg-white/5" />
      <div className="space-y-2 flex-1 pt-1">
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-white/5 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-3 mt-4">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="pt-4 border-t border-white/[0.02] flex justify-between">
        <div className="h-6 bg-white/10 rounded-full w-24" />
        <div className="h-4 bg-white/5 rounded w-16" />
      </div>
    </div>
  </div>
);

export default PatientSkeletonGrid;