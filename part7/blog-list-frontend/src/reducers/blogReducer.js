const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG': {
    const newBlog = action.data
    return [ ...state, newBlog ]
  }
  case 'ADD_LIKE': {
    const id = action.data.id
    const blogToUpdate = state.find(blog => blog.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : updatedBlog )
  }
  case 'ADD_COMMENT': {
    const id = action.data.id
    console.log(id)
    const blogToUpdate = state.find(blog => blog.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      comments: [ ...blogToUpdate.comments, action.data.comment ]
    }
    return state.map(blog => blog.id !== id ? blog : updatedBlog )
  }
  case 'REMOVE_BLOG': {
    const id = action.data.id
    return state.filter(blog => blog.id !== id)
  }
  default:
    return state
  }
}

export default blogReducer