import React from "react";
import Blog from "./Blog";
import { Container, Grid } from "@mui/material";

const BlogList = ({ blogs }) => {

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Blog List</h1>
      <Grid container spacing={3}>
        {blogs.length
          ? blogs.map((blog) => <Grid item xs={12} md={4} key={blog._id}>
            
            <Blog blog={blog} />
          </Grid>
          ) : "No blog found"}
      </Grid>
    </Container>
  );
};

export default BlogList;
