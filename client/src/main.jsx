import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EntryPage from './pages/EntryPage.jsx';

const router = createBrowserRouter([
  { path: "/", element: <EntryPage />, },
  { path: "/login", element: <LoginPage />, },
  { path: "/register", element: <RegisterPage />, },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
