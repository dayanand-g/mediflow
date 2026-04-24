import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {

  return (
    <div className="min-h-screen flex bg-[#030712] text-slate-200 selection:bg-cyan-500/30">

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
};

export default AppLayout;