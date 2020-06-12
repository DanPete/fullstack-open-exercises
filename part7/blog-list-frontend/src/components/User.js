import React from 'react'
import { Container, ListGroup, ListGroupItem } from 'reactstrap'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'

import PageHeading from './PageHeading'

const User = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if(!user) {
    return null
  }

  return (
    <div>
      <PageHeading content={user.name} />
      <Container>
        <h3>Added Blogs</h3>
        <ListGroup>
          {user.blogs.map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <ListGroupItem>{blog.title}</ListGroupItem>
            </Link>
          )}
        </ListGroup>
      </Container>

    </div>
  )
}

export default User
