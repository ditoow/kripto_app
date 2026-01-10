import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "../lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION_HOURS = 12;
const SESSION_KEY = "kripto_session_expiry";

function isSessionExpired(): boolean {
  const expiry = localStorage.getItem(SESSION_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry, 10);
}

function setSessionExpiry(): void {
  const expiry = Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000;
  localStorage.setItem(SESSION_KEY, expiry.toString());
}

function clearSessionExpiry(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log("[AuthContext] Fetching profile for:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // PGRST116 means no rows found - profile doesn't exist
        // This is expected for users who haven't completed registration
        if (error.code === "PGRST116") {
          console.log("[AuthContext] Profile not found for user");
          return null;
        }

        console.error("[AuthContext] Profile fetch error:", error);
        return null;
      }
      console.log("[AuthContext] Profile fetched:", data);
      return data;
    } catch (err) {
      console.error("[AuthContext] Profile fetch exception:", err);
      return null;
    }
  };

  // Check session on mount
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      console.log("[AuthContext] initSession started");
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        console.log("[AuthContext] Got session:", !!currentSession);

        if (!mounted) return;

        if (currentSession?.user) {
          // Check if our custom 12-hour session has expired
          if (isSessionExpired()) {
            console.log(
              "[AuthContext] Session expired (12 hours). Logging out...",
            );
            await supabase.auth.signOut();
            clearSessionExpiry();
            setUser(null);
            setSession(null);
            setProfile(null);
          } else {
            // Set user immediately, fetch profile in background
            setUser(currentSession.user);
            setSession(currentSession);

            // Fetch profile in background (don't block loading)
            fetchProfile(currentSession.user.id).then((profileData) => {
              if (mounted) setProfile(profileData);
            });
          }
        }
      } catch (error) {
        console.error("[AuthContext] Session init error:", error);
      } finally {
        if (mounted) {
          console.log(
            "[AuthContext] initSession finished, setting loading=false",
          );
          setLoading(false);
        }
      }
    };

    initSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("[AuthContext] Auth state changed:", event);

      if (!mounted) return;

      if (newSession?.user) {
        // Set expiry on sign in
        if (event === "SIGNED_IN") {
          setSessionExpiry();
        }

        // Update user/session immediately
        setUser(newSession.user);
        setSession(newSession);
        setLoading(false);
        console.log("[AuthContext] User state updated:", newSession.user.email);

        // Fetch profile in background (don't block)
        fetchProfile(newSession.user.id).then((profileData) => {
          if (mounted) setProfile(profileData);
        });
      } else {
        setUser(null);
        setSession(null);
        setProfile(null);
        clearSessionExpiry();
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error(
          "Registration requires email confirmation. Check your inbox.",
        );
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        username: username,
      });

      if (profileError) throw profileError;

      setSessionExpiry();
    },
    [],
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setSessionExpiry();
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    clearSessionExpiry();
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
