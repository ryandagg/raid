
var MoveUtils = require('../Utils/MoveUtils');
var BehaviorBase = require('./BehaviorBase');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function BehaviorMoveCloser(creepController) {
    this.cc = creepController;
}

BehaviorMoveCloser.prototype = Object.create(BehaviorBase.prototype);

BehaviorMoveCloser.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);

    return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
};

module.exports = BehaviorMoveCloser;
