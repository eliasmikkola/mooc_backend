const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
const url = process.env.MONGO_URL


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