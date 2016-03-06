var UnitInfo = require('./UnitInfo');

// people generally shouldn't have access to the unit class
function Unit(stats) {
    this.name = stats.name;
    this.type = stats.type;
    this.description = stats.description;
    this.hint = stats.hint;
    this.team = stats.team;
    this.maxHp = stats.maxHp;
    this.hp = this.maxHp;
    this.defeatPoints = stats.defeatPoints || 0;
    this.delay = 0;
    this.location = stats.location;
    this.movementDelay = stats.movementDelay;
    this.meleeAttackPower = stats.meleeAttackPower || 0;
    this.meleeAttackDelay = stats.meleeAttackDelay || 0;
    this.magicAttackPower = stats.magicAttackPower || 0;
    this.magicAttackDelay = stats.magicAttackDelay || 0;
    this.rangedAttackPower = stats.rangedAttackPower || 0;
    this.rangedAttackDelay = stats.rangedAttackDelay || 0;
    this.sensorRadiusSquared = stats.sensorRadiusSquared;
    this.alertRadiusSquared = stats.alertRadiusSquared || 0;
    this.spawnDelay = stats.spawnDelay || 0;
    this.currentSpawnDelay = this.spawnDelay;
    this.spawnedUnitType = stats.spawnedUnitType || null;

    this.action = null;
    this.source = null;
    this.target = null;
}


Unit.prototype = {
    decrementCooldowns: function() {
        this.delay = Math.max(0, this.delay - 1);
        this.currentSpawnDelay = Math.max(0, this.currentSpawnDelay - 1);
        this.action = null;
        this.source = null;
        this.target = null;

        // add regen in here for certain unit types
    },
    setPlayer: function(player) {
        this.player = player;
    },
    canActThrow: function() {
        if (this.hp <= 0) {
            throw Error("Unit with hp <= 0 cannot act");
        }
        if (this.delay >= 1) {
            throw Error("Unit with delay >= 1 cannot act");
        }
    },
    canAct: function() {
        if (this.hp < 0) {
            return false;
        }
        if (this.delay >= 1) {
            return false;
        }
        return true;
    },
    getUnitInfo: function() {
        return new UnitInfo(this);
    },
    getAction: function() {
        return {
            "action": this.action,
            "source": this.source,
            "target": this.target
        }
    }
};

module.exports = Unit;