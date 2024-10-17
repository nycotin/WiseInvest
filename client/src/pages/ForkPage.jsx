import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import '../index.css';

function ForkPage () {
    const navigate = useNavigate()

    return (
        <Container id="fork-page">
            <h2>Where to?</h2>
                <Container className="buttons">
                    <Button variant="secondary" onClick={() => navigate('/education')}>Education Center</Button>
                    <Button variant="secondary" onClick={() => navigate('/invest')}>Investments Manager</Button>
                </Container>
        </Container>
    )
}

export default ForkPage;