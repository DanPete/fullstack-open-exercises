import React, { useState } from 'react'
import { ListGroupItem, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import BlogContent from './BlogContent'

const Blog = ({ blog }) => {

  // const [showBlog, setShowBlog] = useState(false)

  // const toggleView = () => {
  //   setShowBlog(!showBlog)
  // }

  // const toggleText = showBlog ? 'hide' : 'view'
  return (
    <ListGroupItem className='blog d-flex justify-content-between'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <div>
        {blog.likes ? <Badge color="info" className="mr-2">{blog.likes} Likes</Badge> : null}
        {blog.comments.length ? <Badge>{blog.comments.length} Comments</Badge> : null }
      </div>

      {/* <button onClick={toggleView}>{toggleText}</button>
      {showBlog && <BlogContent blog={blog} />} */}
    </ListGroupItem>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
