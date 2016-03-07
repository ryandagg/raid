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
 * @param {Number} minBoxWidth
 * @param {Number} maxBoxWidth
 * @param {Number} minBoxHeight
 * @param {Number} maxBoxHeight
 * @param {TerrainType} terrainType
 */
function createBoxAroundLocation(map, location, minBoxWidth, maxBoxWidth, minBoxHeight, maxBoxHeight, terrainType) {
    var boxWidth = Math.round(Math.random() * (maxBoxWidth - minBoxWidth)) + minBoxWidth;
    var boxHeight = Math.round(Math.random() * (maxBoxHeight - minBoxHeight)) + minBoxHeight;
    var upperLeft = new MapLocation(
        Math.max(0, Math.floor(location.x - boxWidth/2)),
        Math.max(0, Math.floor(location.y - boxHeight/2))
    );

    var bottomRight = new MapLocation(
        Math.min(map.width - 1, Math.floor(location.x + boxWidth/2)),
        Math.min(map.height -1, Math.floor(location.y + boxHeight/2))
    );

    map.createTiles(upperLeft, bottomRight, terrainType);
    return [upperLeft, bottomRight];
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
    var r = Math.ceil(radius);
    for (var i = -r; i <= r; i++) {
        for (var j = -r; j <= r; j++) {
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
    var idx = 0;
    map.createTile(start, terrainType);
    map.createTile(finish, terrainType);
    if (width > 1) {
        createCircleAroundLocation(map, start, width/2, terrainType);
        createCircleAroundLocation(map, finish, width/2, terrainType);
    }
    var loc = start;
    while(idx < 100 && !loc.equals(finish)) {
        idx++;
        d = loc.directionTo(finish);
        loc = loc.add(d);
        map.createTile(loc, terrainType);
        if (width > 1) {
            createCircleAroundLocation(map, loc, width/2, terrainType);
        }
    }
}

function connectLocationsCurve(map, start, finish, width, terrainType, options) {
    var i, left, right, d;
    var loc = start;
    var idx = 0;
    var curveLeft = Math.random() < .5;
    map.createTile(start, terrainType);
    map.createTile(finish, terrainType);
    if (width > 1) {
        createCircleAroundLocation(map, start, width/2, terrainType);
        createCircleAroundLocation(map, finish, width/2, terrainType);
    }
    while(idx < 100 && !loc.equals(finish) && !loc.isAdjacentTo(finish)) {
        idx++;
        d = loc.directionTo(finish);
        if (curveLeft) {
            d = d.rotateLeft();
        } else {
            d = d.rotateRight();
        }
        if (!map.isOnMap(loc.add(d))) {
            d = loc.directionTo(finish);
        }
        loc = loc.add(d);
        map.createTile(loc, terrainType);
        if (width > 1) {
            createCircleAroundLocation(map, loc, width/2, terrainType);
        }
    }
}


function connectLocationsElbow(map, start, finish, width, terrainType, options) {
    map.createTile(start, terrainType);
    map.createTile(finish, terrainType);
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
    map.createTile(start, terrainType);
    map.createTile(finish, terrainType);
    var drunkness = options && options.drunkness || .8;
    if (drunkness < 0 || drunkness > .9) {
        throw Error("drunkness must be in [0, .9] 0 not drunk, .9 wasted")
    }
    var minWidth = options && options.minWidth || width;
    while(idx < start.distanceSquaredTo(finish) && !loc.equals(finish)) {
        idx++;
        d = loc.directionTo(finish);
        var drunkRoll = Math.random();
        if (drunkRoll < drunkness) {
            if (drunkRoll < .15 * drunkness) {
                d = d.rotateLeft();
            } else if (drunkRoll < .3 * drunkness) {
                d = d.rotateLeft();
            } else if (drunkRoll < .45 * drunkness) {
                d = d.rotateLeft().rotateLeft();
            } else if (drunkRoll < .6 * drunkness) {
                d = d.rotateRight().rotateRight();
            } else if (drunkRoll < .75 * drunkness) {
                d = d.rotateLeft().rotateLeft().rotateLeft();
            } else if (drunkRoll < .9 * drunkness) {
                d = d.rotateRight().rotateRight().rotateRight();
            } else {
                d = d.opposite();
            }
            if (!map.isOnMap(loc.add(d))) {
                d = loc.directionTo(finish);
            }
        }
        loc = loc.add(d);
        map.createTile(loc, terrainType);
        if (width > 1) {
            createCircleAroundLocation(map, loc, getRandomFromRange(minWidth, width)/2, terrainType);
        }
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
            connectorFunction(map, current, closest, width, terrainType, options);
        }


        if (closest2nd && Math.random() < doubleConnectsChance) {
            midPoint = new MapLocation(current.x, closest2nd.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest2nd.x, current.y);
            }
            connectorFunction(map, current, closest2nd, width, terrainType, options);
        }

    } while (visited.length + 1 < locations.length);

}


module.exports = {
    "getDirectionFromDiff": getDirectionFromDiff,
    "getRandomFromRange": getRandomFromRange,
    "growTilesFromLocation": growTilesFromLocation,
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