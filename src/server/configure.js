const bodyParser = require('body-parser')
// const express = require('express')

const api = require('./api')


module.exports = app => {
  // app.use(express.json())
  app.use(bodyParser.json())
  app.use('/api', api)
}