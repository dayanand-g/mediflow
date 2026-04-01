import React from "react";
import { useUserAuth } from "@/context/userAuthContext";
import { Link, useNavigate } from "react-router-dom";
import Account from "../../pages/account";


const Navbar = () => {
  const [isAccountOpen, setIsAccountOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { logOut } = useUserAuth();

  // Logut handler
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

    return (
    <>
      <header className="h-16 flex items-center justify-between px-8 sm:px-16 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
        {/* Left: Brand with a subtle glow */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAccountOpen(true)}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Account
          </button>
        </div>

        {/* Right: Modernized Navigation */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <button 
              onClick={() => setIsAccountOpen(true)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Account
            </button>
          </nav>

          <div className="h-4 w-[1px] bg-slate-700 hidden md:block"></div>

          <button 
            onClick={handleLogout}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>
      <Account 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)} 
        onLogout={() => handleLogout(new MouseEvent('click') as unknown as React.MouseEvent<HTMLButtonElement>)}
      />
    </> 
  );  
};

export default Navbar;