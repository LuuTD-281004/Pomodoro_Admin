"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import http from "@/axios/http";
import { UserTokenData } from "@/types/token";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  authenticatedUser: UserTokenData | null;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessTokenState, setAccessTokenState] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserTokenData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessTokenState(token);
      const user = jwtDecode<UserTokenData>(token);
      setCurrentUser(user);
    }
  }, [accessTokenState]);

  const login = async (email: string, password: string) => {
    try {
      const response = await http.post("/auth/admin-login", {
        email: email,
        password: password,
      });
      const { accessToken } = response.data.authResult.cookies;
      localStorage.setItem("accessToken", accessToken);
      setAccessTokenState(accessToken);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("accessToken");
      setAccessTokenState(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        authenticatedUser: currentUser,
        accessToken: accessTokenState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
