import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import '../index.css';


function CourseListPage() {
  const title = { "title": "Education Center"};
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const dashboard = document.querySelector('.dashboard')
  dashboard.style.display = 'none';

  useEffect(() => {  
    function getCourses(){
      axios.get('/education/courses')
      .then(response => {
        setCourses(response.data.courses);
      });
    }

    getCourses();
  }, [])


  const courseList = courses.map(course => {
    return <Col key={courses.indexOf(course)}>
            <Card key={course.id} className="mb-4" style={{ width: '20rem', height: '28rem'}}>
              <Card.Img variant="top" src={course.cover}/>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
                <Card.Text>Course items: {course.itemCount}</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/education/courses/${course.id}`)}>Open Course</Button>
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