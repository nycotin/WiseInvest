import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './index.css'

import App from './App.jsx';
import EntryPage from './pages/EntryPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage.jsx';
import ForkPage from './pages/ForkPage.jsx';
import EducationPage from './pages/EducationPage.jsx';
import InvestPage from './pages/InvestPage.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
      errorElement={<ErrorPage />} 
    >
      <Route
        path='/'
        element={<EntryPage />}
        errorElement={<ErrorPage />} 
      />
      <Route
        path='/login'
        element={<LoginPage />}
        errorElement={<ErrorPage />} 
      />
      <Route
        element={<RegisterPage />}
        path='/register'
        errorElement={<ErrorPage />} 
      />
        <Route
          element={<ForkPage />}
          path='/fork'
          errorElement={<ErrorPage />} 
        />
          <Route
              element={<EducationPage />}
              path='/education'
              errorElement={<ErrorPage />} 
            />
          <Route
            element={<InvestPage />}
            path='/invest'
            errorElement={<ErrorPage />} 
          />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
