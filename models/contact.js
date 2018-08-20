const mongoose = require('mongoose')
const config = require('../config.js')
const url = `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.ds}.mlab.com:${config.mongo.port}/${config.mongo.project}`

mongoose.connect(url, {
    useNewUrlParser: true
})

const Contact = mongoose.model('Contact', {
  name: String,
  number: String,
  id: Number
})

module.exports = Contact