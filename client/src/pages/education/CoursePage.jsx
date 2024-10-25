import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

import BackToDashboardButton from '../../components/BackToDashboardButton';
import BackToCourseButton from '../../components/education/BackToCourseButton';
import PlaylistItem from '../../components/education/PlaylistItem';
import CourseDetails from '../../components/education/CourseDetails';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

import ReactPlayer from 'react-player/lazy';

import '../../styles/index.css';
import '../../styles/educate.css';

function CoursePage() {
  const { courseId } = useParams();
  const [, userCourses, setUserCourses, userFavs, setUserFavs ] = useOutletContext();
  const [course, setCourse] = useState({});
  const [courseItems, setCourseItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [learningStatus, setLearningStatus] = useState('');
 
  useEffect(() => {
    function getCourseDetails(){
      axios.get(`education/courses/${courseId}`)
      .then(response => {
        setCourse(response.data.course);
        setCourseItems(response.data.courseItems);
        setLearningStatus(response.data.status);
      });
    }

    getCourseDetails();
  }, [courseId])

  return (
    <Container id="course-page">
      <Container>
        <BackToCourseButton />
        <BackToDashboardButton app='education' />
      </Container>
      <Card className="course">
        <Col>
          <Row>
            <Col className="course-details">
              <CourseDetails course={course} userFavs={userFavs} setUserFavs={setUserFavs} userCourses={userCourses} setUserCourses={setUserCourses} learningStatus={learningStatus} setLearningStatus={setLearningStatus} />
            </Col>
          </Row>
          <Row className="item-details">
            <Col className="item" md={8}>
              { courseItems.filter(i => i.position === currentItem).map(item => { 
                return (
                  <>
                    <Row key={item.itemId} className="player mb-4">
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${item.itemId}`} width='100%' />
                    </Row>
                    <Row>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Row>
                  </>
                )
              })}
            </Col>
            <Col className="playlist">
              <h4>Playlist items</h4>
              { courseItems.map(i => <PlaylistItem key={i.id} item={i} currentItem={currentItem} setCurrentItem={setCurrentItem} />) }
            </Col>
          </Row>
       </Col>          
      </Card>
    </Container>
  )
}

export default CoursePage;