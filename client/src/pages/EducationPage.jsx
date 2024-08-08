import NavBar from "../components/NavBar"
import Dashboard from "../components/education/Dashboard"

import '../App.css';
import '../index.css';
import { Outlet } from "react-router-dom";

function EducationPage() {
  const title = { "title": "Education Center"}

  return (
    <>
        <NavBar { ...title } />
        <Dashboard />
        <Outlet />
    </>
  )
}

export default EducationPage