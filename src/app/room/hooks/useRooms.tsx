import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase/client";
import { useAuth } from "../../../context/AuthContext";

export interface Room {
  id: string;
  room_code: string;
  name: string;
  created_at: string;
  created_by?: string;
}

interface RoomsContextType {
  // State
  activeTab: "join" | "create";
  setActiveTab: (tab: "join" | "create") => void;
  roomCode: string;
  setRoomCode: (code: string) => void;
  roomName: string;
  setRoomName: (name: string) => void;
  error: string;
  loading: boolean;
  allRooms: Room[];
  // Handlers
  handleJoin: (e: React.FormEvent) => Promise<void>;
  handleCreate: (e: React.FormEvent) => Promise<void>;
  handleDelete: (roomId: string, roomCode: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  // Auth
  user: ReturnType<typeof useAuth>["user"];
  profile: ReturnType<typeof useAuth>["profile"];
  authLoading: boolean;
  // Navigation
  navigate: ReturnType<typeof useNavigate>;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export function RoomsProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { user, profile, signOut, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"join" | "create">("join");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allRooms, setAllRooms] = useState<Room[]>([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Load rooms: both created and visited
  useEffect(() => {
    if (!user) return;

    const loadRooms = async () => {
      const visitedRoomCodes: string[] = JSON.parse(
        localStorage.getItem(`visited_rooms_${user.id}`) || "[]"
      );

      const { data: createdRooms } = await supabase
        .from("rooms")
        .select("*")
        .eq("created_by", user.id);

      const { data: visitedRooms } = await supabase
        .from("rooms")
        .select("*")
        .in("room_code", visitedRoomCodes);

      const roomMap = new Map<string, Room>();

      createdRooms?.forEach((room) => roomMap.set(room.room_code, room));
      visitedRooms?.forEach((room) => {
        if (!roomMap.has(room.room_code)) {
          roomMap.set(room.room_code, room);
        }
      });

      const merged = Array.from(roomMap.values()).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setAllRooms(merged);
    };

    loadRooms();
  }, [user]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!roomCode.trim()) {
      setError("Please enter a room code");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("room_code")
        .eq("room_code", roomCode.trim())
        .single();

      if (error || !data) {
        setError("Room not found");
        setLoading(false);
        return;
      }

      if (user) {
        const visited: string[] = JSON.parse(
          localStorage.getItem(`visited_rooms_${user.id}`) || "[]"
        );
        if (!visited.includes(roomCode.trim())) {
          visited.push(roomCode.trim());
          localStorage.setItem(
            `visited_rooms_${user.id}`,
            JSON.stringify(visited)
          );
        }
      }

      navigate(`/chat?room=${roomCode.trim()}`);
    } catch {
      setError("Failed to join room");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!roomName.trim()) {
      setError("Please enter a room name");
      return;
    }

    if (!user) {
      setError("You must be logged in");
      return;
    }

    setLoading(true);
    try {
      const newRoomCode = Math.floor(1000 + Math.random() * 9000).toString();

      const { data, error } = await supabase
        .from("rooms")
        .insert({
          room_code: newRoomCode,
          name: roomName.trim(),
          created_by: user.id,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          setError("Room code collision, please try again");
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }

      navigate(`/chat?room=${data.room_code}`);
    } catch {
      setError("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId: string, roomCodeToDelete: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      const { error } = await supabase.from("rooms").delete().eq("id", roomId);

      if (error) throw error;

      setAllRooms((prev) => prev.filter((r) => r.id !== roomId));

      if (user) {
        const visited: string[] = JSON.parse(
          localStorage.getItem(`visited_rooms_${user.id}`) || "[]"
        );
        const updated = visited.filter((code) => code !== roomCodeToDelete);
        localStorage.setItem(
          `visited_rooms_${user.id}`,
          JSON.stringify(updated)
        );
      }
    } catch {
      setError("Failed to delete room");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <RoomsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        roomCode,
        setRoomCode,
        roomName,
        setRoomName,
        error,
        loading,
        allRooms,
        handleJoin,
        handleCreate,
        handleDelete,
        handleLogout,
        user,
        profile,
        authLoading,
        navigate,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  const context = useContext(RoomsContext);
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
}
