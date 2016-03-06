var UnitType = require('./UnitType');

var GenericMeleePlayer = require('./CreepPlayers/GenericMeleePlayer');
var GenericRangedPlayer = require('./CreepPlayers/GenericRangedPlayer');
var NecromancerPlayer = require('./CreepPlayers/NecromancerPlayer');
var RandomMeleePlayer = require('./CreepPlayers/RandomMeleePlayer');
var Bull = require('./CreepPlayers/BullPlayer');

function PlayerFactory() {

}

// static functions
PlayerFactory.createPlayerForUnit = function(unit, cc) {
    switch (unit.type) {
        case UnitType.AMBROSE:
            return new GenericMeleePlayer(cc);
        case UnitType.BOVARD:
            return new GenericMeleePlayer(cc);
        case UnitType.CHRIS:
            return new GenericMeleePlayer(cc);
        case UnitType.DRAGON:
            return new GenericMeleePlayer(cc);
        case UnitType.FLOATING_EYE:
            return new GenericMeleePlayer(cc);
        case UnitType.GIANT_FROG:
            return new GenericMeleePlayer(cc);
        case UnitType.GNAT:
            return new GenericMeleePlayer(cc);
        case UnitType.HARPY:
            return new GenericMeleePlayer(cc);
        case UnitType.ICKY_THING:
            return new GenericMeleePlayer(cc);
        case UnitType.JACKEL:
            return new GenericMeleePlayer(cc);
        case UnitType.KOBOLD:
            return new GenericMeleePlayer(cc);
        case UnitType.GIANT_LOUSE:
            return new GenericMeleePlayer(cc);
        case UnitType.MOLD:
            return new GenericMeleePlayer(cc);
        case UnitType.NECROMANCER:
            return new NecromancerPlayer(cc);
        case UnitType.ORC:
            return new GenericMeleePlayer(cc);
        case UnitType.DRUNK_VIKING:
            return new RandomMeleePlayer(cc);
        case UnitType.QUILL_BOAR:
            return new GenericRangedPlayer(cc);
        case UnitType.RAPHAEL:
            return new GenericMeleePlayer(cc);
        case UnitType.SKELETON:
            return new GenericMeleePlayer(cc);
        case UnitType.GIANT_TICK:
            return new GenericMeleePlayer(cc);
        case UnitType.WORM:
            return new GenericMeleePlayer(cc);
        case UnitType.YEEK:
            return new GenericMeleePlayer(cc);
        case UnitType.ZOMBIE:
            return new GenericMeleePlayer(cc);
        case UnitType.GIANT_ANT_LION:
            return new GenericMeleePlayer(cc);
        case UnitType.BULL:
            return new Bull(cc);
        case UnitType.GELATINOUS_CUBE:
            return new GenericMeleePlayer(cc);
        case UnitType.ANCIENT_DRAGON:
            return new GenericMeleePlayer(cc);
        case UnitType.ELEMENTAL:
            return new GenericMeleePlayer(cc);
        case UnitType.FLY:
            return new GenericMeleePlayer(cc);
        case UnitType.GHOST:
            return new GenericMeleePlayer(cc);
        case UnitType.HOBGOBLIN:
            return new GenericMeleePlayer(cc);
        case UnitType.JELLY:
            return new GenericMeleePlayer(cc);
        case UnitType.KILLER_BEETLE:
            return new GenericMeleePlayer(cc);
        case UnitType.LICH:
            return new GenericMeleePlayer(cc);
        case UnitType.MUMMY:
            return new GenericMeleePlayer(cc);
        case UnitType.OOZE:
            return new GenericMeleePlayer(cc);
        case UnitType.GIANT:
            return new GenericMeleePlayer(cc);
        case UnitType.QUYLTHULG:
            return new GenericMeleePlayer(cc);
        case UnitType.REPTILE:
            return new GenericMeleePlayer(cc);
        case UnitType.SCORPION:
            return new GenericMeleePlayer(cc);
        case UnitType.TROLL:
            return new GenericMeleePlayer(cc);
        case UnitType.UMBER_HULK:
            return new GenericMeleePlayer(cc);
        case UnitType.VAMPIRE:
            return new GenericMeleePlayer(cc);
        case UnitType.WIGHT:
            return new GenericMeleePlayer(cc);
        case UnitType.YETI:
            return new GenericMeleePlayer(cc);
        case UnitType.MUSHROOM:
            return new GenericMeleePlayer(cc);
        default:
            throw Error((unit && unit.type) + " not recognized!");
    }
};

module.exports = PlayerFactory;