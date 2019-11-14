const express = require('express');
const path = require('path');
const playerRoute = require('./backend/src/players/players-route')
const app = express();

// Setup static files
app.use('/styles', express.static('node_modules/bootstrap/dist/css'));
app.use('/scripts', express.static('node_modules/bootstrap/dist/js'));

// Setup routes
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/frontend/mock.html'));
});
app.use('/api/players', playerRoute);


module.exports = app