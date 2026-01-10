import { useState, useEffect, useRef, useCallback } from "react";
import { useChat, type Message } from "../hooks/useChat";
import type { CryptoLog } from "../../../lib/crypto/hybrid";

const MESSAGES_PER_PAGE = 20;

export default function MessageList() {
  const {
    messages,
    scrollRef,
    showEncryptedId,
    setShowEncryptedId,
    setCurrentLogs,
    setShowDebugModal,
    user,
  } = useChat();

  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);

  // Get the messages to display (last N messages)
  const visibleMessages = messages.slice(-visibleCount);
  const hasMoreMessages = messages.length > visibleCount;

  // Handle scroll to load more messages
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || isLoadingMore.current || !hasMoreMessages) return;

    // If scrolled near the top (within 100px), load more
    if (container.scrollTop < 100) {
      isLoadingMore.current = true;
      const previousHeight = container.scrollHeight;

      setVisibleCount((prev) =>
        Math.min(prev + MESSAGES_PER_PAGE, messages.length),
      );

      // Maintain scroll position after loading more
      requestAnimationFrame(() => {
        const newHeight = container.scrollHeight;
        container.scrollTop = newHeight - previousHeight;
        isLoadingMore.current = false;
      });
    }
  }, [hasMoreMessages, messages.length, scrollRef]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollRef]);

  // Reset visible count when messages change significantly (new room)
  useEffect(() => {
    if (messages.length <= MESSAGES_PER_PAGE) {
      setVisibleCount(MESSAGES_PER_PAGE);
    }
  }, [messages.length]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-6 fade-mask"
    >
      {hasMoreMessages && (
        <div ref={loadMoreRef} className="flex justify-center py-2">
          <div className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
            ↑ Scroll up for older messages ({messages.length - visibleCount}{" "}
            more)
          </div>
        </div>
      )}
      {visibleMessages.map((msg) => (
        <MessageBubble
          key={msg.id}
          msg={msg}
          userId={user?.id}
          showEncryptedId={showEncryptedId}
          setShowEncryptedId={setShowEncryptedId}
          setCurrentLogs={setCurrentLogs}
          setShowDebugModal={setShowDebugModal}
        />
      ))}
    </div>
  );
}

interface MessageBubbleProps {
  msg: Message;
  userId?: string;
  showEncryptedId: string | null;
  setShowEncryptedId: (id: string | null) => void;
  setCurrentLogs: (logs: CryptoLog[]) => void;
  setShowDebugModal: (show: boolean) => void;
}

function MessageBubble({
  msg,
  showEncryptedId,
  setShowEncryptedId,
  setCurrentLogs,
  setShowDebugModal,
}: MessageBubbleProps) {
  const isToggled = showEncryptedId === msg.id;

  let showCipher: boolean;
  if (msg.isUser) {
    showCipher = isToggled;
  } else {
    showCipher = !isToggled && msg.cipher !== undefined;
  }

  const displayText = showCipher && msg.cipher ? msg.cipher : msg.text;

  return (
    <div
      className={`flex ${msg.isUser ? "justify-end" : "justify-start"} group`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[70%] ${msg.isUser ? "items-end" : "items-start"} flex flex-col`}
      >
        <div className="flex items-center gap-2 mb-1 px-1 flex-wrap">
          <span className="text-xs text-white/40">{msg.sender}</span>
          <span className="text-[10px] text-white/30">{msg.timestamp}</span>
          {msg.verified && (
            <span className="text-[10px] text-green-400 border border-green-500/30 px-1 rounded bg-green-500/10">
              Verified
            </span>
          )}
          {msg.cipher && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                showCipher
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}
            >
              {showCipher ? "🔒 Encrypted" : "🔓 Decrypted"}
            </span>
          )}
        </div>
        <div
          onClick={() => {
            if (msg.cipher) {
              setShowEncryptedId(isToggled ? null : msg.id);
            }
            if (msg.logs) {
              setCurrentLogs(msg.logs);
            }
          }}
          className={`relative px-4 py-3 rounded-2xl backdrop-blur-md border shadow-lg cursor-pointer transition-all active:scale-95 ${
            msg.isUser
              ? "bg-gradient-to-br from-primary/80 to-[#7040d6]/80 border-white/20 text-white rounded-tr-sm"
              : msg.sender === "System"
                ? "bg-white/10 border-white/20 text-white/80 rounded-tl-sm"
                : "text-white/90 rounded-tl-sm hover:bg-white/10 bg-white/5 border-white/10"
          } ${showCipher ? "ring-2 ring-primary/50" : ""}`}
        >
          <p
            className={`leading-relaxed whitespace-pre-wrap ${showCipher ? "font-mono text-xs break-all" : ""}`}
          >
            {displayText}
          </p>
          {msg.isUser && (
            <div className="absolute bottom-1 right-2">
              <svg
                className="w-3 h-3 text-white/70"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          )}
        </div>
        {msg.signature && showCipher && (
          <div className="mt-2 p-2 rounded-lg bg-white/5 border border-white/10 max-w-full">
            <div className="text-[10px] text-white/40 mb-1">
              Digital Signature:
            </div>
            <div className="text-[10px] text-primary font-mono break-all">
              {msg.signature}
            </div>
          </div>
        )}
      </div>

      {msg.logs && msg.logs.length > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentLogs(msg.logs || []);
            setShowDebugModal(true);
          }}
          className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors self-center"
        >
          <svg
            className="w-5 h-5 text-white/50"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
