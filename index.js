const serverless = require('serverless-http');
const express = require('express')
const getAny = express()

getAny.get('/', function (req, res) {
  res.send('Hello World!')
})

module.exports.handler = serverless(getAny);