
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
    var toPlayer = this.cc.getDirectionToPlayer();

    return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
};

module.exports = MoveCloser;
