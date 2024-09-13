import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import ReactPlayer from 'react-player'

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import '../App.css';
import '../index.css';


function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseItems, setCourseItems] = useState([]);
  const [currentItem, setCurrentItems] = useState(0);
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

  const playlist = courseItems.map(item => {
    return <Card key={item.id} className="mb-2" style={{ width: '20rem' }}>
              <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
              <Card.Body>
                <Card.Text>{item.position + 1}. {item.title}</Card.Text>
              </Card.Body>
            </Card>
    })

  const courseDetails = course.map(course => {
      return <Card key={courseId} className="course-details" style={{ width: '100%'}}md={8}>
          <Card.Title>{course.title}</Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Subtitle className="mt-2">
            <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}>
              { isFav(course) ? 'Remove from Favorites' : 'Add to favorites' }
            </Button>
            <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}>
              { isEnrolled(course) ? 'Unenroll' : 'Enroll' }
            </Button>
          </Card.Subtitle>
          <Card.Text>Course items: {course.itemCount}</Card.Text>
          <Card.Text>{course.description}</Card.Text>
      </Card>
  })

  console.log(course[0])
  
  const item = courseItems.filter(i => i.position === currentItem);
  console.log(item[0])
  const playlistId = course[0].playlistId;
  const { id, title, itemId, description, position } = item[0];
  const url = `https://www.youtube.com/watch?v=${itemId}&list=${playlistId}&index=${position}`

  const itemDetails = item.map(() => {

    return <Col key={id} md={8}>
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
            <Col className="playlist mx-5" md={4}>
              <h4>Playlist items</h4>
              {playlist}
            </Col>
          </Row>
       </Col>          
      </Card>
  )
}

export default CoursePage