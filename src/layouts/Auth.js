import React, { Fragment, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  content: {
    height: '100%'
  }
}));

const Auth = props => {
  const { route } = props;

  const classes = useStyles();

  return (
    <Fragment>
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </Fragment>
  );
};

export default Auth;
