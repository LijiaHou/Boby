import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom'
import {globalRouters} from '@/router'
import '@/common/styles/frame.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={globalRouters} />
);
