import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';

import BackToDashboardButton from '../../components/BackToDashboardButton';
import ToggleFavButton from '../../components/education/ToggleFavButton';
import ToggleEnrollButton from '../../components/education/ToggleEnrollButton';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import '../../styles/index.css';
import '../../styles/education.css';

function CourseListPage({ pageTitle }) {
  const [ courses, userCourses, setUserCourses, userFavs, setUserFavs ] = useOutletContext();
  const [ filteredCourses, setFilteredCourses ] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (pageTitle === 'Browse Courses') {
      setFilteredCourses(courses);
    } else if (pageTitle === 'Favorites') {
      setFilteredCourses(userFavs);
    } else {
      setFilteredCourses(userCourses);
    }
  }, [ pageTitle, courses, userCourses, userFavs ])

  function HandleCardClick(e, course){
    try {
      const target = e.target;
      const targetAttribute = target.getAttribute('class');

      if (targetAttribute.startsWith("card")) {
        navigate(`/education/courses/${course.id}`);
      }

      return;
    } catch (error) {
      console.log('Button was clicked.');
    }
  }

  return (
    <Container className="course-list" fluid="md">
      <h2>{ pageTitle }</h2>
        <BackToDashboardButton app='education' />
        <Container id="course-cards">
          { filteredCourses.length !== 0 ? 
            filteredCourses.map(course => {
              return <Card key={course.id} className="m-3" onClick={(e) => HandleCardClick(e, course)}>
                <Card.Img variant="top" src={course.cover}/>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle>By {course.createdBy}</Card.Subtitle>
                  <Card.Text>Course items: {course.itemCount}</Card.Text>
                    <ToggleFavButton course={course} userFavs={userFavs} setUserFavs={setUserFavs} />
                    <ToggleEnrollButton course={course} userCourses={userCourses} setUserCourses={setUserCourses} />
                </Card.Body>
              </Card>
            }) : 
          <Container>No courses.</Container> }
        </Container>
    </Container>
  )
}

export default CourseListPage;

CourseListPage.propTypes = {
  pageTitle: PropTypes.string.isRequired
};