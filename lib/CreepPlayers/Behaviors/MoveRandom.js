
var MoveUtils = require('../../Utils/MoveUtils');
var Base = require('./Base');
var Direction = require('../../GameObjects/Direction');

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

    var r = Math.floor((Math.random() * 5));

    //give slightly more weight on moving towards the player.
    if (r == 0) {
        return MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
    } else {
        //we didn't randomly see the player and try to go for him, so let's move in a random direction.
        var didMove = false;

        while (!didMove) {
            var d = Direction.randomDirection();
            if (this.cc.canMove(d)) {
                this.cc.move(d);
                didMove = true;
                return true;
            }
        }

    }
    
};

module.exports = MoveCloser;
