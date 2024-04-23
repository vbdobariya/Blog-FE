import React, { useEffect, useState } from "react";
import AddBlogForm from "../Component/AddBlogForm";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { deleteBlog, getAllBlogs } from "../services/api";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";


const AdminPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allblogs, setAllBlogs] = useState([]);
  const [setName, setSetName] = useState("");
  const [singleData, setSingleData] = useState({});
  const history = useHistory();

  const AddModelOpen = () => {
    setIsFormOpen(true);
    setSetName("Add Blog");
  };

  const AddModelOpenClose = () => {
    setIsFormOpen(false);
    setSingleData({});
  };

  const EditModelOpen = (data) => {
    setSingleData(data);
    setIsFormOpen(true);
    setSetName("Edit Blog");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setAllBlogs(response);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const BlogPage = () => {
    history.push("/");
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Page</h1>
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={AddModelOpen}
              >
                ADD BLOG
              </Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image URL</TableCell>
                <TableCell>GIF URL</TableCell>
                <TableCell>Video URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allblogs.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography
                      style={{
                        maxWidth: 200,
                        wordBreak: "break-all",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        maxWidth: 200,
                        wordBreak: "break-all",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        maxWidth: 200,
                        wordBreak: "break-all",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {row.imageUrl ? row.imageUrl : "N/A"}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: 200,
                      wordBreak: "break-all",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {row.gifUrl ? row.gifUrl : "N/A"}
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: 200,
                      minWidth: 200,
                      wordBreak: "break-all",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {row.videoUrl ? row.videoUrl : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Box display={"flex"} flexDirection={"row"}>
                      <IconButton onClick={() => EditModelOpen(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleOnDelete(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ my: 2 }}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={BlogPage}
              >
                Blog List Page
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <AddBlogForm
        open={isFormOpen}
        handleClose={AddModelOpenClose}
        title={setName}
        onLoad={fetchBlogs}
        singleData={singleData}
      />

    </div>
  );
};

export default AdminPage;
