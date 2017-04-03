const path = require('path');
const { Router } = require('express');
const orgCtrl = require('./orgCtrl');

const orgRoutes = module.exports = new Router();

orgRoutes.get('/?', orgCtrl.validateIntake, (req, res) => {
  res.sendFile(path.join(__dirname, '../../../dist/intake.html'));
});

orgRoutes.get('/add?', orgCtrl.addOrg);