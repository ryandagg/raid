
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

    return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toExit);
};

module.exports = MoveToExitDumb;
