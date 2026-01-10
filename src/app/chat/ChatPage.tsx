import { ChatProvider, useChat } from "./hooks/useChat";
import ChatHeader from "./components/ChatHeader";
import MobileHeader from "./components/MobileHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import DebugSidebar from "./components/DebugSidebar";
import DebugModal from "./components/DebugModal";

function ChatContent() {
  const { authLoading, roomCode } = useChat();

  if (authLoading || !roomCode) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-background-dark text-white overflow-hidden h-full selection:bg-primary/30 flex flex-col">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

      <ChatHeader />

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col relative">
          <MessageList />
          <MessageInput />
        </main>

        <DebugSidebar />
      </div>

      <MobileHeader />
      <DebugModal />
    </div>
  );
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
}
