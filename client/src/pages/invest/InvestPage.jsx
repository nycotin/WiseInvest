import { Outlet } from 'react-router-dom';

import Dashboard from "../../components/invest/Dashboard";
import NavBar from "../../components/NavBar"

import '../../index.css';
import '../../invest.css';

function InvestPage() {
  const title = { 'title': 'Investments Manager'}

    return (
    <>
        <NavBar { ...title } />
        <Dashboard />
        <Outlet />
    </>
  )
}

export default InvestPage;