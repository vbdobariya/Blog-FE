import React, { useEffect, useState } from "react";
import { createBlog, updateBlog } from "../services/api";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const AddBlogForm = (props) => {
  const { open, handleClose, title, onLoad, singleData } = props;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    gifUrl: "",
  });

  const [selectValue, setSelectValue] = useState('image');


  useEffect(() => {
    setFormData({
      title: singleData.title,
      description: singleData.description,
      imageUrl: singleData.imageUrl,
      videoUrl: singleData.videoUrl,
      gifUrl: singleData.gifUrl,
    });
    if (singleData.videoUrl) {
      setSelectValue("video")
    }
    if (singleData.imageUrl) {
      setSelectValue("image")
    }
    if (singleData.gifUrl) {
      setSelectValue("gif")
    }
  }, [singleData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCancle = () => {
    handleClose();
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      videoUrl: "",
      gifUrl: "",
    });
    setSelectValue('image')
  };

  const handleChangeField = (event) => {
    setSelectValue(event.target.value);
    setFormData((props) => ({
      ...props,
      imageUrl: "",
      videoUrl: "",
      gifUrl: "",
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title === "Add Blog") {
        await createBlog(formData);
        handleClose();
        onLoad();
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          videoUrl: "",
          gifUrl: "",
        });
        setSelectValue('image')
      }

      if (title === "Edit Blog") {
        await updateBlog(singleData._id, formData);
        handleClose();
        onLoad();
        setFormData({
          title: "",
          description: "",
          imageUrl: "",
          videoUrl: "",
          gifUrl: "",
        });
        setSelectValue('image')
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component={"form"} onSubmit={handleSubmit}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Field</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
                  label="Select Field"
                  fullWidth
                  onChange={handleChangeField}
                >
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="gif">gif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {selectValue === "image" && <Grid item xs={12}>
              <TextField
                label="Image Url"
                name="imageUrl"
                fullWidth
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </Grid>}
            {selectValue === "video" && <Grid item xs={12}>
              <TextField
                label="Video URL"
                name="videoUrl"
                fullWidth
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </Grid>}
            {selectValue === "gif" && <Grid item xs={12}>
              <TextField
                name="gifUrl"
                label="GIF URL"
                fullWidth
                value={formData.gifUrl}
                onChange={handleChange}
              />
            </Grid>}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancle}>Cancel</Button>
          <Button variant="contained" color="primary" type="submit">
            {title === "Add Blog" ? "ADD" : "EDIT"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddBlogForm;
