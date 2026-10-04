import React, { createContext, useContext, useState, useEffect } from "react";
import { apiAuth } from "../services/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "recruiter" | "admin";
  avatar: string;
  college: string;
  xp: number;
  rank: number;
  streak: number;
  rating: number;
  skills: string[];
  location: string;
  available: boolean;
  submitted: number;
  solved: number;
}

interface AuthContextType {
  user: UserProfile;
  token: string | null;
  login: (userData: Partial<UserProfile>, token?: string) => void;
  loginWithGoogle: (email?: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: "user_default_1",
  name: "Priya Sharma",
  email: "priya.sharma@iitd.ac.in",
  role: "student",
  avatar: "PS",
  college: "IIT Delhi",
  xp: 8420,
  rank: 12,
  streak: 47,
  rating: 1847,
  skills: ["Arrays", "Trees", "DP"],
  location: "Delhi",
  available: true,
  submitted: 312,
  solved: 189,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("codecampus_user");
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("codecampus_user", JSON.stringify(user));
  }, [user]);

  const login = (userData: Partial<UserProfile>, authToken?: string) => {
    const updated = { ...user, ...userData };
    setUser(updated);
    if (authToken) {
      setToken(authToken);
      localStorage.setItem("token", authToken);
    }
  };

  const loginWithGoogle = async (customEmail?: string, customName?: string) => {
    const googleName = customName || "Priya Sharma (Google)";
    const googleEmail = customEmail || "priya.sharma.dev@gmail.com";
    const initials = googleName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    try {
      const res = await apiAuth.register(googleName, googleEmail, "google_oauth_pass_123", "student", "IIT Delhi");
      if (res && res.user) {
        login(
          {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            avatar: res.user.avatar || initials,
            college: res.user.college || "IIT Delhi",
            role: "student",
          },
          res.token
        );
        return;
      }
    } catch (e) {
      // Fallback local google auth
    }

    login({
      id: `google_${Date.now()}`,
      name: googleName,
      email: googleEmail,
      avatar: initials,
      college: "IIT Delhi",
      role: "student",
      xp: 9500,
      rating: 1910,
    });
  };

  const logout = () => {
    setUser(DEFAULT_USER);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("codecampus_user");
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
