const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Test',
    url: 'www....com',
    likes: 5,
  },
  {
    title: 'Browsers can execute only JavaScript',
    author: 'Testing',
    url: 'www....com',
    likes: 10,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find()
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find()
  return users.map((user) => user.toJSON())
}

const createUser = async (username, password) => {
  await User.deleteMany()

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username, passwordHash })

  const savedUser = await user.save()
  return savedUser
}

const getToken = async (username, id) => {
  const userForToken = {
    username,
    id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return token
}


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createUser,
  getToken,
}
