const express = require('express')
const Router = express.Router()
const { calc_income_tax } = require('../controllers/IncomeTaxController')

Router.post('/api/calc/income_tax', calc_income_tax)

module.exports = Router;