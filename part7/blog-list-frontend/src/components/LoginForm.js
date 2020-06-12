import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import styled from 'styled-components'
import { loginUser } from '../actions/activeUser'
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState({})

  const handleLogin = e => {
    e.preventDefault()
    dispatch(loginUser(login))
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
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            value={login.username || ''}
            name="username"
            onChange={handleFormChange}
          />
          <Label>Password</Label>
          <Input
            type="password"
            value={login.password || ''}
            name="password"
            onChange={handleFormChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">login</Button>
      </Form>
    </Togglable>
  )
}

export default LoginForm
