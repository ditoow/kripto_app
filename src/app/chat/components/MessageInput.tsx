import { useChat } from "../hooks/useChat";

export default function MessageInput() {
  const { inputText, setInputText, handleSendMessage } = useChat();

  return (
    <div className="p-4 pb-safe bg-[#0a0a0f]/90 border-t border-white/10 backdrop-blur-xl z-20">
      <div className="relative flex items-center gap-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a secure message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium pr-12 input-glass"
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-white/20"
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
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
        >
          <svg
            className="w-6 h-6 transform rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
