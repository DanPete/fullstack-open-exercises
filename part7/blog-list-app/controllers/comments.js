/* eslint-disable no-underscore-dangle */
const commentsRouter = require('express').Router()
// const logger = require('../utils/logger')

const Comment = require('../models/Comment')
const Blog = require('../models/Blog')

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find()
  res.json(comments)
})

// eslint-disable-next-line consistent-return
commentsRouter.post('/', async (req, res) => {
  const { content } = req.body

  // const decodedToken = jwt.verify(req.token, process.env.SECRET)
  // if (!req.token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }

  const blog = await Blog.findById(req.params.id)

  const comment = new Comment({
    content,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  res.status(201).json(savedComment)
})

// blogsRouter.get('/:id', async (req, res) => {
//   const { id } = req.params

//   const blog = await Blog.findById(id)
//   if (blog) {
//     res.json(blog)
//   } else {
//     res.status(404).send('not found')
//   }
// })

// blogsRouter.put('/:id', async (req, res) => {
//   const { id } = req.params
//   const {
//     title, author, url, likes,
//   } = req.body

//   const blog = {
//     title,
//     author,
//     url,
//     likes,
//   }

//   const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
//   res.json(updatedBlog)
// })

// blogsRouter.delete('/:id', async (req, res) => {
//   const { id } = req.params

//   const decodedToken = jwt.verify(req.token, process.env.SECRET)
//   if (!req.token || !decodedToken.id) {
//     return res.status(401).json({ error: 'token missing or invalid' })
//   }

//   const user = await User.findById(decodedToken.id)
//   const blog = await Blog.findById(id)
//   if (decodedToken.id !== blog.user.id) {
//     return res.status(401).json({ error: 'unauthorized action' })
//   }

//   await Blog.findByIdAndRemove(id)
//   res.status(204).end()
// })

// // blogsRouter.delete('/', async (req, res) => {
// //   await Blog.deleteMany()

// //   res.status(204).end()
// // })

module.exports = commentsRouter
