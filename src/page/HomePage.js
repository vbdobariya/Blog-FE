import React, { useState, useEffect } from "react";
import { getAllBlogs } from "../services/api";
import BlogList from "../Component/BlogList";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchBlogs();
    localStorage.removeItem("adminauthtoken");
  }, []);

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await getAllBlogs();
      setBlogs(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div>
      <BlogList blogs={blogs} onload={fetchBlogs} loading={loading}/>
    </div>
  );
};

export default HomePage;
