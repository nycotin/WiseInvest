import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

import '../../App.css';
import '../../index.css';

import liveStocks from '../../stockStaticData.json'


function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [userStocks, setUserStocks] = useState([]);

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'block';

    //? view disabled due to api call limits
    // function getLiveStocks(){
    //     axios.get('/invest/get-live-stocks')
    //     .then(response => {
    //         setStocks(response.data.stocks);
    //     });
    // }
    setStocks(liveStocks.stocks)

    function getUserStocks(){
      axios.get('/invest/get-user-stocks')
      .then(response => {
        if(response.data.user_stocks){
          setUserStocks(response.data.user_stocks);
        } else {
          setUserStocks([]);
        }
      });
    }

    //? Activate line for production
    // getLiveStocks();
    getUserStocks();
  }, [])


  function checkCurrentValue(obj){
    let updatedStock = stocks.filter(item => item.stock === obj.stock_symbol)[0]

    if (obj.price_on_purchase < updatedStock.extracted_price){
      return true
    } else if (obj.price_on_purchase > updatedStock.extracted_price){
      return false
    } else {
      return "stable"
    }

  }

  function countIncreased(){
    let count = 0;

    userStocks.forEach(i => {
      if (checkCurrentValue(i)){
        count += 1;
      }
    })

    return count;
  }

  function countDecreased(){
    let count = 0;

    userStocks.forEach(i => {
      if (!checkCurrentValue(i)){
        count += 1;
      }
    })

    return count;
  }

  function countStable(){
    let count = 0;

    userStocks.forEach(i => {
      if (checkCurrentValue(i) === 'stable'){
        count += 1;
      }
    })

    return count;
  }

  return (
    <>
        <div className="dashboard" style={{ display: 'block' }}>
            <h2>Dashboard</h2>
            <div className="invest-dashboard">
              <Card className="user-stocks">
                <Card.Title>My Stocks <sub><Badge bg="secondary">{userStocks.length}</Badge></sub></Card.Title>
                { userStocks.length !== 0 ?
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      { userStocks.map(i => <tr key={i.stock_symbol}>
                        <td>{i.stock_symbol}</td>
                        <td><Link to={i.link} target="_blank">{i.stock_name}</Link></td>
                        <td>{i.quantity}</td>
                      </tr>) }
                    </tbody>
                  </Table>
                  : 'No stocks purchased.'}
              </Card>
              <Card className="increased-since-purchase">
                <Card.Title>Increased <sub><Badge bg="primary">{ countIncreased() }</Badge></sub></Card.Title>
                { userStocks.map(i => { if(checkCurrentValue(i)){
                    return <li key={i.stock_symbol}><Link to={i.link} target="_blank">{i.stock_name}</Link></li>
                }}) }
              </Card>
              <Card className="decreased-since-purchase">
                <Card.Title>Decreased <sub><Badge bg="success">{ countDecreased() }</Badge></sub></Card.Title>
                { userStocks.map(i => { if(!checkCurrentValue(i)){
                    return <li key={i.stock_symbol}><Link to={i.link} target="_blank">{i.stock_name}</Link></li>
                }}) }
              </Card>
              <Card className="stable-since-purchase">
                <Card.Title>Stable <sub><Badge bg="warning">{ countStable() }</Badge></sub></Card.Title>
                { userStocks.map(i => { if(checkCurrentValue(i) === 'stable'){
                    return <li key={i.stock_symbol}><Link to={i.link} target="_blank">{i.stock_name}</Link></li>
                }}) }
              </Card>
            </div>
        </div>
    </>
  )
}

export default Dashboard;