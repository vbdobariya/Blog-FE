import React, { useState } from "react";
import Blog from "./Blog";
import { Box, Button, CircularProgress, Container, Grid } from "@material-ui/core";
import AddBlogForm from "./AddBlogForm";
import { useHistory } from "react-router";

const BlogList = ({ blogs, onload, loading }) => {
  const history = useHistory();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const AddModelOpenClose = () => {
    setIsFormOpen(false);
  };

  const AddModelOpen = () => {
    const token = localStorage.getItem("authtoken")
    if (token) {
      setIsFormOpen(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <Container>
      <Box sx={{ textAlign: "end", marginTop: 10 }}>
        <Button variant="contained" color="primary" onClick={() => AddModelOpen()}>Add Post</Button>
      </Box>
      <AddBlogForm
        open={isFormOpen}
        handleClose={AddModelOpenClose}
        title="Add Blog"
        onLoad={onload}
      />
      <h1 style={{ textAlign: "center" }}>Blog List</h1>
      {loading ? (
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: '86vh'
        }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          <Grid container spacing={3} item xs={12} md={6}>
            {blogs.length
              ? blogs.map((blog) => <Grid item xs={12} key={blog._id}>
                <Blog blog={blog} onload={onload} />
              </Grid>
              ) : "No blog found"}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BlogList;
