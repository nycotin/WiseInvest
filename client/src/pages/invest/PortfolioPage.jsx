import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';

import InvestDashboardButton from '../../components/invest/InvestDashboardButton';
// import FilterButtons from '../../components/invest/FilterButtons';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import '../../index.css';
import '../../invest.css';

function PortfolioPage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

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
      "dir": "",
      "color": ""
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
      data["percent"] = "0%";
    }

    return data;
  }

  // let props = { stocks: stocks, setFiltereedStocks: setFilteredStocks}

  return (
      <Container className="portfolio" fluid="md">
        <h2>My Portfolio</h2>
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
            { filteredStocks.length !== 0 ? <Card className="user-stocks">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="mic">Exchange MIC</th>
                        <th className="symbol">Stock Symbol</th>
                        <th className="company">Company Name</th>
                        <th className="quantity">Quantity</th>
                        <th className="investment">Investment</th>
                        <th className="valuation">Valuation</th>
                        <th className="currency">Currency</th>
                        <th className="market">Market Area</th>
                        <th className="growth">Growth</th>
                        <th className="growth-per">Growth %</th>
                      </tr>
                    </thead>
                    <tbody>
                      { filteredStocks.map(i => <tr key={i.stock_symbol}>
                        <td className="mic">{getMIC(i.stock_symbol)}</td>
                        <td className="symbol">{i.stock_symbol}</td>
                        <td className="company"><Link to={getLink(i.stock_symbol)} target="_blank">{getCompanyName(i.stock_symbol)}</Link></td>
                        <td className="quantity">{i.quantity}</td>
                        <td className="investment">{getCurrencySymbol(i.stock_symbol)} {i.total_investment}</td>
                        <td className="valuation">{getCurrencySymbol(i.stock_symbol)} {i.total_value}</td>
                        <td className="currency">{i.currency}</td>
                        <td className="market">{getMarketArea(i.stock_symbol)}</td>
                        <td className="growth">
                          {calculateGrowth(i.total_investment, i.total_value).dir === "up" ? <Badge bg="success">{calculateGrowth(i.total_investment, i.total_value).movement}{getCurrencySymbol(i.stock_symbol)}</Badge> : null}
                          {calculateGrowth(i.total_investment, i.total_value).dir === "down" ? <Badge bg="danger">{calculateGrowth(i.total_investment, i.total_value).movement}{getCurrencySymbol(i.stock_symbol)}</Badge> : null}
                          {calculateGrowth(i.total_investment, i.total_value).dir === "stable" ? <Badge bg="warning">{calculateGrowth(i.total_investment, i.total_value).movement}{getCurrencySymbol(i.stock_symbol)}</Badge> : null}
                        </td>
                        <td className="growth-per">
                          {calculateGrowth(i.total_investment, i.total_value).dir === "up" ? <Badge bg="success">{calculateGrowth(i.total_investment, i.total_value).percent}</Badge> : null}
                          {calculateGrowth(i.total_investment, i.total_value).dir === "down" ? <Badge bg="danger">{calculateGrowth(i.total_investment, i.total_value).percent}</Badge> : null}
                          {calculateGrowth(i.total_investment, i.total_value).dir === "stable" ? <Badge bg="warning">{calculateGrowth(i.total_investment, i.total_value).percent}</Badge> : null}
                        </td>
                      </tr>) }
                    </tbody>
                  </Table>
              </Card> : <Container>No stocks available.</Container>}
      </Container>
  )
}

export default PortfolioPage;