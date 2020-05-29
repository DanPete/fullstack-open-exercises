import React from 'react'
import CountryItem from './CountryItem'

const CountriesList = ({ countries, filter, handleClick, isSearching }) => {

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(`${filter.toLowerCase()}`))

  const tooManyCountries = countriesToShow.length >= 50

  return (
    <div>
      {tooManyCountries ? (
        <p>Too many matches, please refine filter</p>
      ) : (
        isSearching && countriesToShow.map(country =>
          <CountryItem 
            key={country.name} 
            country={country}
            handleClick={handleClick}
          />
        )
      )}
      {!countriesToShow.length && <p>No results, try another search</p>}
    </div>
  )
}

export default CountriesList
