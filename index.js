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
require('dotenv').config();



app.get('/api/persons', (req, res) => {
    Contact
        .find({})
        .then(contacts => {
            res.json(contacts.map(Contact.format))
        }).catch(error => {
            res.status(404).send({ error: 'No data found' })
        })
})


app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Contact
        .findByIdAndRemove(id)
        .then(result => {
            res.status(204).end()
        }).catch(error => {
            res.status(400).send({ error: 'malformatted id' })
        })
})



app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Contact
        .findById(id)
        .then(contact => {
            res.status(200).json(Contact.format(contact))
        })
        .catch(error => {
            res.status(404)
        })

    
})


app.post('/api/persons/', (req, res) => {    
    const newContact = req.body
    //fields to check for error
    const fieldsToCheck = ['name', 'number']
    //iterate fields to check
    const errors = fieldsToCheck.filter(n => {
        if(!newContact[n]) return n
    })


    if(errors.length > 0) {
        return res.status(400).json({error: `fields missing: ${errors.join(', ')}`})
    }
    
    Contact
        .findOne({ name: req.body.name })
        .then(result => {
            if(result === null){
                const contact = new Contact(newContact)
                contact
                    .save()
                    .then(response => {
                        res.status(201).json(Contact.format(response))
                        
                    }).catch(error => {
                        console.log(error)
                        // ...
                    })
            }
            else {
                return res.status(409).json({ error: 'name must be unique' })
            }
        })
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const newContact = req.body

    Contact
        .findByIdAndUpdate(id, newContact, {new: true})
        .then(updatedContact => {
            res.status(202).json(Contact.format(updatedContact))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })

})


app.get('/info', (req, res) => {
    Contact
        .find({})
        .then(contacts => {
            res.send(`<p>puhelinluettelossa ${contacts.length} henkilön tiedot</p><p>${new Date()}</p>`)
        })
})







var PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})