
var UnitController = require('./UnitController');
var GameController = require('./GameController');
var Direction = require('./GameObjects/Direction');


function CreepController(id) {
    // make this read only
    // the game controller uses the ID to figure out which unit to move
    Object.defineProperties(this, {
        "id": {
            value: id,
            writeable: false
        }
    });
    this.gc = GameController;
}

// inherits all the functions of UnitController
CreepController.prototype = Object.create(UnitController.prototype);

CreepController.prototype.alertAllies = function() {
    this.gc.alertAllies(this.id);
};

CreepController.prototype.canSpawn = function(unitType, dir) {
    if (!unitType || !Direction.isValidDirection(dir)) {
        throw Error("null or invalid input");
    }
    if (Direction.OMNI.equals(dir)) {
        throw Error("Can't spawn on top of yourself!");
    }
    return this.gc.canSpawn(this.id, unitType, dir);
};

CreepController.prototype.spawnUnit = function(unitType, dir) {
    if (!unitType || !Direction.isValidDirection(dir)) {
        throw Error("null or invalid input");
    }
    if (Direction.OMNI.equals(dir)) {
        throw Error("Can't spawn on top of yourself!");
    }
    this.gc.trySpawn(this.id, unitType, dir);
};

CreepController.prototype.isActive = function() {
    return this.gc.isCreepActive(this.id);
};


CreepController.prototype.getSpawnDelay = function() {
    return this.gc.getSpawnDelay(this.id);
};

CreepController.prototype.getSelfInfo = function() {
    return this.gc.getPlayerInfo(this.id);
};

CreepController.prototype.getPlayerInfo = function() {
    return this.gc.getPlayerInfo();
};

CreepController.prototype.getSpawnUnitType = function() {
    return this.gc.getSpawnUnitType(this.id);
};

CreepController.prototype.getDirectionToPlayer = function() {
    var playerLoc = this.getPlayerInfo().location;
    var ourLoc = this.getCurrentLocation();
    return ourLoc.directionTo(playerLoc);
};

CreepController.prototype.senseDirectionToExit = function() {
    return this.gc.senseDirectionToExit(this.id);
};

module.exports = CreepController;