import React from 'react';
import { createBrowserRouter, Navigate} from 'react-router-dom'
import Login from '@/pages/login';
import Home from '@/pages/home';
import Entry from '@/pages/entry';
import Account from '@/pages/account';
import Practice from '@/pages/practice';

export const globalRouters = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  
  {
    path: '/',
    element: (<Entry />),
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/account',
        element: <Account />,
      },
      {
        path: '/practice',
        element: <Practice />,
      },
      // URL没有具体路径，跳转home
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <Navigate to="/login" />,
      },
    ]
  },
  
])
