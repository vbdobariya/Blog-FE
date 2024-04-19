import React from "react";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { Toaster } from "react-hot-toast";
import routes from './routes';

const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Router history={history}>
        {renderRoutes(routes)}
      </Router>
      <Toaster />
    </div >
  );
}

export default App;
