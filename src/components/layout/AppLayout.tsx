import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">MediFlow</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;