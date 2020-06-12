import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Form, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem } from 'reactstrap'
import styled from 'styled-components'
import { addLikeTo, addCommentTo, removeBlog } from '../actions/blog'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { formatDistance, parseISO } from 'date-fns'

const BlogPost = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const activeUser = useSelector(state => state.activeUser)
  const match = useRouteMatch('/blogs/:id')
  const history = useHistory()

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null


  const addLike = (id, blog) => {
    dispatch(addLikeTo(id, blog))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = { content: e.target.comment.value }

    dispatch(addCommentTo(blog.id, content))
    e.target.reset()
  }

  const handleRemoveBlog = (id) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(id))
      history.push('/')
    }
  }

  const formatDate = (time) => {
    console.log(time)
    const parsed = parseISO(time)
    return formatDistance(parsed, Date.now(), { addSuffix: true })
  }

  const StyledButton = styled(Button)`
    width: 300px;
  `

  if (!blog) {
    return null
  }


  return (
    <Container className="mt-5">
      <h1>{blog.title}</h1>
      <h3>by {blog.author}</h3>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <span className="d-flex align-items-center">
        <p className="mb-0 mr-3">{blog.likes} likes</p>
        <Button color="primary" onClick={() => addLike(blog.id, blog)}>👍</Button>
      </span>
      <p>
        <span>added by </span>
        <Link to={`/users/${blog.user.id}`}>
          {blog.user.username}
        </Link>
      </p>
      <div>
        <h3>Comments</h3>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <Input type="text" name="comment"/>
              <StyledButton type="submit" value="add comment">Add Comment</StyledButton>
            </InputGroupAddon>
          </InputGroup>
        </Form>
        <ListGroup className="mt-3">
          {blog.comments
            .sort((a,b) => new Date(b.date) - new Date(a.date))
            .map(comment =>
              <ListGroupItem key={comment.id}>{comment.content} - {formatDate(comment.date)}</ListGroupItem>
            )}
        </ListGroup>
        {activeUser && activeUser.username === blog.user.username &&
          <Button className="mt-5" color="danger" onClick={() => handleRemoveBlog(blog.id)}>Delete Blog</Button>
        }
      </div>
    </Container>
  )
}

export default BlogPost
