
var MoveUtils = require('../../Utils/MoveUtils');
var MoveUtils = require('../../GameObjects/Direction');
var Base = require('./Base');

/**
 *
 * @param creepController @type CreepController
 * @constructor
 */
function Heal(creepController) {
    this.cc = creepController;
}

Heal.prototype = Object.create(Base.prototype);

Heal.prototype.act = function() {
    //If health is full, we're done, we are going to continue doing whatever we're doing.
    if (this.unitInfo().hp < (this.unitInfo().maxHp - this.unitInfo().healPower) && this.cc.canHeal()) {
        this.cc.heal(Direction.OMNI);
        return true;
    }

    return false;
};

module.exports = Heal;
