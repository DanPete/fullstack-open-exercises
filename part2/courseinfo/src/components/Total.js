import React from 'react'

function Total({ parts }) {
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0)

  return (
    <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
  )
}

export default Total
