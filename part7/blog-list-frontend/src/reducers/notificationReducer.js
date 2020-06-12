const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_SUCCESS_NOTIFICATION':
    return { msg: action.notification, status: 'success' }
  case 'SET_ERROR_NOTIFICATION':
    return { msg: action.notification, status: 'error' }
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

export default notificationReducer