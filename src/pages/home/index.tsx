import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  ArrowRight,
  Activity,
  ShieldCheck,
  Clock
} from 'lucide-react';

// Types
interface IFeatureSectionProps {
  title: string;
  description: string;
  features: { icon: React.ReactNode; text: string }[];
  buttonText: string;
  onClick: () => void;
  primaryIcon: React.ReactNode;
  bgColor: string;
  isReversed?: boolean;
}

// Reusable Feature Section Component
const FeatureSection: React.FC<IFeatureSectionProps> = ({
  title,
  description,
  features,
  buttonText,
  onClick,
  primaryIcon,
  bgColor,
  isReversed = false,
}) => {
  return (
    <section 
      className={`rounded-[2rem] ${bgColor} p-8 md:p-16 flex flex-col ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-12 items-center justify-between border border-gray-100 shadow-sm`}
    >
      {/* Text Content */}
      <div className="flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Value Props / Info Expansion */}
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-slate-700 font-medium">
              <span className="mr-3 p-1.5 bg-white rounded-full shadow-sm text-slate-900">
                {feature.icon}
              </span>
              {feature.text}
            </li>
          ))}
        </ul>

        <button
          onClick={onClick}
          className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-all duration-200 active:scale-95"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Visual / Icon Representation */}
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="relative w-full max-w-sm aspect-square bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex items-center justify-center p-8">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 rounded-[2.5rem]" />
          <div className="relative z-10 text-slate-800">
            {primaryIcon}
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Home Page Component
const Home: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 bg-white min-h-screen rounded-xl">
      
      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto pt-10 pb-4 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-4">
          <Activity className="w-4 h-4" />
          <span>System running smoothly</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Healthcare operations, <br className="hidden md:block" />
          <span className="text-3xl md:text-4xl text-slate-500">beautifully simplified.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Manage your entire facility from a single, intuitive platform designed to save you time and improve patient outcomes.
        </p>
      </section>

      <div className="space-y-12">
        {/* SECTION 1 - DASHBOARD */}
        <FeatureSection
          title="Command center for your practice"
          description="Get a bird's-eye view of your daily operations. Monitor patient flow, staff schedules, and critical alerts in real-time."
          buttonText="Open Dashboard"
          onClick={() => navigate("/dashboard")}
          bgColor="bg-[#F8FAFC]" // Very soft slate
          primaryIcon={<LayoutDashboard className="w-32 h-32 stroke-[1.5]" />}
          features={[
            { icon: <Clock className="w-4 h-4" />, text: "Real-time appointment tracking" },
            { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure, role-based access control" },
          ]}
        />

        {/* SECTION 2 - PATIENTS */}
        <FeatureSection
          title="Patient records, instantly accessible"
          description="A centralized, secure vault for all patient history, prescriptions, and lab results. Find exactly what you need in milliseconds."
          buttonText="Manage Patients"
          onClick={() => navigate("/patient")}
          bgColor="bg-[#F0FDF4]" // Very soft green
          isReversed={true}
          primaryIcon={<Users className="w-32 h-32 stroke-[1.5]" />}
          features={[
            { icon: <ShieldCheck className="w-4 h-4" />, text: "HIPAA compliant data storage" },
            { icon: <Activity className="w-4 h-4" />, text: "Comprehensive medical timelines" },
          ]}
        />

        {/* SECTION 3 - ANALYTICS */}
        <FeatureSection
          title="Turn data into better care"
          description="Uncover operational bottlenecks and revenue trends. Our beautiful analytics engine does the heavy lifting so you don't have to."
          buttonText="View Analytics"
          onClick={() => navigate("/analytics")}
          bgColor="bg-[#F5F3FF]" // Very soft violet
          primaryIcon={<BarChart3 className="w-32 h-32 stroke-[1.5]" />}
          features={[
            { icon: <BarChart3 className="w-4 h-4" />, text: "Automated daily reporting" },
            { icon: <Users className="w-4 h-4" />, text: "Patient demographic insights" },
          ]}
        />
      </div>

    </main>
  );
};

export default Home;