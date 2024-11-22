import React from "react";
import "./../styles/Post.css";

const Post = ({ profilePic, username, university, content, media, likes, comments, timestamp }) => {
  return (
    <div className="post">
      {/* Header Section */}
      <div className="post-header">
        <img src={profilePic} alt={`${username}'s profile`} className="post-profile-pic" />
        <div className="post-user-info">
          <strong className="post-username">{username}</strong>
          <p className="post-university">{university}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="post-content">
        <p className="post-text">{content}</p>
        {media && (
          media.type === "image" ? (
            <img src={media.url} alt="Post media" className="post-media" />
          ) : (
            <video controls className="post-media">
              <source src={media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        )}
      </div>

      {/* Footer Section */}
      <div className="post-footer">
        <div className="post-actions">
          <button className="post-action-btn">👍 Likes ({likes})</button>
          <button className="post-action-btn">💬 Comment ({comments})</button>
          <button className="post-action-btn">↗️ Share</button>
        </div>
        <p className="post-timestamp">{timestamp}</p>
      </div>
    </div>
  );
};

export default Post;
