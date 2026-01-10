import { useChat } from "../hooks/useChat";
import type { CryptoLog } from "../../../lib/crypto/hybrid";

export default function DebugModal() {
  const { showDebugModal, setShowDebugModal, currentLogs } = useChat();

  if (!showDebugModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0e0e14] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Encryption Process
          </h3>
          <button
            onClick={() => setShowDebugModal(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-white/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          {currentLogs.length === 0 ? (
            <div className="text-center text-white/30 py-10 text-sm">
              Send a message to see the encryption workflow.
            </div>
          ) : (
            currentLogs.map((log, idx) => <LogItem key={idx} log={log} />)
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <button
            onClick={() => setShowDebugModal(false)}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function LogItem({ log }: { log: CryptoLog }) {
  return (
    <div className="relative pl-6 border-l-2 border-white/10 pb-4 last:pb-0">
      <div
        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#0e0e14] ${
          log.isEncrypted
            ? "bg-primary"
            : log.stage === "verification"
              ? log.output === "VALID"
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-white/20"
        }`}
      ></div>
      <div className="mb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">
          {log.stage}
        </span>
      </div>
      <div className="bg-white/5 rounded-lg p-3 border border-white/5">
        <p className="text-xs font-mono text-primary-light break-all leading-relaxed">
          {log.output}
        </p>
      </div>
      {log.details && (
        <p className="mt-1 text-[10px] text-white/40">{log.details}</p>
      )}
    </div>
  );
}
