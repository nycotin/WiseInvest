import { Outlet } from "react-router-dom";

import '../App.css';

function InvestPage () {
    return (
    <>
        <h1>Investments Manager</h1>
        <div id="container">
          <Outlet />
        </div>
    </>
  )
}

export default InvestPage