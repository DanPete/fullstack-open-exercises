const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return state = null
    default:
      return state
  }
}

let timer = null
export const setNotification = (notification, seconds = 5) => {
  clearInterval(timer)
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION'})
    }, seconds * 1000);
  }
}

export default notificationReducer