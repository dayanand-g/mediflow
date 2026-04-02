import * as React from 'react';
import { usePatients } from '../../hooks/usePatient';
import { LayoutGrid, List as ListIcon, Search, Plus, X, AlertCircle } from 'lucide-react';
import PatientCard from './components/PatientCard';
import PatientRow from './components/PatientRow';
import PatientSkeletonGrid from './components/PatientSkeletonGrid'; 
import type { Patient } from '../../lib/mockData/patients';

type IPatientPageProps = object;
type ViewMode = 'grid' | 'list';

const PatientPage: React.FunctionComponent<IPatientPageProps> = () => {
  const { patients, isLoading, searchQuery, setSearchQuery, addPatient, updatePatientStatus } = usePatients();
  const [view, setView] = React.useState<ViewMode>('grid');

  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '', age: '', gender: 'Other', condition: '', status: 'Stable' as Patient['status']
  });

  const handleAddNewSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    addPatient({
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender as Patient['gender'],
      condition: formData.condition,
      status: formData.status
    });
    setIsModalOpen(false);
    setFormData({ name: '', age: '', gender: 'Other', condition: '', status: 'Stable' }); // Reset
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-slate-50 min-h-screen relative">
      
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patients</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor patient records.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* search bar */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </header>

      {/* controls section */}
      <div className="flex justify-between items-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="text-sm font-medium text-slate-500 pl-4">
          {isLoading ? 'Loading records...' : `Showing ${patients.length} records`}
        </div>
        
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><LayoutGrid className="w-4 h-4" /></button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><ListIcon className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Data display section */}
      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This creates an array of 9 items and renders a skeleton for each */}
          {Array.from({ length: 9 }).map((_, index) => (
            <PatientSkeletonGrid key={`skeleton-${index}`} />
          ))}
        </div>
      ) : patients.length === 0 ? (
         <div className="text-center py-12 text-slate-500">No patients found matching your search.</div>
      ) : (
        <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm"}>
          {patients.map((patient) => (
            view === 'grid' 
              ? <PatientCard key={patient.id} patient={patient} onStatusChange={updatePatientStatus} />
              : <PatientRow key={patient.id} patient={patient} onStatusChange={updatePatientStatus} />
          ))}
        </div>
      )}

      {/* Add patient page */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Add New Patient</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleAddNewSubmit} className="p-6 space-y-4">
              {/* Disclaimer Notice */}
              <div className="flex gap-3 p-4 bg-blue-50 text-blue-800 rounded-2xl text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
                <p><strong>Frontend Demo Mode:</strong> This data is added locally for UI demonstration purposes. It is not connected to a backend database to maintain lightweight performance.</p>
              </div>

              <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              
              <div className="flex gap-4">
                <input required type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-1/2 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-1/2 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <input required type="text" placeholder="Medical Condition (e.g. Asthma)" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Patient['status']})} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option value="Stable">Status: Stable</option>
                <option value="Observation">Status: Observation</option>
                <option value="Critical">Status: Critical</option>
              </select>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition">Save Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default PatientPage;
