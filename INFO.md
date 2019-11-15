# Fantasy League Players

- [Demo](#demo)
- [Technologies](#technologies)
- [Players](#players)


## Demo

Click on the next link: [Demo](https://league-players.herokuapp.com)


## Technologies

>NodeJS  
Express

## Players

Create, edit and delete players.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | No | User id generated automatically |
| name | String | Yes | Player name, Ex: Patrick Scales |
| jersey_number | Integer | Yes | Player yersey number, Ex: 12 |
| team | String | Yes | Player team, Ex: Panthers|
| position | String | Yes | Player position, Ex: QB |


| Resource | Method | Description |
|-------|------|----------|
| /api/players | GET | Return all players |
|        | POST | Store a new player |
| /api/players/:player_id | PATCH | Edit player with player_id |
|                 | DELETE | Delete player with player_id |
| /api/players/page/:page/results/:results | GET | Return players in some page  |
| /api/players/count | GET | Return count of all players |
