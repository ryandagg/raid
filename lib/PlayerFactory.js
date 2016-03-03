var UnitType = require('./UnitType');

var GenericMeleePlayer = require('./CreepPlayers/GenericMeleePlayer');
var GenericRangedPlayer = require('./CreepPlayers/GenericRangedPlayer');
var NecromancerPlayer = require('./CreepPlayers/NecromancerPlayer');

function PlayerFactory() {

}

// static functions
PlayerFactory.createPlayerForUnit = function(unit, cc) {
    switch (unit.type) {
        case UnitType.GNAT:
            return new GenericMeleePlayer(cc);
        case UnitType.NECROMANCER:
            return new NecromancerPlayer(cc);
        case UnitType.QUILL_BOAR:
            return new GenericRangedPlayer(cc);
        case UnitType.RAT:
            return new GenericMeleePlayer(cc);
        case UnitType.SKELETON:
            return new GenericMeleePlayer(cc);
        default:
            throw Error((unit && unit.type) + " not recognized!");
    }
};

module.exports = PlayerFactory;