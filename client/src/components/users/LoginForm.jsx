import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';


function LoginForm() {
  let [validated, setValidated] = useState(false);
  let [msg, setMsg] = useState('');
  const navigate = useNavigate();

  function LoginUser() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
      
    axios.post('/users/login', {
        'username': username,
        'password': password
    })
    .then(response => {
      sessionStorage.setItem('userId', response.data.user_id)
      sessionStorage.setItem('username', response.data.username)

      return navigate('/fork');
    })
    .catch(error => {
      if (error.response){
        setMsg(error.response.data.message);
      } else if (error.request){
        setMsg(error.message);
      }
    });
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(true);
      LoginUser();
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" id="username" placeholder="Username" required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" required/>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please insert a password.
          </Form.Control.Feedback>
        </Form.Group>
        <input type="text" name="csrfmiddlewaretoken" hidden/>
        <Button variant="primary" type="submit">Log In</Button>
      </Form>

      <div className="msg">
        {msg ? msg : null}
      </div>

      <div className="link">
        Need an account? <Link to="/register">Register here!</Link>
      </div>
    </>
  )
}

export default LoginForm