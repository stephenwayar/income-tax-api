const api = require('../helpers/api')
const logger = require('../../utils/logger')
const mongoose = require('mongoose')

describe('Auth-login', () => {
  test('login user with right credentials', async () => {
    const user = {
      email: 'stephenbuluswayar@gmail.com',
      password: 'stephenbuluswayar@gmail.com'
    }

    await api
      .post('/api/auth/login/user')
      .send(user)
      .set("Accept", "application/json")
      .expect(response => logger.info(response))
      .expect(200)
  }, 50000)

  test.only('attempt login with wrong credentials', async () => {
    const user = {
      email: 'stephenbuluswayar@gmail.com',
      password: 'wrongpassword'
    }

    await api
      .post('/api/auth/login/user')
      .send(user)
      .set("Accept", "application/json")
      .expect(response => logger.info(response))
      .expect(401)
  }, 50000)
})

describe('Auth-register', () => {
  test('register new user', async () => {
    const user = {
      firstName: 'stephen',
      lastName: 'bulus',
      email: 'stephenbuluswayar@gmail.com',
      password: 'stephenbuluswayar@gmail.com',
    }

    await api
      .post('/api/auth/register/user')
      .send(user)
      .set("Accept", "application/json")
      .expect(response => logger.info(response))
      .expect(201)
  }, 100000)

  test('attempt registering new user with errored credentials', async () => {
    const user = {
      firstName: 'J',
      lastName: 'Ryan',
      email: 'telahapp@gmail.com',
      password: 'somePaSSw$rd'
    }

    await api
      .post('/api/auth/register/user')
      .send(user)
      .set("Accept", "application/json")
      .expect(response => logger.info(response))
      .expect(400)
  }, 50000)

  afterAll(() => {
    mongoose.connection.close()
  })
})