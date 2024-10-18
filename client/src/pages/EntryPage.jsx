import { useNavigate } from 'react-router-dom';

import AppLogo from '../assets/logo-no-bg.png';

import Button from 'react-bootstrap/Button';

import '../index.css';
import '../users.css';

function EntryPage () {
    const navigate = useNavigate();

    return (
        <div id="entry-page">
            <h1>WiseInvest</h1>
            <img src={AppLogo} alt="Logo" />
            <div className="buttons">
                <Button variant="secondary" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="secondary" onClick={() => navigate('/register')}>Register</Button>
            </div>
        </div>
    )
}

export default EntryPage;