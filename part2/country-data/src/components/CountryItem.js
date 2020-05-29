import React from 'react'


const styles = {
  display: 'flex',
  gridTemplateColumns: '1fr 1fr',
  maxWidth: 200,
  alignItems: 'center',
  justifyContent: 'space-between'
}

const CountryItem = ({country, handleClick}) => {

  return (
    <div style={styles}>
      <p key={country.name}>{country.name}</p>
      <button value={country.name} onClick={handleClick}>
        show
      </button>
    </div>
  )
}

export default CountryItem
