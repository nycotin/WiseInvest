import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { redirect } from 'react-router-dom';
import axios from 'axios';


function LoginForm() {
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
      LoginUser();
    }
  };

  function LoginUser() {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(username, password)
      
    axios.post('http://127.0.0.1:8000/api/users/login', {
      'username': username,
      'password': password
    })
    .then(response => {
            console.log(response.data);
      if (response.data == 200) {
        redirect('/login');
      } else if (response.data == 403) {
        setMsg(response.data.message)
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" id="username" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" id="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </>
  )
}

export default LoginForm