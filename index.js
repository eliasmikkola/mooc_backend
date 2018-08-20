const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


let persons = [
    {
        name: 'Arto Hellas',
        number: '050 123 123',
        id: 1
    },
    {
        name: 'Jaska Jokunen',
        number: '050 123 124',
        id: 2
    },
    {
        name: 'Teuvo Hakkarainen',
        number: '050 000 000',
        id: 3
    },
    {
        name: 'Sale Päle',
        number: '050 123 69',
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(n => n.id !== id)

    res.status(204).end()
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
    if(persons.find(n => n.name === newContact["name"])){
        return res.status(409).json({ error: 'name must be unique' })   
    }

    newContact["id"] = parseInt(Math.random() * 99999999)
    persons.push(newContact)
    res.json(newContact)
})



app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})







const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})