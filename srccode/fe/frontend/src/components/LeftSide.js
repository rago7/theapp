import React, { useEffect, useState } from "react";
import "./../styles/LeftSide.css";
import { get } from "../utils/api";

const LeftSide = () => {
  const [trendingProfiles, setTrendingProfiles] = useState([]);
  const [profileLimit, setProfileLimit] = useState(7); // Default limit for large screens

  useEffect(() => {
    const fetchTrendingProfiles = async () => {
      try {
        const users = await get("/users"); // Fetch users from the fake API
        setTrendingProfiles(users.slice(0, profileLimit)); // Limit profiles
      } catch (error) {
        console.error("Failed to fetch trending profiles:", error);
      }
    };

    fetchTrendingProfiles();
  }, [profileLimit]);

  // Adjust profile limit based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setProfileLimit(2); // Small screens
      else if (window.innerWidth <= 1024) setProfileLimit(4); // Medium screens
      else setProfileLimit(7); // Large screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on component mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="left-side">
      {/* Top Section: Trending Profiles */}
      <div className="trending-profiles">
        <h5>Trending Profiles</h5>
        <div className="profiles-list">
          {trendingProfiles.map((profile) => (
            <div key={profile.userID} className="profile-card">
              <img
                src={profile.profilePicture || "https://via.placeholder.com/50"}
                alt={profile.name}
                className="profile-picture"
              />
              <p className="profile-name">{profile.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Files */}
      <div className="files-section">
        <h5>Files</h5>
        <ul>
          <li>
            <a href="#vault" onClick={() => console.log("My Vault clicked")}>
              My Vault
            </a>
          </li>
          <li>
            <a href="#saved" onClick={() => console.log("Saved Files clicked")}>
              Saved Files
            </a>
          </li>
          <li>
            <a
              href="#important"
              onClick={() => console.log("Important Files clicked")}
            >
              Important Files
            </a>
          </li>
          <li>
            <a
              href="#recent"
              onClick={() => console.log("Recent Files clicked")}
            >
              Recent Files
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSide;
