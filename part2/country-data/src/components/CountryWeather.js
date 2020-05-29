import React from 'react'

const CountryWeather = ({ weather, capital }) => {
  const { temperature, weather_icons, weather_descriptions, wind_speed, wind_dir} = weather

  return (
    <>
      <h3>Weather in {capital}</h3>
      <p><span className="bold">Temperature:</span> {temperature} Celsius</p>
      <img
        src={weather_icons[0]}
        alt={weather_descriptions[0]}
      />
      <p><span className="bold">Wind:</span> {wind_speed} mph direction {wind_dir}</p>
    </>
  )
}

export default CountryWeather
