
var BaseCreepPlayer = require('./BaseCreepPlayer');
var Melee = require('./Behaviors/Melee');
var Move = require('./Behaviors/MoveToExitDumb');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function MoveToExitPlayer(creepController) {
    this.cc = creepController;

    var melee = new Melee(this.cc);
    var move = new Move(this.cc);

    this.behaviors = [melee, move];
}

MoveToExitPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = MoveToExitPlayer;