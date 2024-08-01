import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AppLogo from '../assets/logo-no-bg.png';

import '../assets/logo-no-bg.png';
import '../App.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { UserContext } from '../contexts/UserContext';
import PropTypes from 'prop-types';


function NavBar({ title }) {
    const navigate = useNavigate();
    const { userId, username, isLoggedIn, setUserId, setUsername, setIsLoggedIn} = useContext(UserContext);

    function logout(){
        axios.post('/users/logout')
        .then((response) => { 
            console.log(response.data.message)

            setUserId(null)
            setUsername(null)
            setIsLoggedIn(false)

            navigate('/login');
        })
    }
        
    if (title === "Education Center"){
        return (
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
                <Container className="brand">
                    <Navbar.Brand><img src={AppLogo} alt="Logo" /> <br/> WiseInvest</Navbar.Brand>
                </Container>
                <Container className="title">
                    <h2>{title}</h2>
                </Container>
                <Container className="menu">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="menu">
                        <Nav.Link href="">Browse Courses</Nav.Link>
                        <Nav.Link href="">My Learning</Nav.Link>
                        <Nav.Link href="">Favorites</Nav.Link>
                        <NavDropdown title={username} id="nav-dropdown">
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
                </Container>
            </Navbar>
        );
    } else {
        return (
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
                <Container className="brand">
                    <Navbar.Brand><img src={AppLogo} alt="Logo" /> <br/> WiseInvest</Navbar.Brand>
                </Container>
                <Container className="title">
                    <h2>{title}</h2>
                </Container>
                <Container className="menu">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="menu">
                        <Nav.Link href="#home">Dashboard</Nav.Link>
                        <Nav.Link href="#link">My Investments</Nav.Link>
                        <NavDropdown title={username} id="nav-dropdown">
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
                </Container>
            </Navbar>
        );
    }
    
}

export default NavBar;

NavBar.propTypes = {
  title: PropTypes.string.isRequired
};