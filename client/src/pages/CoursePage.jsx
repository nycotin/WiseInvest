import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import ReactPlayer from 'react-player/lazy'

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import '../App.css';
import '../index.css';


function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseItems, setCourseItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [learningStatus, setLearningStatus] = useState('');
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    const dashboard = document.querySelector('.dashboard')
    dashboard.style.display = 'none';

    function getCourseDetails(){
      axios.get(`education/courses/${courseId}`)
      .then(response => {
        setCourse(response.data.course);
        setCourseItems(response.data.courseItems);
        setLearningStatus(response.data.status);
      });
    }

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

    getCourseDetails();
    getUserCourses();
    getUserFavs();
  }, [courseId])

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
        setLearningStatus(null);
      } else {
        setUserCourses([...userCourses, course]);
        setLearningStatus('Enrolled');
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

  function playVideo(pos){
    setCurrentItem(pos);
  }

  function editCourseStatus(){
    axios.put(`/education/courses/${courseId}/edit-status`)
    .then(response => {
      console.log(response.data.message)
      setLearningStatus(response.data.status)
    })
  }

  function createStatusButton(){
    if (learningStatus === 'Enrolled'){
      return (
        <Button variant="info" size="sm" onClick={editCourseStatus}>Start Course</Button>
      )
    } else if (learningStatus === 'In Progress'){
      return (
        <Button variant="success" size="sm" onClick={editCourseStatus}>Completed?</Button>
      )
    } else {
      return null
    }
  }

  function createBadge(){
    if (learningStatus === 'Enrolled'){
      return (
        <sub><Badge bg="secondary">{learningStatus}</Badge></sub>
      )
    } else if (learningStatus === 'In Progress'){
      return (
        <sub><Badge bg="primary">{learningStatus}</Badge></sub>
      )
    } else if (learningStatus === 'Completed'){
      return (
        <sub><Badge bg="success">{learningStatus}</Badge></sub>
      )
    } else {
      return null
    }
  }

  const playlist = courseItems.map(item => {
    if (item.position === currentItem){
      return <Card key={item.id} className="mb-2" style={{ width: '20rem', backgroundColor: 'lightgray' }} onClick={() => playVideo(item.position)}>
              <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
              <Card.Body>
                <Card.Text>{item.position + 1}. {item.title}</Card.Text>
              </Card.Body>
            </Card>
    } else {
      return <Card key={item.id} className="mb-2" style={{ width: '20rem', backgroundColor: 'white' }} onClick={() => playVideo(item.position)}>
                <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
                <Card.Body>
                  <Card.Text>{item.position + 1}. {item.title}</Card.Text>
                </Card.Body>
              </Card>
      }
    })
  
  const courseDetails = course.map(course => {
    return <Card key={courseId} className="course-details" style={{ width: '100%'}} md={8}>
          <Card.Title>{course.title}
            { createBadge() !== null ? createBadge() : null }
          </Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Subtitle>Course items: {course.itemCount}</Card.Subtitle>
          <Card.Subtitle className="mt-2">
            <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}>
              { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
            </Button>
            <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}>
              { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
            </Button>
          </Card.Subtitle>
          <Card.Text>{course.description}</Card.Text>
          <Card.Subtitle>
            { createStatusButton() !== null ? createStatusButton() : null }
          </Card.Subtitle>
      </Card>
  })
  
  const item = courseItems.filter(i => i.position === currentItem);
  console.log(item)

  const itemDetails = item.map(item => {
    const { playlistId } = course[0];
    const { id, title, itemId, description } = item;
    let url = `https://www.youtube.com/watch?v=${itemId}`;

    return <Col key={id} className="item" md={8}>
      <Row className="player mb-4">
        <ReactPlayer url={url} width='100%' />
      </Row>
      <Row>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Row>
    </Col>
  })

  return (
      <Card key={courseId} className="course" style={{ width: '100%'}}>
        <Col>
          <Row>
            <Col className="course-details" style={{ width: '100%'}}>
              {courseDetails}
            </Col>
          </Row>
          <Row className="item-details">
            {itemDetails}
            <Col className="playlist ml-1" md={4}>
              <h4>Playlist items</h4>
              {playlist}
            </Col>
          </Row>
       </Col>          
      </Card>
  )
}

export default CoursePage