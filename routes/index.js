const express = require('express')
const Router = express.Router()

Router.get('/', (_req, res) => {
  res.send(`
    <div style="padding: 5px; font-family: Sans-serif; color: #282A35">
      <h2>Income Tax API</h4>

      <h3>This is a web service API that calculates the tax due when given the annual income.</h6>

      <h3>Check README.md file for guide</h6>
    </div>
  `)
})

module.exports = Router;