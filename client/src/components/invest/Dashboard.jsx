import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate, groupStocks } from '../../utils/functions';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import '../../styles/index.css';
import '../../styles/invest.css';

function Dashboard({ transactions, portfolio }) {

  return (
    <Container className="dashboard">
        <h2>Dashboard</h2>
        <Container id="invest-dashboard">
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
                  { portfolio.map(i => <tr key={i.symbol}>
                    <td>{i.symbol}</td>
                    <td><Link to={`https://finance.yahoo.com/quote/${i.symbol}`} target="_blank">{i.company_name}</Link></td>
                    <td>{i.quantity}</td>
                  </tr>) }
                </tbody>
              </Table>
              : 'No stocks.' }
          </Card>
          <Container className="stats">
            <Card className="increased-since-purchase">
              <Card.Title>Increased <sub><Badge bg="success">{ groupStocks('up', portfolio).length }</Badge></sub></Card.Title>
              { groupStocks('up', portfolio).length !== 0 ? groupStocks('up', portfolio).map(i => <li key={i.symbol}>{i.company_name}</li>) : 'No stocks.' }
            </Card>
            <Card className="decreased-since-purchase">
              <Card.Title>Decreased <sub><Badge bg="danger">{ groupStocks('down', portfolio).length }</Badge></sub></Card.Title>
              { groupStocks('down', portfolio).length !== 0 ? groupStocks('down', portfolio).map(i => <li key={i.symbol}>{i.company_name}</li>) : 'No stocks.' }
            </Card>
            <Card className="stable-since-purchase">
              <Card.Title>Stable <sub><Badge bg="warning">{ groupStocks('stable', portfolio).length }</Badge></sub></Card.Title>
              { groupStocks('stable', portfolio).length !== 0 ? groupStocks('stable', portfolio).map(i => <li key={i.symbol}>{i.company_name}</li>) : 'No stocks.' }
            </Card>
          </Container>
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
                  <td>{formatDate(i.purchased_on)}</td>
                  <td>{i.stock_id}</td>
                  <td>{i.company_name}</td>
                  <td>{i.currency_symbol} {i.price_on_purchase}</td>
                  <td>{i.quantity}</td>
                  <td>{i.currency_symbol} {i.total_expense}</td>
                </tr>) }
              </tbody>
            </Table>
          </Card>
        </Container>
    </Container>
  )
}

export default Dashboard;

Dashboard.propTypes = {
  transactions: PropTypes.array.isRequired,
  portfolio: PropTypes.array.isRequired,
  filter: PropTypes.func
};