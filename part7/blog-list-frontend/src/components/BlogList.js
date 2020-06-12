import React from 'react'
import { Container, ListGroup } from 'reactstrap'
import { useSelector } from 'react-redux'
import PageHeading from './PageHeading'
import BlogForm from './BlogForm'

import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const activeUser = useSelector(state => state.activeUser)

  return (
    <div>
      <PageHeading content="Blogs"/>
      {activeUser && <BlogForm />}
      <Container>
        <ListGroup className="blog-list">
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
              />
            )}
        </ListGroup>
      </Container>
    </div>
  )
}

export default BlogList
