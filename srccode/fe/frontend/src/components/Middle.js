import React, { useEffect, useState } from "react";
import { fetchWithCache } from "../utils/cache";
import { get } from "../utils/api";
import Post from "./Post";
import "./../styles/Middle.css";

const fetchPosts = async () => {
  return await get("/posts");
};

const Middle = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchWithCache("posts", fetchPosts);
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="middle">
      {/* <h5>Posts:</h5> */}
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.postID}
            profilePic={`https://example.com/profile/${post.userID}.jpg`}
            username={`${post.userID}`}
            university={`${post.schoolID}`}
            content={post.content}
            media={post.media} // Assume media is { type: "image"/"video", url: "" }
            likes={post.likes.length}
            comments={post.comments.length}
            timestamp="2 hours ago" // Replace with actual timestamp logic
          />
        ))
      )}
    </div>
  );
};

export default Middle;
