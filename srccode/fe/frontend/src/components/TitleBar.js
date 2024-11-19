import React from "react";
import "./../styles/TitleBar.css";

const TitleBar = () => {
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
          <button className="btn btn-link">Menu</button>
          <button className="btn btn-link">Profile</button>
        </div>
      </div>
    </header>
  );
};

export default TitleBar;
