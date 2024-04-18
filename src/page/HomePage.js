import React, { useState, useEffect } from "react";
import { getAllBlogs } from "../services/api";
import BlogList from "../Component/BlogList";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomePage;
