import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { HybridCryptoSystem, type CryptoLog } from "../../../lib/crypto/hybrid";
import { RSAService } from "../../../lib/crypto/rsa";
import { supabase } from "../../../lib/supabase/client";
import { useAuth } from "../../../context/AuthContext";
import CryptoJS from "crypto-js";

export interface Message {
  id: string;
  sender: string;
  text: string;
  cipher?: string;
  signature?: string;
  isUser: boolean;
  timestamp: string;
  logs?: CryptoLog[];
  verified?: boolean;
}

interface ChatContextType {
  // Room info
  roomCode: string | null;
  roomInfo: { name: string } | null;
  // Messages
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => Promise<void>;
  // UI State
  showDebug: boolean;
  setShowDebug: (show: boolean) => void;
  showEncryptedId: string | null;
  setShowEncryptedId: (id: string | null) => void;
  showDebugModal: boolean;
  setShowDebugModal: (show: boolean) => void;
  currentLogs: CryptoLog[];
  setCurrentLogs: (logs: CryptoLog[]) => void;
  // RSA Keys
  rsaKeys: { publicKey: string; privateKey: string } | null;
  // Refs
  scrollRef: RefObject<HTMLDivElement | null>;
  // Auth
  authLoading: boolean;
  user: ReturnType<typeof useAuth>["user"];
  // Navigation
  navigate: ReturnType<typeof useNavigate>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomCode = searchParams.get("room");

  const { user, profile, loading: authLoading } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [roomInfo, setRoomInfo] = useState<{ name: string } | null>(null);
  const [inputText, setInputText] = useState("");
  const [showDebug, setShowDebug] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentLogs, setCurrentLogs] = useState<CryptoLog[]>([]);
  const [showEncryptedId, setShowEncryptedId] = useState<string | null>(null);
  const [showDebugModal, setShowDebugModal] = useState(false);

  const [keys, setKeys] = useState<{
    publicKey: string;
    privateKey: string;
  } | null>(null);
  const [hybrid, setHybrid] = useState<HybridCryptoSystem | null>(null);

  // Redirect if not authenticated or no room code
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (!roomCode) {
      navigate("/rooms");
    }
  }, [user, authLoading, roomCode, navigate]);

  // Initialize Crypto Stack - persist keys in localStorage
  useEffect(() => {
    if (!user) return;

    try {
      const storageKey = `kripto_rsa_keys_${user.id}`;
      let userKeys = localStorage.getItem(storageKey);

      if (userKeys) {
        // Load existing keys
        const parsedKeys = JSON.parse(userKeys);
        setKeys(parsedKeys);
        console.log("[Crypto] Loaded existing RSA keys from localStorage");
      } else {
        // Generate and save new keys
        const rsaService = new RSAService();
        const generatedKeys = rsaService.generateKeys();
        localStorage.setItem(storageKey, JSON.stringify(generatedKeys));
        setKeys(generatedKeys);
        console.log("[Crypto] Generated and saved new RSA keys");
      }

      const playfairKey = `ROOM${roomCode || "DEFAULT"}KEY`;
      const cryptoSystem = new HybridCryptoSystem(playfairKey);
      setHybrid(cryptoSystem);
    } catch (e) {
      console.error("Crypto Init Failed:", e);
    }
  }, [roomCode, user]);

  // Load room info and messages
  useEffect(() => {
    if (!hybrid || !keys || !roomCode || !user) return;

    const loadRoomAndMessages = async () => {
      try {
        const { data: roomData, error: roomError } = await supabase
          .from("rooms")
          .select("name")
          .eq("room_code", roomCode)
          .single();

        if (roomError) {
          console.error("Room not found:", roomError);
          navigate("/rooms");
          return;
        }

        setRoomInfo(roomData);

        // Create welcome message
        const welcomeMessage: Message = {
          id: "welcome",
          sender: "System",
          text: `Welcome to ${roomData.name} (Room #${roomCode})`,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          verified: true,
        };

        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("room_code", roomCode)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error loading messages:", error);
          setMessages([welcomeMessage]);
          return;
        }

        if (data && data.length > 0) {
          const loadedMessages: Message[] = data.map((msg) => {
            const isOwnMessage = msg.user_id === user.id;
            let decryptedText = msg.content_encrypted;
            let isVerified = false;
            let decryptionLogs: CryptoLog[] = [];

            // Only decrypt/verify messages from others
            if (!isOwnMessage) {
              try {
                // Use sender's public key from database for verification
                const senderPublicKey = msg.sender_public_key || keys.publicKey;
                const result = hybrid.secureReceive(
                  msg.content_encrypted,
                  msg.signature,
                  senderPublicKey,
                );
                decryptedText = result.plaintext;
                isVerified = result.isVerified;
                decryptionLogs = result.logs || [];
              } catch {
                decryptedText = "[Unable to decrypt]";
              }
            } else {
              // Own message: decrypt only (no verification needed)
              try {
                decryptedText = hybrid.decryptOnly(msg.content_encrypted);
              } catch {
                // Fallback: just show as-is
              }
              isVerified = true; // Own messages are always "verified"

              // Compute actual MD5 hash
              const md5Hash = CryptoJS.MD5(decryptedText).toString();

              // Get private key preview from keys
              const privateKeyClean = keys.privateKey
                .replace(
                  /-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g,
                  "",
                )
                .replace(/\n/g, "")
                .trim();

              // Create full 6-step logs for own messages with real values
              decryptionLogs = [
                {
                  stage: "1. PLAINTEXT",
                  output: decryptedText,
                  details: `Original message (${decryptedText.length} characters)`,
                },
                {
                  stage: "2. PLAYFAIR KEY",
                  output: `ROOM${roomCode}KEY`.toUpperCase(),
                  details: "Room encryption key for Playfair Cipher",
                },
                {
                  stage: "3. MD5 HASH",
                  output: md5Hash,
                  details: "128-bit message digest for integrity",
                },
                {
                  stage: "4. RSA PRIVATE KEY",
                  output: `PRIVATE ${privateKeyClean.substring(0, 40)}...`,
                  details: "Used for digital signature (kept secret)",
                  isEncrypted: true,
                },
                {
                  stage: "5. DIGITAL SIGNATURE",
                  output: msg.signature?.substring(0, 50) + "...",
                  details: "RSA-encrypted hash proves sender identity",
                  isEncrypted: true,
                },
                {
                  stage: "6. PLAYFAIR ENCRYPT",
                  output: msg.content_encrypted,
                  details: `Final ciphertext (${msg.content_encrypted.length} chars)`,
                  isEncrypted: true,
                },
              ];
            }

            return {
              id: msg.id.toString(),
              sender: msg.username,
              text: decryptedText,
              cipher: msg.content_encrypted,
              signature: msg.signature,
              isUser: isOwnMessage,
              timestamp: new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              verified: isVerified,
              logs: decryptionLogs,
            };
          });

          // Set messages (welcome + loaded) instead of append to prevent duplicates
          setMessages([welcomeMessage, ...loadedMessages]);
        } else {
          setMessages([welcomeMessage]);
        }
      } catch (e) {
        console.error("Failed to load room data:", e);
      }
    };

    loadRoomAndMessages();

    // Realtime subscription
    const channel = supabase
      .channel(`room-${roomCode}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_code=eq.${roomCode}`,
        },
        (payload) => {
          const msg = payload.new as {
            id: string;
            content_encrypted: string;
            content_hash: string;
            signature: string;
            sender_public_key: string;
            user_id: string;
            username: string;
            room_code: string;
            created_at: string;
          };

          if (msg.user_id === user?.id) return;

          let decryptedText = msg.content_encrypted;
          let isVerified = false;
          let decryptionLogs: CryptoLog[] = [];

          if (hybrid && keys) {
            try {
              // Debug: Check if sender_public_key exists
              console.log("[Realtime] Received message:", {
                hasPublicKey: !!msg.sender_public_key,
                publicKeyPreview: msg.sender_public_key?.substring(0, 50),
              });

              // Use sender's public key from the message for verification
              const senderKey = msg.sender_public_key;
              if (!senderKey) {
                console.warn("[Realtime] No sender_public_key in message!");
              }

              const result = hybrid.secureReceive(
                msg.content_encrypted,
                msg.signature,
                senderKey || keys.publicKey, // Fallback to own key if missing
              );
              decryptedText = result.plaintext;
              isVerified = result.isVerified;
              decryptionLogs = result.logs || [];
            } catch (e) {
              console.error("[Realtime] Decrypt error:", e);
              decryptedText = "[Encrypted Message]";
            }
          }

          const newMessage: Message = {
            id: msg.id.toString(),
            sender: msg.username,
            text: decryptedText,
            cipher: msg.content_encrypted,
            signature: msg.signature,
            isUser: false,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            verified: isVerified,
            logs: decryptionLogs,
          };

          setMessages((prev) => [...prev, newMessage]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hybrid, keys, roomCode, user, navigate]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !keys || !hybrid || !user || !profile || !roomCode)
      return;

    try {
      const securePacket = hybrid.secureSend(inputText, keys.privateKey);

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: profile.username,
        text: inputText,
        cipher: securePacket.finalCipher,
        signature: securePacket.signature,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        verified: true,
        logs: securePacket.logs,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      const { error } = await supabase.from("messages").insert({
        room_code: roomCode,
        user_id: user.id,
        username: profile.username,
        content_encrypted: securePacket.finalCipher,
        content_hash: securePacket.hash,
        signature: securePacket.signature,
        sender_public_key: keys.publicKey,
      });

      if (error) {
        console.error("Supabase Insert Error:", error);
      }
    } catch (e) {
      console.error("Send Failed:", e);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        roomCode,
        roomInfo,
        messages,
        inputText,
        setInputText,
        handleSendMessage,
        showDebug,
        setShowDebug,
        showEncryptedId,
        setShowEncryptedId,
        showDebugModal,
        setShowDebugModal,
        currentLogs,
        setCurrentLogs,
        rsaKeys: keys,
        scrollRef,
        authLoading,
        user,
        navigate,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
