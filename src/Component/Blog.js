import { Card, CardActions, CardContent, CardMedia, Checkbox, Typography, TextField, IconButton, Box, InputAdornment } from "@material-ui/core";
import React from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';

const Blog = ({ blog }) => {
  return (
    <Card>
      {blog.imageUrl && <CardMedia
        style={{ height: 200 }}
        image={blog.imageUrl}
        title="green iguana"
      />}
      {blog.videoUrl && <video
        src={blog.videoUrl}
        autoPlay
        controls={true}
        style={{ width: "100%", height: 200, objectFit: 'fill' }}
      />}
      {blog.gifUrl && <CardMedia
        style={{ height: 200 }}
        image={blog.gifUrl}
        title="green iguana"
      />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap >
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon color="error" />} />
          <TextField
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
