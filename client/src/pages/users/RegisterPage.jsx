import RegisterForm from '../../components/users/RegisterForm.jsx';

import Container from 'react-bootstrap/esm/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function RegisterPage () {
    return (
        <Container id="register-page">
            <h2>Register</h2>
            <RegisterForm />
        </Container>
    )
}

export default RegisterPage;