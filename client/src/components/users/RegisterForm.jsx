import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import Cookies from 'js-cookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function RegisterForm() {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', username: '', password: '', confirmation: '' });
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
      registerUser();
    }
  }

  function registerUser() { 
    axios.post('/users/register', {
        'firstname': formData.firstname,
        'lastname': formData.lastname,
        'email': formData.email,
        'username': formData.username,
        'password': formData.password,
        'confirmation': formData.confirmation
    })
    .then(response => {
      sessionStorage.setItem('userId', response.data.user_id);
      sessionStorage.setItem('username', response.data.username);
      sessionStorage.setItem('sessionId', Cookies.get('sessionid'));
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
      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" id="firstname" name="firstname" placeholder="First name" required onChange={(e) => updateFormData(e)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" id="lastname" name="lastname" placeholder="Last name" required onChange={(e) => updateFormData(e)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" id="email" name="email" placeholder="Email" required onChange={(e) => updateFormData(e)} />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" id="username" name="username" placeholder="Username" required onChange={(e) => updateFormData(e)} />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" id="password" name="password" placeholder="Password" required onChange={(e) => updateFormData(e)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" id="confirmation"  name="confirmation" placeholder="Confirm password" required onChange={(e) => updateFormData(e)} />
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