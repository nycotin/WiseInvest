import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../../axiosConfig';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import '../../index.css';
import '../../users.css';

function RegisterForm() {
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(true);
      RegisterUser();
    }
  };

  function RegisterUser() {
    const fname = document.querySelector('#firstname').value;
    const lname = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirmation = document.querySelector('#confirmation').value;
        
    axios.post('/users/register', {
        'firstname': fname,
        'lastname': lname,
        'email': email,
        'username': username,
        'password': password,
        'confirmation': confirmation
    })
    .then(response => {
      sessionStorage.setItem('userId', response.data.user_id);
      sessionStorage.setItem('username', response.data.username);

      return navigate('/fork');
    })
    .catch(error => {
      setMsg(error.response.data.message);
    });
  }

  return (
    <Container className="mt-2">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" id="firstname" placeholder="First name" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" id="lastname" placeholder="Last name" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" id="email" placeholder="Email" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" id="username" placeholder="Username" required />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" id="password" placeholder="Password" required/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" id="confirmation" placeholder="Confirm password" required/>
          </Form.Group>

        <Button type="submit">Register</Button>
      </Form>

      <Container className="msg mt-2">
        {msg ? msg : null}
      </Container>

      <Container className="link mt-2">
          Already registered? <Link to='/login'>Log in here!</Link>
      </Container>
    </Container>
  );
}

export default RegisterForm;