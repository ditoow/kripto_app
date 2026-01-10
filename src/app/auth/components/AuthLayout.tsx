import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  variant?: "login" | "register";
}

export default function AuthLayout({
  children,
  variant = "login",
}: AuthLayoutProps) {
  if (variant === "login") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden selection:bg-primary/30 selection:text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#0a0812]"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#2d1b4e_0%,_#0a0812_70%)] opacity-80"></div>

        {/* Floating Particles/Glows */}
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {children}
    </div>
  );
}
