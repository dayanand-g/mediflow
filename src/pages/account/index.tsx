import * as React from 'react';
import { X, User, Settings, LogOut, ShieldCheck } from 'lucide-react';

interface IAccountProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const Account: React.FunctionComponent<IAccountProps> = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Account</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-2">
          
          {/* User Info Section */}
          <div className="flex items-center gap-4 p-3 mb-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              JS
            </div>
            <div>
              <p className="font-bold text-slate-900">User Admin</p>
              <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit">
                <ShieldCheck className="w-3 h-3" /> Admin
              </div>
            </div>
          </div>

          {/* Menu Options */}
          <button className="w-full flex items-center gap-3 p-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors group">
            <User className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span className="font-medium text-sm">Profile Details</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors group border-b border-slate-50 pb-5">
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
            <span className="font-medium text-sm">Settings</span>
          </button>

          {/* Logout Section */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 mt-4 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors group"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Account;
