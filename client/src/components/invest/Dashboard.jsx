import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

import '../../App.css';
import '../../index.css';


function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'block';

    function getStocks(){
        axios.get('/invest/get-stocks')
        .then(response => {
            setStocks(response.data.stocks);
        });
    }

    function getPortfolio(){
      axios.get('/invest/get-portfolio')
      .then(response => {
        if(response.data.portfolio_data){
          setPortfolio(response.data.portfolio_data);
        } else {
          setPortfolio([]);
        }
      });
    }

    function getTransactionHistory(){
      axios.get('/invest/get-transactions')
      .then(response => {
        if(response.data.transactions_history){
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

  function calculateGrowth(inv, val){
    const data = {
      "movement": 0,
      "percent": 0,
      "dir": ""
    }

    if (val > inv) {
      data["movement"] = `+${(val - inv).toFixed(2)}`;
      data["dir"] = "up";
      data["percent"] = `+${((val - inv) / inv).toFixed(2)}%`;
    } else if (inv > val) {
      data["movement"] = (val - inv).toFixed(2);
      data["dir"] = "down";
      data["percent"] = `${((val - inv) / inv).toFixed(2)}%`;
    } else {
      data["movement"] = 0;
      data["dir"] = "stable";
      data["percent"] = 0;
    }

    return data;
  }

  function filterStocks(str) {
    const list = portfolio.filter(i => calculateGrowth(i.total_investment, i.total_value).dir === str)

    return list;
  }

  function getStock(sym){
    const lookup = stocks.filter(stock => stock.symbol === sym);
    const current_stock = lookup[0];

    return current_stock;
  }

  return (
    <>
        <div className="dashboard" style={{ display: 'block' }}>
            <h2>Dashboard</h2>
            <div className="invest-dashboard">
              <Card className="user-stocks">
                <Card.Title>My Stocks</Card.Title>
                { portfolio.length !== 0 ?
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      { portfolio.map(i => <tr key={i.stock_symbol}>
                        <td>{i.stock_symbol}</td>
                        <td><Link to={getStock(i.stock_symbol).symbol} target="_blank">{getStock(i.stock_symbol).company_name}</Link></td>
                        <td>{i.quantity}</td>
                      </tr>) }
                    </tbody>
                  </Table>
                  : 'No stocks.' }
              </Card>
              <div className="stats">
                <Card className="increased-since-purchase">
                  <Card.Title>Increased <sub><Badge bg="primary">{ filterStocks('up').length }</Badge></sub></Card.Title>
                  { filterStocks('up').length !== 0 ? filterStocks('up').map(i => <li key={i.stock_symbol}>{getStock(i.stock_symbol).company_name}</li>) : 'No stocks.' }
                </Card>
                <Card className="decreased-since-purchase">
                  <Card.Title>Decreased <sub><Badge bg="success">{ filterStocks('down').length }</Badge></sub></Card.Title>
                  { filterStocks('down').length !== 0 ? filterStocks('down').map(i => <li key={i.stock_symbol}>{getStock(i.stock_symbol).company_name}</li>) : 'No stocks.' }
                </Card>
                <Card className="stable-since-purchase">
                  <Card.Title>Stable <sub><Badge bg="warning">{ filterStocks('stable').length }</Badge></sub></Card.Title>
                  { filterStocks('stable').length !== 0 ? filterStocks('stable').map(i => <li key={i.stock_symbol}>{getStock(i.stock_symbol).company_name}</li>) : 'No stocks.' }
                </Card>
              </div>
            <Card className="transactions">
              <Card.Title>Transaction History</Card.Title>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Stock symbol</th>
                    <th>Company name</th>
                    <th>Price on purchase</th>
                    <th>Quantity</th>
                    <th>Total expense</th>
                  </tr>
                </thead>
                <tbody>
                  { transactions.map(i => <tr key={i.id}>
                    <td>{i.purchased_on}</td>
                    <td>{i.stock_id}</td>
                    <td>{getStock(i.stock_id).company_name}</td>
                    <td>{getStock(i.stock_id).currency_symbol} {i.price_on_purchase}</td>
                    <td>{i.quantity}</td>
                    <td>{getStock(i.stock_id).currency_symbol} {i.total_expense}</td>
                  </tr>) }
                </tbody>
              </Table>
            </Card>
            </div>
        </div>
    </>
  )
}

export default Dashboard;