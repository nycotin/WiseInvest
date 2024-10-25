import PropTypes from 'prop-types';

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastMessage({ toastMessage, setToastMessage }) {

    return (
        <ToastContainer position='middle-end'>
        <Toast onClose={() => setToastMessage('')}>
        <Toast.Header>
            <strong className="me-auto">Action successfully performed!</strong>
        </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </ToastContainer>
    );
}

export default ToastMessage;

ToastMessage.propTypes = {
  toastMessage: PropTypes.string.isRequired,
  setToastMessage: PropTypes.func.isRequired
};