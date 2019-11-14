var playersData = require('../../data/player-data.json');

const PlayersService = {
    getAll(){
        return playersData;
    },
    getCount(){
        return playersData.length;
    },
    getPage(page, results){
        const begin = (page-1) * results;
        const end = page * results;
        return playersData.slice(begin, end);
    },
    insertPlayer(player){
        playersData.push(player)
    },
    deletePlayer(index){
        playersData.splice(index, 1);
    },
    updatePlayer(index, player){
        playersData[index] = player;
    }
}

module.exports = PlayersService;
