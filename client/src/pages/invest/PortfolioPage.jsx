import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { calculateGrowth } from '../../utils/functions';

import BackToDashboardButton from '../../components/BackToDashboardButton';
import FilterButtons from '../../components/invest/FilterButtons';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import '../../styles/index.css';
import '../../styles/invest.css';

function PortfolioPage() {
  const [,portfolio] = useOutletContext();
  const [filteredStocks, setFilteredStocks] = useState(portfolio);

  useEffect(() => {  
    setFilteredStocks(portfolio);

  }, [portfolio])

  return (
      <Container className="portfolio" fluid="md">
        <h2>My Portfolio</h2>
        <BackToDashboardButton app='invest' />
        <FilterButtons stocks={portfolio} setFilteredStocks={setFilteredStocks} />
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
              { filteredStocks.map(i => <tr key={i.symbol}>
                <td className="mic">{i.exchange}</td>
                <td className="symbol">{i.symbol}</td>
                <td className="company"><Link to={`https://finance.yahoo.com/quote/${i.symbol}`} target="_blank">{i.company_name}</Link></td>
                <td className="quantity">{i.quantity}</td>
                <td className="investment">{i.currency_symbol} {i.total_investment}</td>
                <td className="valuation">{i.currency_symbol} {i.total_value}</td>
                <td className="currency">{i.currency}</td>
                <td className="market">{i.market_area}</td>
                <td className="growth">
                  {calculateGrowth(i.total_investment, i.total_value).dir === "up" ? <Badge bg="success">{calculateGrowth(i.total_investment, i.total_value).movement} {i.currency_symbol}</Badge> : null}
                  {calculateGrowth(i.total_investment, i.total_value).dir === "down" ? <Badge bg="danger">{calculateGrowth(i.total_investment, i.total_value).movement} {i.currency_symbol}</Badge> : null}
                  {calculateGrowth(i.total_investment, i.total_value).dir === "stable" ? <Badge bg="warning">{calculateGrowth(i.total_investment, i.total_value).movement} {i.currency_symbol}</Badge> : null}
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