import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser ? storedUser.isAdmin : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAdmin(user.isAdmin || false);
    } else {
      localStorage.removeItem("user");
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const register = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  const googleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout, register, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
