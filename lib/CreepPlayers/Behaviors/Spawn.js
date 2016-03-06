
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');
var UnitType = require('../../UnitType');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function Spawn(creepController) {
    this.cc = creepController;
}

Spawn.prototype = Object.create(Base.prototype);

Spawn.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
    var distSqToPlayer = ourLoc.distanceSquaredTo(playerLoc);

    if (this.cc.getSpawnDelay() < 1) {
        if (this.cc.canSpawn(UnitType.SKELETON, toPlayer)) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer);
            return true;
        } else if (this.cc.canSpawn(UnitType.SKELETON, toPlayer.rotateLeft())) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer.rotateLeft());
            return true;
        } else if (this.cc.canSpawn(UnitType.SKELETON, toPlayer.rotateRight())) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer.rotateRight());
            return true;
        }
    }

    return false;
};

module.exports = Spawn;
