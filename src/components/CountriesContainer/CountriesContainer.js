import './CountriesContainer.css';

import React, { useEffect, useReducer, useRef, useState } from 'react';

import { getAllCountries } from '../../calls/countries';
import AdvancedFilter from '../AdvancedFilter';
import CountryCard from '../CountryCard';

const CountriesContainer = () => {
  const [countries, setCountries] = useState([]);
  const componentIsMounted = useRef(true);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      capital: '',
      population: '',
    }
  );

  useEffect(() => {
    getAllCountries()
      .then(response => {
        if (componentIsMounted.current) {
          setCountries(response);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const handleFilterCountries = event => {
    const { name, value } = event.target;
    setFilterInput({ [name]: value });
  };

  const filterCountries = list => {
    return list.filter(item => {
      return (
        item.name.toLowerCase().includes(filterInput.name.toLowerCase()) &&
        item.capital
          .toLowerCase()
          .includes(filterInput.capital.toLowerCase()) &&
        item.population >= filterInput.population
      );
    });
  };

  // passing countries state as an argument
  const countriesList = filterCountries(countries);

  return (
    <>
      <AdvancedFilter
        searchValue={filterInput}
        handleChangeValue={handleFilterCountries}
      />
      <div className="countries-container">
        {countriesList.map(country => (
          <CountryCard key={country.numericCode} country={country} />
        ))}
      </div>
    </>
  );
};

export default CountriesContainer;
