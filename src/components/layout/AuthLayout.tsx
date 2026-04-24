import type { ReactNode } from 'react';

export const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen w-full flex items-center justify-center bg-[#090f1f] relative overflow-hidden p-6">
    {/* Background Ambient Layers */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-grid-pattern" />
      {/* Dynamic Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse" />
    </div>

    {/* Centered Content */}
    <div className="relative z-10 w-full flex justify-center">
      {children}
    </div>
  </div>
);

