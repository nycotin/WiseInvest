import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import '../../styles/index.css';
import '../../styles/invest.css';

function FilterButtons({ stocks, setFilteredStocks }) {
  const market_areas = ['All Markets', 'North America', 'South America', 'Europe', 'Middle East', 'Africa', 'Asia', 'Oceania'];

  function filterStocks(str){
    if (str !== "All Markets") {
      setFilteredStocks(stocks.filter(s => s.market_area === str));
    } else {
      setFilteredStocks(stocks);
    }
  }

  return (
    <Container id="filter-buttons" className="my-2">
      { market_areas.map(area => <Button key={area} variant="secondary" size="sm" onClick={() => filterStocks(area)}>{area}</Button>) }
    </Container>
  )
}

export default FilterButtons;

FilterButtons.propTypes = {
  stocks: PropTypes.array.isRequired,
  setFilteredStocks: PropTypes.func.isRequired
};