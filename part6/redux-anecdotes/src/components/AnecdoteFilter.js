import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  return (
    <div style={{ marginBottom: 10 }}>
      filter
      <input 
        type="text" 
        name="filter" 
        onChange={({ target }) => dispatch(filterChange(target.value))}
      />
    </div>
  )
}

export default AnecdoteFilter
