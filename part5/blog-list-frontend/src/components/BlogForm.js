import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Togglable from './Togglable'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({})

  const handleBlogFormChange = e => {
    setNewBlog({
      ...newBlog,
      [e.target.name] : e.target.value
    })
  }
  const blogFormRef = React.createRef()

  const addBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog)
    blogFormRef.current.toggleVisibility()
    setNewBlog({})
  }


  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div className="formDiv">
        <h2>create new post</h2>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
              type="text"
              value={newBlog.title || ''}
              name="title"
              onChange={handleBlogFormChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={newBlog.author || ''}
              name="author"
              onChange={handleBlogFormChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={newBlog.url || ''}
              name="url"
              onChange={handleBlogFormChange}
            />
          </div>
          <button type="submit">post</button>
        </form>
      </div>
    </Togglable>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm