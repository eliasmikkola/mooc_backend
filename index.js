const express = require('express')
const app = express()

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
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const findPerson = persons.find(n => n.id === id)
    
    if (findPerson) res.json(findPerson)
    else {
        res.status(404).end()
    }
  })

app.get('/info', (req, res) => {
    res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${new Date()}</p>`)
})
  
  





const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})