import { useRooms } from "../hooks/useRooms";

export default function CreateRoomForm() {
  const { roomName, setRoomName, handleCreate, loading } = useRooms();

  return (
    <form onSubmit={handleCreate} className="space-y-6 fade-in">
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/40 uppercase tracking-wider">
          New Room Name
        </label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="e.g. Secret Project Alpha"
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>
      <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary-light leading-relaxed">
        Creating a room generates a unique Room Code that you can share with
        others to join your secure channel.
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-transform active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <span>{loading ? "Creating..." : "Launch Secure Room"}</span>
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
