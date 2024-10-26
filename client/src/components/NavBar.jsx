import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../utils/axiosConfig.js';
import Cookies from 'js-cookie';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AppLogo from '../assets/logo-no-bg.png';
import '../styles/index.css';

function NavBar({ title }) {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const userId = sessionStorage.getItem('userId');

    function logout(){
        axios.post('/users/logout')
        .then(() => { 
            sessionStorage.clear();
            Cookies.remove('csrftoken');

            navigate('/login');
        })
    }

    return (
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
            <Container className="brand">
                <Navbar.Brand><img src={AppLogo} alt="Logo" /> <br/> WiseInvest</Navbar.Brand>
            </Container>
            <Container className="title">
                <h2>{title}</h2>
            </Container>
            { title === 'Education Center' ? <Container className="menu">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="menu">
                    <Nav.Link onClick={() => navigate('/education/courses')}>Browse Courses</Nav.Link>
                    <Nav.Link onClick={() => navigate('/education/courses/learning')}>My Learning</Nav.Link>
                    <Nav.Link onClick={() => navigate('/education/courses/favorites')}>Favorites</Nav.Link>
                    <NavDropdown title={username} id="nav-dropdown" drop="start">
                        <NavDropdown.Item onClick={() => navigate(`/education/userprofile/${userId}`)}>Profile</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate('/invest')}>
                            Investments Manager
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container> : <Container className="menu">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="menu">
                    <Nav.Link onClick={() => navigate('/invest/stocks')}>Browse Stocks</Nav.Link>
                    <Nav.Link onClick={() => navigate('/invest/portfolio')}>My Portfolio</Nav.Link>
                    <NavDropdown title={username} id="nav-dropdown" drop="start">
                    <NavDropdown.Item onClick={() => navigate(`/invest/userprofile/${userId}`)}>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/education')}>
                        Education Center
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>
                        Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container> }
        </Navbar>
    );
    
}

export default NavBar;

NavBar.propTypes = {
  title: PropTypes.string.isRequired
};