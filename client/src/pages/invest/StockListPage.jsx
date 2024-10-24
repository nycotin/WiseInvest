import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

import BackToDashboardButton from '../../components/BackToDashboardButton';
import FilterButtons from '../../components/invest/FilterButtons';
import PurchaseForm from '../../components/invest/purchaseForm';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import '../../styles/index.css';
import '../../styles/invest.css';

function StockListPage() {
  const [stocks] = useOutletContext();
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {  
    setToastMessage('');
    setFilteredStocks(stocks);

    function getCurrentPrice(){
      stocks.forEach(item => {
        axios.get(`/invest/get-current-price/${item.symbol}`)
        .then(response => {
          item["current_price"] = response.data.current_price;
        })
      })
    }

    getCurrentPrice();

  }, [stocks])

  function createToast() {
    return (
      <ToastContainer position='middle-end'>
        <Toast onClose={() => setToastMessage('')}>
        <Toast.Header>
          <strong className="me-auto">Purchase successful!</strong>
        </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }

  return (
    <Container className="stock-list" fluid="md">
      <h2>Browse Stocks</h2>
      { toastMessage !== '' ? createToast() : null}
      <BackToDashboardButton app='invest' />
      <FilterButtons stocks={stocks} setFilteredStocks={setFilteredStocks} />
      { filteredStocks.length !== 0 ? 
        <Card className="all-stocks">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="mic">Exchange MIC</th>
                <th className="symbol">Stock Symbol</th>
                <th className="company">Company Name</th>
                <th className="current-price">Current Price</th>
                <th className="currency">Currency</th>
                <th className="market">Market Area</th>
              </tr>
            </thead>
            <tbody>
              { filteredStocks.map(i => <tr key={i.symbol}>
                <td className="mic">{i.exchange_id}</td>
                <td className="symbol">{i.symbol}</td>
                <td className="company"><Link to={i.link} target="_blank">{i.company_name}</Link></td>
                <td className="current-price">{i.current_price !== undefined ? i.currency_symbol : null} {i.current_price !== undefined ? i.current_price : 'Price loading'}</td>
                <td className="currency">{i.currency}</td>
                <td className="market">{i.market_area}</td>
                <td><PurchaseForm stock={i} setToastMessage={setToastMessage} />
                </td>
              </tr>) }
            </tbody>
          </Table>
        </Card> : <Container>No stocks available.</Container> }
    </Container>
  )
}

export default StockListPage;