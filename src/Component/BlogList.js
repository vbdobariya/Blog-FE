import React from "react";
import Blog from "./Blog";
import { Container, Grid } from "@material-ui/core";

const BlogList = ({ blogs }) => {

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Blog List</h1>
      <Grid container spacing={3} justifyContent="center">
        <Grid container spacing={3} item xs={12} md={6}>
          {blogs.length
            ? blogs.map((blog) => <Grid item xs={12} key={blog._id}>
              <Blog blog={blog} />
            </Grid>
            ) : "No blog found"}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogList;
