/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

BlogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

function autoPopulateUser(next) {
  this.populate('user', { username: 1, name: 1 })
  this.populate('comments', { content: 1, date: 1 })
  next()
}

function autoPopulateUserOnSave(next) {
  this.execPopulate('user', { username: 1, name: 1 })
  next()
}


BlogSchema
  .pre('find', autoPopulateUser)
  .pre('findOne', autoPopulateUser)
  .pre('save', autoPopulateUserOnSave)

module.exports = mongoose.model('Blog', BlogSchema)
