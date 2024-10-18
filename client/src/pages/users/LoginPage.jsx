import LoginForm from '../../components/users/LoginForm.jsx';

import Container from 'react-bootstrap/esm/Container';

import '../../index.css';
import '../../users.css';

function LoginPage () {
    return (
        <Container id="login-page">
            <h2>Login</h2>
            <LoginForm />
        </Container>
    )
}

export default LoginPage;