import React, { createContext, useContext, useState } from "react";
import { post } from "../utils/api"; // Import the POST function from api.js

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const login = async (email, password) => {
    try {
      const data = await post("/api/login/", { email, password }); // Use the POST function
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = async (formData) => {
    try {
      const data = await post("/api/signup/", formData); // Use the POST function
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
