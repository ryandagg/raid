
var BaseCreepPlayer = require('./BaseCreepPlayer');
var RangeAttack = require('./Behaviors/RangeAttack');
var Melee = require('./Behaviors/Melee');
var Kite = require('./Behaviors/KiteDumb');

function GenericRangedPlayer(creepController) {
    this.cc = creepController;

    var kite = new Kite(this.cc);
    var attack = new RangeAttack(this.cc);
    var melee = new Melee(this.cc);

    this.behaviors = [kite, attack, melee];
}

GenericRangedPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = GenericRangedPlayer;

