import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { removeBlog, addLikeTo } from '../actions/blog'

function BlogContent({ blog }) {
  const user = useSelector(state => state.activeUser)
  const dispatch = useDispatch()

  const addLike = (id, blog) => {
    dispatch(addLikeTo(id, blog))
  }

  const handleRemoveBlog = (id) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(id))
    }
  }

  return (
    <div className="blogContent">
      <li>Author: {blog.author} </li>
      <li>Link: {blog.url}</li>
      <li>likes {blog.likes} <button onClick={() => addLike(blog.id, blog)}>like</button></li>
      <li>{blog.user.username} </li>
      {user && user.username === blog.user.username &&
        <p>
          <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>
        </p>
      }
    </div>
  )
}

BlogContent.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogContent
