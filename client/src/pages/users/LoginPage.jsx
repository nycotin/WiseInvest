import LoginForm from '../../components/users/LoginForm.jsx';

import Container from 'react-bootstrap/esm/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function LoginPage () {
    return (
        <Container id="login-page">
            <h2>Login</h2>
            <LoginForm />
        </Container>
    )
}

export default LoginPage;