import * as React from 'react';
import { motion } from 'framer-motion';
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
  accentColor: string;
  isReversed?: boolean;
}

const playHoverSound = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime); // High-tech tick frequency
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime); // Very subtle volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Silently fail if browser blocks autoplay audio
    console.log("Audio contextual block",e);
  }
};

// Reusable Feature Section Component
const FeatureSection = ({
  title,
  description,
  features,
  buttonText,
  onClick,
  primaryIcon,
  accentColor, // Changed from bgColor to accentColor for glowing effects
  isReversed = false,
}: IFeatureSectionProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={playHoverSound}
      className={`relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.05] p-8 md:p-16 flex flex-col ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      } gap-12 items-center justify-between backdrop-blur-xl group hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-500`}
    >
      {/* Background Glow Effect on Hover */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full ${accentColor} blur-[120px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none`} />

      {/* Text Content */}
      <div className="flex-1 space-y-8 relative z-10">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <motion.li 
              key={idx}
              whileHover={{ x: 5 }}
              className="flex items-center text-slate-300 font-medium"
            >
              <span className="mr-3 p-2 bg-white/10 rounded-full shadow-sm text-cyan-400 border border-white/10">
                {feature.icon}
              </span>
              {feature.text}
            </motion.li>
          ))}
        </ul>

        <button
          onClick={onClick}
          className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-950 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-950 transition-colors duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Visual / Icon Representation */}
      <div className="flex-1 flex justify-center items-center w-full relative z-10">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full max-w-sm aspect-square bg-slate-900/50 rounded-[2.5rem] shadow-2xl border border-white/10 flex items-center justify-center p-8 overflow-hidden"
        >
          {/* Internal Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/[0.02] rounded-[2.5rem]" />
          <div className="relative z-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            {primaryIcon}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- MAIN HOME PAGE COMPONENT ---
const Home = () => {
  const navigate = useNavigate();

  return (
    // Base Enterprise Dark Theme: Deep Slate/Navy (#030712)
    <main className="relative mx-auto py-0 pb-12 px-4 sm:px-6 lg:px-8 space-y-24 bg-[#030712] min-h-screen rounded-xl overflow-hidden selection:bg-cyan-500/30 w-[calc(100%-2rem)] max-w-[1440px]">
      
      {/* GLOBAL BACKGROUND EFFECTS (The "Raga" Nebula effect) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center items-center">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        {/* HERO SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto pt-16 pb-8 space-y-8"
        >
          <motion.div
      // Entrance Animation
      initial={{ scale: 0.9, opacity: 0, y: 10 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: [0, -4, 0], // Subtle floating loop
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.15 },
        scale: { duration: 0.6, delay: 0.15 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      // Interactive 3D tilt on hover
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        transition: { duration: 0.2 }
      }}
      className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.1)] cursor-default"
    >
      {/* The "Scanning" Ray Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-12 pointer-events-none"
      />

        {/* Pulsing Icon with Glow */}
        <div className="relative">
          <Activity className="w-4 h-4 animate-pulse relative z-10" />
          <div className="absolute inset-0 bg-cyan-400/40 blur-sm rounded-full animate-ping opacity-20" />
        </div>

        <span className="relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
          AI-Driven Healthcare Operations
        </span>
      </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Healthcare operations, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              beautifully simplified.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Manage your entire facility from a single, high-performance platform designed to eliminate latency and improve patient outcomes.
          </p>
        </motion.section>

        <div className="space-y-8">
          {/* SECTION 1 - DASHBOARD */}
          <FeatureSection
            title="Command center for your practice"
            description="Get a bird's-eye view of your daily operations. Monitor patient flow, staff schedules, and critical alerts with sub-100ms real-time sync."
            buttonText="Open Dashboard"
            onClick={() => navigate("/dashboard")}
            accentColor="bg-blue-500"
            primaryIcon={<LayoutDashboard className="w-32 h-32 stroke-[1]" />}
            features={[
              { icon: <Clock className="w-4 h-4" />, text: "Real-time appointment tracking" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "Secure, role-based access control" },
            ]}
          />

          {/* SECTION 2 - PATIENTS */}
          <FeatureSection
            title="Patient records, instantly accessible"
            description="A centralized, secure vault for all patient history. Powered by serverless architecture to find exactly what you need in milliseconds."
            buttonText="Manage Patients"
            onClick={() => navigate("/patient")}
            accentColor="bg-emerald-500"
            isReversed={true}
            primaryIcon={<Users className="w-32 h-32 stroke-[1]" />}
            features={[
              { icon: <ShieldCheck className="w-4 h-4" />, text: "HIPAA compliant data storage" },
              { icon: <Activity className="w-4 h-4" />, text: "Comprehensive medical timelines" },
            ]}
          />

          {/* SECTION 3 - ANALYTICS */}
          <FeatureSection
            title="Turn data into better care"
            description="Uncover operational bottlenecks and revenue trends. Our 60fps analytics engine does the heavy lifting without dropping a frame."
            buttonText="View Analytics"
            onClick={() => navigate("/analytics")}
            accentColor="bg-violet-500"
            primaryIcon={<BarChart3 className="w-32 h-32 stroke-[1]" />}
            features={[
              { icon: <BarChart3 className="w-4 h-4" />, text: "Automated daily reporting" },
              { icon: <Users className="w-4 h-4" />, text: "Patient demographic insights" },
            ]}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;