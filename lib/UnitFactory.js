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
        case UnitType.AMBROSE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.BOVARD:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.CHRIS:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.DRAGON:
            stats = {
                "name": "dragon",
                "description": "A pile of armor that flies and shoots fire.",
                "hint": "It's a dragon. Run?",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 50,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 6,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 6,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.FLOATING_EYE:
            stats = {
                "name": "floating eye",
                "description": "It's just sitting there, watching you.",
                "hint": "They don't move much.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 5,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 4,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT_FROG:
            stats = {
                "name": "giant frog",
                "description": "Ribbit. Boing.",
                "hint": "Fast little buggers.",
                "team": Team.CREEP,
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
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GNAT:
            stats = {
                "name": "gnat",
                "description": "A swarm of annoying insects",
                "hint": "Kill them with magic!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 1,
                "defeatPoints": 5,
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
        case UnitType.HARPY:
            stats = {
                "name": "harpy",
                "description": "Half eagle, half woman, all bad.",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 10,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 3,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ICKY_THING:
            stats = {
                "name": "icky thing",
                "description": "They will destroy you with foul smelling slime.",
                "hint": "They're slow.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 10,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 3,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 36,
                "alertRadiusSquared": 36,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.JACKEL:
            stats = {
                "name": "jackel",
                "description": "Where there is one, there might be more.",
                "hint": "Pack animals. Tread carefully if there are many.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 6,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 36,
                "alertRadiusSquared": 25,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.KOBOLD:
            stats = {
                "name": "kobold",
                "description": "A spirit that haunts houses or lives underground in caves or mines.",
                "hint": "They are all melee, all day.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 4,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT_LOUSE:
            stats = {
                "name": "giant louse",
                "description": "Big ugly bugs that fight just as well as they multiply.",
                "hint": "Kill them before they see you, or there will be more of them.",
                "team": Team.CREEP,
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
                "alertRadiusSquared": 49,
                "spawnDelay": 1,
                "spawnedUnitType": UnitType.GIANT_LOUSE
            };
            return new Unit(stats);
        case UnitType.MOLD:
            stats = {
                "name": "mold",
                "description": "Slimy, sedentary, and angry.",
                "hint": "They don't move much, but they are tough.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.NECROMANCER:
            stats = {
                "name": "necromancer",
                "description": "An evil conjurer of the dark arts.",
                "hint": "Kill him before he spawns more skeletons!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 21,
                "defeatPoints": 50,
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
        case UnitType.ORC:
            stats = {
                "name": "orc",
                "description": "Meat's back on the menu, boys!",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.DRUNK_VIKING:
            stats = {
                "name": "drunk viking",
                "description": "A strong, fast, but wasted adversary",
                "hint": "Try not to let him get near you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 10,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 3,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 25,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.QUILL_BOAR:
            stats = {
                "name": "quill boar",
                "description": "An ill-tempered beast that shoots quills.",
                "hint": "Very dangerous at range!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "defeatPoints": 25,
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
        case UnitType.RAPHAEL:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.SKELETON:
            stats = {
                "name": "skeleton",
                "description": "A rickety undead animation.",
                "hint": "Find and kill the necromancer!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "defeatPoints": 5,
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
        case UnitType.GIANT_TICK:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.WORM:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.YEEK:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ZOMBIE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT_ANT_LION:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.BULL:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GELATINOUS_CUBE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ANCIENT_DRAGON:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ELEMENTAL:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.FLY:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GHOST:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.HOBGOBLIN:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.JELLY:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.KILLER_BEETLE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.LICH:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.MUMMY:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.OOZE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.QUYLTHULG:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.REPTILE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.SCORPION:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.TROLL:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.UMBER_HULK:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.VAMPIRE:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.WIGHT:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.YETI:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.MUSHROOM:
            stats = {
                "name": "bull",
                "description": "Bulls are big. Don't make them angry",
                "hint": "Don't attack them, and they won't attack you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        default:
            throw Error(unitType + " not recognized!");
    }

}

module.exports = UnitFactory;