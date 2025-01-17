import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`you created '${content}'`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}> 
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)
