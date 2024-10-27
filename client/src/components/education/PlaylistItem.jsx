import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import '../../styles/index.css';
import '../../styles/education.css';

function PlaylistItem({ item, currentItem, setCurrentItem }) {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (currentItem === item.position) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [item, currentItem])


  return (
    <>
      { isClicked ?
        <Card className="selected" onClick={() => setCurrentItem(item.position)}>
        <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
          <Card.Body>
            <Card.Text>{item.position + 1}. {item.title}</Card.Text>
          </Card.Body>
        </Card> :
        <Card onClick={() => setCurrentItem(item.position)}>
          <Card.Img className="thumbnail" variant="top" src={item.thumbnail}/>
          <Card.Body>
            <Card.Text>{item.position + 1}. {item.title}</Card.Text>
          </Card.Body>
        </Card>
      }
    </>
  )
}

export default PlaylistItem;

PlaylistItem.propTypes = {
  item: PropTypes.object.isRequired,
  currentItem: PropTypes.number.isRequired,
  setCurrentItem: PropTypes.func.isRequired
};