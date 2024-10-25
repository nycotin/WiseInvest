import { Outlet } from 'react-router-dom';

import './styles/index.css'
import './styles/users.css'
import './styles/educate.css'
import './styles/invest.css'

function App() {
  return (
      <div id="app">
        <Outlet />
      </div>
  )
}

export default App;