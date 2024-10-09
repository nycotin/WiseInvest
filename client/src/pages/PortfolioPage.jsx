import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

// import { BsBookmark, BsBookmarkFill, BsClipboard2, BsClipboard2Fill } from "react-icons/bs";

import Container from 'react-bootstrap/Container';
import '../App.css';
import '../index.css';


function PortfolioPage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {  
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'none';

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
          setFilteredStocks(response.data.portfolio_data);
        } else {
          setPortfolio([]);
        }
      });
    }

    getStocks();
    getPortfolio();
  }, [])


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

  function navigateToDashboard(){
    navigate('/invest')
    const dashboard = document.querySelector('.dashboard');
    dashboard.style.display = 'block';
  }

  function filterStocks(str){
    if (str !== "all") {
      let data = []
      const filtered = stocks.filter(s => s.market_area === str);
      filtered.forEach(item => {
        const stock = portfolio.filter(i => i.stock_symbol === item.symbol)
        if (stock.length !== 0){
          data.push(stock[0]);
        }
      })
      setFilteredStocks(data);
    } else {
      setFilteredStocks(portfolio)
    }

    // if (str === 'North America'){
    //   setFilteredStocks(portfolio.filter(i => i.stock_symbol === filtered.symbol));
    // } else if (str === 'sa') {
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'South America'));   
    // } else if (str === 'eu'){
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'Europe'));
    // } else if (str === 'as'){
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'Asia'));
    // } else if (str === 'oc'){
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'Oceania'));
    // } else if (str === 'af'){
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'Africa'));
    // } else if (str === 'me'){
    //   setFilteredStocks(portfolio.filter(i => i.market_area === 'Middle East'));
    // } else {
    //   setFilteredStocks(portfolio)
    // }
  }

  function getLink(symbol){
    const stock_item = stocks.filter(item => item.symbol === symbol)
    return stock_item[0].link
  }

  function getCompanyName(symbol){
    const stock_item = stocks.filter(item => item.symbol === symbol)
    return stock_item[0].company_name
  }

  function getMIC(symbol){
    const stock_item = stocks.filter(item => item.symbol === symbol)
    return stock_item[0].exchange_id
  }

  function getCurrencySymbol(symbol){
    const stock_item = stocks.filter(item => item.symbol === symbol)
    return stock_item[0].currency_symbol
  }

  function getMarketArea(symbol){
    const stock_item = stocks.filter(item => item.symbol === symbol)
    return stock_item[0].market_area
  }

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

  return (
      <Container className="portfolio" fluid="md">
        <h2>My Portfolio</h2>
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
            { filteredStocks.length !== 0 ? <Card className="user-stocks">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Exchange MIC</th>
                        <th>Stock Symbol</th>
                        <th>Company Name</th>
                        <th>Quantity</th>
                        <th>Investment</th>
                        <th>Valuation</th>
                        <th>Currency</th>
                        <th>Market Area</th>
                        <th>Growth</th>
                        <th>Growth %</th>
                      </tr>
                    </thead>
                    <tbody>
                      { filteredStocks.map(i => <tr key={i.stock_symbol}>
                        <td>{getMIC(i.stock_symbol)}</td>
                        <td>{i.stock_symbol}</td>
                        <td><Link to={getLink(i.stock_symbol)} target="_blank">{getCompanyName(i.stock_symbol)}</Link></td>
                        <td>{i.quantity}</td>
                        <td>{getCurrencySymbol(i.stock_symbol)} {i.total_investment}</td>
                        <td>{getCurrencySymbol(i.stock_symbol)} {i.total_value}</td>
                        <td>{i.currency}</td>
                        <td>{getMarketArea(i.stock_symbol)}</td>
                        <td>{calculateGrowth(i.total_investment, i.total_value).dir === "up" ? <Badge bg="success">{calculateGrowth(i.total_investment, i.total_value).movement}{getCurrencySymbol(i.stock_symbol)}</Badge> : <Badge bg="danger">{calculateGrowth(i.total_investment, i.total_value).movement}{getCurrencySymbol(i.stock_symbol)}</Badge>}</td>
                        <td>{calculateGrowth(i.total_investment, i.total_value).dir === "up" ? <Badge bg="success">{calculateGrowth(i.total_investment, i.total_value).percent}</Badge> : <Badge bg="danger">{calculateGrowth(i.total_investment, i.total_value).percent}</Badge>}</td>
                      </tr>) }
                    </tbody>
                  </Table>
              </Card> : 'No stocks available.'}
          <Button variant="primary" size="sm" onClick={navigateToDashboard}>Back to Dashboard</Button>
      </Container>
  )
}

export default PortfolioPage;