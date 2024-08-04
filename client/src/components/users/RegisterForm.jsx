import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { UserContext } from '../../contexts/UserContext';


function RegisterForm() {
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const context = useContext(UserContext);

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
      context.setUserId(response.data.user_id);
      context.setUsername(response.data.username);
      context.setIsLoggedIn(true);
      context.setCsrfToken(response.data.csrftoken);

      return navigate('/fork');
    })
    .catch(error => {
      setMsg(error.response.data.message);
    });
  }

  return (
    <>
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

      <div className="msg">
        {msg ? msg : null}
      </div>

      <div className="link">
          Already registered? <Link to="/login">Log in here!</Link>
      </div>
    </>
  );
}

export default RegisterForm;