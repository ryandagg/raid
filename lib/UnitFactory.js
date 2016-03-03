var Unit = require('./GameObjects/Unit');
var UnitType = require('./UnitType');
var Team = require('./Team');

function UnitFactory() {

}

// static functions
UnitFactory.createUnit = function(unitType, location) {
    var stats;
    // MAKE SURE YOU ADD TO UnitType and Player Factor too!
    switch(unitType) {
        case UnitType.GNAT:
            stats = {
                "name": "gnat",
                "description": "A swarm of annoying insects",
                "hint": "Kill them with magic!",
                "team": Team.B,
                "type": unitType,
                "maxHp": 1,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.NECROMANCER:
            stats = {
                "name": "necromancer",
                "description": "An evil conjurer of the dark arts.",
                "hint": "Kill him before he spawns more skeletons!",
                "team": Team.B,
                "type": unitType,
                "maxHp": 21,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 0,
                "meleeAttackDelay": 0,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 4,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 16,
                "spawnDelay": 15,
                "spawnedUnitType": UnitType.SKELETON
            };
            return new Unit(stats);
        case UnitType.QUILL_BOAR:
            stats = {
                "name": "quill boar",
                "description": "An ill-tempered beast that shoots quills.",
                "hint": "Very dangerous at range!",
                "team": Team.B,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 0,
                "meleeAttackDelay": 0,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 6,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 16,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.RAT:
            stats = {
                "name": "rat",
                "description": "A vile vermin.",
                "hint": "Attack it from range!",
                "team": Team.B,
                "type": unitType,
                "maxHp": 9,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 16,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.SKELETON:
            stats = {
                "name": "skeleton",
                "description": "A rickety undead animation.",
                "hint": "Find and kill the necromancer!",
                "team": Team.B,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 4,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 16,
                "alertRadiusSquared": 9,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);

        default:
            throw Error(unitType + " not recognized!");
    }

}

module.exports = UnitFactory;