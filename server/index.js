const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv').config();

const { PORT, SESSION_SECRET } = require('./config');
require('./services/jobConsumer/consumer')();
require('./util/passport')(passport);

// session handling
app.use(session({ secret: SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

// Service-based routing import
const contactRoutes = require('./services/contacts/contactRoutes');
const userRoutes = require('./services/users/userRoutes')(passport);

// Seneca microservices..
const math = require('./microservices/mathRoute')(app);

// REST Gateways
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
app.get('/dashboard', (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}, (req, res) => {
  return res.sendFile(path.join(__dirname, '../src/dashboard/index.html'));
});
app.use('/contact', contactRoutes);
app.use('/user', userRoutes);


// Error catch-all
app.all('*', (req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`ditt.io up and running on port ${PORT}!`);
});
