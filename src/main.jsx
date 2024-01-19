import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import MyRouts from './MyRouts/MyRouts.jsx';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <HelmetProvider>

     <RouterProvider router={MyRouts} />
    </HelmetProvider>
  </React.StrictMode>
  </QueryClientProvider>,
)
