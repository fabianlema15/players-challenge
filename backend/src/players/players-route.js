const express = require('express');
const playerRoute = express.Router();
const jsonParser = express.json();
const PlayersService = require('./players-service')

playerRoute
    .route('/')
    .get((req, res, next) => {
        const players = PlayersService.getAll();
        res.json(players)
    })
    .post(jsonParser, (req, res, next) => {
        const { team, jersey_number, name, position } = req.body
        const newPlayer = {
            team,
            jersey_number,
            name,
            position
        }
        PlayersService.insertPlayer(newPlayer)
        res.status(201).json(newPlayer)
    })

playerRoute
    .route('/:player_index')
    .delete((req, res, next) => {
        const { player_index } = req.params
        PlayersService.deletePlayer(player_index)
        res.status(204).end()
    })
    .patch(jsonParser, (req, res, next) => {
        const { team, jersey_number, name, position } = req.body;
        const playerToUpdate = {
            team,
            jersey_number,
            name,
            position
        }
        PlayersService.updatePlayer(
            req.params.player_index,
            playerToUpdate
        )
        res.status(204).end()
    })

playerRoute
    .route('/page/:page/results/:results')
    .get((req, res, next) => {
        const { page, results } = req.params
        const players = PlayersService.getPage(page, results);
        res.json(players)
    })

module.exports = playerRoute;