"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface SessionContextType {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

/* ─────────────────────────────────────────── */

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  /* 1-time read from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      setTokenState(stored);
      setUserId(parseJwt(stored));
    }
  }, []);


  const writeToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
      setUserId(parseJwt(newToken));
    } else {
      localStorage.removeItem("auth_token");
      setUserId(null);
    }
  };

  const logout = async () => {
    try {
      
      await fetch(`${process.env.NEXT_PUBLIC_URL_2}/auth/log-out`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.warn("logout request failed", e);
    }
    writeToken(null);
    
    router.push("/login");
  };

  return (
    <SessionContext.Provider
      value={{ token, userId, setToken: writeToken, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};


export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

function parseJwt(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id || payload.id || payload.sub ||payload.role || null;
  } catch {
    return null;
  }
}
