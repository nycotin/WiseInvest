import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

import BackToDashboardButton from '../../components/BackToDashboardButton';
import ToastMessage from '../ToastMessage';

import Container from 'react-bootstrap/Container';

import '../../styles/index.css';
import '../../styles/users.css';

function UserProfile() {
    const inputs = [{'name': 'firstname', 'type': 'text', 'state': false}, {'name': 'lastname', 'type': 'text', 'state': false}, {'name': 'email', 'type': 'email', 'state': false}, {'name': 'username', 'type': 'text', 'state': false}];
    const [userProfile, setUserProfile] = useState({});
    const [isEditable, setIsEditable] = useState(inputs);
    const [toastMessage, setToastMessage] = useState('');

    const location = useLocation().pathname;

    useEffect(() => {
        axios.get('/users/userprofile')
        .then(response => {
            setUserProfile(response.data.user);
        });
    }, []);

    function makeEditable(e, str){
        const newInputs = [...isEditable];

        newInputs.map((i) => {
            if (i.name === str){
                i.state = true;
            } else {
                return i;
            }
        })

        setIsEditable(newInputs);
        e.target.focus();
    }

    function handleEdit(e, str){
        const newInputs = [...isEditable];

        newInputs.map((i) => {
            if (i.name === str){
                i.state = false;
            } else {
                return i;
            }
        })

        axios.put('/users/userprofile/edit', {
            field_id: str,
            new_value: e.target.value
        })
        .then(response => setToastMessage(response.data.message))
        .catch(error => console.log(error.response.data.message))

        const newProfile = userProfile;
        newProfile[str] = e.target.value;

        setIsEditable(newInputs);
        setUserProfile(newProfile);
    }

    function createInput(str, type){
        return (
            <Container key={str}>
                <label htmlFor={str}>{`${str[0].toUpperCase() + str.slice(1).replace('_', ' ')}:`}</label>
                { isEditable.find((i) => i.name === str).state ? 
                <input type={type} name={str} id={str} className="editable form-control" defaultValue={userProfile[str]} autoFocus onBlur={(e) => handleEdit(e, str)} /> : 
                <p name={str} id={str} className="editable" onClick={(e) => makeEditable(e, str)}>{userProfile[str]}</p> }
            </Container>
        )
    }

    return (
        <Container id="userprofile-page">
            <Container>
                { location.startsWith('/invest') ? <BackToDashboardButton app='invest' /> : <BackToDashboardButton app='education' /> }
            </Container>
            { toastMessage !== '' ? <ToastMessage toastMessage={toastMessage} setToastMessage={setToastMessage} /> : null}
            <Container id="user-profile" fluid="md">
                <h2>User Profile</h2>
                <Container id="user-info">
                    { inputs.map(c => createInput(c.name, c.type)) }
                    <Container key='date_joined'>
                        <label htmlFor='date_joined'>Date joined:</label>
                        <p key='date_joined'>{userProfile['date_joined']}</p>
                    </Container>
                    <Container key='last_login'>
                        <label htmlFor='date_joined'>Last login:</label>
                        <p key='last_login'>{userProfile['last_login']}</p>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}

export default UserProfile;