import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";

const USER_KEY = "user";
const TOKEN_KEY = "token";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const login = (token: string, user: User) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
