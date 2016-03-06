
var MoveUtils = require('../Utils/MoveUtils');
var BaseCreepPlayer = require('./BaseCreepPlayer');
var BehaviorMelee = require('./BehaviorMelee');
var BehaviorMoveCloser = require('./BehaviorMoveCloser');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function GenericMeleePlayer(creepController) {
    this.cc = creepController;
}

GenericMeleePlayer.prototype = Object.create(BaseCreepPlayer.prototype);

GenericMeleePlayer.prototype.act = function() {
    var melee = new BehaviorMelee(this.cc);
    var move = new BehaviorMoveCloser(this.cc);

    var actions = [melee, move];
    for (var i = 0; i < actions.length; i++) {
        if (actions[i].act()) {
            return;
        }
    }
};

module.exports = GenericMeleePlayer;