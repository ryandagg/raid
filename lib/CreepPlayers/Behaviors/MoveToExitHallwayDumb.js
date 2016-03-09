
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');
var Direction = require('../../GameObjects/Direction');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function MoveToExitDumb(creepController) {
    this.cc = creepController;
}

MoveToExitDumb.prototype = Object.create(Base.prototype);

MoveToExitDumb.prototype.act = function() {
    var toExit = this.cc.senseDirectionToExit();
    var toPlayer = this.cc.getDirectionToPlayer();

    var numWalls = 0;
    if (!this.cc.canMove(Direction.NORTH)) {
        numWalls++;
    }
    if (!this.cc.canMove(Direction.WEST)) {
        numWalls++;
    }
    if (!this.cc.canMove(Direction.EAST)) {
        numWalls++;
    }
    if (!this.cc.canMove(Direction.SOUTH)) {
        numWalls++;
    }

    //we have a wall on either side, but the direction to the exit is clear.
    //WE should be blocking the hallway now, waiting for whoever to come through.
    if (numWalls === 2 && this.cc.canMove(toExit)) {
        return false;
    } else {
        return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toExit);
    }
};

module.exports = MoveToExitDumb;
