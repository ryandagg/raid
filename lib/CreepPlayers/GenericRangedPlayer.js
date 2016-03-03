
var GameConstants = require('../GameConstants');
var MoveUtils = require('../Utils/MoveUtils');
var BaseCreepPlayer = require('./BaseCreepPlayer');


function GenericRangedPlayer(creepController) {
    this.cc = creepController;
}

GenericRangedPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

GenericRangedPlayer.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
    var distSqToPlayer = ourLoc.distanceSquaredTo(playerLoc);

    if (distSqToPlayer > GameConstants.MAX_RANGED_ATTACK_RADIUS_SQUARED) {
        // if they are too far away, try moving toward them!
        MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
    } else if (distSqToPlayer < GameConstants.MIN_RANGED_ATTACK_RADIUS_SQUARED) {
        // if they are too close, try moving away from them!
        MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite())
    } else {
        // otherwise they are probaly in range, attack them!
        if (this.cc.canRangedAttack(playerLoc)) {
            this.cc.rangedAttack(playerLoc);
        }
    }
};

module.exports = GenericRangedPlayer;

