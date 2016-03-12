
var BaseCreepPlayer = require('./BaseCreepPlayer');
var Attack = require('./Behaviors/Magic');
var MoveCloser = require('./Behaviors/MoveCloserDumb');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function MagicOnlyPlayer(creepController) {
    this.cc = creepController;

    var melee = new Attack(this.cc);
    var move = new MoveCloser(this.cc);

    this.behaviors = [melee, move];
}

MagicOnlyPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = MagicOnlyPlayer;