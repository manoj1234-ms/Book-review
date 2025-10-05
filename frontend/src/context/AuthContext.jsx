import React, { createContext, useState, useEffect } from 'react';
// The 'jwt-decode' library is now imported from a CDN to resolve the error.
import { jwtDecode } from 'https://esm.sh/jwt-decode@4.0.0';
import { logoutUser } from '../utils/api.jsx';

// 1. Create the context
// This will be used by other components to access the authentication state.
export const AuthContext = createContext();

// 2. Create the Provider component
// This component will wrap your entire application and manage the auth state.
export const AuthProvider = ({ children }) => {
  // State to hold the JWT token, initialized from localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // State to hold the decoded user information from the token
  const [user, setUser] = useState(null);

  // This effect runs whenever the token changes
  useEffect(() => {
    if (token) {
      try {
        // If a token exists, decode it to get the user payload
        const decoded = jwtDecode(token);
        setUser(decoded.user); // Assumes your JWT payload is { "user": { "id": "...", "name": "..." } }
      } catch (error) {
        // If the token is invalid or expired, log the error and clear the state
        console.error("Invalid or expired token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } else {
      // If there is no token, ensure the user state is null
      setUser(null);
    }
  }, [token]);

  // Function to update the token after a successful login
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Function to clear the token and user state on logout
  const logout = async () => {
    try {
      await logoutUser(); // Call backend logout to clear cookie
    } catch (error) {
      alert('Logout failed on server, but you have been logged out locally.');
      console.error('Error logging out:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  // A boolean flag for easily checking if a user is logged in
  const isAuthenticated = !!token;

  // 3. Provide the state and functions to all child components
  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

