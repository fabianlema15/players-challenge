var playersData = require('../../data/player-data.json');
var cuid = require('cuid')

const PlayersService = {
    getInit(){
        playersData.forEach(player => {
            player.id = cuid()
            return player
        })
    },
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
        player.id = cuid()
        playersData.push(player)
    },
    deletePlayer(id){
        const index = playersData.findIndex(player => player.id === id)
        if (index >= 0){
            playersData.splice(index, 1);
            return true;
        }else{
            return false;
        }
    },
    updatePlayer(id, newPlayer){
        const index = playersData.findIndex(player => player.id === id)
        if (index >= 0){
            newPlayer.id = id
            playersData[index] = newPlayer;
            return true;
        }else{
            return false;
        }
    }
}

PlayersService.getInit();

module.exports = PlayersService;
