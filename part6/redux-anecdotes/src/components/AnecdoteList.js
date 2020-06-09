import React from 'react'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))  
  })

  const dispatch = useDispatch()

  const addVote = async (id, anecdote) => {
    dispatch(addVoteTo(id, anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <div>
      {anecdotes
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
