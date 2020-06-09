import React from 'react'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const addVote = async (id, anecdote) => {
    props.addVoteTo(id, anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 3)
  }

  return (
    <div>
      {props.anecdotes
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  }
}

export default connect(
  mapStateToProps, 
  { addVoteTo, setNotification}
)(AnecdoteList)
