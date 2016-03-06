
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function Run(creepController) {
    this.cc = creepController;
}

Run.prototype = Object.create(Base.prototype);

Run.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);

	if (MoveUtils.tryMoveAheadLeftRight(this.cc, toPlayer.opposite())) {
		return true;
	}
	else {
		return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite());
	}
};

module.exports = Run;
