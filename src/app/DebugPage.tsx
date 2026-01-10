interface DebugPageProps {
  onNavigateChat?: () => void;
}

export default function DebugPage({ onNavigateChat }: DebugPageProps) {
  return (
    <div className="bg-background-dark text-[#f5f3ff] antialiased selection:bg-primary/30 selection:text-white h-screen overflow-hidden flex">
      {/* Side Navigation */}
      <aside className="w-64 h-full flex flex-col border-r border-white/10 bg-[#0e0e14] hidden md:flex shrink-0">
        <div className="p-6 pb-8 border-b border-white/5">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">
                SecureChat
              </h1>
              <p className="text-[#a291ca] text-xs font-normal mt-1 opacity-70">
                Dev Build v2.4.0
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
            href="#"
          >
            <svg
              className="w-5 h-5 text-[#a291ca] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-[#a291ca] text-sm font-medium group-hover:text-white transition-colors">
              Messages
            </span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
            href="#"
          >
            <svg
              className="w-5 h-5 text-[#a291ca] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-[#a291ca] text-sm font-medium group-hover:text-white transition-colors">
              Contacts
            </span>
          </a>

          <div className="h-px bg-white/5 mx-4 my-2"></div>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20 shadow-sm shadow-primary/5"
            href="#"
          >
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
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white text-sm font-bold">Debug Panel</span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
            href="#"
          >
            <svg
              className="w-5 h-5 text-[#a291ca] group-hover:text-white transition-colors"
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
            <span className="text-[#a291ca] text-sm font-medium group-hover:text-white transition-colors">
              Key Management
            </span>
          </a>

          <a
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
            href="#"
          >
            <svg
              className="w-5 h-5 text-[#a291ca] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-[#a291ca] text-sm font-medium group-hover:text-white transition-colors">
              Settings
            </span>
          </a>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="glass-card rounded-lg p-3 flex items-center gap-3 cursor-pointer">
            <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border border-white/20"></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-white text-sm font-medium truncate">
                Alex Dev
              </p>
              <p className="text-[#a291ca] text-xs truncate">Online</p>
            </div>
            <svg
              className="w-4 h-4 text-[#a291ca] ml-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
        {/* Abstract Background Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0f]/80 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-white text-lg font-bold tracking-tight">
                Encryption Workflow Visualizer
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#a291ca]">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              E2EE Active
            </div>
            <button className="size-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white relative">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-[#0a0a0f]"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Live Debug Session
                </h1>
                <p className="text-[#a291ca]">
                  Monitoring outgoing message payload encryption transformation.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-white transition-colors flex items-center gap-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Logs
                </button>
                <button className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-sm font-bold text-white shadow-lg shadow-primary/25 transition-colors flex items-center gap-2">
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Re-Run
                </button>
              </div>
            </div>

            {/* Main Visualization Panel */}
            <div className="glass-panel w-full rounded-2xl p-8 md:p-10 relative overflow-hidden mt-4">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center relative z-10">
                {/* COLUMN 1: Plain Text */}
                <div className="flex flex-col gap-4 group">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#a291ca] flex items-center gap-1.5 uppercase tracking-wider">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Plain Text
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      Stage 1/3
                    </span>
                  </div>

                  <div className="glass-card rounded-xl p-6 min-h-[220px] flex flex-col relative group-hover:border-white/20">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                      <p className="text-sm font-medium text-white/70">
                        Original Input
                      </p>
                      <button
                        className="text-white/40 hover:text-white transition-colors"
                        title="Copy"
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-[#f5f3ff] leading-relaxed">
                        Hello World
                      </p>
                      <p className="text-sm text-white/30 mt-2 font-mono">
                        len: 11 chars
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 mt-1"></div>
                      <p className="text-xs text-white/50">
                        Raw user input captured from text field.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector 1 */}
                <div className="hidden lg:flex flex-col items-center justify-center opacity-60">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Mobile Connector */}
                <div className="lg:hidden flex justify-center py-2 opacity-60">
                  <svg
                    className="w-8 h-8 text-primary animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>

                {/* COLUMN 2: Caesar Cipher */}
                <div className="flex flex-col gap-4 group">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold text-primary-300 flex items-center gap-1.5 uppercase tracking-wider">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Caesar +3
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      Stage 2/3
                    </span>
                  </div>

                  <div className="glass-card rounded-xl p-6 min-h-[220px] flex flex-col relative group-hover:border-primary/40">
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                      <p className="text-sm font-medium text-white/70">
                        Obfuscation
                      </p>
                      <button
                        className="text-white/40 hover:text-white transition-colors"
                        title="Copy"
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold text-[#d8b4fe] font-mono leading-relaxed bg-primary/10 inline-block px-2 rounded -ml-2">
                        Khoor Zruog
                      </p>
                      <p className="text-sm text-white/30 mt-2 font-mono">
                        shift: 3 positions
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>
                      <p className="text-xs text-white/50">
                        Simple substitution applied as pre-processing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connector 2 */}
                <div className="hidden lg:flex flex-col items-center justify-center opacity-80">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>

                {/* Mobile Connector */}
                <div className="lg:hidden flex justify-center py-2 opacity-60">
                  <svg
                    className="w-8 h-8 text-primary animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>

                {/* COLUMN 3: AES Encrypted */}
                <div className="flex flex-col gap-4 group">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-primary text-xs font-bold text-white shadow-glow-sm flex items-center gap-1.5 uppercase tracking-wider animate-pulse">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      AES-256
                    </span>
                    <span className="text-xs text-white/40 font-mono">
                      Stage 3/3
                    </span>
                  </div>

                  <div className="glass-card glow-active rounded-xl p-6 min-h-[220px] flex flex-col relative z-10">
                    <div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3 relative z-10">
                      <p className="text-sm font-medium text-white/70">
                        Final Payload
                      </p>
                      <button
                        className="text-primary hover:text-white transition-colors"
                        title="Copy Secure String"
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 relative z-10 overflow-hidden">
                      <p className="text-lg font-bold text-white font-mono break-all leading-relaxed tracking-tight">
                        U2FsdGVkX1+abc...
                      </p>
                      <div className="flex gap-2 mt-3">
                        <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-primary font-mono">
                          IV: Random
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-primary font-mono">
                          Mode: GCM
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex gap-2 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-1 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                      <p className="text-xs text-white/50">
                        Ready for secure transmission over network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details Footer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 flex flex-col">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
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
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  Key Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60">Algorithm</span>
                    <span className="text-white font-mono">AES-256-GCM</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60">Key Fingerprint</span>
                    <span className="text-primary font-mono text-xs">
                      8f:3a:2b:1c...9d
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/60">Rotation</span>
                    <span className="text-white">Every 24h</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 flex flex-col">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Performance Metrics
                </h3>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-center border border-white/5">
                    <p className="text-xs text-white/50 uppercase mb-1">
                      Processing
                    </p>
                    <p className="text-xl font-bold text-white">4ms</p>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-center border border-white/5">
                    <p className="text-xs text-white/50 uppercase mb-1">
                      Entropy
                    </p>
                    <p className="text-xl font-bold text-green-400">High</p>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-center border border-white/5">
                    <p className="text-xs text-white/50 uppercase mb-1">
                      Overhead
                    </p>
                    <p className="text-xl font-bold text-white">~12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-12 text-center text-xs text-white/30 pb-4">
            <p>
              SecureChat v2.0.1 Encrypted • End-to-End Encryption Protocol v4
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
