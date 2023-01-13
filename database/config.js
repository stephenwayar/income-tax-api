const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('../utils/config')

const url = config.MONGODB_URI

logger.info("Connecting to database...")

mongoose
  .connect(url)
  .then(() => {
    logger.info("Successfully connected to database ✅")
  }).catch(err => {
  logger.error("Failed to connect to database ❌: ", err.message)
})