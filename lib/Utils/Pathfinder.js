var PF = require('pathfinding');
var Direction = require('../GameObjects/Direction');

/**
 * Creates a path Array from a start and end MapLocation
 *
 * @param {Array} terrain The map's terrain information.
 * @param {MapLocation} start The start location for the path.
 * @param {MapLocation} end The end location for the path.
 *
 * @return {Array} path An Array of X,Y coordinates leading from start to end or an empty Array.
 */
function findPath(terrain, start, end) {
    var grid = new PF.Grid(terrain);
    var finder = new PF.DijkstraFinder();
    return finder.findPath(start.x, start.y, end.x, end.y, grid);
}

/**
 * Simply determines whether or not any path exists at all.
 *
 * @param {Array} terrain The map's terrain information.
 * @param {MapLocation} start The start location for the path.
 * @param {MapLocation} end The end location for the path.
 *
 * @return {Boolean}
 */
function doesPathExist(terrain, start, end) {
    var path = findPath(terrain, start, end);
    return path.length >= 1;
}

/**
 * Determines what direction to take next to get from start to end.
 *
 * @param {Array} terrain The map's terrain information.
 * @param {MapLocation} start The start location for the path.
 * @param {MapLocation} end The end location for the path.
 *
 * @return {Direction|null} A Direction object indicating the appropriate direction or null if invalid.
 */
function nextDirTo(terrain, start, end) {
    var path = findPath(terrain, start, end);
    var moveX = path[1][0] - start.x;
    var moveY = path[1][1] - start.y;

    if (moveX > -2 && moveX < 2 && moveY > -2 && moveX < 2) {
        return new Direction(moveX, moveY);
    }

    return null;
}

module.exports = {
    findPath: findPath,
    doesPathExist: doesPathExist,
    nextDirTo: nextDirTo
};