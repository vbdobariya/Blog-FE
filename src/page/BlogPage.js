import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBlogById } from "../services/api";
import { Avatar, Box, CardMedia, Container, Grid, IconButton, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function BlogPage() {
  const [blogs, setBlogs] = useState({});
  const { id } = useParams()

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [id]);

  const fetchBlogs = async () => {
    try {
      const response = await getBlogById(id);
      setBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Container maxWidth="md" style={{ border: "2px solid gray", borderRadius: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }} variant='h5'> {blogs.title}</Typography>
            {blogs.imageUrl && <CardMedia
              style={{ height: 500, borderRadius: 10 }}
              image={blogs.imageUrl}
              title="green iguana"
            />}
            {blogs.videoUrl && <video
              playsInline
              src={blogs.videoUrl}
              autoPlay
              controls={true}
              muted={true}
              style={{ width: "100%", height: 250, objectFit: 'contain', backgroundColor: 'black' }}
            />}
            {blogs.gifUrl && <CardMedia
              style={{ height: 250 }}
              image={blogs.gifUrl}
              title="green iguana"
            />}
            <Typography style={{ marginBottom: 10, marginTop: 20 }} variant='body1'>{blogs.description}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10, marginBottom: 20, marginTop: 20 }}>
              <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10 }}>
                <Avatar>V</Avatar>
                <Typography>
                  Vivek
                </Typography>
              </Box>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default BlogPage