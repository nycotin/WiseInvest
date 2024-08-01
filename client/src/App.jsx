import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import axios from './axiosConfig';


import './App.css'

function App() {
  // const [isReloaded, setIsReloaded] = useState(false)
  // const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // setIsReloaded(true)
      axios.post('/users/logout')
      .then((response) => { 
        console.log(response.data.message)
      })
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <UserContextProvider>
      <div id="app">
        <Outlet />
      </div>
    </UserContextProvider>
  )
  
}

export default App