import { useChat } from "../hooks/useChat";

export default function ChatHeader() {
  const { roomCode, roomInfo, showDebug, setShowDebug, navigate } = useChat();

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0f]/80 backdrop-blur-md z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/rooms")}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
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
        <div className="size-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/20">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">
            {roomInfo?.name || `Room #${roomCode}`}
          </h1>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-white/50">
              #{roomCode} • Encrypted
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowDebug(!showDebug)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            showDebug
              ? "bg-primary/20 border-primary text-primary-light"
              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
          }`}
        >
          {showDebug ? "Hide Debug" : "Show Debug"}
        </button>
      </div>
    </header>
  );
}
