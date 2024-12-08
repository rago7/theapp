import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./../styles/TitleBar.css";

const TitleBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const navigateToProfile = () => {
    navigate("/profile"); // Navigate to profile page
    setIsOptionsOpen(!isOptionsOpen); // Close dropdown
  };

  const navigateHome = () => {
    navigate("/"); // Navigate to Home page
  };

  return (
    <header className="title-bar">
      <div className="top-section">
        <div className="logo">Logo</div>
        <div>
          <div className="search-section">
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search..."
            />
            <button className="btn btn-outline-secondary search-icon">🔍</button>
            <button className="btn btn-outline-secondary search-filter">
              Filter
            </button>
          </div>
          <div className="nav-section">
            <button className="btn btn-link" onClick={navigateHome}>Home</button>
            <button className="btn btn-link">Trending</button>
            <button className="btn btn-link">Reels</button>
          </div>
        </div>
        <div className="menu-profile">
          <div className="profile-options">
            <div
              className="profile-btn"
              onClick={toggleOptions}
            >
              Profile
            </div>
            {isOptionsOpen && (
              <div className="profile-options-menu">
                <div
                  className="profile-option-item"
                  onClick={navigateToProfile}
                >
                  View Profile
                </div>
                <div
                  className="profile-option-item"
                  onClick={() => alert("Settings clicked")}
                >
                  Settings
                </div>
                <div
                  className="profile-option-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TitleBar;
