import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input 
        type="text" 
        name="filter" 
        onChange={({ target }) => props.filterChange(target.value)}
      />
    </div>
  )
}

export default connect(null, { filterChange })(AnecdoteFilter)
