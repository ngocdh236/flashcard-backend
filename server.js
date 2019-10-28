const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { keys } = require('./src/config/keys');
const { passport } = require('./src/config/passport');
const { router } = require('./src/routes');

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport);
app.use('/api', router);

app.get('/api', (req, res) => {
  res.send('Flashcard API');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
