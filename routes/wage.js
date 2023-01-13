const express = require('express')
const Router = express.Router()
const { 
    get_wages,
    get_wage,
    create_wage,
    update_wage,
    delete_wage
 } = require('../controllers/WageController')

Router.get('/api/wages', get_wages)

Router.get('/api/wages/:id', get_wage)

Router.post('/api/wages', create_wage)

Router.put('/api/wages/:id', update_wage)

Router.delete('/api/wages/:id', delete_wage)

module.exports = Router