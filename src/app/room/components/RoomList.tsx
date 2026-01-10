import { useRooms } from "../hooks/useRooms";

export default function RoomList() {
  const { allRooms, user, handleDelete, navigate } = useRooms();

  if (allRooms.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
        Recent Rooms
      </h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {allRooms.map((room) => {
          const isOwner = room.created_by === user?.id;
          return (
            <div
              key={room.id}
              className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <button
                onClick={() => navigate(`/chat?room=${room.room_code}`)}
                className="flex-1 flex items-center justify-between text-left"
              >
                <div>
                  <div className="text-white/80 font-medium">{room.name}</div>
                  <div className="text-xs text-white/40">
                    {isOwner ? "Created by you" : "Visited"}
                  </div>
                </div>
                <span className="text-xs text-primary font-mono">
                  #{room.room_code}
                </span>
              </button>
              {isOwner && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(room.id, room.room_code);
                  }}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete room"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
