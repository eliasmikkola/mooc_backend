const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Contact = require('./models/contact')

app.use(express.static('build'))

app.use(cors())
morgan.token('parsebody', (req, res) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :parsebody :status :res[content-length] - :response-time ms'))

app.use(bodyParser.json())




app.get('/api/persons', (req, res) => {
    Contact
    .find({})
    .then(contacts => {
        res.json(contacts.map(Contact.format))
    }).catch(error => {
        console.log(error)
        // ...
    })
})


app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Contact
        .findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        }).catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})



app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const findPerson = persons.find(n => n.id === id)

    if (findPerson) res.json(findPerson)
    else {
        res.status(404).end()
    }
})


app.post('/api/persons/', (req, res) => {
    const newContact = req.body
    //fields to check for error
    const fieldsToCheck = ["name", "number"]
    //iterate fields to check
    const errors = fieldsToCheck.filter(n => {
        if(!newContact[n]) return n
    })


    if(errors.length > 0) {
        return res.status(400).json({error: `fields missing: ${errors.join(' ,')}`})
    }
    //check name uniqueness
    // if(persons.find(n => n.name === newContact["name"])){
    //     return res.status(409).json({ error: 'name must be unique' })   
    // }
    
    const contact = new Contact(newContact)
    contact
    .save()
        .then(response => {
            console.log("mongo response", response)
            res.status(201).json(Contact.format(response))
            
        }).catch(error => {
            console.log(error)
            // ...
        })
})



app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})







var PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})