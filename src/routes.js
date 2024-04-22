/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from './layouts/Auth';
import RequireAuthAdmin from './RequireAuthAdmin';

const routes = [
  {
    path: '/admin',
    exact: true,
    component: () => <Redirect to="/admin/login" />
  },
  {
    path: '/',
    component: AuthLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./page/HomePage'))
      },
      {
        path: '/admin/login',
        exact: true,
        component: lazy(() => import('./page/LoginPage'))
      },
      {
        path: '/login',
        exact: true,
        component: lazy(() => import('./page/LoginPage'))
      },
      {
        path: '/register',
        exact: true,
        component: lazy(() => import('./page/LoginPage'))
      },
      {
        path: '/admin/dashboard',
        exact: true,
        component: RequireAuthAdmin(lazy(() => import('./page/AdminPage')))
      },
      {
        path: '/blog/:id',
        exact: true,
        component: RequireAuthAdmin(lazy(() => import('./page/BlogPage')))
      }
    ]
  },
];

export default routes;
