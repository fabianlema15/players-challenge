const express = require('express');

const playersRoute = express.Router();

playersRoute.get('/', (req, res) => {
  res.render("../views/players");
});

module.exports = playersRoute;