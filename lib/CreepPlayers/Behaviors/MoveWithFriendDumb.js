
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');
var UnitType = require('../../UnitType');
var GameConstants = require('../../GameConstants');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function MoveWithFriendDumb(creepController) {
    this.cc = creepController;
}

MoveWithFriendDumb.prototype = Object.create(Base.prototype);

MoveWithFriendDumb.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
	var friends = this.cc.senseNearbyUnitsFromTeam(this.unitInfo().team);

    //Let's see if there is a creep as close or closer than us, and approach at the same rate that it does.
    //Intended for pack animals.
    for (var i = 0; i < friends.length; i++) {
        var friend = friends[i];
        if (this.distToPlayer(friend.location) <= this.distToPlayer() - 16) {
            return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
        }
    }

    return false;
};

module.exports = MoveWithFriendDumb;
