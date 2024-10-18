import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import '../../index.css';
import '../../educate.css';

function Dashboard() {
  const [userCourses, setUserCourses] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'block';

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

    getUserCourses();
    getUserFavs();
  }, [])


  const notStartedCourses = userCourses.filter(i => i.status === 'Enrolled')
  const completedCourses = userCourses.filter(i => i.status === 'Completed')
  const inProgressCourses = userCourses.filter(i => i.status === 'In Progress')

  return (
    <>
        <div className="dashboard" style={{ display: 'block' }}>
            <h2>Dashboard</h2>
            <div className="dashboard-cards">
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
            </div>
        </div>
    </>
  )
}

export default Dashboard;