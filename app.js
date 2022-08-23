const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(express.json());
require('express-async-errors');

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use('/api/blogs', blogsRouter);

module.exports = app;