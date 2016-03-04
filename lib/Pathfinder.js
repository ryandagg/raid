var PF = require('pathfinding');


function Pathfinder(map) {
    this.map = map;
    this.grid = new PF.Grid(this.map.terrain);
    this.finder = new PF.DijkstraFinder();
    this.path = this.finder.findPath(
        this.map.start.x,
        this.map.start.y,
        this.map.exit.x,
        this.map.exit.y,
        this.grid
    );
}

Pathfinder.prototype = {
};

module.exports = Pathfinder;