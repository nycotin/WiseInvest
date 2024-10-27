import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import '../../styles/index.css';
import '../../styles/education.css';

function BackToCourseButton(){
    const navigate = useNavigate();

    function navigateToDashboard(){
        navigate('/education/courses')
    }
    
    return (
        <Button variant="secondary" size="sm" className="mb-3" onClick={navigateToDashboard}>Back to Courses</Button>
    )
}

export default BackToCourseButton;