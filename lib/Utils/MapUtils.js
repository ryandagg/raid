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
            if (loc.distanceSquaredTo(location) > maxRadius * maxRadius) {
                break;
            }
            if (Math.random() < (1 + j) / maxRadius) {
                break;
            }
            map.createTile(loc, terrainType);
            map.createTile(loc.add(d), terrainType);
            if (Math.random() < .75) {
                map.createTile(loc.add(d.rotateLeft()), terrainType);
                map.createTile(loc.add(d.rotateRight()), terrainType);
            }
            if (Math.random() < .25) {
                d = d.rotateLeft();
            } else if (Math.random() < .25) {
                d = d.rotateRight();
            }
            loc = loc.add(d);
        }
    }
}


function connectLocationsStraightLine(map, start, finish, width, terrainType, options) {
    var i, left, right, d;
    var loc = start;
    var idx = 0;
    while(idx < 100 && !loc.equals(finish)) {
        idx++;
        map.createTile(loc, terrainType);
        d = loc.directionTo(finish);
        left = d.rotateLeft().rotateLeft();
        for (i = 1; i < width/2; i++) {
            map.createTile(loc.add(left, i), terrainType);
        }
        right = d.rotateRight().rotateRight();
        for (i = 1; i < (width - 1)/2; i++) {
            map.createTile(loc.add(right, i), terrainType);
        }
        loc = loc.add(d);
    }
}

function connectLocationsCurve(map, start, finish, width, terrainType, options) {
    var i, left, right, d;
    var loc = start;
    var idx = 0;
    var curveLeft = Math.random() < .5;
    while(idx < 100 && !loc.equals(finish)) {
        idx++;
        map.createTile(loc, terrainType);
        d = loc.directionTo(finish);
        if (curveLeft) {
            d = d.rotateLeft();
        } else {
            d = d.rotateRight();
        }
        left = d.rotateLeft().rotateLeft();
        for (i = 1; i < width/2; i++) {
            map.createTile(loc.add(left, i), terrainType);
        }
        right = d.rotateRight().rotateRight();
        for (i = 1; i < (width - 1)/2; i++) {
            map.createTile(loc.add(right, i), terrainType);
        }
        loc = loc.add(d.rotateLeft());
    }
}


function connectLocationsElbow(map, start, finish, width, terrainType, options) {
    var midpoint = new MapLocation(start.x, finish.y);
    if (Math.random() < .5) {
        midpoint = new MapLocation(finish.x, start.y);
    }
    connectLocationsStraightLine(map, start, midpoint, width, terrainType);

    if (width > 1) {
        midpoint = midpoint.add(finish.directionTo(midpoint), width/2);
    }
    connectLocationsStraightLine(map, midpoint, finish, width, terrainType);
}


function connectLocationsDrunkWalk(map, start, finish, width, terrainType, options) {
    var i, left, right, d;
    var loc = start;
    var idx = 0;
    var drunkness = options && options.drunkness || .3;
    if (drunkness < 0 || drunkness > .9) {
        throw Error("drunkness must be in [0, .9] 0 not drunk, .9 wasted")
    }
    while(idx < 100 && !loc.equals(finish)) {
        idx++;
        map.createTile(loc, terrainType);
        d = loc.directionTo(finish);
        while(Math.random() < drunkness) {
            if (Math.random() < .5) {
                d = d.rotateLeft();
            } else {
                d = d.rotateRight();
            }
        }

        left = d.rotateLeft().rotateLeft();
        for (i = 1; i < width/2; i++) {
            map.createTile(loc.add(left, i), terrainType);
        }
        right = d.rotateRight().rotateRight();
        for (i = 1; i < (width - 1)/2; i++) {
            map.createTile(loc.add(right, i), terrainType);
        }
        loc = loc.add(d);
    }
    if (!loc.equals(finish)) {
        connectLocationsStraightLine(map, loc, finish, width, terrainType);
    }
}

function drunkConnectLocationList(map, locations, width, terrainType, options) {
    _connectLocationList(map, locations, width, connectLocationsDrunkWalk, terrainType, options);
}

function straightConnectLocationList(map, locations, width, terrainType, options) {
    _connectLocationList(map, locations, width, connectLocationsStraightLine, terrainType, options);
}

function elbowConnectLocationList(map, locations, width, terrainType, options) {
    _connectLocationList(map, locations, width, connectLocationsElbow, terrainType, options);
}

function curveConnectLocationList(map, locations, width, terrainType, options) {
    _connectLocationList(map, locations, width, connectLocationsCurve, terrainType, options);
}

function _connectLocationList(map, locations, width, connectorFunction, terrainType, options) {
    var visited = [];
    var current = null;
    var open = [locations[0]];
    var doubleConnectsChance = options.doubleConnectionChance || 0;
    idx = 0;
    do {
        idx++;
        if (idx > 200) {
            break;
        }
        current = open.pop();
        visited.push(current.toString());
        var closest, cDist, closest2nd, cDist2, dist;
        cDist = 10000;
        cDist2 = 10000;
        for (i = 0; i < locations.length; i++) {
            if (visited.indexOf(locations[i].toString()) !== -1) {
                continue;
            }
            dist = current.distanceSquaredTo(locations[i]);
            if (dist < cDist) {
                cDist2 = cDist;
                closest2nd = closest;
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
            connectorFunction(current, closest);
        }


        if (closest2nd && Math.random() < doubleConnectsChance) {
            midPoint = new MapLocation(current.x, closest2nd.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest2nd.x, current.y);
            }
            connectorFunction(current, closest);
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
    "createClearingAroundLocation": createClearingAroundLocation,
    "connectLocationsStraightLine": connectLocationsStraightLine,
    "connectLocationsElbow": connectLocationsElbow,
    "connectLocationsDrunkWalk": connectLocationsDrunkWalk,
    "connectLocationsCurve": connectLocationsCurve,
    "drunkConnectLocationList": drunkConnectLocationList,
    "straightConnectLocationList": straightConnectLocationList,
    "elbowConnectLocationList": elbowConnectLocationList,
    "curveConnectLocationList": curveConnectLocationList
};