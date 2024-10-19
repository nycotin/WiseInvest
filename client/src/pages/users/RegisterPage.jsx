import RegisterForm from '../../components/users/RegisterForm.jsx';

import Container from 'react-bootstrap/esm/Container';

import '../../index.css';
import '../../users.css';

function RegisterPage () {
    return (
        <Container id="register-page">
            <h2>Register</h2>
            <RegisterForm />
        </Container>
    )
}

export default RegisterPage;