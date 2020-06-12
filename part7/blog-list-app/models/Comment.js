/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// function autoPopulateUser(next) {
//   this.populate('user', { username: 1, name: 1 })
//   next()
// }

// function autoPopulateUserOnSave(next) {
//   this.execPopulate('user', { username: 1, name: 1 })
//   next()
// }


// BlogSchema
//   .pre('find', autoPopulateUser)
//   .pre('findOne', autoPopulateUser)
//   .pre('save', autoPopulateUserOnSave)

module.exports = mongoose.model('Comment', CommentSchema)
