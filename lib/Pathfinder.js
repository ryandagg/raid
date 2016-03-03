var PF = require('pathfinding');


function Pathfinder(map) {
    this.map = map;
    this.grid = new PF.Grid(this.map.terrain);
}

Pathfinder.prototype = {
    canLocationReachStart: function(loc) {
        //
    },
    getNextSquareToStart: function(loc) {
        //returns the next MapLocation to get to the start
    }
};

module.exports = Pathfinder;