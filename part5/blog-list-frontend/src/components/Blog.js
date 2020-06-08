import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BlogContent from './BlogContent'
const Blog = ({ blog, addLike, removeBlog, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlog, setShowBlog] = useState(false)

  const toggleView = () => {
    setShowBlog(!showBlog)
  }

  const toggleText = showBlog ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title}
        <button onClick={toggleView}>{toggleText}</button>
        {showBlog && <BlogContent
          blog={blog}
          user={user}
          updateLike={addLike}
          removeBlog={removeBlog}
        />}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
