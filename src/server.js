import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import keys from './config/keys'
import passport from './config/passport'
import router from './routes'

const db = keys.mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport)
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
