import { useChat } from "../hooks/useChat";

export default function MobileHeader() {
  const { roomCode, roomInfo, navigate } = useChat();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/10 flex items-center justify-center px-4 z-50">
      <button
        onClick={() => navigate("/rooms")}
        className="absolute left-4 flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <span className="font-bold text-white">
        {roomInfo?.name || `Room #${roomCode}`}
      </span>
    </div>
  );
}
