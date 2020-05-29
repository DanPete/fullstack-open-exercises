import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';

import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import CountryInfo from './components/CountryInfo'

function App() {
  const [filter, setFilter] = useState('')
  const [countryData, setCountryData] = useState([])
  const [currentCountry, setCurrentCountry] = useState({})
  const [isSearching, setIsSearching] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://restcountries.eu/rest/v2/all')
        setCountryData(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleFilterChange = (e) => {
    setIsSearching(true)
    setFilter(e.target.value)
  }
  
  const handleFilterClear = () => {
    setFilter('')
  }

  const handleShowClick = (e) => {
    setIsSearching(false)
    const foundCountry = countryData.find(country => country.name === e.target.value)
    console.log(foundCountry)
    setCurrentCountry(foundCountry)
  }

  
  // const countriesToShow = countryData.filter(country => country.name.toLowerCase().includes(`${filter.toLowerCase()}`))

  // const countryMatch = countriesToShow.length === 1
  // const selectedCountry = countryMatch && countriesToShow[0]
  
  return (
    <div>
      <Filter 
        filter={filter} 
        handleChange={handleFilterChange}
        handleClick={handleFilterClear}
      />
      <CountriesList 
        countries={countryData} 
        filter={filter}
        isSearching={isSearching}
        handleClick={handleShowClick}
      />
      {!isSearching && <CountryInfo country={currentCountry} />}
    </div>
  );
}

export default App;
