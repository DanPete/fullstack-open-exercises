import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const LoginForm = ({
  submitLogin
}) => {
  const [login, setLogin] = useState({})

  const handleLogin = e => {
    e.preventDefault()
    submitLogin(login)
    setLogin({})
  }

  const handleFormChange = e => {
    setLogin({
      ...login,
      [e.target.name] : e.target.value
    })
  }

  return (
    <Togglable buttonLabel='login'>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={login.username || ''}
            name="username"
            onChange={handleFormChange}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={login.password || ''}
            name="password"
            onChange={handleFormChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  submitLogin: PropTypes.func.isRequired,
}

export default LoginForm
