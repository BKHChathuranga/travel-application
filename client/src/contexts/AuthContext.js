import React, { createContext, useContext, useState, useEffect } from "react";
import { login, logout, getUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUsingRecommendation, setIsUsingRecommendation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userData = await login({ email, password });
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isUsingRecommendation, setIsUsingRecommendation }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);