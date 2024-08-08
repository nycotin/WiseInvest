import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import '../../.env';
// import { UserContext } from '../../contexts/UserContext';

import '../App.css';
import '../index.css';

import { Outlet } from "react-router-dom";

function CourseListPage() {

  // useEffect(){
  //   axios.get()
  //   .then(response => console.log(response))
  // }

  return (



    <>
        <div className="course-list">
            <h2>Browse Courses</h2>
            <Outlet />
        </div>
    </>
  )
}

export default CourseListPage