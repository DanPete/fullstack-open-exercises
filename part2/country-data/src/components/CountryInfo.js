import React, {useState, useEffect} from 'react'
import axios from 'axios'

import CountryWeather from './CountryWeather'

const CountryInfo = ({ country }) => {
  const { name, nativeName, capital, population, languages, flag} = country

  const [countryWeather, setCountryWeather] = useState({})

  useEffect(() => {
    console.log(`loaded ${name}`)
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${name}`
    const fetchWeather = async () => {
      const result = await axios.get(url)
      console.log(result.data)
      setCountryWeather(result.data.current)
    }
    fetchWeather()
  }, [])


  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  const hasWeather = countryWeather && countryWeather.constructor === Object && Object.keys(countryWeather).length
  console.log(hasWeather)

  return (
    <div>
      <h2>{name}</h2>
      <h3>{nativeName}</h3>
      <br />
      <p>Capital: {capital}</p>
      <p>Population: {numberWithCommas(population)}</p>
      <br />
      <h3>Languages</h3>
      <ul>
      {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}

      </ul>

      <img src={flag} alt={`${name} flag`} style={{maxWidth: 250}}/>
      {hasWeather 
        ? <CountryWeather 
            weather={countryWeather} 
            capital={capital}
          />
        : <div className="lds-dual-ring"></div>}
    </div>
  )
}

export default CountryInfo
