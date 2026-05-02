import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useTheme } from "../hooks/useTheme";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      await api.post("/login", { email, password });
      const me = await api.get("/me");
      setUser(me.data);
    } catch (err) {
      const message = err.response?.data?.message || "Erreur de connexion";
      throw new Error(message);
    }
  };

  const register = async (email, password, pseudo) => {
    try {
      await api.post("/register", { email, password, pseudo });
      const me = await api.get("/me");
      setUser(me.data);
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de l'inscription";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, theme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};
