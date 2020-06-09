import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data
      console.log(action.data)
      return [ ...state, newAnecdote ]
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote  
      )
    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async  dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addVoteTo = (id, anecdote) => {
  return async dispatch => {
    const object = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, object)
    dispatch ({
      type: 'ADD_VOTE',
      data: { id: updatedAnecdote.id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer