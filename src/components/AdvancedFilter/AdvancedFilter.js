import './AdvancedFilter.css';

import React from 'react';

const AdvancedFilter = ({ searchValue, handleChangeValue }) => {
  return (
    <>
      <form className="filter-container">
        <input
          type="text"
          name="name"
          value={searchValue.name}
          onChange={e => handleChangeValue(e)}
          placeholder="country"
          className="filter-input"
        />
        <input
          type="text"
          name="capital"
          value={searchValue.capital}
          onChange={e => handleChangeValue(e)}
          placeholder="capital"
          className="filter-input"
        />
        <input
          type="number"
          min="0"
          name="population"
          className="filter-input"
          placeholder="population"
          value={searchValue.population}
          onChange={e => handleChangeValue(e)}
        />
      </form>
    </>
  );
};

export default AdvancedFilter;
