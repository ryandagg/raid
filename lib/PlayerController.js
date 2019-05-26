
var UnitController = require('./UnitController');
var GameController = require('./GameController');
var PathFinder = require('./Utils/Pathfinder')

function PlayerController(id) {
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
PlayerController.prototype = Object.create(UnitController.prototype);

PlayerController.prototype.senseDirectionToExit = function() {
    return this.gc.senseDirectionToExit(this.id);
};

PlayerController.prototype.senseExitLocIfClose = function() {
    return this.gc.senseExitIfClose(this.id);
};

PlayerController.prototype.findPath = PathFinder.findPath;
PlayerController.prototype.nextDirTo = PathFinder.nextDirTo;
PlayerController.prototype.terrainToPFArray = PathFinder.terrainToPFArray;

module.exports = PlayerController;
