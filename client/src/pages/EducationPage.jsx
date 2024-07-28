import { Outlet } from "react-router-dom";

import '../App.css';

function EducationPage () {
    return (
    <>
        <h1>Education Center</h1>
        <div id="container">
          <Outlet />
        </div>
    </>
  )
}

export default EducationPage