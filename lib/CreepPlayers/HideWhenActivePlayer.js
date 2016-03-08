
var BaseCreepPlayer = require('./BaseCreepPlayer');
var RunWhenActive = require('./Behaviors/RunWhenActiveDumb');
var RangeAttack = require('./Behaviors/RangeAttack');
var KiteDumb = require('./Behaviors/KiteDumb');


/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function GenericMeleePlayer(creepController) {
    this.cc = creepController;

    var run = new RunWhenActive(this.cc);
    var range = new RangeAttack(this.cc);
    var kite = new KiteDumb(this.cc);

    this.behaviors = [run, range, kite];
}

GenericMeleePlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = GenericMeleePlayer;