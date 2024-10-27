import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import '../../styles/index.css';
import '../../styles/education.css';

function Dashboard({ userCourses, userFavs }) {
  const navigate = useNavigate();

  const notStartedCourses = userCourses.filter(i => i.status === 'Enrolled')
  const completedCourses = userCourses.filter(i => i.status === 'Completed')
  const inProgressCourses = userCourses.filter(i => i.status === 'In Progress')

  return (
    <Container className="dashboard">
        <h2>Dashboard</h2>
        <Container id="education-dashboard">
          <Card className="not-started-courses">
            <Card.Title onClick={() => navigate('/education/courses/learning')}>Not Started <sub><Badge bg="secondary">{notStartedCourses.length}</Badge></sub></Card.Title>
            { notStartedCourses.length !== 0 ? notStartedCourses.map(i => <li key={i.id} onClick={() => navigate(`/education/courses/${i.id}`)}>{i.title}</li> ) : 'No courses in progress.' }
          </Card>
          <Card className="in-progress-courses">
            <Card.Title onClick={() => navigate('/education/courses/learning')}>In Progress <sub><Badge bg="primary">{inProgressCourses.length}</Badge></sub></Card.Title>
            { inProgressCourses.length !== 0 ? inProgressCourses.map(i => <li key={i.id} onClick={() => navigate(`/education/courses/${i.id}`)}>{i.title}</li> ) : 'No courses in progress.' }
          </Card>
          <Card className="completed-courses">
            <Card.Title onClick={() => navigate('/education/courses/learning')}>Completed <sub><Badge bg="success">{completedCourses.length}</Badge></sub></Card.Title>
            { completedCourses.length !== 0 ? completedCourses.map(i => <li key={i.id} onClick={() => navigate(`/education/courses/${i.id}`)}>{i.title}</li> ) : 'No completed courses.' }
          </Card>
          <Card className="user-favorites">
            <Card.Title onClick={() => navigate('/education/courses/favorites')}>Favorites <sub><Badge bg="danger">{userFavs.length}</Badge></sub></Card.Title>
            { userFavs.length !== 0 ? userFavs.map(i => <li key={i.id} onClick={() => navigate(`/education/courses/${i.id}`)}>{i.title}</li> ) : 'No favorite courses.' }
          </Card>
        </Container>
    </Container>
  )
}

export default Dashboard;

Dashboard.propTypes = {
  userCourses: PropTypes.array.isRequired,
  userFavs: PropTypes.array.isRequired
};