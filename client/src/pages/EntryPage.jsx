import { useNavigate } from 'react-router-dom';

import AppLogo from '../assets/logo-no-bg.png';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

import '../styles/index.css';
import '../styles/users.css';

function EntryPage () {
    const navigate = useNavigate();

    return (
        <Container id="entry-page">
            <h1>WiseInvest</h1>
            <img src={AppLogo} alt="Logo" />
            <Container className="buttons">
                <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="secondary" onClick={() => navigate('/register')}>Register</Button>
            </Container>
        </Container>
    )
}

export default EntryPage;