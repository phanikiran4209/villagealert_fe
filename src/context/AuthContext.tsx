
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'public' | 'fire' | 'medical' | 'disaster' | 'accident' | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  setUserRole: () => {},
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved auth in localStorage on component mount
    const savedRole = localStorage.getItem('userRole') as UserRole;
    if (savedRole) {
      setUserRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('userRole', role as string);
  };

  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
