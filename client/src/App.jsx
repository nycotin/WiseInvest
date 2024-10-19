import { Outlet } from 'react-router-dom';

import './index.css'
import './users.css'
import './educate.css'
import './invest.css'

function App() {
  return (
      <div id="app">
        <Outlet />
      </div>
  )
}

export default App;