import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { redirect } from 'react-router-dom';
import axios from 'axios';


function RegisterForm() {
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      RegisterUser();
    } 
  };

  function RegisterUser() {
    const fname = document.querySelector('#first_name').value;
    const lname = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirmation = document.querySelector('#confirmation').value;
        
    axios.post('http://127.0.0.1:8000/api/users/register', {
        'first_name': fname,
        'last_name': lname,
        'email': email,
        'username': username,
        'password': password,
        'confirmation': confirmation
    })
    .then(response => {
      console.log(response.data);
      if (response.data == 200) {
        redirect('/login');
      } else if (response.data == 400) {
        setMsg(response.data.message)
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" id="first_name" placeholder="First name" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last name:</Form.Label>
          <Form.Control type="text" id="last_name" placeholder="Last name" required />
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

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default RegisterForm;