const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find().populate('blogs', { title: 1, author: 1 })
  res.json(users)
})

// eslint-disable-next-line consistent-return
usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (password.length < 3) {
    return res.status(400).json({
      error: 'password length must be a minimum of 3 characters',
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter
