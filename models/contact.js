const mongoose = require('mongoose')
const config = require('../config.js')
const url = `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.ds}.mlab.com:${config.mongo.port}/${config.mongo.project}`

const formatContact = (contact) => {
  const formattedContact = { ...contact._doc, id: contact._id }
  delete formattedContact._id
  delete formattedContact.__v
  return formattedContact
}

mongoose.connect(url, {
    useNewUrlParser: true
})



const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

contactSchema.statics.format = formatContact
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact