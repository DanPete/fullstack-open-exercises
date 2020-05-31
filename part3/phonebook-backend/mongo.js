const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password (node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://dan:${password}@fs-open-iiofu.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number
})

if (process.argv.length === 3) {
  Person.find().then(people => {
    console.log('phonebook:')
    people.forEach(person => {
      const { name, number } = person
      console.log(`${name} ${number}`)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5) {
  person.save().then(res => {
    const { name, number } = res
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}