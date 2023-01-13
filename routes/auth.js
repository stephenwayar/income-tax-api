const express = require('express')
const Router = express.Router()
const { login_user, register_user } = require('../controllers/AuthController')

Router.post('/api/auth/login/user', login_user)

Router.post('/api/auth/register/user', register_user)

module.exports = Router;