import React from "react";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { Toaster } from "react-hot-toast";
import routes from './routes';
import { ThemeProvider, createTheme } from "@material-ui/core";

const history = createBrowserHistory();
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

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
        <Toaster />
      </ThemeProvider>
    </div >
  );
}

export default App;
