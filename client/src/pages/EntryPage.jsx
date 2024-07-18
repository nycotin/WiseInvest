import AppLogo from '../assets/logo-no-bg.png';
import Button from 'react-bootstrap/Button';
import '../App.css';

function EntryPage () {
    return (
    <>
        <div className="entry-page">
            <h1>WiseInvest</h1>
            <img src={AppLogo} alt="Logo" />
            <div className="buttons">
                <Button variant="secondary" href="/login">Login</Button>
                <Button variant="secondary" href="/register">Register</Button>
            </div>
        </div>
    </>
  )
}

export default EntryPage