const _ = require('lodash')

const dummy = (blog) => 1

const totalLikes = (blogs) => blogs.reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((prev, curr) => ((prev.likes > curr.likes) ? prev : curr))
  const { title, author, likes } = mostLikes
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const result = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .max()
    .value()

  const [author, count] = result

  return { author, blogs: count }
}

const mostLikes = (blogs) => {
  const result = _.chain(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author,
      likes: _.sumBy(blog, 'likes'),
    }))
    .reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
    .value()

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
