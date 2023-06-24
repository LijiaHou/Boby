import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom'
import {globalRouters} from '@/router'
import '@/common/styles/frame.scss'
import {store} from '@/store'
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={globalRouters} />
  </Provider>
);
