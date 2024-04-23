import { Card, CardActions, CardContent, CardMedia, Checkbox, Typography, IconButton, Box, Link, Avatar, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from "react-router-dom";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { deleteBlog, likeBlog } from "../services/api";

const Blog = ({ blog, onload }) => {
  const history = useHistory();
  const [liked, setLiked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const ITEM_HEIGHT = 48;

  const userData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (userData?._id) {
      const data = blog.likesUser.filter((obj) => obj.user === userData._id)
      if (data.length) {
        setLiked(true)
      }
    }
  }, [])

  const NavigateToBlogPage = () => {
    history.push(`/blog/${blog._id}`);
  }

  const capitalizeFirstLetter = (name) => {
    return name?.charAt(0).toUpperCase();
  }

  const onChangeLike = (event) => {
    const token = localStorage.getItem("authtoken")
    if (token) {
      setLiked(event.target.checked);
      fetchLiked(event.target.checked)
    } else {
      history.push("/login");
    }
  }

  const fetchLiked = async (value) => {
    try {
      const response = await likeBlog(blog._id, { "like": value });
      console.log(response.success, "response");
      if (response.success) {
        onload()
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const onClickCommentRedirect = (event) => {
    const token = localStorage.getItem("authtoken")
    if (!token) {
      history.push("/login");
    } else {
      NavigateToBlogPage()
    }
  }

  const handleOnDelete = async (id) => {
    try {
      await deleteBlog(id);
      onload();
      handleClose()
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10 }}>
          <Avatar>{capitalizeFirstLetter(blog?.authorname)}</Avatar>
          <Typography>
            {blog?.authorname}
          </Typography>
        </Box>
        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          getContentAnchorEl={null}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleClose}>Report</MenuItem>
          {blog?.author === userData?._id &&
            <>
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={() => handleOnDelete(blog?._id)}>Delete</MenuItem>
            </>
          }
        </Menu>
      </CardActions>
      {blog.imageUrl &&
        <CardMedia
          style={{ height: 250, cursor: 'pointer' }}
          image={blog.imageUrl}
          onClick={NavigateToBlogPage}
        />}
      {blog.videoUrl &&
        <video
          playsInline
          src={blog.videoUrl}
          autoPlay
          controls={true}
          muted={true}
          style={{ width: "100%", height: 250, objectFit: 'contain', backgroundColor: 'black' }}
        />}
      {blog.gifUrl &&
        <CardMedia
          style={{ height: 250, cursor: 'pointer' }}
          image={blog.gifUrl}
          onClick={NavigateToBlogPage}
        />}
      <CardContent style={{ padding: "16px 16px 0 16px", cursor: 'pointer' }} onClick={NavigateToBlogPage}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          wordBreak: "break-all",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-line-clamp": "3",
          "-webkit-box-orient": "vertical",
        }}>
          {blog.description}
        </Typography>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}>
          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 500 }}>
            {blog.likes} {blog.likes > 1 ? "Likes" : "Like"} {blog.comment.length} {blog.comment.length >= 2 ? "comments" : "comment"}
          </Typography>
          <Link
            variant="contained"
            color="primary"
            onClick={NavigateToBlogPage}
            style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '500', cursor: "pointer" }}
          >
            See More
          </Link>
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%", alignItems: 'center', justifyContent: "space-between" }}>
          <Box>
            <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color="error" />} checked={liked} onChange={onChangeLike} />
            <IconButton onClick={onClickCommentRedirect}>
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Box>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card >
  );
};

export default Blog;
