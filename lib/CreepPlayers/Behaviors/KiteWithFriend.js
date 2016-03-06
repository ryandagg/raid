
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');
var UnitType = require('../../UnitType');
var GameConstants = require('../../GameConstants');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function KiteWithFriend(creepController) {
    this.cc = creepController;
}

KiteWithFriend.prototype = Object.create(Base.prototype);

KiteWithFriend.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
    var distSqToPlayer = ourLoc.distanceSquaredTo(playerLoc);

	var friendNearby = this.cc.senseNearbyUnits().length > 0;

    if (friendNearby) {
        if (this.cc.canRangedAttack(playerLoc)) {
            this.cc.rangedAttack(playerLoc);
            return true;
        }
        if (distSqToPlayer < GameConstants.MIN_RANGED_ATTACK_RADIUS_SQUARED) {
            return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite());
        } else {
            return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
        }
    }
};

module.exports = KiteWithFriend;
