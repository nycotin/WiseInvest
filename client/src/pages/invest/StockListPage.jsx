import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';

import InvestDashboardButton from '../../components/invest/InvestDashboardButton';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Table from 'react-bootstrap/Table';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Tooltip from 'react-bootstrap/Tooltip';

import { BsCart } from 'react-icons/bs';
import { IoIosInformationCircleOutline } from 'react-icons/io';

import '../../index.css';
import '../../invest.css';

function StockListPage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'none';

    setToastMessage("");

    function getStocks(){
      axios.get('/invest/get-stocks')
      .then(response => {
          setStocks(response.data.stocks);
          setFilteredStocks(response.data.stocks);
      });
    }

    getStocks();
  }, [])

  useEffect(() => {
    function getCurrentPrice(){
      stocks.forEach(item => {
        axios.get(`/invest/get-current-price/${item.symbol}`)
        .then(response => {
          item["current_price"] = response.data.current_price;
        })
      })
    }

    getCurrentPrice();

    setInterval(getCurrentPrice(), 900000);
  }, [stocks]);

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

  function filterStocks(str){
    if (str !== "all") {
      setFilteredStocks(stocks.filter(s => s.market_area === str));
    } else {
      setFilteredStocks(stocks);
    }
  }

  function formatId(id){
    return id.replace('.', '');
  }

  function makePurchasable(id){
    const cartButton = document.querySelector(`#st-${id}.make-purchase`);
    cartButton.setAttribute('hidden', 'true');

    const purchaseInputs = document.querySelector(`#st-${id}.purchase-inputs`);
    purchaseInputs.removeAttribute('hidden');
  }

  function toggleInputs(id){
    const cartButton = document.querySelector(`#st-${id}.make-purchase`);
    cartButton.removeAttribute('hidden');

    const inputs = document.querySelector(`#st-${id}.purchase-inputs`);
    inputs.setAttribute('hidden', 'true');

    setTotal(0);
  }

  function purchaseStocks(formattedId, id){
    const purchaseInputs = document.querySelector(`#st-${formattedId}.purchase-inputs`);
    purchaseInputs.setAttribute('hidden', 'true');

    const cartButton = document.querySelector(`#st-${formattedId}.make-purchase`);
    cartButton.removeAttribute('hidden');

    const quantity = purchaseInputs.querySelector(`#st-${formattedId}-quantity`).value;

    axios.post(`/invest/purchase-stocks/${id}/${quantity}`)
    .then(response => {
      setToastMessage(response.data.message)
    })
  }

  function makeTotal(formattedId, id){
    const quantity = document.querySelector(`#st-${formattedId}-quantity`).value;
    const currentPrice = stocks.filter(i => id === i.symbol)[0].current_price;
    const span = document.querySelector(`#st-${formattedId}-total`);

    const tot = currentPrice * quantity;
    setTotal(tot.toFixed(2));
    span.innerHTML = total;
  }

  return (
      <Container className="stock-list" fluid="md">
        <h2>Browse Stocks</h2>
        { toastMessage !== '' ? createToast() : null}
        <InvestDashboardButton />
        <Container id="filter-buttons" className="my-3">
          <Button variant="secondary" size="sm" onClick={() => filterStocks('all')}>All Markets</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('North America')}>North America</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('South America')}>South America</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Europe')}>Europe</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Middle East')}>Middle East</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Africa')}>Africa</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Asia')}>Asia</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Oceania')}>Oceania</Button>
        </Container>
            { filteredStocks.length !== 0 ? <Card className="all-stocks">
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
                        <td><Button id={`st-${formatId(i.symbol)}`} className="make-purchase" variant="secondary" size="sm" onClick={() => makePurchasable(formatId(i.symbol))}><BsCart /></Button>
                            <InputGroup id={`st-${formatId(i.symbol)}`} className="purchase-inputs" hidden={true}>
                              <Container className="quantity mb-2">
                                <label htmlFor={`st-${formatId(i.symbol)}-quantity`}>Quantity:</label>                                <input type="number" id={`st-${formatId(i.symbol)}-quantity`} className="form-control" min={1} max={100} defaultValue={1} onChange={() => makeTotal(formatId(i.symbol), i.symbol)} />
                              </Container>
                              <Container className="total-expense">
                                <p id={`st-${formatId(i.symbol)}-total-expense`} className="mb-2">
                                  Total: {i.currency_symbol} <span id={`st-${formatId(i.symbol)}-total`}>{total !== 0 ? total : i.current_price}</span>
                                  <OverlayTrigger key="overlay" placement="right" overlay={
                                    <Tooltip id='tooltip-right'>
                                      Actual amount taken for transaction may vary slightly.
                                    </Tooltip> }>
                                    <sup><IoIosInformationCircleOutline /></sup>
                                  </OverlayTrigger>
                                </p>
                              </Container>
                              <Container className="purchase-stocks">
                                <Button id={i.symbol} className="purchase-stocks" variant="warning" size="sm" onClick={() => purchaseStocks(formatId(i.symbol), i.symbol)}>Purchase</Button>
                                <Button id={i.symbol} className="purchase-stocks" variant="secondary" size="sm" onClick={() => toggleInputs(formatId(i.symbol))}>Close</Button>
                              </Container>
                            </InputGroup>
                        </td>
                      </tr>) }
                    </tbody>
                  </Table>
              </Card> : <Container>No stocks available.</Container>}
      </Container>
  )
}

export default StockListPage;