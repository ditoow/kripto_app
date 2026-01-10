import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleLogin,
  } = useAuthForm();

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to your secure channel</p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              className="input-glass w-full rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(138,93,244,0.25)] transition-all duration-300"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors duration-300"
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
            </div>
            <input
              className="input-glass w-full rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(138,93,244,0.25)] transition-all duration-300"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-light p-[1px] group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-[#151022] disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-transparent h-12 flex items-center justify-center gap-2 px-5">
            <span className="text-white text-base font-bold tracking-wide drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-200">
              {loading ? "Signing In..." : "Sign In"}
            </span>
            {!loading && (
              <svg
                className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-200"
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
            )}
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-light blur opacity-30 group-hover:opacity-60 transition duration-300 group-hover:duration-200"></div>
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-white/30">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:text-white transition-colors underline font-medium"
        >
          Create Account
        </Link>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <svg
          className="w-3 h-3 text-primary"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-xs text-gray-400 font-medium">
          End-to-end encrypted messaging
        </span>
      </div>
    </div>
  );
}
