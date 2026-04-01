import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {

  return (
    <div className="h-screen flex bg-gray-100">

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