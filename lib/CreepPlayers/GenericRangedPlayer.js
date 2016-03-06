
var BaseCreepPlayer = require('./BaseCreepPlayer');
var RangeAttack = require('./Behaviors/RangeAttack');
var Kite = require('./Behaviors/Kite');

function GenericRangedPlayer(creepController) {
    this.cc = creepController;

    var kite = new Kite(this.cc);
    var attack = new RangeAttack(this.cc);

    this.behaviors = [kite, attack];
}

GenericRangedPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

module.exports = GenericRangedPlayer;

