
var BaseCreepPlayer = require('./BaseCreepPlayer');
var Melee = require('./Behaviors/Melee');
var MoveCloser = require('./Behaviors/MoveCloserDumb');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function GenericMeleePlayer(creepController) {
    this.cc = creepController;

    var melee = new Melee(this.cc);
    var move = new MoveCloser(this.cc);

    this.behaviors = [melee, move];
}

GenericMeleePlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = GenericMeleePlayer;