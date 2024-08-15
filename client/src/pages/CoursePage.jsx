import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import ReactPlayer from 'react-player'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../App.css';
import '../index.css';


function CoursePage() {
  const title = { "title": "Education Center"};
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseItems, setCourseItems] = useState([]);

  const dashboard = document.querySelector('.dashboard')
  dashboard.style.display = 'none';

  useEffect(() => {
    function getCourseDetails(){
      axios.get(`education/courses/${courseId}`)
      .then(response => {
        setCourse(response.data.course);
        setCourseItems(response.data.courseItems);
      });
    }

    getCourseDetails();
  }, [courseId])


  const playlist = courseItems.map(item => {
    return <Card key={item.id} className="mb-2" style={{ width: '20rem' }}>
              <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
              <Card.Body>
                <Card.Text>{item.position + 1}. {item.title}</Card.Text>
              </Card.Body>
            </Card>
    })

  const courseDetails = course.map(course => {
    return <Card key={course.id} className="course-details" style={{ width: '100%'}}>
        <Col className="course-info" md={8}>
          <Row className="player mb-4">
            <ReactPlayer url={course.url} width='100%' />
          </Row>
          <Row>
            <Card.Title>{course.title}</Card.Title>
            <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
            <Card.Text>Course items: {course.itemCount}</Card.Text>
            <Card.Text>{course.description}</Card.Text>
          </Row>
        </Col>
        <Col className="playlist mx-5" md={4}>
          <h4>Playlist items</h4>
          {playlist}
        </Col>           
      </Card>
    })


  return (
      <>
        {courseDetails}
      </>
  )
}

export default CoursePage