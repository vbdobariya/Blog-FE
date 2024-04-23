import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { commentsBlog, getBlogById } from "../services/api";
import { Avatar, Box, CardMedia, Dialog, DialogContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';

function BlogPage() {
  const [blogs, setBlogs] = useState({});
  const [comment, setComment] = useState("");
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

  const capitalizeFirstLetter = (name) => {
    return name?.charAt(0).toUpperCase();
  }

  const sendComment = async () => {
    try {
      const response = await commentsBlog(id, { "comment": comment });
      console.log('response', response)
      if (response.success) {
        fetchBlogs()
        setComment('')
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  return (
    <Dialog open={true}
      fullWidth
      maxWidth={"lg"}>
      <div style={{ marginTop: 20 }}>
        <DialogContent style={{ overflow: "hidden" }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Typography style={{ textAlign: "center", marginBottom: 20, marginTop: 20, wordBreak: "break-word" }} variant='h5'> {blogs.title}</Typography>
              {blogs.imageUrl && <CardMedia
                style={{ height: 500, borderRadius: 10 }}
                image={blogs.imageUrl}
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
              />}
              <Typography style={{ marginBottom: 10, marginTop: 20 }} variant='body1'>{blogs.description}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}>
                <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10, marginBottom: 20, marginTop: 20, borderBottom: "1px solid #445045" }}>
                  <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10 }}>
                    <Avatar>{capitalizeFirstLetter(blogs?.authorname)}</Avatar>
                    <Typography variant='h6'>
                      {blogs?.authorname}
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}>
                  {blogs?.comment?.length ? blogs.comment.map((obj) => {
                    return (
                      <Box key={obj._id} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                        <Avatar>{capitalizeFirstLetter(obj?.username)}</Avatar>
                        <Box>
                          <Typography variant='subtitle2'>{obj?.username}</Typography>
                          <Typography >{obj.comment}</Typography>
                        </Box>
                      </Box>
                    )
                  }) : (
                    <Typography variant='h5' style={{
                      display: "flex",
                      justifyContent: "center"
                    }}>No Comment Yet.</Typography>
                  )}
                </Box>
                <Box sx={{ width: "100%", marginBottom: 20, }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={comment || ""}
                    placeholder="comment"
                    onChange={(event) => setComment(event.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => sendComment()}>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default BlogPage