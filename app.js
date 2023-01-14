require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

require("./database/config")
require("./models/User")

const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth')
const incomeTaxRoute = require('./routes/incomeTax')
const wageRoute = require('./routes/wage')
const { unknownEndpoint, errorHandler } = require('./middlewares/error')
const { tokenExtractor } = require('./middlewares/tokenExtractor')
const { userExtractor } = require('./middlewares/userExtractor')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(tokenExtractor)

app.use(indexRoute)
app.use(authRoute)
app.use(userExtractor, incomeTaxRoute)
app.use(userExtractor, wageRoute)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app