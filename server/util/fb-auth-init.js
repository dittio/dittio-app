// Initializes a connection to the Firebase DB

const firebase = require('firebase');
const { FB_CONFIG } = require('../config');

module.exports = () => {
  firebase.initializeApp(FB_CONFIG);
};

