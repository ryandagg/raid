var Direction = require('./GameObjects/Direction');
var MapLocation = require('./GameObjects/MapLocation');
var Team = require('./Team');
var GameConstants = require('./GameConstants');

function getPlayerFromCode(playerCode) {
    var module = eval(playerCode);

    function createPlayer(playerController) {
        const Player = module && module.RaidPlayer || RaidPlayer;
        return new Player(playerController);
    }

    return createPlayer;
}

module.exports = getPlayerFromCode;
