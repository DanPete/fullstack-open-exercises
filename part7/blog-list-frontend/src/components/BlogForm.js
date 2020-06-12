import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'
import Togglable from './Togglable'
import { createBlog } from '../actions/blog'

const BlogForm = () => {
  const dispatch = useDispatch()
  // const [newBlog, setNewBlog] = useState({})

  // const handleBlogFormChange = e => {
  //   setNewBlog({
  //     ...newBlog,
  //     [e.target.name] : e.target.value
  //   })
  // }

  const blogFormRef = React.createRef()

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    dispatch(createBlog(newBlog))
    e.target.reset()
    blogFormRef.current.toggleVisibility()
  }


  return (
    <Container className="mb-4">
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <div className="formDiv">
          <h2>New post</h2>
          <Form onSubmit={addBlog}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
              />
              <Label>Author</Label>
              <Input
                type="text"
                name="author"
              />
              <Label>Link</Label>
              <Input
                type="text"
                name="url"
              />
            </FormGroup>
            <Button color="primary" type="submit">post</Button>
          </Form>
        </div>
      </Togglable>
    </Container>

  )
}

export default BlogForm