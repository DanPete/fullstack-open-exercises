let timer = null

export const setSuccessNotification = (notification, seconds = 5) => {
  clearInterval(timer)
  return dispatch => {
    dispatch({
      type: 'SET_SUCCESS_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, seconds * 1000)
  }
}

export const setErrorNotification = (notification, seconds = 5) => {
  clearInterval(timer)
  return dispatch => {
    dispatch({
      type: 'SET_ERROR_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, seconds * 1000)
  }
}