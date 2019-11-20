const express = require('express');
const path = require('path')
const cors = require('cors');
const playerBackRoute = require('./backend/src/players/players-route')
const playerFrontRoute = require('./frontend/routes/players')
const app = express();

app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');
app.use(cors());

// Setup static files
app.use('/styles', express.static('node_modules/bootstrap/dist/css'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist/js'));
app.use('/scripts', express.static('frontend/scripts'));

// Setup routes
app.use('/', playerFrontRoute);
app.use('/api/players', playerBackRoute);


module.exports = app