import NavBar from "../components/NavBar"

import '../App.css';
import '../index.css';
import { Outlet } from "react-router-dom";

function EducationPage() {
  const title = { "title": "Education Center"}

  return (
    <>
        <NavBar { ...title } />
        <Outlet />
    </>
  )
}

export default EducationPage