
var MoveUtils = require('../Utils/MoveUtils');
var BehaviorBase = require('./BehaviorBase');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function BehaviorRangeAttack(creepController) {
    this.cc = creepController;
}

BehaviorRangeAttack.prototype = Object.create(BehaviorBase.prototype);

BehaviorRangeAttack.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
    var distSqToPlayer = ourLoc.distanceSquaredTo(playerLoc);

    if (this.cc.canRangedAttack(playerLoc)) {
        this.cc.rangedAttack(playerLoc);
        return true;
    }
    return false;
};

module.exports = BehaviorRangeAttack;
