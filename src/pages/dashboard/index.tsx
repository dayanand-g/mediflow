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
    // Note: In a real app, we can save to local storage or context that they are subscribed
    // so we can hide this button afterwards.
  };

  // Simple greeting logic (Calculated once per render, very cheap)
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-slate-50 min-h-screen">
      
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {greeting}, Dr. Smith
          </h1>
          <p className="text-slate-500 text-sm">
            Here is what's happening at your clinic today.
          </p>
        </div>

        {/* Subscribe Button */}
        <button 
          onClick={handleSubscribe}
          disabled={isSubscribing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Bell className="w-4 h-4" />
          {isSubscribing ? 'Enabling...' : 'Enable Alerts'}
        </button>
      </header>

      {/* Quick Stats (Top row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-6 transition-all hover:shadow-md">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <Icon className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                <h2 className="text-3xl font-bold text-slate-900">{stat.value}</h2>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Today's Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Today's Schedule</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View full calendar</button>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-2">
            {TODAY_SCHEDULE.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors ${
                  index !== TODAY_SCHEDULE.length - 1 ? 'border-b border-slate-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right">
                    <span className="text-xs font-semibold text-slate-400">{item.time}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100"></div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.patient}</h3>
                    <p className="text-xs text-slate-500">{item.type}</p>
                  </div>
                </div>
                
                {/* Dynamic Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                  ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                    item.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 
                    'bg-slate-100 text-slate-600'}`}
                >
                  {item.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {item.status === 'In Progress' && <Activity className="w-3.5 h-3.5" />}
                  {item.status === 'Waiting' && <Clock className="w-3.5 h-3.5" />}
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
            <button 
              onClick={() => navigate('/patient')}
              className="w-full group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-slate-700 group-hover:text-white">
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm">Patient Directory</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => navigate('/analytics')}
              className="w-full group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-slate-700 group-hover:text-white">
                <FileText className="w-5 h-5" />
                <span className="font-medium text-sm">View Analytics</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </div>

      </div>
    </main>
  );
};

export default Dashboard;
