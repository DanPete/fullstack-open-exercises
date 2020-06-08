import React from 'react'
import PropTypes from 'prop-types'

function BlogContent({ blog, user, updateLike, removeBlog }) {
  const addLike = () => {
    const { title, author, url, likes, id } = blog

    const updatedBlog = {
      title,
      author,
      url,
      likes: likes + 1
    }
    updateLike(id, updatedBlog)
  }

  const handleRemoveBlog = (id) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(id)
    }
  }

  return (
    <div className="blogContent">
      <li>Author: {blog.author} </li>
      <li>Link: {blog.url}</li>
      <li>likes {blog.likes} <button onClick={addLike}>like</button></li>
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
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogContent
