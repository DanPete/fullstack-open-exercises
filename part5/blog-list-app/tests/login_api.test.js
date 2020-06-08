const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)
const User = require('../models/User')


describe('user login', () => {
  beforeEach(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'admin', passwordHash })

    await user.save()
  })
  
  test('should return token if username and password are correct', async () => {
    const userLogin = {
      username: 'admin',
      password: 'secret',
    }

    const res = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.token).toBeDefined()
    expect(res.body.username).toBe(userLogin.username)
  })

  test('should return error if username or password are incorrect', async () => {
    const userLogin = {
      username: 'root',
      password: 'wrong',
    }

    const res = await api
      .post('/api/login')
      .send(userLogin)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toContain('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
