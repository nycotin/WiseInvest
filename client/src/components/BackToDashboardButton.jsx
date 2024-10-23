import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import '../styles/index.css';

function BackToDashboardButton({ app }){
    const navigate = useNavigate();

    function navigateToDashboard(app){
        navigate(`/${app}`);
        const dashboard = document.querySelector('.dashboard');
        dashboard.style.display = 'block';
    }
    
    return (
        <Button variant="primary" size="sm" className="mb-3" onClick={() => navigateToDashboard(app)}>Back to Dashboard</Button>
    )
}

export default BackToDashboardButton;

BackToDashboardButton.propTypes = {
  app: PropTypes.string.isRequired
};