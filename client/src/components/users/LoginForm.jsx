import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import Cookies from 'js-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  function updateFormData(e){
    setFormData((newFormData) => {
      return { 
        ...newFormData,
        [e.target.name]: e.target.value,
      };
    })
  }
  
  function handleSubmit(e){
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(true);
      loginUser();
    }
  }

  function loginUser() {   
    axios.post('/users/login', {
        'username': formData.username,
        'password': formData.password
    })
    .then(response => {
      sessionStorage.setItem('userId', response.data.user_id);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('csrftoken', Cookies.get('sessionid'));
      sessionStorage.setItem('csrftoken', Cookies.get('csrftoken'));

      navigate('/fork');
    })
    .catch(error => {
      if (error.response){
        setMsg(error.response.data.message);
      } else if (error.request){
        setMsg(error.message);
      }
    });
  }

  return (
    <Container className="mt-2">
      <Form noValidate validated={validated} onSubmit={(e) =>handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" id="username" placeholder="Username" required onChange={(e) => updateFormData(e)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" id="password" placeholder="Password" required onChange={(e) => updateFormData(e)}/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please insert a password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>
      </Form>

      <Container className="msg mt-2">
        {msg ? msg : null}
      </Container>

      <Container className="link mt-2">
        Need an account? <Link to='/register'>Register here!</Link>
      </Container>
    </Container>
  )
}

export default LoginForm;