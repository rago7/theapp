import React from "react";
import "./../styles/Post.css";

const Post = ({ content, likes, views, comments }) => {
  return (
    <div className="post">
      <p className="post-content">{content}</p>
      <div className="post-stats">
        <span>👍 {likes.length} Likes</span>
        <span>👁️ {views.length} Views</span>
        <span>💬 {comments.length} Comments</span>
      </div>
      <div className="post-comments">
        <h6>Comments:</h6>
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.userID}:</strong> {comment.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
