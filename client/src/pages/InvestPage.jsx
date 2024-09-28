import NavBar from "../components/NavBar"

import '../App.css';
import '../index.css';
import { Outlet } from "react-router-dom";
import Dashboard from "../components/invest/Dashboard";

function InvestPage() {
  const title = { "title": "Investments Manager"}

    return (
    <>
        <NavBar { ...title } />
        <Dashboard />
        <Outlet />
    </>
  )
}

export default InvestPage