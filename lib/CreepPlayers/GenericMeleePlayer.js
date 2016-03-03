
var MoveUtils = require('../Utils/MoveUtils');
var BaseCreepPlayer = require('./BaseCreepPlayer');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function GenericMeleePlayer(creepController) {
    this.cc = creepController;
}

GenericMeleePlayer.prototype = Object.create(BaseCreepPlayer.prototype);

GenericMeleePlayer.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);

    if (playerLoc.isAdjacentTo(ourLoc)) {
        // if we are adjacent to the player, attack them!
        this.cc.meleeAttack(toPlayer)
    } else {
        // otherwise try to move toward them!
        MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
    }
};

module.exports = GenericMeleePlayer;