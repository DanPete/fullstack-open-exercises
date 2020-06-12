import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { logoutUser } from '../actions/activeUser'
import { setSuccessNotification } from '../actions/notification'
import { Link } from 'react-router-dom'
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavLink,
  Nav,
  NavItem,
  Button
} from 'reactstrap'
import LoginForm from './LoginForm'

const Menu = () => {
  const dispatch = useDispatch()
  const activeUser = useSelector(state => state.activeUser)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setSuccessNotification(`Bye for now ${activeUser.name}`))
  }

  const StyledMenu = styled.div`
    background-color: #4abdac;
    a, span {
      color: white;
      text-decoration: none;
    }
    button {
      margin-right: 20px;
    }
  `

  return (
    <StyledMenu>
      <Container>
        <Navbar>
          <NavbarBrand tag={Link} to="/">
            Bloggy
          </NavbarBrand>
          <Nav className="">
            <NavItem>
              <NavLink tag={Link} to="/">Blogs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/users">Users</NavLink>
            </NavItem>
            {activeUser ? (
              <NavItem>
                <NavbarText
                  tag={Link}
                  to={`/users/${activeUser.id}`}
                >
                  {activeUser.name}
                </NavbarText>
                <Button
                  color="danger"
                  className="ml-2"
                  onClick={handleLogout}
                >Logout</Button>
              </NavItem>
            ) : (
              <NavItem>
                <LoginForm />
              </NavItem>
            )}
          </Nav>
        </Navbar>
      </Container>
    </StyledMenu>
  )
}

export default Menu
