import { useRooms } from "../hooks/useRooms";
import JoinRoomForm from "./JoinRoomForm";
import CreateRoomForm from "./CreateRoomForm";

export default function ActionCard() {
  const { activeTab, setActiveTab, error } = useRooms();

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative">
      {/* Tabs */}
      <div className="flex p-1 bg-black/20 rounded-xl mb-8">
        <button
          onClick={() => setActiveTab("join")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "join"
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "text-white/40 hover:text-white"
          }`}
        >
          Join Room
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "create"
              ? "bg-primary text-white shadow-lg shadow-primary/25"
              : "text-white/40 hover:text-white"
          }`}
        >
          Create Room
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Content */}
      {activeTab === "join" ? <JoinRoomForm /> : <CreateRoomForm />}
    </div>
  );
}
