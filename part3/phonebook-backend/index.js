const express = require('express')
const app = express()
// eslint-disable-next-line no-unused-vars
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()


//DB
const Person = require('./models/Person')

// app.use(cors())
// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status - :response-time ms :body'))
app.use(express.json())
app.use(express.static('build'))


// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323525",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   },
//   {
//     "name": "Dan Sack",
//     "number": "333",
//     "id": 5
//   }
// ]

app.get('/', (_req, res) => {
  res.send('<h1>Hello</h1>')
})

app.get('/api/persons', async (_req, res) => {
  const persons = await Person.find()
  res.json(persons)
})

app.get('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const person = await Person.findById(id)
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  if(!name || !number) {
    return res.status(400).json({
      error: 'missing content'
    })
  }
  // else if(persons.find(person => person.name.toLowerCase() === name.toLowerCase())) {
  //   return res.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name,
    number
  })
  try {
    const savedPerson = await person.save()
    res.json(savedPerson)
  } catch (error) {
    next(error)
  }

})

app.put('/api/persons/:id', async (req, res, next) => {
  const { number } = req.body

  const person = {
    number
  }
  try {
    const updatedNote = await Person.findByIdAndUpdate(req.params.id, person, { new: true })
    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    await Person.findByIdAndRemove(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }

})

app.get('/info', async (_req, res) => {
  const persons = await Person.find()
  const time = new Date()

  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `)

})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server on ${PORT}`))