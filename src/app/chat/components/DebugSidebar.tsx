import { useState } from "react";
import { useChat } from "../hooks/useChat";
import type { CryptoLog } from "../../../lib/crypto/hybrid";

export default function DebugSidebar() {
  const { showDebug, currentLogs, rsaKeys } = useChat();

  if (!showDebug) return null;

  return (
    <aside className="w-80 bg-[#0e0e14] border-l border-white/10 overflow-y-auto hidden md:flex md:flex-col">
      {/* RSA Keys Panel - Sticky at top */}
      <div className="sticky top-0 z-10 bg-[#0e0e14]">
        <KeysPanel rsaKeys={rsaKeys} />
      </div>

      {/* Encryption Logs */}
      <div className="border-t border-white/10">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <svg
              className="w-4 h-4 text-primary"
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
        </div>
        <div className="p-4 space-y-6">
          {currentLogs.length === 0 ? (
            <div className="text-center text-white/30 py-10 text-sm">
              Send a message to see the encryption workflow here.
            </div>
          ) : (
            currentLogs.map((log, idx) => <LogItem key={idx} log={log} />)
          )}
        </div>
      </div>
    </aside>
  );
}

function KeysPanel({
  rsaKeys,
}: {
  rsaKeys: { publicKey: string; privateKey: string } | null;
}) {
  const [showPrivate, setShowPrivate] = useState(false);
  const [copied, setCopied] = useState<"public" | "private" | null>(null);

  const copyToClipboard = (text: string, type: "public" | "private") => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Format key: strip PEM headers and show as PUBLIC key or PRIVATE key
  const formatKey = (key: string, type: "public" | "private") => {
    const cleaned = key
      .replace(/-----BEGIN.*?-----|-----END.*?-----/g, "")
      .replace(/\n/g, "")
      .trim();
    const prefix = type === "public" ? "PUBLIC" : "PRIVATE";
    return `${prefix} ${cleaned}`;
  };

  if (!rsaKeys) {
    return (
      <div className="p-4 text-center text-white/30 text-sm">
        Generating RSA keys...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <h3 className="font-bold text-white flex items-center gap-2">
        <svg
          className="w-4 h-4 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
        Your RSA Keys
      </h3>

      {/* Public Key */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-green-400">
            📤 Public Key
          </span>
          <button
            onClick={() => copyToClipboard(rsaKeys.publicKey, "public")}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            {copied === "public" ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <div className="bg-white/5 rounded-lg p-2 border border-white/10">
          <p className="text-[10px] font-mono text-green-400 break-all line-clamp-3 leading-relaxed">
            {formatKey(rsaKeys.publicKey, "public")}
          </p>
        </div>
      </div>

      {/* Private Key */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            🔒 Private Key
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrivate(!showPrivate)}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              {showPrivate ? "Hide" : "Show"}
            </button>
            <button
              onClick={() => copyToClipboard(rsaKeys.privateKey, "private")}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              {copied === "private" ? "✓ Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-2 border border-red-500/20">
          {showPrivate ? (
            <p className="text-[10px] font-mono text-red-400 break-all line-clamp-3 leading-relaxed">
              {formatKey(rsaKeys.privateKey, "private")}
            </p>
          ) : (
            <p className="text-[10px] font-mono text-white/30">
              ••••••••••••••••••••••••••••••••
            </p>
          )}
        </div>
        <p className="text-[9px] text-white/30">
          ⚠️ Keep private key secret! Used for signing.
        </p>
      </div>
    </div>
  );
}

function LogItem({ log }: { log: CryptoLog }) {
  return (
    <div className="relative pl-6 border-l-2 border-white/10 pb-6 last:pb-0 group">
      <div
        className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-[#0e0e14] ${
          log.isEncrypted
            ? "bg-primary"
            : log.stage === "verification"
              ? log.output === "VALID"
                ? "bg-green-500"
                : "bg-red-500"
              : "bg-white/20"
        } group-hover:scale-110 transition-transform`}
      ></div>
      <div className="mb-1 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-white/50">
          {log.stage}
        </span>
      </div>
      <div className="bg-white/5 rounded-lg p-3 border border-white/5 hover:border-white/10 transition-colors">
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
