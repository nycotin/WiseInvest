import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar"
import Dashboard from "../components/education/Dashboard"

import '../App.css';
import '../index.css';


function EducationPage() {
  const title = { "title": "Education Center" };

  return (
    <>
        <NavBar { ...title } />
        <Dashboard />
        <Outlet />
    </>
  )
  
}

export default EducationPage