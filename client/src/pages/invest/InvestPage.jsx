import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

import Dashboard from '../../components/invest/Dashboard';
import NavBar from '../../components/NavBar';

import '../../styles/index.css';
import '../../styles/invest.css';

function InvestPage() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const location = useLocation().pathname;

  useEffect(() => {  
    function getStocks(){
        axios.get('/invest/get-stocks')
        .then(response => {
            setStocks(response.data.stocks);
        });
    }

    function getPortfolio(){
      axios.get('/invest/get-portfolio')
      .then(response => {
        if (response.data.portfolio_data) {
          setPortfolio(response.data.portfolio_data);
        } else {
          setPortfolio([]);
        }
      });
    }

    function getTransactionHistory(){
      axios.get('/invest/get-transactions')
      .then(response => {
        if (response.data.transactions_history) {
          setTransactions(response.data.transactions_history);
        } else {
          setTransactions([]);
        }
      });
    }

    getStocks();
    getPortfolio();
    getTransactionHistory();
  }, [])

  return (
    <>
        <NavBar title='Investments Manager' />
        { location === '/invest' ? <Dashboard transactions={transactions} portfolio={portfolio} /> : null }
        <Outlet context={[stocks, portfolio]} />
    </>
  )
}

export default InvestPage;