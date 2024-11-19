import React, { useEffect, useState } from "react";
import { fetchWithCache } from "../utils/cache";
import { get } from "../utils/api";
import "./../styles/Middle.css";

// Function to fetch posts from the fake API
const fetchPosts = async () => {
  return await get("/posts"); // Adjust the endpoint based on your JSON server configuration
};

const Middle = () => {
  const [posts, setPosts] = useState([]); // State to store fetched posts

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchWithCache("posts", fetchPosts); // Fetch and cache posts
        setPosts(data); // Update state with fetched posts
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []); // Run once when the component mounts

  return (
    <div className="middle">
      <h5>Posts:</h5>
      {posts.length === 0 ? ( // Conditional rendering if no posts available
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Middle;
