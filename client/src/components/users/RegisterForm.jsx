import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { redirect } from "react-router-dom";
import axios from 'axios';


function RegisterForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      RegisterUser();
      return redirect('/login');
    } 
  };

  async function RegisterUser () {
    const fname = document.querySelector('#firstname').value;
    const lname = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirmation = document.querySelector('#confirmation').value;
        
    await axios.post('/users/register', {
      'firstname': fname,
      'lastname': lname,
      'email': email,
      'username': username,
      'password': password,
      'confirmation': confirmation
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" controlid="firstname" placeholder="First name" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last name:</Form.Label>
          <Form.Control type="text" controlid="lastname" placeholder="Last name" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" controlid="email" placeholder="Email" required />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" controlid="username" placeholder="Username" required />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" controlid="password" placeholder="Password" required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control type="password" controlid="confirmation" placeholder="Confirm password" required/>
        </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default RegisterForm;