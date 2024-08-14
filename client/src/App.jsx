import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import axios from './axiosConfig';


import './App.css'

function App() {
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
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