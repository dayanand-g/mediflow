import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  CalendarDays, 
  FileText, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Activity,
  Bell,
} from 'lucide-react';
import { subscribeToNotifications } from '../../utils/notification';
import { motion } from 'framer-motion';

type IDashboardProps = object;

// Mock Data (Outside component = zero memory reallocation on re-renders)
const STATS = [
  { id: 1, label: 'Total Patients', value: '2,842', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, label: 'Today\'s Appointments', value: '18', icon: CalendarDays, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 3, label: 'Pending Reports', value: '7', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const TODAY_SCHEDULE = [
  { id: 'app-1', time: '09:00 AM', patient: 'Eleanor Pena', type: 'General Checkup', status: 'Completed' },
  { id: 'app-2', time: '10:30 AM', patient: 'Cody Fisher', type: 'Post-Op Review', status: 'In Progress' },
  { id: 'app-3', time: '11:45 AM', patient: 'Esther Howard', type: 'Lab Consultation', status: 'Waiting' },
  { id: 'app-4', time: '01:00 PM', patient: 'Eleanor Pena', type: 'General Checkup', status: 'Completed' },
  { id: 'app-5', time: '03:30 PM', patient: 'Cody Fisher', type: 'Post-Op Review', status: 'In Progress' },

];

const Dashboard: React.FunctionComponent<IDashboardProps> = () => {
  const navigate = useNavigate();
  // Releted to Notification button
  const [isSubscribing, setIsSubscribing] = React.useState(false); //A small loading state

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    await subscribeToNotifications();
    setIsSubscribing(false);
  };

  // Simple greeting logic (Calculated once per render, very cheap)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    // The "Glass Tray" container floating over the dark background
    <main className="relative w-[calc(100%-2rem)] max-w-[1440px] mx-auto mt-4 mb-6 px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] min-h-[85vh] rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
      
      {/* Background glow specific to the dashboard */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-gradient-to-b from-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-t-[2.5rem]" />

      <div className="relative z-10 space-y-10">
        {/* HEADER SECTION */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Dr. Smith</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base mt-2 font-medium tracking-wide">
              System active. Here is your clinic telemetry for today.
            </p>
          </div>

          {/* Subscribe Button - Cyberpunk Glow Style */}
          <button 
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 border border-cyan-500/20 hover:border-cyan-400 rounded-full text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50 overflow-hidden"
          >
            {/* Button Hover Sweep Effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
            <Bell className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{isSubscribing ? 'Establishing link...' : 'Enable Alerts'}</span>
          </button>
        </motion.header>

        {/* QUICK STATS GRID (Staggered Animation) */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                key={stat.id} 
                className="relative group bg-[#0A0F1C] rounded-[2rem] p-6 border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
              >
                {/* Subtle card hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">{stat.label}</p>
                    <h2 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h2>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: TODAY'S SCHEDULE (Bento Box) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Today's Schedule</h2>
              <button className="text-xs font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-400 transition-colors">
                View full calendar
              </button>
            </div>
            
            <div className="bg-[#0A0F1C] rounded-[1.5rem] md:rounded-[2rem] border border-white/5 overflow-hidden p-2 md:p-3 shadow-2xl">
              {TODAY_SCHEDULE.map((item, index) => (
                <motion.div 
                  whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
                  key={item.id} 
                  // Changed to flex-col for mobile, sm:flex-row for larger screens
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 sm:gap-0 rounded-2xl transition-all ${
                    index !== TODAY_SCHEDULE.length - 1 ? 'border-b border-white/[0.02]' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    {/* Adjusted time width for mobile */}
                    <div className="w-12 sm:w-16 text-left sm:text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-cyan-500/70 tracking-tighter">
                        {item.time}
                      </span>
                    </div>

                    {/* Hidden on mobile to save space */}
                    <div className="hidden sm:block w-px h-8 bg-white/10"></div>
                    
                    <div className="min-w-0"> {/* min-w-0 prevents text overflow in flex items */}
                      <h3 className="text-sm md:text-base font-semibold text-slate-200 truncate">
                        {item.patient}
                      </h3>
                      <p className="text-[10px] md:text-xs font-medium text-slate-500 mt-0.5 truncate">
                        {item.type}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status Badge: self-start on mobile, self-center on desktop */}
                  <span className={`inline-flex items-center self-start sm:self-center gap-1.5 px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wide border whitespace-nowrap
                    ${item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      item.status === 'In Progress' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse' : 
                      'bg-white/5 text-slate-400 border-white/10'}`}
                  >
                    {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                    {item.status === 'In Progress' && <Activity className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                    {item.status === 'Waiting' && <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: QUICK ACTIONS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-white tracking-tight px-2">Quick Actions</h2>
            
            <div className="bg-[#0A0F1C] rounded-[2rem] border border-white/5 p-4 space-y-3">
              {[
                { icon: Users, label: "Patient Directory", route: '/patient', color: "text-blue-400" },
                { icon: FileText, label: "View Analytics", route: '/analytics', color: "text-violet-400" }
              ].map((action, idx) => {
                const ActionIcon = action.icon;
                return (
                  <button 
                    key={idx}
                    onClick={() => navigate(action.route)}
                    className="w-full group relative flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] overflow-hidden transition-all duration-300"
                  >
                    {/* Sweep gradient hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    
                    <div className="relative z-10 flex items-center gap-4 text-slate-300 group-hover:text-white transition-colors">
                      <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${action.color}`}>
                        <ActionIcon className="w-5 h-5" />
                      </div>
                      <span className="font-bold tracking-wide text-sm">{action.label}</span>
                    </div>
                    <ArrowRight className="relative z-10 w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </button>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
    );
};

export default Dashboard;
