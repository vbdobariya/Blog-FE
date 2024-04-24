import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { commentsBlog, getBlogById } from "../services/api";
import { Avatar, Box, CardMedia, CircularProgress, Container, Dialog, DialogContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';

function BlogPage() {
  const history = useHistory()
  const [blogs, setBlogs] = useState({});
  const [comment, setComment] = useState("");
  const [close, setClose] = useState(true);
  const [loading, setLoading] = useState(true);
  const { id } = useParams()

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [id]);

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await getBlogById(id);
      setBlogs(response);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false)
    }
  };

  const capitalizeFirstLetter = (name) => {
    return name?.charAt(0).toUpperCase();
  }

  const sendComment = async (e) => {
    e.preventDefault()
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

  const onClose = () => {
    setClose(false)
    history.goBack()
  }

  return (
    <Container>
      {loading ? (
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: '86vh'
        }}>
          <CircularProgress />
        </Box >
      ) : (
        <Dialog
          open={close}
          fullWidth
          maxWidth={"lg"}
          onClose={onClose}
        >
          <Box sx={{ textAlign: "end" }}>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
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
                    height: "calc(100vh - 150px)",
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
                      overflow: "auto",
                      gap: 10,
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
                    <Box sx={{ width: "100%", marginBottom: 20, marginTop: 20 }} component={"form"} onSubmit={sendComment}>
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
                              <IconButton onClick={sendComment}>
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
      )}
    </Container>

  )
}

export default BlogPage