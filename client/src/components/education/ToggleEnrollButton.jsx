import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';

import Button from 'react-bootstrap/Button';

import { BsClipboard2, BsClipboard2Fill } from 'react-icons/bs';

import '../../styles/index.css';
import '../../styles/educate.css';

function ToggleEnrollButton({ course, userCourses, setUserCourses, setLearningStatus }) {
  const [isEnrolled, setIsEnrolled] = useState();

  useEffect(() => {
    if (userCourses.find(c => { return c.id === course.id })) {
      setIsEnrolled(true);
    } else {
      setIsEnrolled(false);
    }
  }, [course, userCourses])

  function toggleEnroll(course){
    axios.post(`/education/courses/${course.id}/toggle-enroll`)
    .then(response => {
      console.log(response.data.message);
      
      if (response.data.action === 'Remove') {
        setUserCourses(userCourses.filter(i => i.id !== course.id));
        setLearningStatus('');
      } else {
        setUserCourses([...userCourses, course]);
        setLearningStatus('Enrolled');
      }
    });
  }

  return (
    <>
      { isEnrolled ? <Button variant="success" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2Fill /></Button> : <Button variant="warning" size="sm" onClick={() => toggleEnroll(course)}><BsClipboard2 /></Button> }
    </>
  )
}

export default ToggleEnrollButton;

ToggleEnrollButton.propTypes = {
  course: PropTypes.object.isRequired,
  userCourses: PropTypes.array.isRequired,
  setUserCourses: PropTypes.func.isRequired,
  setLearningStatus: PropTypes.func
};