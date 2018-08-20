const mongoose = require('mongoose')
const config = require('./config.js')

mongoose.Promise = require('bluebird');

const url = `mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.ds}.mlab.com:${config.mongo.ds}/${config.mongo.project}`
mongoose.connect(url, {
    useNewUrlParser: true
})

const Contact = mongoose.model('Contact', {
  name: String,
  number: String
})


const args = process.argv.slice(2);
if(args.length === 0){
    console.log(`puhelinluettelo:`)
    Contact
    .find({})
    .then(contacts => {
      console.log(contacts.map(n => `${n.name} ${n.number}`).join('\n'))
      mongoose.connection.close()
    }).catch( e => {
        console.error(`Error: ${e}`)
    })
} else {
    const name = args[0]
    const number = args[1]  
    
    const newContact = new Contact({
    name: name,
    number: number
    })

    newContact
    .save()
        .then(response => {
            console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
            mongoose.connection.close()
        })
}