import React, { useEffect, useState } from "react";
import { get, put } from "../utils/api"; // Reuse the GET and PUT functions
import "./../styles/Profile.css"; // Import styles

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/api/profile/");
        setProfileData(response);
        setEditedData(response); // Pre-fill editedData with fetched data
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await put("/api/profile_update/", editedData);
      const updatedProfile = await get("/api/profile/");
      setProfileData(updatedProfile);
      setIsEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Profile update failed!");
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={profileData.profile_pic_url || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
          <h2>{profileData.fname} {profileData.lname}</h2>
          <p>{profileData.university}</p>
        </div>

        <div className="profile-fields">
          <div className="field">
            <label>First Name:</label>
            {isEditMode ? (
              <input
                type="text"
                name="fname"
                value={editedData.fname}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.fname}</p>
            )}
          </div>

          <div className="field">
            <label>Last Name:</label>
            {isEditMode ? (
              <input
                type="text"
                name="lname"
                value={editedData.lname}
                onChange={handleChange}
              />
            ) : (
              <p>{profileData.lname}</p>
            )}
          </div>

          <div className="field">
            <label>Gender:</label>
            {isEditMode ? (
              <select
                name="gender"
                value={editedData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{profileData.gender}</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {isEditMode ? (
            <>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
