import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ForkPage () {
    const navigate = useNavigate()

    return (
        <div className="fork-page">
            <h1>Choose the area you want to access</h1>
                <div className="buttons">
                <Button variant='secondary' onClick={() => navigate('/education')}>Education Center</Button>
                <Button variant='secondary' onClick={() => navigate('/invest')}>Investments Manager</Button>
            </div>
        </div>
    )
}

export default ForkPage