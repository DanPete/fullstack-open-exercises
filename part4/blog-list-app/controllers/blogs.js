/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
// const logger = require('../utils/logger')

const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find().populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer')) {
//     return authorization.substring(7)
//   }
//   return null
// }

// eslint-disable-next-line consistent-return
blogsRouter.post('/', async (req, res) => {
  const {
    title, author, url, likes,
  } = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).send('not found')
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const {
    title, author, url, likes,
  } = req.body

  const blog = {
    title,
    author,
    url,
    likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(id)
  if (decodedToken.id !== blog.user.toString()) {
    return res.status(401).json({ error: 'unauthorized action' })
  }

  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

module.exports = blogsRouter
