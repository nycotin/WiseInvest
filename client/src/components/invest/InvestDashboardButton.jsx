import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import '../../index.css';

function InvestDashboardButton(){
    const navigate = useNavigate();

    function navigateToDashboard(){
        navigate('/invest')
        const dashboard = document.querySelector('.dashboard');
        dashboard.style.display = 'block';
    }
    
    return (
        <Button variant="primary" className="mb-2" size="sm" onClick={navigateToDashboard}>Back to Dashboard</Button>
    )
}

export default InvestDashboardButton;