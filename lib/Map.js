var MapLocation = require('./GameObjects/MapLocation');
var TerrainType = require('./GameObjects/TerrainType');


function Map(height, width, start, exit, roundLimit) {
    this.width = width;
    this.height = height;
    this.start = start;
    this.exit = exit;
    this.roundLimit = roundLimit || 2000;
    this.terrain = [];
    this.units = [];

    // create a very open map with a wall border
    var nulls = [];
    var open = [];
    for (var j = 0; j < this.width; j++) {
        nulls.push(null);
        open.push(TerrainType.OPEN);
    }
    for (var i = 0; i < this.height; i++) {
        this.terrain.push(open.slice(0));
        this.units.push(nulls.slice(0));
    }

    this.upperLeft = new MapLocation(0, 0);
    this.upperRight = new MapLocation(this.width - 1, 0);
    this.bottomRight = new MapLocation(this.width - 1, this.height - 1);
    this.bottomLeft = new MapLocation(0, this.height - 1);

    // a list of places you can spawn units
    this.spawnList = [];
}

Map.prototype = {
    spawnListContains: function(loc) {
        for (var i = 0; i < this.spawnList.length; i++) {
            if (this.spawnList[i].loc.equals(loc)) {
                return true;
            }
        }
        return false;
    },
    isLegal: function() {
        // TODO: this!
        // checks to see if:
        // 1. there exists a non-wall path from start to exit
        // 2. all unit start positions are on empty squares and on-map
        // returns true if all above are met, false otherwise
        return true;
    },
    cleanUp: function() {
        this.clearLoc(this.start);
        this.clearLoc(this.exit);
    },
    fillWithWalls: function() {
        this.createWalls(this.upperLeft, this.bottomRight);
    },
    addToSpawnList: function(unitType, loc) {
        this.spawnList.push({
            "type": unitType,
            "loc": loc
        });
    },
    createWall: function(loc) {
        if (!this.isOnMap(loc)) {
            console.log("Not on the map!");
        } else {
            this.terrain[loc.y][loc.x] = TerrainType.WALL;
        }
    },
    clearLoc: function(loc) {
        if (!this.isOnMap(loc)) {
            console.log("Not on the map!");
        } else {
            this.terrain[loc.y][loc.x] = TerrainType.OPEN;
        }
    },
    clearArea: function(start, end) {
        if (!this.isOnMap(start) || !this.isOnMap(end)) {
            console.log("Not on the map!");
        } else {
            var upLeft = new MapLocation(Math.min(start.x, end.x), Math.min(start.y, end.y));
            var botRight = new MapLocation(Math.max(start.x, end.x), Math.max(start.y, end.y));
            for (var i = upLeft.y; i<= botRight.y; i++) {
                for (var j = upLeft.x; j<= botRight.x; j++) {
                    this.terrain[i][j] = TerrainType.OPEN;
                }
            }
        }
    },
    createWallBorder: function() {
        this.createWalls(this.upperLeft, this.upperRight);
        this.createWalls(this.upperRight, this.bottomRight);
        this.createWalls(this.bottomLeft, this.bottomRight);
        this.createWalls(this.upperLeft, this.bottomLeft);
    },
    createWalls: function(start, end) {
        if (!this.isOnMap(start) || !this.isOnMap(end)) {
            console.log("Not on the map!");
        } else {
            var upLeft = new MapLocation(Math.min(start.x, end.x), Math.min(start.y, end.y));
            var botRight = new MapLocation(Math.max(start.x, end.x), Math.max(start.y, end.y));
            for (var i = upLeft.y; i<= botRight.y; i++) {
                for (var j = upLeft.x; j<= botRight.x; j++) {
                    this.terrain[i][j] = TerrainType.WALL;
                }
            }
        }
    },
    isOnMap: function(loc) {
        if (loc.x < 0) {
            return false;
        }
        if (loc.x >= this.width) {
            return false;
        }
        if (loc.y < 0) {
            return false;
        }
        if (loc.y >= this.height) {
            return false;
        }
        return true;
    },
    isMoveSafe: function(loc) {
        if (!this.isOnMap(loc)) {
            return false;
        }
        return this.terrain[loc.y][loc.x] === TerrainType.OPEN && this.units[loc.y][loc.x] === null;
    },
    getUnitAtLoc: function(loc) {
        if (!this.isOnMap(loc)) {
            return null;
        }
        return this.units[loc.y][loc.x];
    },
    getExitLoc: function() {
        return this.exit;
    },
    getStartLoc: function() {
        return this.start;
    },
    removeUnitAtLoc: function(loc) {
        if (this.units[loc.y][loc.x] === null) {
            throw Error("Nothing there to remove!");
        }
        if (!this.isOnMap(loc)) {
            throw Error(loc.toString() + " is not on the map!");
        }
        this.units[loc.y][loc.x] = null;
    },
    addUnit: function(unit) {
        var loc = unit.location;
        if (!this.isOnMap(loc)) {
            throw Error(loc.toString() + " is not on the map!");
        }
        if (this.units[loc.y][loc.x] !== null) {
            throw Error("Can't add unit there!");
        }
        this.units[loc.y][loc.x] = unit;
    },
    moveUnit: function(sourceLoc, destLoc) {
        if (!this.isOnMap(destLoc)) {
            throw Error(destLoc.toString() + " is not on the map!");
        }
        if (!this.isOnMap(sourceLoc)) {
            throw Error(sourceLoc.toString() + " is not on the map!");
        }
        if (this.units[destLoc.y][destLoc.x] !== null) {
            throw Error("can't move to that location something is already there!");
        }
        if (this.terrain[destLoc.y][destLoc.x] !== TerrainType.OPEN) {
            throw Error("Can't move to target location, it is not empty!");
        }
        if (this.units[sourceLoc.y][sourceLoc.x] === null) {
            throw Error("There isn't a unit to move at that location!");
        }
        this.units[destLoc.y][destLoc.x] = this.units[sourceLoc.y][sourceLoc.x];
        this.units[sourceLoc.y][sourceLoc.x] = null;
    },
    isWall: function(loc) {
        if (!this.isOnMap(loc)) {
            return true;
        }
        return this.terrain[loc.y][loc.x] === TerrainType.WALL;
    }
};

module.exports = Map;