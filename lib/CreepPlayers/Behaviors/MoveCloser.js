
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function MoveCloser(creepController) {
    this.cc = creepController;
}

MoveCloser.prototype = Object.create(Base.prototype);

MoveCloser.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);

    return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
};

module.exports = MoveCloser;
