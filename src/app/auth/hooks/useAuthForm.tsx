import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "../../../context/AuthContext";

type AuthMode = "login" | "register";

interface AuthFormContextType {
  // Form state
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  error: string;
  loading: boolean;
  // Handlers
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleRegister: (e: React.FormEvent) => Promise<void>;
  // Mode
  mode: AuthMode;
}

const AuthFormContext = createContext<AuthFormContextType | undefined>(
  undefined,
);

export function AuthFormProvider({
  children,
  mode,
}: {
  children: ReactNode;
  mode: AuthMode;
}) {
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      // Use window.location for reliable navigation in Vite
      window.location.href = "/rooms";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !username.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      console.log("[Register] Starting signup...");
      await signUp(email, password, username);
      console.log("[Register] Signup successful, redirecting to /rooms...");
      // Use window.location for reliable navigation in Vite
      window.location.href = "/rooms";
    } catch (err) {
      console.error("[Register] Error:", err);
      setError(err instanceof Error ? err.message : "Registration failed");
      setLoading(false);
    }
  };

  return (
    <AuthFormContext.Provider
      value={{
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        error,
        loading,
        handleLogin,
        handleRegister,
        mode,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
}

export function useAuthForm() {
  const context = useContext(AuthFormContext);
  if (context === undefined) {
    throw new Error("useAuthForm must be used within an AuthFormProvider");
  }
  return context;
}
