import React from "react";
import { useUserAuth } from "@/context/userAuthContext";
import { Link, useNavigate } from "react-router-dom";
import Account from "../../pages/account";


const Navbar = () => {
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { logOut } = useUserAuth();

  // Logout handler
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logOut();
      navigate("/signin");
    } catch {
      // Handle error (optional)
    } finally {
      setLoading(false);
    }
  };

  // Logout function for Account modal (no event parameter)
  const logout = async () => {
    try {
      setLoading(true);
      await logOut();
      navigate("/signin");
    } catch {
      // Handle error (optional)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NEW FLOATING PILL NAV - STRUCTURE MATCHING REFERENCE IMAGE 
        Preserves User Logic: Brand (MediFlow), Nav Links (Home, Account), and Logout 
      */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1440px] h-[68px] flex items-center justify-between px-10 rounded-full border border-white/10 bg-[#0c1733] shadow-2xl transition-all duration-300">
        
        {/* Left Group: Brand Logo matching MediFlow aesthetic */}
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-extrabold tracking-normal text-white group flex items-center">
            {/* Subtle blue glow icon matching logo in reference */}
            Medi<span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">Flow</span>
          </Link>
        </div>

        {/* Middle Group: Navigation Links absolutely centered within the pill */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
          <Link 
            to="/" 
            className="text-sm font-medium tracking-wide text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Home
          </Link>
          <button 
            onClick={() => setIsAccountOpen(true)}
            className="hidden md:block text-sm font-medium tracking-wide text-slate-300 hover:text-cyan-400 transition-colors"
          >
            Account
          </button>
        </nav>

        {/* Right Group: Action Button matching Logout style */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-full bg-white text-slate-950 border border-white/10 hover:bg-rose-500 hover:text-white hover:border-rose-600 transition-all duration-300 active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "..." : "Logout"}
          </button>
        </div>
      </header>

      {/* Spacer to prevent content shift when this component renders */}
      <div className="h-20" />

      {/* Preserve Account Modal and Logic */}
      <Account 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)} 
        onLogout={logout}
      />
    </>
  );  
};

export default Navbar;