import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import Card from 'react-bootstrap/Card';

import '../App.css';
import '../index.css';
import NavBar from '../components/NavBar';


function CoursePage() {
  const title = { "title": "Education Center"};

  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseItems, setCourseItems] = useState([]);

  const dashboard = document.querySelector('.dashboard')
  dashboard.style.display = 'none';

  useEffect(() => {
    function getCourse(){
      axios.get(`education/courses/${courseId}`)
      .then(response => {
        setCourse(response.data.course);
        setCourseItems(response.data.courseItems);
      });
    }

    getCourse();
  }, [courseId])


  const courseDetails = course.map(course => {
    return <Card key={course.id} className="mb-4" style={{ width: '50rem' }}>
              <Card.Img variant="top" src={course.cover}/>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
                <Card.Text>Course items: {course.itemCount}</Card.Text>
                {course.player}
              </Card.Body>
            </Card>
    })


  const playlist = courseItems.map(item => {
    return <Card key={item.id} className="mb-4" style={{ width: '50rem' }}>
              <Card.Img variant="top" src={item.thumbnail}/>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>Item description: {item.description}</Card.Text>
              </Card.Body>
            </Card>
    })


  return (
    <>
      <NavBar { ...title } />
      <div className="course-details">
          <h2>Course Details</h2>
          <div className="player">
            {courseDetails}
          </div>
          <div className="playlist">
            <h4>Playlist items</h4>
            {playlist}
          </div>
      </div>
    </>
  )
}

export default CoursePage