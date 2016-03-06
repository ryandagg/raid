
var MoveUtils = require('../Utils/MoveUtils');
var BehaviorBase = require('./BehaviorBase');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function BehaviorMelee(creepController) {
    this.cc = creepController;
}

BehaviorMelee.prototype = Object.create(BehaviorBase.prototype);

BehaviorMelee.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);

    if (playerLoc.isAdjacentTo(ourLoc)) {
        // if we are adjacent to the player, attack them!
        this.cc.meleeAttack(toPlayer);
        return true;
    } else {
        return false;
    }
};

module.exports = BehaviorMelee;
