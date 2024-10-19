import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import '../../index.css';

function EducationDashboardButton(){
    const navigate = useNavigate();

    function navigateToDashboard(){
        navigate('/education')
        const dashboard = document.querySelector('.dashboard');
        dashboard.style.display = 'block';
    }
    
    return (
        <Button variant="primary" size="sm" className="mb-3" onClick={navigateToDashboard}>Back to Dashboard</Button>
    )
}

export default EducationDashboardButton;