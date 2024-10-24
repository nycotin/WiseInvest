import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';

import ToggleFavButton from './ToggleFavButton';
import ToggleEnrollButton from './ToggleEnrollButton';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../../styles/index.css';
import '../../styles/educate.css';

function CourseDetails({ course, userFavs, setUserFavs, userCourses, setUserCourses, learningStatus, setLearningStatus }) {
  const { title, description, createdBy, itemCount } = course;

  useEffect(() => {
    if (learningStatus === 'Enrolled') {
      setLearningStatus('Enrolled');
    } else if (learningStatus === 'In Progress') {
      setLearningStatus('In Progress');
    } else if (learningStatus === 'Completed'){
      setLearningStatus('Completed');
    } else {
      setLearningStatus('');
    }
  }, [learningStatus, setLearningStatus])

  function editCourseStatus(){
    axios.put(`/education/courses/${course.id}/edit-status`)
    .then(response => {
      console.log(response.data.message);
      setLearningStatus(response.data.status);
    })
  }

  function createStatusButton(){
    if (learningStatus === 'Enrolled') {
      return (
        <Button variant="info" size="sm" onClick={editCourseStatus}>Start Course</Button>
      )
    } else if (learningStatus === 'In Progress') {
      return (
        <Button variant="success" size="sm" onClick={editCourseStatus}>Completed?</Button>
      )
    } else {
      return null;
    }
  }

  function createBadge(){
    if (learningStatus === 'Enrolled') {
      return (
        <sub><Badge bg="secondary">{learningStatus}</Badge></sub>
      )
    } else if (learningStatus === 'In Progress') {
      return (
        <sub><Badge bg="primary">{learningStatus}</Badge></sub>
      )
    } else if (learningStatus === 'Completed') {
      return (
        <sub><Badge bg="success">{learningStatus}</Badge></sub>
      )
    } else {
      return '';
    }
  }

  return (
    <>
      <Card className="course-details" md={8}>
        <Card.Title>{title}
          { createBadge() !== '' ? createBadge() : null }
        </Card.Title>
        <Card.Subtitle>By {createdBy}</Card.Subtitle>
        <Card.Subtitle>Course items: {itemCount}</Card.Subtitle>
        <Card.Subtitle>
          <ToggleFavButton course={course} userFavs={userFavs} setUserFavs={setUserFavs} />
          <ToggleEnrollButton course={course} userCourses={userCourses} setUserCourses={setUserCourses} setLearningStatus={setLearningStatus} />
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
          { createStatusButton() !== null ? <Card.Subtitle>{createStatusButton()}</Card.Subtitle> : null }
      </Card>
    </>
  )
}

export default CourseDetails;

CourseDetails.propTypes = {
  course: PropTypes.object.isRequired,
  userCourses: PropTypes.array.isRequired,
  setUserCourses: PropTypes.func.isRequired,
  userFavs: PropTypes.array.isRequired,
  setUserFavs: PropTypes.func.isRequired,
  learningStatus: PropTypes.string,
  setLearningStatus: PropTypes.func
};