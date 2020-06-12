import loginService from '../services/login'
import blogService from '../services/blogs'

import { setSuccessNotification, setErrorNotification } from './notification'

export const loginUser = (loginObject) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage
        .setItem('loggedBlogAppUser', JSON.stringify(user))
      dispatch ({
        type: 'SET_USER',
        data: user
      })
      dispatch(setSuccessNotification(`Welcome ${user.name}`))
    } catch (err) {
      dispatch(setErrorNotification(err.response.data.error))
    }
  }
}

export const setToken = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage
      .getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await blogService.setToken(user.token)
      dispatch ({
        type: 'SET_USER',
        data: user
      })
    }
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return { type: 'UNSET_USER' }
}