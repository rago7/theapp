import React, { useEffect, useState } from "react";
import { fetchWithCache } from "../utils/cache";
import { get } from "../utils/api";
import Post from "./Post"; // Import the Post component
import "./../styles/Middle.css";

// Function to fetch posts from the fake API
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
      <h5>Posts:</h5>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.postID}
            content={post.content}
            likes={post.likes}
            views={post.views}
            comments={post.comments}
          />
        ))
      )}
    </div>
  );
};

export default Middle;
