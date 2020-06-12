import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './actions/blog'
import { setToken, logoutUser } from './actions/activeUser'
import { initializeUsers } from './actions/user'
import { setSuccessNotification } from './actions/notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.activeUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setToken())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setSuccessNotification(`Bye for now ${user.name}`))
  }

  return (
    <div>
      <Nav />
      <Notification/>
      {/* {user === null && <LoginForm /> } */}
      {/* { user && <p>Hi {user.name} <button onClick={handleLogout}>Logout</button></p>} */}

      <Switch>
        <Route path="/blogs/:id" component={BlogPost} />
        <Route path="/users/:id" component={User} />
        <Route path="/users" component={UserList} />
        <Route path="/" component={BlogList}/>
      </Switch>
    </div>
  )
}

export default App