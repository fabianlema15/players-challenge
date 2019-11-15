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
        for (const key in newPlayer) {
            if (!newPlayer[key]) {
                return res.status(400).json({ error: `Missing '${key}' in request body` });
            }
        }
        PlayersService.insertPlayer(newPlayer)
        res.status(201).json(newPlayer)
    })

playerRoute
    .route('/:player_id')
    .delete((req, res, next) => {
        const { player_id } = req.params
        const result = PlayersService.deletePlayer(player_id)
        if (result)
            res.status(204).end()
        else
            res.status(400).json({error: 'Player id does not exist'})
    })
    .patch(jsonParser, (req, res, next) => {
        const { team, jersey_number, name, position } = req.body;
        const playerToUpdate = {
            team,
            jersey_number,
            name,
            position
        }
        for (const key in playerToUpdate) {
            if (!playerToUpdate[key]) {
                return res.status(400).json({ error: `Missing '${key}' in request body` });
            }
        }
        const result = PlayersService.updatePlayer(req.params.player_id, playerToUpdate)
        if (result)
            res.status(204).end()
        else
            res.status(400).json({error: 'Player id does not exist'})
    })

playerRoute
    .route('/page/:page/results/:results')
    .get((req, res, next) => {
        const { page, results } = req.params
        const players = PlayersService.getPage(page, results);
        res.json(players)
    })

playerRoute
    .route('/count')
    .get((req, res, next) => {
        const { page, results } = req.params
        const players = PlayersService.getCount();
        res.json({count: players})
    })

module.exports = playerRoute;