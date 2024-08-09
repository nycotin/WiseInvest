import NavBar from "../components/NavBar"

import '../App.css';
import '../index.css';
import { Outlet } from "react-router-dom";

function InvestPage() {
  const title = { "title": "Investments Manager"}

    return (
    <>
        <NavBar { ...title } />
        <Outlet />
    </>
  )
}

export default InvestPage