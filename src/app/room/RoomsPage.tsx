import { RoomsProvider, useRooms } from "./hooks/useRooms";
import WelcomeSection from "./components/WelcomeSection";
import ActionCard from "./components/ActionCard";

function RoomsContent() {
  const { authLoading } = useRooms();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 z-10">
        <WelcomeSection />
        <ActionCard />
      </div>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <RoomsProvider>
      <RoomsContent />
    </RoomsProvider>
  );
}
