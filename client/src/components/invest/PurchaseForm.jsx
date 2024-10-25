import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { BsCart } from 'react-icons/bs';
import { IoIosInformationCircleOutline } from 'react-icons/io';

import '../../styles/index.css';
import '../../styles/invest.css';

function PurchaseForm({ stock, setToastMessage }) {
  const [isClicked, setIsClicked] = useState(false);
  const [total, setTotal] = useState(0);
  const inputRef = useRef(1);

  function makeTotal(e){
    const quantity = e.target.value;
    const currentPrice = stock.current_price;
    const tot = currentPrice * quantity;
    setTotal(tot.toFixed(2));
  }

  function purchaseStocks(stockSymbol){
    const quantity = inputRef.current.value;

    axios.post(`/invest/purchase-stocks/${stockSymbol}/${quantity}`)
    .then(response => {
      setToastMessage(response.data.message);
      setTotal(0);
      setIsClicked(false);
    })
  }

  return (
    <>
      { isClicked === false ? 
        <Button className="make-purchase" variant="secondary" size="sm" onClick={() => setIsClicked(true)}><BsCart /></Button> :
        <InputGroup className="purchase-inputs">
          <Container className="quantity mb-2">
            <label htmlFor="quantity">Quantity:</label>
            <input ref={inputRef} type="number" name="quantity" className="form-control" min={1} max={100} defaultValue={1} onChange={(e) => makeTotal(e)} />
          </Container>
          <Container className="total-expense">
            <p className="mb-2">
              Total: {stock.currency_symbol} <span>{ total !== 0 ? total : stock.current_price }</span>
              <OverlayTrigger key="overlay" placement="right" overlay={
                <Tooltip id='tooltip-right'>
                  Current price may vary slightly.
                </Tooltip> }>
                <sup><IoIosInformationCircleOutline /></sup>
              </OverlayTrigger>
            </p>
          </Container>
          <Container className="purchase-stocks">
            <Button className="purchase-stocks" variant="warning" size="sm" onClick={() => purchaseStocks(stock.symbol)}>Purchase</Button>
            <Button className="purchase-stocks" variant="secondary" size="sm" onClick={() => setIsClicked(false)}>Close</Button>
          </Container>
        </InputGroup> 
      }
    </>
  )
}

export default PurchaseForm;

PurchaseForm.propTypes = {
  stock: PropTypes.object.isRequired,
  setToastMessage: PropTypes.func.isRequired
};