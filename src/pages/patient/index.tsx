import * as React from 'react';
import { usePatients } from '../../hooks/usePatient';
import { LayoutGrid, List as ListIcon, Search, Plus, X, AlertCircle } from 'lucide-react';
import PatientCard from './components/PatientCard';
import PatientRow from './components/PatientRow';
import PatientSkeletonGrid from './components/PatientSkeletonGrid'; 
import type { Patient } from '../../lib/mockData/patients';
import { motion } from 'framer-motion';

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
    <main className="relative w-[calc(100%-2rem)] max-w-[1440px] mx-auto mt-4 mb-6 px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] min-h-[85vh] rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
      
      {/* Feature Instruction Note - Cyberpunk Alert Style */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-rose-500/10 border-l-2 border-rose-300 p-4 rounded-r-xl shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-rose-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-xs md:text-sm tracking-wide font-medium text-rose-200">
              <span className="font-bold text-white uppercase tracking-widest">System Note:</span> To test the real-time pipeline, enable dashboard alerts, then update a status to <span className="font-bold text-rose-300 uppercase">"Critical"</span> for an OS-level push.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10 px-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Directory</span></h1>
          <p className="text-slate-400 text-sm md:text-base mt-1 font-medium tracking-wide">Manage and monitor live patient telemetry.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Bar - Dark Mode */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[#0A0F1C] border border-white/10 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all shadow-inner"
            />
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-cyan-400 hover:text-slate-950 transition-colors duration-300"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Patient
          </button>
        </div>
      </header>

      {/* Controls section */}
      <div className="flex justify-between items-center bg-[#0A0F1C] p-2.5 rounded-[1.5rem] border border-white/5 shadow-lg relative z-10">
        <div className="text-xs font-bold tracking-widest uppercase text-slate-500 pl-4">
          {isLoading ? 'Fetching telemetry...' : `Active Records: ${patients.length}`}
        </div>
        
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setView('grid')} 
            className={`p-1.5 rounded-lg transition-all duration-200 ${view === 'grid' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`p-1.5 rounded-lg transition-all duration-200 ${view === 'list' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data display section with Framer Motion Stagger */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {Array.from({ length: 9 }).map((_, index) => (
            <PatientSkeletonGrid key={`skeleton-${index}`} />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-20 text-slate-500 font-medium tracking-wide">No patient telemetry found.</div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
          className={view === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10" 
            : "bg-[#0A0F1C] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl relative z-10"
          }
        >
          {patients.map((patient) => (
            <motion.div 
              key={patient.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
            >
              {view === 'grid' 
                ? <PatientCard patient={patient} onStatusChange={updatePatientStatus} />
                : <PatientRow patient={patient} onStatusChange={updatePatientStatus} />
              }
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Patient Modal - Dark Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md">
          <div className="bg-[#0A0F1C] border border-white/10 rounded-[2rem] w-full max-w-md shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-xl font-bold text-white tracking-tight">Add Record</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddNewSubmit} className="p-6 space-y-5">
              {/* Disclaimer Notice */}
              <div className="flex gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 rounded-2xl text-xs font-medium tracking-wide">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-cyan-400" />
                <p><strong className="text-cyan-400">Local Sandbox:</strong> Telemetry is stored locally for UI validation to ensure high-performance rendering.</p>
              </div>

              <div className="space-y-4">
                <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all" />
                
                <div className="flex gap-4">
                  <input required type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-1/2 px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all" />
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-1/2 px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all appearance-none">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <input required type="text" placeholder="Condition (e.g. Asthma)" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all" />
                
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Patient['status']})} className="w-full px-4 py-3 bg-[#030712] border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all appearance-none">
                  <option value="Stable">Status: Stable</option>
                  <option value="Observation">Status: Observation</option>
                  <option value="Critical">Status: Critical</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl font-bold tracking-wide hover:bg-white/10 hover:text-white transition-all">Abort</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-white text-slate-950 rounded-xl font-bold tracking-wide hover:bg-cyan-400 transition-colors">Inject Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default PatientPage;
