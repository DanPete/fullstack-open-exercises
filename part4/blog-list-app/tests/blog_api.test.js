/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/User')

beforeEach(async () => {
  await Blog.deleteMany()
  await User.deleteMany()

  // eslint-disable-next-line no-restricted-syntax
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((res) => res.title)

    expect(titles).toContain('HTML is easy')
  })

  test('blog unique identifier is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart[0].id).toBeDefined()
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    // console.log(blogToView._id)

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const user = await helper.createUser('dan', 'test')
    const token = await helper.getToken(user.username, user._id)

    const newBlog = {
      title: 'async/await',
      author: 'async',
      url: 'www....com',
      likes: 10,
      user: user._id,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((res) => res.title)
    expect(titles).toContain('async/await')
  })

  test('a valid blog cannot be added without auth', async () => {
    const newBlog = {
      title: 'async/await',
      author: 'async',
      url: 'www....com',
      likes: 10,
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(res.body.error).toContain('invalid token')
  })

  test('blog without content is not added', async () => {
    const user = await helper.createUser('dan', 'test')
    const token = await helper.getToken(user.username, user._id)

    const newBlog = {
      author: 'async',
      url: 'www....com',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog likes defaults to 0', async () => {
    const user = await helper.createUser('dan', 'test')
    const token = await helper.getToken(user.username, user._id)

    const newBlog = {
      title: 'async/await',
      author: 'async',
      url: 'www....com',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toBe(0)
  })
})

describe('update of a blog', () => {
  test('a blogs likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const { title, author, url } = blogToUpdate

    const updateBlog = {
      title,
      author,
      url,
      likes: 500,
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(updatedBlog.body.likes).toBe(500)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const user = await helper.createUser('dan', 'test')
    const token = await helper.getToken(user.username, user._id)

    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'To delete',
      author: 'async',
      url: 'www....com',
      likes: 50,
    }

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)

    console.log(savedBlog.body)
    const blogToDelete = savedBlog.body


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((blog) => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
