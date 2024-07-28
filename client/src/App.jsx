import { Outlet } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

import './App.css'

function App() {
  return (
    <UserContextProvider>
      <div id="app">
        <Outlet />
      </div>
    </UserContextProvider>
  )
}

export default App
