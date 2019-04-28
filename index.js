const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const categories = require('./routes/api/categories')
const collections = require('./routes/api/collections')
const cards = require('./routes/api/cards')

const app = express()

const db = require('./config/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

app.get('/', (req, res) => res.send('Hello!'))

app.use('./api/users', users)
app.use('./api/categories', categories)
app.use('./api/collections', collections)
app.use('./api/cards', cards)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
