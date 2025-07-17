import { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // const token = localStorage.getItem('authToken');
        const userData = JSON.parse(localStorage.getItem('user')).user;
        
        if (userData) {
        setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        // Clear corrupted data
        // localStorage.removeItem('authToken');
        // localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Secure login function
  const login = (userData) => {
    try {
      // Store only necessary data, never store passwords
      const userToStore = {
        id: userData.id || userData._id,
        name: userData.name || userData.fullName,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        // Add other non-sensitive fields as needed
      };

      // Store in localStorage with proper error handling
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('isAuthenticated', 'true');

      // Update state
      setUser(userToStore);

      return true;
    } catch (error) {
      console.error('Error storing auth data:', error);
      return false;
    }
  };

  // Secure logout function
  const logout = () => {
    try {
      // Clear all auth-related data
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      
      // Clear any other auth-related items
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('phoneNumber');
      localStorage.removeItem('profileImage');

      // Update state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Get current token (for API calls)
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Update user data (for profile updates)
  const updateUser = (newData) => {
    try {
      const updatedUser = { ...user, ...newData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    getToken,
    hasRole,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 