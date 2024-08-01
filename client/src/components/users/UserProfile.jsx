import axios from '../../axiosConfig';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useState } from 'react';


function UserProfile() {
    const context = useContext(UserContext);
    const userId = context.userId;
    const [userProfile, setUserProfile] = useState([{ username: "",  firstName: "", lastname: "", email: "", date_joined: "", last_login: "" }])

    // function getUserProfile(){
    //     axios.get(`/users/userprofile/${userId}`)
    //     .then((response) => {
    //         const user = response.data.user
    //         setUserProfile((prevState) => [
    //             ...prevState,
    //             { username: user.username,  firstfame: user.firstname, lastname: user.lastname, email: user.email, date_joined: user.date_joined, last_login: user.last_login }
    //         ]);
    //     })
    // }

    // const userInfo = getUserProfile();


    return (
        <>
        <div id="user-profile">
            <h3>User Profile</h3>


        </div>
        </>
    );
}

export default UserProfile;
