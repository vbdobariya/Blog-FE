import { Card, CardActions, CardContent, CardMedia, Checkbox, Typography, TextField, IconButton, Box, InputAdornment, Link, Avatar } from "@material-ui/core";
import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useHistory } from "react-router-dom";

const Blog = ({ blog }) => {
  const history = useHistory();

  const NavigateToBlogPage = () => {
    history.push(`/blog/${blog._id}`);
  }

  return (
    <Card>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%", alignItems: 'center', gridGap: 10 }}>
          <Avatar>V</Avatar>
          <Typography>
            Vivek
          </Typography>
        </Box>
        <IconButton>
          <MoreHorizIcon />
        </IconButton>
      </CardActions>
      {blog.imageUrl && <CardMedia
        style={{ height: 250 }}
        image={blog.imageUrl}
        title="green iguana"
      />}
      {blog.videoUrl && <video
        playsInline
        src={blog.videoUrl}
        autoPlay
        controls={true}
        muted={true}
        style={{ width: "100%", height: 250, objectFit: 'contain', backgroundColor: 'black' }}
      />}
      {blog.gifUrl && <CardMedia
        style={{ height: 250 }}
        image={blog.gifUrl}
        title="green iguana"
      />}
      <CardContent>
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
        <Link
          variant="contained"
          color="primary"
          onClick={NavigateToBlogPage}
          style={{ display: 'flex', justifyContent: 'flex-end', fontWeight: '500', marginTop: 10, cursor: "pointer" }}
        >
          See More
        </Link>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%", alignItems: 'center' }}>
          <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color="error" />} />
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="comment"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card >
  );
};

export default Blog;
