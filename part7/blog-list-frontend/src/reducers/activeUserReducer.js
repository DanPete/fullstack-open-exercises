const activeUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'UNSET_USER':
    return null
  default:
    return state
  }
}

export default activeUserReducer