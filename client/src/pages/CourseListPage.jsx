import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import axios from '../axiosConfig';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import '../index.css';


function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  const dashboard = document.querySelector('.dashboard')
  dashboard.style.display = 'none';

  useEffect(() => {  
    function getUserCourses(){
      axios.get(`/education/courses/user-${userId}`)
      .then(response => {
        setUserCourses(response.data.userCourses);
        setUserFavs(response.data.userFavs);
        // console.log(response.data);
      });
    }

    getUserCourses();
  }, [userId])

  useEffect(() => {  
    function getCourses(){
      axios.get('/education/courses')
      .then(response => {
        setCourses(response.data.courses);
      });
    }

    getCourses();
  }, [])

  // console.log(userCourses)
  // console.log(userFavs)

  function toggleFavorite(course){
    axios.post(`/education/courses/${course.id}/toggle-favorite`)
    .then(response => {
      console.log(response.data.message)
      // Modify userFavs to re-render component

      if(course.id == i.id){
        setUserFavs(oldUserFavs => {
          return oldUserFavs.filter(f => f.favorite_course_id !== course.id);
        })
        console.log(userFavs)
      } else {
        setUserCourses(oldUserFavs => [...oldUserFavs, course]);
        console.log(userFavs)
      }
      
    })
  }

  function toggleEnroll(course){
    axios.post(`/education/courses/${course.id}/toggle-enroll`)
    .then(response => {
      console.log(response.data.message)
      // Modify userCourses to re-render component
      if(course.id === i.enrolled_course_id){
        setUserCourses(oldUserCourses => {
          return oldUserCourses.filter(f => f.enrolled_course_id !== course.id);
        })
        console.log(userCourses)
      } else {
        setUserCourses(oldUserCourses => [...oldUserCourses, course]);
        console.log(userCourses)
      }
      
    })
  }


  const courseList = courses.map(course => {
    return <Col key={courses.indexOf(course)}>
            <Card key={course.id} className="mb-4" style={{ width: '20rem', height: '28rem'}}>
              <Card.Img variant="top" src={course.cover}/>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
                <Card.Text>Course items: {course.itemCount}</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/education/courses/${course.id}`)}>Open Course</Button>
                <Button variant="secondary" onClick={() => toggleFavorite(course)}>
                  { course.id in userFavs ? 'Add to Favorites' : 'Remove from Favorites' }
                </Button>
                <Button variant="warning" onClick={() => toggleEnroll(course)}>
                  { course.id in userCourses ? 'Unenroll' : 'Enroll' }
                </Button>
              </Card.Body>
            </Card>
          </Col>     
  })
  

  return (
    <Container className="course-list" fluid="md">
      <h3>Browse Courses</h3>
        <Row>
          {courseList}
        </Row>
    </Container>
  )
}

export default CourseListPage