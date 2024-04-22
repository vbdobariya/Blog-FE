import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}api/blogs`;

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Get a blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error;
  }
};

// Create a blog
export const createBlog = async (blogData) => {
  const token = localStorage.getItem("authtoken");
  try {
    const response = await axios.post(API_URL, blogData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Update a blog by ID
export const updateBlog = async (id, blogData) => {
  const token = localStorage.getItem("authtoken");
  try {
    const response = await axios.put(`${API_URL}/${id}`, blogData, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a blog by ID
export const deleteBlog = async (id) => {
  const token = localStorage.getItem("authtoken");
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
