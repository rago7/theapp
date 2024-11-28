import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./../styles/TitleBar.css";

const TitleBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            <button className="btn btn-link">Home</button>
            <button className="btn btn-link">Trending</button>
            <button className="btn btn-link">Reels</button>
          </div>
        </div>
        <div className="menu-profile">
          {!isAuthenticated ? (
            <>
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/signup")}>
                Signup
              </button>
            </>
          ) : (
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TitleBar;
