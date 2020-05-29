import React from 'react'

const Persons = ({ persons, filter, handleDelete}) => {

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${filter.toLowerCase()}`))

  return (
    <>
      {personsToShow.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          <button 
            style={{ marginLeft: 15}}
            onClick={() => handleDelete(person.id, person.name)}
          >
            delete
          </button>
        </li>
      )}
    </>
  )
}

export default Persons
