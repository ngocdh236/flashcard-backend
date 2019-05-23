import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import keys from './src/config/keys'
import passport from './src/config/passport'
import router from './src/routes'

const db = keys.mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))
mongoose.set('useFindAndModify', false)

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport)
app.use('/api', router)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
