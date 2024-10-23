import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Dashboard from '../../components/education/Dashboard';

import '../../styles/index.css';
import '../../styles/educate.css';

function EducationPage() {

  return (
    <>
        <NavBar title='Education Center' />
        <Dashboard />
        <Outlet />
    </>
  )
}

export default EducationPage;