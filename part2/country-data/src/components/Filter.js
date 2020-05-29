import React from 'react'

const Filter = ({ filter, handleChange, handleClick }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <button onClick={handleClick}>clear</button>
    </div>
  )
}

export default Filter
