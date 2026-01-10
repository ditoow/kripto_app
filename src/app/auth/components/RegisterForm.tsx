import { Link } from "react-router-dom";
import { useAuthForm } from "../hooks/useAuthForm";

export default function RegisterForm() {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleRegister,
  } = useAuthForm();

  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl z-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
          Create Account
        </h1>
        <p className="text-white/40 text-sm">
          Join the secure channel network.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your handle"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-white/30">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:text-white transition-colors underline font-medium"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
