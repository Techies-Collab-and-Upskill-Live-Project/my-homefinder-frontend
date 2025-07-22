import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.data) {
        setUser(storedUser.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      const userToStore = { userData };
      localStorage.setItem("user", JSON.stringify(userToStore));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getToken = () => localStorage.getItem("authToken");

  const hasRole = (role) => user?.role === role;

  const updateUser = (newData) => {
    try {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify({ userData: updatedUser }));
      return true;
    } catch (error) {
      console.error("Update user error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        getToken,
        hasRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
