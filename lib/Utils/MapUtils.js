var Direction = require('../GameObjects/Direction');
var MapLocation = require('../GameObjects/MapLocation');


function getDirectionFromDiff(diffX, diffY) {
    var scaler = Math.max(Math.abs(diffX), Math.abs(diffY));
    if (scaler === 0) {
        return Direction.OMNI;
    }
    return new Direction(Math.round(diffX/scaler), Math.round(diffY/scaler));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Expand tiles around a central location
 *
 * @param {MapLocation} location
 * @param {Direction} direction
 * @param {Map} map
 * @param {TerrainType} terrainType
 * @param {Number} sizeX
 * @param {Number} sizeY
 */
function growTilesFromLocation(location, direction, map, terrainType, sizeX, sizeY) {
    var newX = location.x + direction.x * sizeX;
    var newY = location.y + direction.y * sizeY;

    map.createTiles(location, new MapLocation(newX, newY), terrainType);
}

/**
 * Creates a box around given MapLocation
 * grows the box so the location is evenly centered in the middle
 *
 * @param {Map} map
 * @param {MapLocation} location
 * @param {Number} boxWidth
 * @param {Number} boxHeight
 * @param {TerrainType} terrainType
 */
function createBoxAroundLocation(map, location, boxWidth, boxHeight, terrainType) {
    var upperLeft = new MapLocation(
        Math.max(0, Math.floor(location.x - boxWidth/2)),
        Math.max(0, Math.floor(location.y - boxHeight/2))
    );

    var bottomRight = new MapLocation(
        Math.min(map.width - 1, Math.floor(location.x + boxWidth/2)),
        Math.min(map.height -1, Math.floor(location.y + boxHeight/2))
    );

    map.createTiles(upperLeft, bottomRight, terrainType);
}

/**
 * Creates a circle of radius radius around a given location
 *
 * @param {Map} map
 * @param {MapLocation} location
 * @param {Number} radius
 * @param {TerrainType} terrainType
 */
function createCircleAroundLocation(map, location, radius, terrainType) {
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            var loc = new MapLocation(location.x + i, location.y + j);
            if (map.isOnMap(loc) && loc.distanceSquaredTo(location) <= radius * radius) {
                map.createTile(loc, terrainType);
            }
        }
    }
}

/**
 * Creates an organic-looking clearing around an opening that is at least minRadius
 * and at most maxRadius
 *
 * @param {Map} map
 * @param {MapLocation} location
 * @param {Number} minRadius
 * @param {Number} maxRadius
 * @param {TerrainType} terrainType
 */
function createClearingAroundLocation(map, location, minRadius, maxRadius, terrainType) {
    // make sure we have a minimum
    createCircleAroundLocation(map, location, minRadius, terrainType);

    // now randomly create up to the max
    for (var i = 0; i < 4 + Math.random() * 4; i++) {
        var d = Direction.randomDirection();
        var loc = location;
        for (var j = 0; j < maxRadius; j++) {
            loc = location.add(d);
            if (loc.distanceSquaredTo(location) > maxRadius * maxRadius) {
                break;
            }
            if (Math.random() < (1 + j) / maxRadius) {
                break;
            }
            map.createTile(loc, terrainType);
            map.createTile(loc.add(d.rotateLeft()));
            map.createTile(loc.add(d.rotateRight()));
            if (Math.random() < .25) {
                d = d.rotateLeft();
            } else if (Math.random() < .25) {
                d = d.rotateRight();
            }
        }
    }
}

/**
 * Connect all locations together so that all are connected
 *
 * @param {Array} locations
 * @param {Map} map
 * @param {TerrainType} terrainType
 */
function connectLocations(locations, map, terrainType) {
    var visited = [];
    var current = null;
    var open = [locations[0]];
    var idx = 0;
    do {
        idx++;
        if (idx > 200) {
            break;
        }
        current = open.pop();
        visited.push(current.toString());
        var closest, cDist, dist;
        cDist = 10000;
        for (var i = 0; i < locations.length; i++) {
            if (visited.indexOf(locations[i].toString()) !== -1) {
                continue;
            }
            dist = current.distanceSquaredTo(locations[i]);
            if (dist < cDist) {
                cDist = dist;
                closest = locations[i];
            }
        }
        if (closest) {
            open.push(closest);
            var midPoint = new MapLocation(current.x, closest.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest.x, current.y);
            }
            map.clearArea(current, midPoint, terrainType);
            map.clearArea(midPoint, closest, terrainType);
        }

    } while (visited.length + 1 < locations.length);
}

module.exports = {
    "getDirectionFromDiff": getDirectionFromDiff,
    "getRandomFromRange": getRandomFromRange,
    "growTilesFromLocation": growTilesFromLocation,
    "connectLocations": connectLocations,
    "createBoxAroundLocation": createBoxAroundLocation,
    "createCircleAroundLocation": createCircleAroundLocation,
    "createClearingAroundLocation": createClearingAroundLocation
};