import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

import NavBar from '../../components/NavBar';
import Dashboard from '../../components/education/Dashboard';

import '../../styles/index.css';
import '../../styles/educate.css';

function EducationPage() {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  const location = useLocation().pathname;

  useEffect(() => {  
    function getUserCourses(){
        axios.get('/education/courses/learning')
        .then(response => {
          if(response.data.userLearning){
            setUserCourses(response.data.userLearning);
          } else {
            setUserCourses([]);
          }
        });
      }

    function getUserFavs(){
      axios.get('/education/courses/favorites')
      .then(response => {
        if(response.data.userFavs){
          setUserFavs(response.data.userFavs);
        } else {
          setUserCourses([]);
        }
      });
    }

    function getCourses(){
      axios.get('/education/courses')
      .then(response => {
        setCourses(response.data.courses);
      });
    }

    getUserCourses();
    getUserFavs();
    getCourses();
  }, [])

  return (
    <>
        <NavBar title='Education Center' />
        { location === '/education' ? <Dashboard userCourses={userCourses} userFavs={userFavs} /> : null }
        { location === '/education/' ? <Dashboard userCourses={userCourses} userFavs={userFavs} /> : null }
        <Outlet context={[ courses, userCourses, setUserCourses, userFavs, setUserFavs ]} />
    </>
  )
}

export default EducationPage;