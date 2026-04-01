import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-blue-100/50 bg-gradient-to-r from-slate-300 via-blue-100 to-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
        <div className="text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()}{" "}
          <span className="tracking-tight text-slate-800 font-bold">
            Medi<span className="text-blue-600">Flow</span>
          </span>
          . All rights reserved.
        </div>

        <div className="flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link to="/dashboard" className="hover:text-blue-600 transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/patient" className="hover:text-blue-600 transition-colors duration-200">
            Patients
          </Link>
          <Link to="/analytics" className="hover:text-blue-600 transition-colors duration-200">
            Analytics
          </Link>
        </div>

        <div className="text-sm text-slate-500 font-medium italic">
          Building the future of digital health
        </div>

      </div>
    </footer>
  );
};

export default Footer;