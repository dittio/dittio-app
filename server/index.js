const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const dotenv = require('dotenv').config();
const {
  PORT,
  SESSION_SECRET,
} = require('./config');


// ==========================================================
// Utility Inits ============================================
// ==========================================================

require('./util/fb-auth-init')();
require('./util/consumer')();
require('./util/passport')(passport);


// ==========================================================
// Session Handling + Middleware ============================
// ==========================================================

const { authenticateSession } = require('./services/users/userCtrl');
app.use(session({ secret: SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }), bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

app.set('view engine', 'ejs');


// ==========================================================
// Importing Service Routes =================================
// ==========================================================

const contactRoutes = require('./services/contacts/contactRoutes');
const userRoutes = require('./services/users/userRoutes');
const orgRoutes = require('./services/org/orgRoutes');


// ==========================================================
// REST Gateways ============================================
// ==========================================================

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../dist/index.html'));
  res.render(path.join(__dirname, '../dist/index'));
});

app.get('/login', authenticateSession, (req, res) => {
  res.render(path.join(__dirname, '../dist/login'));
});

app.get('/main', authenticateSession, (req, res) => {
  res.render(path.join(__dirname, '../dist/dashboard'));
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.use('/intake', orgRoutes);
app.use('/contact', contactRoutes);
app.use('/user', userRoutes);


// ==========================================================
// Error catch-all + Server spinup ==========================
// ==========================================================

app.all('*', (req, res) => res.status(404).end('Page Not Found!'));

app.listen(PORT, () => {
  console.log(`ditt.io up and running on port ${PORT}!`);
});
