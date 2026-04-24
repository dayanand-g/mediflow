import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#081129] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Rights */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold tracking-tighter text-white">
            Medi<span className="text-cyan-400">Flow</span>
          </div>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            © {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Quick Links with Hover Glow */}
        <div className="flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-slate-400">
          <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Dashboard</Link>
          <Link to="/patient" className="hover:text-cyan-400 transition-colors">Patients</Link>
          <Link to="/analytics" className="hover:text-cyan-400 transition-colors">Analytics</Link>
        </div>

        {/* Tagline */}
        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
          Redefining Digital Healthcare
        </div>

      </div>
    </footer>
  );
};

export default Footer;