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

  function toggleFavorite(course){
    axios.post(`/education/courses/${course.id}/toggle-favorite`)
    .then(response => {
      console.log(response.data.message);

      if(response.data.action === 'Remove'){
        setUserFavs(userFavs.filter(i => i.id !== course.id));
      } else {
        setUserFavs([...userFavs, course]);
      }
    });
  }

  function toggleEnroll(course){
    axios.post(`/education/courses/${course.id}/toggle-enroll`)
    .then(response => {
      console.log(response.data.message);
      
      if(response.data.action === 'Remove'){
        setUserCourses(userCourses.filter(i => i.enrolled_course !== course.id));
      } else {
        setUserCourses([...userCourses, {"enrolled_course": course.id, "status": "Enrolled"}]);
      }
    });
  }


function isFav(course){
  const fav = userFavs.find(f => { return f.id === course.id })

  if(fav){
    return true;
  } else {
    return false;
  }
}

function isEnrolled(course){
  const enrolled = userCourses.find(c => { return c.enrolled_course === course.id })

  if(enrolled){
    return true;
  } else {
    return false;
  }
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
                  { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
                </Button>
                <Button variant="warning" onClick={() => toggleEnroll(course)}>
                  { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
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