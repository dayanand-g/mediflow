import { motion, AnimatePresence } from "framer-motion";
import * as React from 'react';
import { X, User, Settings, LogOut } from 'lucide-react';

interface IAccountProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const Account: React.FunctionComponent<IAccountProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[340px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[1.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Neon Top Edge Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

          {/* Header */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-white/5 relative z-10">
            <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              System Account
            </h2>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-2 relative z-10">
            
            {/* User Info Node */}
            <div className="flex items-center gap-3 p-3 mb-4 bg-[#030712]/50 border border-white/5 rounded-2xl shadow-inner">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                JS
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-sm text-white tracking-tight">System Admin</p>
              </div>
            </div>

            {/* Standard Protocols */}
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200 group active:scale-[0.98]">
                <User className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                <span className="font-medium text-sm group-hover:text-slate-200 transition-colors">Profile Details</span>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200 group active:scale-[0.98]">
                <Settings className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                <span className="font-medium text-sm group-hover:text-slate-200 transition-colors">Node Settings</span>
              </button>
            </div>

            <div className="my-2 border-t border-white/5" />

            {/* Critical Action */}
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent rounded-xl transition-all duration-200 group active:scale-[0.98]"
            >
              <LogOut className="w-4 h-4 group-hover:animate-pulse" />
              <span className="font-bold text-sm">Logout</span>
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Account;
