import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import LeftSide from "./components/LeftSide";
import Middle from "./components/Middle";
import RightSide from "./components/RightSide";
import LoginSignupPage from "./pages/LoginSignupPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

// Protected Route Component to handle authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginSignupPage />} />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>
                  <TitleBar />
                  <div className="content">
                    <div className="left-side">
                      <LeftSide />
                    </div>
                    <div className="middle">
                      <Middle />
                    </div>
                    <div className="right-side">
                      <RightSide />
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
