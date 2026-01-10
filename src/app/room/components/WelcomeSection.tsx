import { useRooms } from "../hooks/useRooms";

export default function WelcomeSection() {
  const { profile, handleLogout } = useRooms();

  return (
    <div className="flex flex-col justify-center space-y-6">
      <div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 mb-2">
          Dashboard
        </h1>
        <p className="text-white/40 text-lg">
          Welcome,{" "}
          <span className="text-primary">{profile?.username || "User"}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-xs text-primary">
            SECURE
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20 text-primary">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Encryption</h3>
              <p className="text-sm text-white/40">
                Playfair (Traditional) + RSA (Modern) + MD5 (Modern)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-white/30 text-sm">
          <span>• End-to-End Encrypted</span>
          <button
            className="text-left text-sm text-white/40 hover:text-white transition-colors"
            onClick={handleLogout}
          >
            Need to logout?{" "}
            <span className="text-primary underline">Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
