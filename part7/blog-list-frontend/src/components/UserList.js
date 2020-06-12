import React from 'react'
import PageHeading from './PageHeading'
import { Container, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  const handleClick = () => {
    console.log('test')
  }

  return (
    <div>
      <PageHeading content="Users" />
      <Container>
        <Table hover>
          <thead>
            <tr>
              <th>User</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id} onClick={handleClick}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

    </div>
  )
}

export default UserList
