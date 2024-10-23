import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';

import BackToDashboardButton from '../../components/BackToDashboardButton';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { BsBookmark, BsBookmarkFill, BsClipboard2, BsClipboard2Fill } from 'react-icons/bs';

import '../../styles/index.css';
import '../../styles/educate.css';

function CourseListPage({ page }) {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  const title = `${page[0].toUpperCase()}${page.substring(1)}`
  const formatTitle = title.replace('-', ' ')

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
      if (response.data.action === 'Remove') {
        setUserFavs(userFavs.filter(i => i.id !== course.id));
      } else {
        setUserFavs([...userFavs, course]);
      }
    });
  }

  function toggleEnroll(course){
    axios.post(`/education/courses/${course.id}/toggle-enroll`)
    .then(response => {   
      if (response.data.action === 'Remove') {
        setUserCourses(userCourses.filter(i => i.id !== course.id));
      } else {
        course.status = "Enrolled";
        setUserCourses([...userCourses, course]);
      }
    });
  }

  function isFav(course){
    const fav = userFavs.find(f => { return f.id === course.id })
    if (fav) {
      return true;
    } else {
      return false;
    }
  }

  function isEnrolled(course){
    const enrolled = userCourses.find(c => { return c.id === course.id })
    if (enrolled) {
      return true;
    } else {
      return false;
    }
  }

  function HandleCardClick(e, course){
    
    try {
      const target = e.target
      const targetAttribute = target.getAttribute('class')

      if (targetAttribute.startsWith("card")) {
        console.log('Card was clicked');
        navigate(`/education/courses/${course.id}`);
      }

      return;
    } catch (e) {
      console.log('Button was clicked');
    }
  }

  let courseList = []

  if (page === 'browse-courses') {
    courseList = courses.map(course => {
      return <Card key={course.id} className="m-3" onClick={(e) => HandleCardClick(e, course)}>
        <Card.Img variant="top" src={course.cover}/>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Text>Course items: {course.itemCount}</Card.Text>
          { isFav(course) ? <Button variant="danger" size="sm" onClick={() => toggleFavorite(course)}><BsBookmarkFill /></Button> : <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}><BsBookmark /></Button> }
          { isEnrolled(course) ? <Button variant="success" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2Fill /></Button> : <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2 /></Button> }
        </Card.Body>
      </Card>
    })
  } else if (page === 'favorites'){
    courseList = userFavs.map(course => {
      return <Card key={course.id} className="m-3" onClick={() => navigate(`/education/courses/${course.id}`)}>
        <Card.Img variant="top" src={course.cover}/>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Text>Course items: {course.itemCount}</Card.Text>
          { isFav(course) ? <Button variant="danger" size="sm" onClick={() => toggleFavorite(course)}><BsBookmarkFill /></Button> : <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}><BsBookmark /></Button> }
          { isEnrolled(course) ? <Button variant="success" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2Fill /></Button> : <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2 /></Button> }
        </Card.Body>
      </Card>    
    })
  } else {
    courseList = userCourses.map(course => {
      return <Card key={course.id} className="m-3" onClick={() => navigate(`/education/courses/${course.id}`)}>
        <Card.Img variant="top" src={course.cover}/>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
          <Card.Text>Course items: {course.itemCount}</Card.Text>
          { isFav(course) ? <Button variant="danger" size="sm" onClick={() => toggleFavorite(course)}><BsBookmarkFill /></Button> : <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}><BsBookmark /></Button> }
          { isEnrolled(course) ? <Button variant="success" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2Fill /></Button> : <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2 /></Button> }
        </Card.Body>
      </Card>
    })
  }

  return (
    <Container className="course-list" fluid="md">
      <h2>{ formatTitle }</h2>
        <BackToDashboardButton app='education' />
        <Container id="course-cards">
          { courseList.length !== 0 ? courseList : <Container>No courses.</Container> }
        </Container>
    </Container>
  )
}

export default CourseListPage;

CourseListPage.propTypes = {
  page: PropTypes.string.isRequired
};