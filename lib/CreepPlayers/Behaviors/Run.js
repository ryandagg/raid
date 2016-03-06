
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
    var toPlayer = this.cc.getDirectionToPlayer();

	if (MoveUtils.tryMoveAheadLeftRight(this.cc, toPlayer.opposite())) {
		return true;
	}
	else {
		return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite());
	}
};

module.exports = Run;
