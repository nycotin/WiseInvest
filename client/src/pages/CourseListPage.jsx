import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

import Card from 'react-bootstrap/Card';
import '../App.css';
import '../index.css';
import NavBar from '../components/NavBar';


function CourseListPage() {
  const title = { "title": "Education Center"};
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
    return <Card key={course.id} className="mb-4" style={{ width: '50rem' }}>
              <Card.Img variant="top" src={course.cover}/>
              <Card.Body>
                <Card.Title onClick={() => navigate(`/education/courses/${course.id}`)}>{course.title}</Card.Title>
                <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
                <Card.Text>Course items: {course.itemCount}</Card.Text>
              </Card.Body>
            </Card>
    })
  

  return (
    <>
      <NavBar { ...title } />
      <div className="course-list">
          <h2>Browse Courses</h2>
          {courseList}
      </div>
    </>
  )
}

export default CourseListPage