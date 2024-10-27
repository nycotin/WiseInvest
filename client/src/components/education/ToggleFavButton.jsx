import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';

import Button from 'react-bootstrap/Button';

import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import '../../styles/index.css';
import '../../styles/education.css';

function ToggleFavButton({ course, userFavs, setUserFavs }) {
  const [isFav, setIsFav] = useState();

  useEffect(() => {
    if (userFavs.find(f => { return f.id === course.id })) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [course, userFavs])

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

  return (
    <>
      { isFav ? <Button variant="danger" size="sm" onClick={() => toggleFavorite(course)}><BsBookmarkFill /></Button> : <Button variant="secondary" size="sm" onClick={() => toggleFavorite(course)}><BsBookmark /></Button> }
    </>
  )
}

export default ToggleFavButton;

ToggleFavButton.propTypes = {
  course: PropTypes.object.isRequired,
  userFavs: PropTypes.array.isRequired,
  setUserFavs: PropTypes.func.isRequired
};