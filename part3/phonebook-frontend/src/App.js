import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialPersons = await personService.getAll()
        setPersons(initialPersons)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const addName = async (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const isAlreadyAdded = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    // if(isAlreadyAdded) {
    //   // setFilter(`${isAlreadyAdded.name}`)
    //   if(window.confirm(`${ isAlreadyAdded.name } is already aded to phonebook, replace the old number with a new one?`)) {
    //     updateNumber(isAlreadyAdded.id, newNumber)
    //     setSuccessMessage(`Updated ${isAlreadyAdded.name }`)
    //     setTimeout(() => {
    //       setSuccessMessage(null)
    //     }, 3000);
    //   }
    //   // alert(`${isAlreadyAdded.name} is already aded to phonebook`)
    //   return
    // }
    
    try {
      const returnedPerson = await personService.create(newPerson)
      setPersons([...persons, returnedPerson])
      setSuccessMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000);
      setNewName('')
      setNewNumber('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const updateNumber = async (id, number) => {
    const person = persons.find(person => person.id === id)
    const changedNumber = {...person, number}
    try {
      const returnedPerson = await personService.update(id, changedNumber)
      setPersons(persons.map(person => person.id !== id ? person : returnedPerson ))
    } catch (error) {
      console.log(error)
    }
  }
  
  const removeName = async (id, name) => {
    console.log(id)
    if(window.confirm(`Delete ${name}?`)) {
      try {
        const res = await personService.remove(id)
        setPersons(persons.filter(person => person.id !== id ))
        setSuccessMessage(`Deleted ${name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000);
      } catch (error) {
        setErrorMessage(`Info of ${name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000);
        console.log(error)
      }
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm 
        handleSubmit={addName} 
        name={newName} 
        handleName={handleNameChange} 
        number={newNumber} 
        handleNumber={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons} 
        filter={filter} 
        handleDelete={removeName}
      />
    </div>
  )
}

export default App