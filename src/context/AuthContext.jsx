import React, { createContext, useContext, useEffect, useState } from "react";
import { setAuthToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { email, role }
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user || null);
      setToken(parsed.token || null);
      setAuthToken(parsed.token || null);
    }
  }, []);

  function login({ user, token }) {
    setUser(user);
    setToken(token);
    setAuthToken(token);
    localStorage.setItem("auth", JSON.stringify({ user, token }));
  }

  function logout() {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem("auth");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
