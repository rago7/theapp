import React, { createContext, useContext, useState, useEffect } from "react";
import { post } from "../utils/api"; // Import the POST function from api.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Function to refresh the token
  const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    try {
      const data = await post("/api/token/refresh/", { refresh }); // Refresh endpoint
      localStorage.setItem("token", data.access); // Update the access token
      setIsAuthenticated(true); // Ensure user stays authenticated
      return true;
    } catch (err) {
      console.error("Failed to refresh token:", err);
      logout(); // Log out user if token refresh fails
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const data = await post("/api/login/", { email, password });
      localStorage.setItem("token", data.access); // Access token
      localStorage.setItem("refreshToken", data.refresh); // Refresh token
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  // Signup function
  const signup = async (formData) => {
    try {
      await post("/api/signup/", formData);
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  // Automatically refresh token periodically (e.g., every 5 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken(); // Refresh token periodically
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
