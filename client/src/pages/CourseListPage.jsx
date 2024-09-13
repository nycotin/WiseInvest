import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import '../index.css';


function CourseListPage({ page }) {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'none';

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
        setUserCourses(userCourses.filter(i => i.id !== course.id));
      } else {
        course.status = "Enrolled";
        setUserCourses([...userCourses, course]);
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
    const enrolled = userCourses.find(c => { return c.id === course.id })

    if(enrolled){
      return true;
    } else {
      return false;
    }
  }

  let courseList = []

  if(page === 'browse-courses'){
    courseList = courses.map(course => {
        return <Col key={courses.indexOf(course)}>
          <Card key={course.id} className="mb-4" style={{ width: '20rem', height: '28rem'}}>
            <Card.Img variant="top" src={course.cover}/>
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
              <Card.Text>Course items: {course.itemCount}</Card.Text>
              <Button variant="primary" size="sm" onClick={() => navigate(`/education/courses/${course.id}`)}>Open Course</Button>
              <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}>
                { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
              </Button>
              <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}>
                { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
              </Button>
            </Card.Body>
          </Card>
        </Col>
    })
  } else if (page === 'favorites'){
    courseList = userFavs.map(course => {
        return <Col key={userFavs.indexOf(course)}>
          <Card key={course.id} className="mb-4" style={{ width: '20rem', height: '28rem'}}>
          <Card.Img variant="top" src={course.cover}/>
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
              <Card.Text>Course items: {course.itemCount}</Card.Text>
              <Button variant="primary" size="sm" onClick={() => navigate(`/education/courses/${course.id}`)}>Open Course</Button>
              <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}>
                { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
              </Button>
              <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}>
                { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
              </Button>
            </Card.Body>
          </Card>
        </Col>     
    })
  } else {
    courseList = userCourses.map(course => {
      return <Col key={userCourses.indexOf(course)}>
        <Card key={course.id} className="mb-4" style={{ width: '20rem', height: '28rem'}}>
          <Card.Img variant="top" src={course.cover}/>
          <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Text>Course items: {course.itemCount}</Card.Text>
          <Button variant="primary" size="sm" onClick={() => navigate(`/education/courses/${course.id}`)}>Open Course</Button>
          <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}>
            { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
          </Button>
          <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}>
            { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
          </Button>
          </Card.Body>
        </Card>
      </Col>
    })
  }

  return (
    <Container className="course-list" fluid="md">
        <Row>
          {courseList}
        </Row>
    </Container>
  )
}

export default CourseListPage

CourseListPage.propTypes = {
  page: PropTypes.string.isRequired
};