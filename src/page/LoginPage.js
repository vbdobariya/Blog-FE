import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  styled,
  Box,
  Grid,
  Card,
  Container,
} from "@material-ui/core";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .main-container": {
    height: "100vh",
  },
  "& .card-contant": {
    padding: 15,
  },
  "& .main-title": {
    textAlign: "center",
  },
  "& .error": {
    color: "red",
  },
});

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blog-be-woad.vercel.app/api/admin/login", {
        username,
        password,
      });
      if (response.data.status) {
        toast.success("Login Successfully");
        localStorage.setItem("authtoken", response.data.token);
        navigate("/admin/dashboard");
      } else {
        toast.error("Login Faild");
      }
    } catch (error) {
      toast.error("Login Faild");
    }
  };

  return (
    <Box className="main-container">
      <MainContainer maxWidth="xs">
        <form onSubmit={handleLogin}>
          <Card className="card-contant">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h3" className="main-title">
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>
      </MainContainer>
    </Box>
  );
};

export default LoginPage;
