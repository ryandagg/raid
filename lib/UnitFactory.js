var Unit = require('./GameObjects/Unit');
var UnitType = require('./UnitType');
var Team = require('./Team');
var Globals = require('./GameConstants');

function UnitFactory() {

}

// static functions
UnitFactory.createUnit = function(unitType, location) {
    var stats;
    // MAKE SURE YOU ADD TO UnitType and Player Factor too!
    switch(unitType) {
        case UnitType.AMBROSE:
            stats = {
                "name": "Esorbma",
                "description": "Esorbma doesn't like you. Esorbma doesn't like anybody.",
                "hint": "???",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 3000,
                "location": location,
                "movementDelay": 5,
                "meleeAttackPower": 50,
                "meleeAttackDelay": 4,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 1000,
                "alertRadiusSquared": 1000,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.BOVARD:
            stats = {
                "name": "bovard",
                "description": "",
                "hint": "Don't fall asleep when he's around!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 12,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
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
                "maxHp": 48,
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
                "maxHp": 10,
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
                "maxHp": 12,
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
                "maxHp": 24,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 4,
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
                "alertRadiusSquared": 100,
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
                "hint": "Kill them quickly, or there will be more of them.",
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
                "sensorRadiusSquared": 100,
                "alertRadiusSquared": 100,
                "spawnDelay": 3,
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
                "alertRadiusSquared": 64,
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
                "hint": "They will alert their friends when they see you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 1000,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.DRUNK_VIKING:
            stats = {
                "name": "drunk viking",
                "description": "Would you like to see my truck BERSERKER.",
                "hint": "Try not to let him get near you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 64,
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
                "name": "raphael",
                "description": "",
                "hint": "",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 18,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 0,
                "spawnDelay": 8,
                "spawnedUnitType": UnitType.DRUNK_VIKING
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
                "name": "giant tick",
                "description": "These guys really suck.",
                "hint": "They move fast, but are lazy.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 9,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.WORM:
            stats = {
                "name": "worm",
                "description": "Chop chop chop, only more worms!",
                "hint": "They multiply pretty quickly.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 12,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 16,
                "spawnDelay": 3,
                "spawnedUnitType": UnitType.WORM
            };
            return new Unit(stats);
        case UnitType.YEEK:
            stats = {
                "name": "yeek",
                "description": "So named for what people say the first time they see one.",
                "hint": "Look out, they spit!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 15,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 1,
                "rangedAttackDelay": 1,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ZOMBIE:
            stats = {
                "name": "zombie",
                "description": "Undead and hungry.",
                "hint": "They are slow, don't let one get his hands on you though!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 12,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 6,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT_ANT_LION:
            stats = {
                "name": "giant ant lion",
                "description": "Giant jaws and thick armor.",
                "hint": "Try not to let their jaws get you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 25,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 8,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 16,
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
                "name": "gelatinous cube",
                "description": "A bit, quivering, blob of jello.",
                "hint": "They don't move much.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 25,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 0,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ANCIENT_DRAGON:
            stats = {
                "name": "ancient dragon",
                "description": "Ancient death lizard. With wings.",
                "hint": "You better know what you're doing.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 80,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 15,
                "meleeAttackDelay": 2,
                "magicAttackPower": 8,
                "magicAttackDelay": 2,
                "rangedAttackPower": 8,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 49,
                "alertRadiusSquared": 49,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.ELEMENTAL:
            stats = {
                "name": "elemental",
                "description": "Magical, beautiful, and deadly.",
                "hint": "They are magic only.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 0,
                "meleeAttackDelay": 0,
                "magicAttackPower": 6,
                "magicAttackDelay": 2,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 36,
                "alertRadiusSquared": 25,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.FLY:
            stats = {
                "name": "fly",
                "description": "If you see too many of these, try taking a shower before adventuring.",
                "hint": "Fast and annoying.",
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
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 64,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GHOST:
            stats = {
                "name": "ghost",
                "description": "An unhappy soul that is happy to take it out on you.",
                "hint": "Melee is a last resort for them.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 28,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 2,
                "magicAttackPower": 4,
                "magicAttackDelay": 2,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 114,
                "alertRadiusSquared": 81,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.HOBGOBLIN:
            stats = {
                "name": "hobgoblin",
                "description": "A mischeivious cave dweller.",
                "hint": "They like to attack from a distance.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 35,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 4,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 25,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.JELLY:
            stats = {
                "name": "jelly",
                "description": "A gross puddle of sticky substance.",
                "hint": "They tend to stick to one place.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 18,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 5,
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
        case UnitType.KILLER_BEETLE:
            stats = {
                "name": "killer beetle",
                "description": "Bigger, faster, and stronger. The shell is thick too.",
                "hint": "Steer clear, hard to kill and strong.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 32,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 3,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.LICH:
            stats = {
                "name": "lich",
                "description": "A powerful magic user from the land of the dead.",
                "hint": "Kill them before they bring others to help.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 38,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 2,
                "magicAttackPower": 4,
                "magicAttackDelay": 2,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 12,
                "spawnedUnitType": UnitType.ZOMBIE
            };
            return new Unit(stats);
        case UnitType.MUMMY:
            stats = {
                "name": "mummy",
                "description": "An undead zombie wrapped in toilet paper.",
                "hint": "Keep your distance.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 30,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 2,
                "meleeAttackDelay": 1,
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
        case UnitType.OOZE:
            stats = {
                "name": "ooze",
                "description": "A puddle of foul smelling liquid.",
                "hint": "The smell is poisonous.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 24,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 6,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 36,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.GIANT:
            stats = {
                "name": "giant",
                "description": "A really big human.",
                "hint": "It might take it a minute to throw something at you, but watch out when it does.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 48,
                "location": location,
                "movementDelay": 3,
                "meleeAttackPower": 15,
                "meleeAttackDelay": 3,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 15,
                "rangedAttackDelay": 9,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 0,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.QUYLTHULG:
            stats = {
                "name": "quylthulg",
                "description": "An invisible, magical monster.",
                "hint": "Watch out, he has friends!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 24,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 0,
                "meleeAttackDelay": 0,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 6,
                "spawnedUnitType": UnitType.WORM
            };
            return new Unit(stats);
        case UnitType.REPTILE:
            stats = {
                "name": "reptile",
                "description": "Big, scaly lizard.",
                "hint": "Fast and territorial.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 16,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 5,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 9,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.SCORPION:
            stats = {
                "name": "scorpion",
                "description": "Land crabs plus poison.",
                "hint": "Try not to slug it out with one.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 18,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 6,
                "meleeAttackDelay": 2,
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
                "name": "troll",
                "description": "Thick skinned, dumb, giant, and you're on the menu.",
                "hint": "They have excellent vision.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 42,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 9,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 144,
                "alertRadiusSquared": 81,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.UMBER_HULK:
            stats = {
                "name": "umber hulk",
                "description": "An Umber Hulk is a powerful subterranean predator",
                "hint": "Big, strong, melee only.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 36,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 12,
                "meleeAttackDelay": 2,
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
        case UnitType.VAMPIRE:
            stats = {
                "name": "vampire",
                "description": "Tom Cruise.",
                "hint": "Watch out they will call their friends!",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 12,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 4,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 49,
                "spawnDelay": 4,
                "spawnedUnitType": UnitType.VAMPIRE
            };
            return new Unit(stats);
        case UnitType.WIGHT:
            stats = {
                "name": "wight",
                "description": "The soul of a poor warrior.",
                "hint": "They tend to not go too far from their barrow.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 24,
                "location": location,
                "movementDelay": 1,
                "meleeAttackPower": 8,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 25,
                "alertRadiusSquared": 9,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.YETI:
            stats = {
                "name": "yeti",
                "description": "Big, hairy, and frozen monsters of the north.",
                "hint": "It's just snow they're throwing.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 48,
                "location": location,
                "movementDelay": 2,
                "meleeAttackPower": 8,
                "meleeAttackDelay": 1,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 1,
                "rangedAttackDelay": 2,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 16,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        case UnitType.MUSHROOM:
            stats = {
                "name": "mushroom",
                "description": "A patch of magical mushrooms.",
                "hint": "Kill it quick, or all monsters on the level will know about you.",
                "team": Team.CREEP,
                "type": unitType,
                "maxHp": 12,
                "location": location,
                "movementDelay": 0,
                "meleeAttackPower": 1,
                "meleeAttackDelay": 2,
                "magicAttackPower": 0,
                "magicAttackDelay": 0,
                "rangedAttackPower": 0,
                "rangedAttackDelay": 0,
                "sensorRadiusSquared": 64,
                "alertRadiusSquared": 25,
                "spawnDelay": 0,
                "spawnedUnitType": null
            };
            return new Unit(stats);
        default:
            throw Error(unitType + " not recognized!");
    }
};

module.exports = UnitFactory;