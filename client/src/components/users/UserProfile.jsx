import { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';

import Container from 'react-bootstrap/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function UserProfile() {  
    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        axios.get('/users/userprofile')
        .then(response => {
            setUserProfile(response.data.user);
        });
    }, []);

    function handleEdit(id, p, parent){
        const input = document.querySelector(`input#${id}`);
        const newValue = input.value;

        if (newValue !== '') {
            axios.put('/users/userprofile/edit', {
                field_id: id,
                new_value: newValue
            })
            .then(response => console.log(response.data.message))
            .catch(error => console.log(error.response.data.message))
        
            p.innerHTML = newValue;
        } 
        
        p.style.display = 'block';
        parent.append(p);
        input.remove();
    }

    function makeEditable(id){
        const p = document.getElementById(id);
        const currentValue = p.innerHTML;
        p.style.display = 'none';
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', id);
        input.setAttribute('value', currentValue);
        input.setAttribute('autofocus', '');
        input.setAttribute('class', 'form-control');
        input.addEventListener('blur', () => handleEdit(id, p, parent));
        const parent = p.parentElement;
        parent.appendChild(input);
    }
    
    const { firstname, lastname, email, username, date_joined, last_login } = userProfile;

    return (
        <Container id="user-profile" fluid="md">
            <h2>User Profile</h2>
            <Container id="user-info">
                <Container>
                    <label htmlFor="firstname">Firstname:</label>
                    <p type="text" name="firstname" id="firstname" onClick={() => makeEditable('firstname')}>{firstname}</p>
                </Container>
                <Container>
                    <label htmlFor="lastname">Lastname:</label>
                    <p type="text" name="lastname" id="lastname" onClick={() => makeEditable('lastname')}>{lastname}</p>
                </Container>
                <Container>
                    <label htmlFor="email">Email:</label>
                    <p type="email" name="email" id="email" onClick={() => makeEditable('email')}>{email}</p>
                </Container>
                <Container>
                    <label htmlFor="username">Username:</label>
                    <p type="text" name="username" id="username">{username}</p>
                </Container>
                <Container>
                    <label htmlFor="date_joined">Joined on:</label>
                    <p type="text" name="date_joined" id="date_joined">{date_joined}</p>
                </Container>
                <Container>
                    <label htmlFor="last_login">Last login:</label>
                    <p type="text" name="last_login" id="last_login">{last_login}</p>
                </Container>
            </Container>
        </Container>
    );
}

export default UserProfile;
