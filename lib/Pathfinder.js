var PF = require('pathfinding');
var TerrainType = require('./GameObjects/TerrainType');


function Pathfinder(map) {
    this.map = map;

    console.log("this.map.terrain:");
    console.log(this.map.terrain);
    console.log("this.map.terrain[0]:");
    console.log(this.map.terrain[0]);

    this.grid = new PF.Grid(this.map.width, this.map.height);

    this.setUnwalkableSquares();

    console.log(this.grid);
}

Pathfinder.prototype = {
    canLocationReachStart: function(loc) {
        //
    },
    getNextSquareToStart: function(loc) {
        //returns the next MapLocation to get to the start
    },
    setUnwalkableSquares: function() {
        console.log(this.map.terrain);
        for (i = 0; i < this.map.height; ++i) {
            for (j = 0; j < this.map.width; ++j) {
                if (this.map.terrain[i][j] == TerrainType.WALL) {
                    this.grid.setWalkableAt(i, j, false);
                }
            }
        }
    }
};

module.exports = Pathfinder;