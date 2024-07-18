import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EntryPage from './pages/EntryPage.jsx';
import ForkPage from './pages/ForkPage.jsx';
import EducationPage from './pages/EducationPage.jsx';
import InvestPage from './pages/InvestPage.jsx';

const router = createBrowserRouter([
  { path: "/", element: <EntryPage />, },
  { path: "/login", element: <LoginPage />, },
  { path: "/register", element: <RegisterPage />, },
  { path: "/fork", element: <ForkPage />, },
  { path: "/education", element: <EducationPage />, },
  { path: "/invest", element: <InvestPage />, }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
