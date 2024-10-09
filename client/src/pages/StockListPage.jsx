import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { BsCart } from "react-icons/bs";

import Container from 'react-bootstrap/Container';
import '../App.css';
import '../index.css';


function StockListPage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

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

  function getCurrentPrice(){
    stocks.forEach(item => {
      axios.get(`/invest/get-current-price/${item.symbol}`)
      .then(response => {
        item["current_price"] = response.data.current_price
      })
    })
  }

  getCurrentPrice();

  //? TBD structure toggle watchlist as favorites courses
  // function toggleWatchlist(course){
  //   axios.post()
  //   .then(response => {
  //     console.log(response.data.message);

  //     if(response.data.action === 'Remove'){
  //       setUserFavs(userFavs.filter(i => i.id !== course.id));
  //     } else {
  //       setUserFavs([...userFavs, course]);
  //     }
  //   });
  // }

  // function togglePurchase(stock){
  //   axios.post(`/invest/stocks/${stock.stock}/toggle-purchase`)
  //   .then(response => {
  //     console.log(response.data.message);
      
  //     if(response.data.action === 'Sell'){
  //       setUserStocks(userStocks.filter(i => i.stock_name !== stock.symbol));
  //     } else {
  //       stock.status = 'Purchase';
  //       setUserStocks([...userStocks, stock]);
  //     }
  //   });
  // }

  //? TBD if watchlist is added
  // function isWatched(stock){
  //   const fav = userFavs.find(f => { return f.id === course.id })

  //   if(fav){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // function isUserStock(stock){
  //   const isStock = userStocks.find(s => { return s.stock_name === stock.symbol })

  //   if(isStock){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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

  function navigateToDashboard(){
    navigate('/invest')
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'block';
  }

  function filterStocks(str){
    if (str !== "all") {
      setFilteredStocks(stocks.filter(s => s.market_area === str));
    } else {
      setFilteredStocks(stocks);
    }
  }

  function makePurchasable(id){
    const cartButton = document.querySelector(`#${id}.make-purchase`);
    cartButton.setAttribute('hidden', 'true');

    const purchaseInputs = document.querySelector(`#${id}.purchase-inputs`);
    purchaseInputs.removeAttribute('hidden');
  }

  function toggleInputs(id){
    const cartButton = document.querySelector(`#${id}.make-purchase`);
    cartButton.removeAttribute('hidden');

    const inputs = document.querySelector(`#${id}.purchase-inputs`);
    inputs.setAttribute('hidden', 'true');
  }

  function purchaseStocks(id){
    const purchaseInputs = document.querySelector(`#${id}.purchase-inputs`);
    purchaseInputs.setAttribute('hidden', 'true');

    const cartButton = document.querySelector('.make-purchase');
    cartButton.removeAttribute('hidden');

    const quantity = purchaseInputs.querySelector('#quantity').value;

    axios.post(`/invest/purchase-stocks/${id}/${quantity}`)
    .then(response => {
      setToastMessage(response.data.message)
    })
  }

  return (
      <Container className="stock-list" fluid="md">
        <h2>Browse Stocks</h2>
        { toastMessage !== '' ? createToast() : null}
        <div className="filter-buttons">
          <Button variant="secondary" size="sm" onClick={() => filterStocks('North America')}>North America</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('South America')}>South America</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Europe')}>Europe</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Middle East')}>Middle East</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Africa')}>Africa</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Asia')}>Asia</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('Oceania')}>Oceania</Button>
          <Button variant="secondary" size="sm" onClick={() => filterStocks('all')}>All Markets</Button>
        </div>
            { filteredStocks.length !== 0 ? <Card className="all-stocks">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Exchange MIC</th>
                        <th>Stock Symbol</th>
                        <th>Company Name</th>
                        <th>Current Price</th>
                        <th>Currency</th>
                        <th>Market Area</th>
                      </tr>
                    </thead>
                    <tbody>
                      { filteredStocks.map(i => <tr key={i.symbol}>
                        <td>{i.exchange_id}</td>
                        <td>{i.symbol}</td>
                        <td><Link to={i.link} target="_blank">{i.company_name}</Link></td>
                        <td className="current-price">{i.currency_symbol} {i.current_price}</td>
                        <td>{i.currency}</td>
                        <td>{i.market_area}</td>
                        <td><Button id={i.symbol} className="make-purchase" variant="secondary" size="sm" onClick={() => makePurchasable(i.symbol)}><BsCart /></Button>
                            <InputGroup id={i.symbol} className="purchase-inputs" hidden={true}>
                              <div className="mb-2">
                                <label htmlFor="quantity">Quantity:</label>
                                <input type="number" id="quantity" className="form-control" min={1} max={100} defaultValue={1} />
                              </div>
                              <p className="mb-2">
                                Total: {i.currency_symbol} {i.current_price}
                              </p>
                              <Button id={i.symbol} className="purchase-stocks" variant="warning" size="sm" onClick={() => purchaseStocks(i.symbol)}>Purchase</Button>
                              <Button id={i.symbol} className="purchase-stocks" variant="secondary" size="sm" onClick={() => toggleInputs(i.symbol)}>Close</Button>
                            </InputGroup>
                        </td>
                      </tr>) }
                    </tbody>
                  </Table>
              </Card> : 'No stocks available.'}
          <Button variant="primary" size="sm" onClick={navigateToDashboard}>Back to Dashboard</Button>
      </Container>
  )
}

export default StockListPage;