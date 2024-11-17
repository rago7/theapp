import React from "react";
import "./../styles/TitleBar.css";

const TitleBar = () => {
  return (
    <div className="title-bar d-flex align-items-center justify-content-between">
      <div className="logo">Logo</div>
      <div className="search-bar d-flex align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
        />
        <button className="btn btn-outline-secondary">🔍</button>
        <button className="btn btn-outline-secondary">Filter</button>
      </div>
      <div className="nav-links d-flex align-items-center">
        <button className="btn btn-link">Home</button>
        <button className="btn btn-link">Trending</button>
        <button className="btn btn-link">Reels</button>
      </div>
      <div className="profile-menu d-flex align-items-center">
        <button className="btn btn-link">Menu</button>
        <button className="btn btn-link">Profile</button>
      </div>
    </div>
  );
};

export default TitleBar;
