import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { getSessionId } from './utils/functions';

import App from './App.jsx';
import CourseListPage from './pages/education/CourseListPage.jsx';
import CoursePage from './pages/education/CoursePage.jsx';
import EducationPage from './pages/education/EducationPage.jsx';
import EntryPage from './pages/EntryPage.jsx';
import ErrorPage from './pages/ErrorPage';
import ForkPage from './pages/ForkPage.jsx';
import InvestPage from './pages/invest/InvestPage.jsx';
import LoginPage from './pages/users/LoginPage.jsx';
import PortfolioPage from './pages/invest/PortfolioPage.jsx';
import RegisterPage from './pages/users/RegisterPage.jsx';
import StockListPage from './pages/invest/StockListPage.jsx';
import UserProfile from './components/users/UserProfile.jsx';

import './styles/index.css';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
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
          element={getSessionId() !== '' ? <ForkPage /> : <Navigate to='/login' />}
          path='/fork'
          errorElement={<ErrorPage />} 
        />
          <Route
            element={getSessionId() !== '' ? <EducationPage /> : <Navigate to='/login' />}
            path='/education'
            errorElement={<ErrorPage />}
          >
            <Route
              element={<CourseListPage pageTitle={'Browse Courses'} />}
              path='/education/courses'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<CourseListPage pageTitle={'Favorites'} />}
              path='/education/courses/favorites'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<CourseListPage pageTitle={'Learning'} />}
              path='/education/courses/learning'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<CoursePage />}
              path='/education/courses/:courseId'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<UserProfile />}
              path='/education/userprofile/:userId'
              errorElement={<ErrorPage />}
            />
          </Route>
          <Route
            element={getSessionId() !== '' ? <InvestPage /> : <Navigate to='/login' />}
            path='/invest'
            errorElement={<ErrorPage />}
            >
            <Route
              element={<StockListPage />}
              path='/invest/stocks'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<PortfolioPage />}
              path='/invest/portfolio'
              errorElement={<ErrorPage />}
            />
            <Route
              element={<UserProfile />}
              path='/invest/userprofile/:userId'
              errorElement={<ErrorPage />}
            />
          </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);