import { useRooms } from "../hooks/useRooms";
import RoomList from "./RoomList";

export default function JoinRoomForm() {
  const { roomCode, setRoomCode, handleJoin, loading } = useRooms();

  return (
    <div className="space-y-6 fade-in">
      <form onSubmit={handleJoin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider">
            Room Code
          </label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="e.g. 8291"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-mono tracking-widest text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{loading ? "Joining..." : "Enter Room"}</span>
          {!loading && (
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
        </button>
      </form>

      <RoomList />
    </div>
  );
}
