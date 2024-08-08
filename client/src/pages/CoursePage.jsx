import '../App.css';
import '../index.css';

import { Outlet } from "react-router-dom";

function CoursePage() {

  return (
    <>
        <div className="course-list">
            <h2>Course Page</h2>
            <Outlet />
        </div>
    </>
  )
}

export default CoursePage