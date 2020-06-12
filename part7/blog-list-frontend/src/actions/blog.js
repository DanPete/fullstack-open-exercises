import blogService from '../services/blogs'

import { setSuccessNotification, setErrorNotification } from './notification'


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch ({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(object)
      dispatch ({
        type: 'NEW_BLOG',
        data: newBlog
      })
      dispatch(setSuccessNotification(`Aded new blog '${newBlog.title}' by ${newBlog.author}`))
    } catch (err) {
      dispatch(setErrorNotification(err.response.data.error))
    }
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch ({
        type: 'REMOVE_BLOG',
        data: { id }
      })
      dispatch(setSuccessNotification('Deleted Blog'))
    } catch (err) {
      dispatch(setErrorNotification(err.response.data.error))
    }
  }
}

export const addLikeTo = (id, blog) => {
  return async dispatch => {
    const object = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(id, object)
    dispatch ({
      type: 'ADD_LIKE',
      data: { id: updatedBlog.id }
    })
  }
}

export const addCommentTo = (id, content) => {
  return async dispatch => {
    const comment = await blogService.addComment(id, content)
    dispatch ({
      type: 'ADD_COMMENT',
      data: { id, comment }
    })
  }
}