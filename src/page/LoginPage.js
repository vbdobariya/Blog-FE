import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  styled,
  Box,
  Grid,
  Card,
  Container,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import toast from "react-hot-toast";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import bgImg from "../image/bgImg.jpg"
import logo from "../image/blog_logo.png"
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const MainContainer = styled(Container)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .card-contant": {
    padding: 15,
    border: "2px solid #445045",
    borderRadius: 10
  },
  "& .main-title": {
    textAlign: "center",
  },
  "& .error": {
    color: "red",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Poppins"
  },
  palette: {
    primary: {
      main: "#445045",
    }
  },
});

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [visble, setVisible] = useState(false)
  const history = useHistory();
  const location = useLocation();
  const localData = JSON.parse(localStorage.getItem("rememberMe"))

  useEffect(() => {
    if (location.pathname !== "/admin/login") {
      if (localData?.checked) {
        setChecked(localData?.checked)
        setUsername(localData?.username)
        setPassword(localData?.password)
      }
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/admin/login`, {
        username,
        password,
      });
      if (response.data.status) {
        toast.success(response.data.message);
        localStorage.setItem("authtoken", response.data.token);
        history.push("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Login Faild");
    }
  };

  const handleRegister = async () => {
    if (location.pathname === "/register") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}api/register`, {
          username,
          password,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          history.push("/login");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Register Faild");
      }
    } else {
      history.push("/register")
    }

  }
  const handleLoginUser = async () => {
    if (location.pathname === "/login") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}api/user/login`, {
          username,
          password,
        });
        console.log('response', response)
        if (response.data.status) {
          onClickRemember()
          localStorage.setItem("authtoken", response.data.token);
          toast.success(response.data.message);
          history.push("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Login Faild");
      }
    } else {
      history.push("/login")
    }
  }

  const onCallApiEnter = (e) => {
    e.preventDefault();
    if (location.pathname === "/admin/login") {
      handleLogin()
    }

    if (location.pathname === "/login") {
      handleLoginUser()
    }

    if (location.pathname === "/register") {
      handleRegister()
    }
  }

  const handleClickShowPassword = () => {
    setVisible(!visble);
  };

  const onClickRemember = () => {
    const data = { username, password, checked }
    if (checked) {
      localStorage.setItem("rememberMe", JSON.stringify(data))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}>
        <MainContainer maxWidth="xs">
          <form onSubmit={onCallApiEnter}>
            <Card className="card-contant">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" className="main-title"
                    style={{
                      display: "flex",
                      flexDirection: "column-reverse",
                      alignItems: "center",
                      fontWeight: 600,
                      color: "#445045"
                    }}>
                    {location.pathname === "/register" ? "Sign Up" : "Sign In"}
                    <img src={logo} style={{ height: 40 }} alt="logo"/>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type={visble ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        < InputAdornment position="end" >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {visble ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                {(location.pathname === "/login") && <Grid item xs={12}>
                  <FormControlLabel
                    style={{ width: "100%" }}
                    control={
                      <Checkbox
                        checked={checked}
                        name="checkedB"
                        color="primary"
                        onChange={(event) => setChecked(event.target.checked)}
                      />
                    }
                    label={<Typography> Remember Me</Typography>}
                  />
                </Grid>}
                {location.pathname === "/admin/login" && <Grid item xs={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                </Grid>}
                {(location.pathname === "/register") &&
                  <>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => history.push("/login")}
                      >
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Register
                      </Button>
                    </Grid>
                  </>
                }
                {(location.pathname === "/login") &&
                  <>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        onClick={() => history.push("/register")}
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Register
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
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
                  </>
                }
              </Grid>
            </Card>
          </form>
        </MainContainer>
      </Box>
    </ThemeProvider >
  );
};

export default LoginPage;
