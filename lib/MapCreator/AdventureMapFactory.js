var Map = require('../Map');
var Direction = require('../GameObjects/Direction');
var MapLocation = require('../GameObjects/MapLocation');
var UnitType = require('../UnitType');

function AdventureMapFactory() {

}


function sewer(height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options) {
    var fill, start, exit, map, roundLimit, i, j;

    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    // approximately the % of open space, must be in [.1,.6]
    fill = options.fill || .5;
    roundLimit = options.roundLimit || 1000;
    map = new Map(height, width, start, exit, roundLimit);
    map.fillWithWalls();

    // choose a few room centers
    var centers = [start, exit];
    i = 0;
    var idx = 0;
    while(i < fill * height * width / 25 + Math.random() * 2) {
        idx++;
        if (idx > 200) {
            break;
        }
        var newCenter = new MapLocation(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
        var validLoc = true;
        for (j = 0; j < centers.length; j++) {
            if (centers[j].distanceSquaredTo(newCenter) < 25) {
                validLoc = false;
            }
        }
        if (newCenter.x <= 2 || newCenter.x >= width - 3 || newCenter.y <= 2 || newCenter.y >= height - 3) {
            validLoc = false;
        }
        if (validLoc) {
            i++;
            centers.push(newCenter);
        }
    }


    // grow rooms randomly around centers
    map.clearArea(start, start.add(Direction.SOUTH_EAST));
    map.clearArea(exit.add(Direction.NORTH_WEST), exit);
    for (i = 2; i < centers.length; i++) {
        var minX = Math.round(Math.random()) + 1;
        var maxX = Math.round(Math.random()) + 1;
        var minY = Math.round(Math.random()) + 1;
        var maxY = Math.round(Math.random()) + 1;
        if (minX === 0 && maxX === 0 && minY === 0 && maxY === 0) {
            minX = 1;
            maxY = 1;
        }
        var upLeft = new MapLocation(centers[i].x - minX, centers[i].y - minY);
        var botRight = new MapLocation(centers[i].x + maxX, centers[i].y + maxY);
        map.clearArea(upLeft, botRight);
        if (Math.random() < .50) {
            map.addToSpawnList(primaryEnemy, centers[i]);
        }
        if (secondaryEnemy && !upLeft.equals(centers[i]) && Math.random() < .15) {
            map.addToSpawnList(secondaryEnemy, upLeft);
        }
        if (secondaryEnemy && !botRight.equals(centers[i]) && Math.random() < .15) {
            map.addToSpawnList(secondaryEnemy, botRight);
        }
    }

    // intelligently connect together the rooms
    var visited = [];
    var current = null;
    var open = [centers[0]];
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
        for (i = 0; i < centers.length; i++) {
            if (visited.indexOf(centers[i].toString()) !== -1) {
                continue;
            }
            dist = current.distanceSquaredTo(centers[i]);
            if (dist < cDist) {
                cDist2 = cDist;
                closest2nd = closest;
                cDist = dist;
                closest = centers[i];
            }
        }
        if (closest) {
            open.push(closest);
            var midPoint = new MapLocation(current.x, closest.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest.x, current.y);
            }
            map.clearArea(current, midPoint);
            map.clearArea(midPoint, closest);
            if (rareEnemy && Math.random() < .10 && !map.getUnitAtLoc(midPoint)) {
                map.addToSpawnList(rareEnemy, midPoint);
            }
        }


        if (closest2nd && Math.random() < .25) {
            midPoint = new MapLocation(current.x, closest2nd.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest2nd.x, current.y);
            }
            map.clearArea(current, midPoint);
            map.clearArea(midPoint, closest2nd);
            if (rareEnemy && Math.random() < .10 && !map.getUnitAtLoc(midPoint)) {
                map.addToSpawnList(rareEnemy, midPoint);
            }
        }

    } while (visited.length + 1 < centers.length);


    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.NORTH_WEST));
    }

    return map;
}


function forest(height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options) {
    var thickness, fill, start, exit, map, roundLimit, i, j, x, y;

    exit = new MapLocation(0, 0);
    start = new MapLocation(width - 1, height - 1);

    // how dense the forest is [0,1]
    thickness = options.thickness || 1;
    // how much of the map if forest [0,.6]
    fill = options.fill || .5;
    roundLimit = options.roundLimit || 1000;
    map = new Map(height, width, start, exit, roundLimit);

    // choose a few forest centers
    var centers = [start, exit];
    i = 0;
    var idx = 0;
    while(i < fill * height * width / 49 + Math.random() * 2) {
        idx++;
        if (idx > 200) {
            break;
        }
        var newCenter = new MapLocation(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
        var validLoc = true;
        for (j = 0; j < centers.length; j++) {
            if (centers[j].distanceSquaredTo(newCenter) < 49) {
                validLoc = false;
            }
        }
        if (newCenter.x <= 2 || newCenter.x >= width - 3 || newCenter.y <= 2 || newCenter.y >= height - 3) {
            validLoc = false;
        }
        if (validLoc) {
            i++;
            centers.push(newCenter);
        }
    }


    // grow forest randomly around centers
    for (i = 2; i < centers.length; i++) {
        var center = centers[i];
        map.createWall(center);
        for (x = -1; x<=1; x++) {
            for (y = -1; y<=1; y++) {
                if (x === 0 && y=== 0) {
                    continue;
                }
                loc = new MapLocation(center.x + x, center.y + y);
                if (Math.random() < .9 * thickness) {
                    map.createWall(loc);
                } else if (rareEnemy && Math.random() < .1 && !map.getUnitAtLoc(loc)) {
                    map.clearLoc(loc);
                    map.addToSpawnList(rareEnemy, loc);
                }
            }
        }

        for (x = -2; x<=2; x++) {
            for (y = -2; y<=2; y++) {
                if (Math.abs(x) !== 2 && Math.abs(y) !== 2) {
                    continue;
                }
                loc = new MapLocation(center.x + x, center.y + y);
                if (Math.random() < .4 * thickness) {
                    map.createWall(loc);
                } else if (Math.random() < .25 && !map.getUnitAtLoc(loc)) {
                    map.clearLoc(loc);
                    map.addToSpawnList(primaryEnemy, new MapLocation(center.x + x, center.y + y));
                }
            }
        }

        for (x = -3; x<=3; x++) {
            for (y = -3; y<=3; y++) {
                if (Math.abs(x) !== 3 && Math.abs(y) !== 3) {
                    continue;
                }
                loc = new MapLocation(center.x + x, center.y + y);
                if (Math.random() < .3 * thickness) {
                    map.createWall(loc);
                } else if(secondaryEnemy && Math.random() < .1 && !map.getUnitAtLoc(loc)) {
                    map.clearLoc(loc);
                    map.addToSpawnList(secondaryEnemy, loc);
                }
            }
        }

        for (x = -4; x<=4; x++) {
            for (y = -4; y<=4; y++) {
                if (Math.abs(x) !== 4 && Math.abs(y) !== 4) {
                    continue;
                }
                loc = new MapLocation(center.x + x, center.y + y);
                if (Math.random() < .2 * thickness) {
                    map.createWall(loc);
                }
            }
        }
    }

    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.SOUTH_EAST));
    }

    return map;
}

function createLegalMap(mapCreationFunction, height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options) {
    i = 0;
    do {
        map = mapCreationFunction(height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options);
        i++;
    } while (!map.isLegal() && i < 10);
    if (i == 10) {
        throw Error("Error generating legal map!");
    }
    return map;
}

// static functions
AdventureMapFactory.createAdventureMap = function(level) {
    switch(level) {
        case 1:
            return createLegalMap(forest, 21, 31, UnitType.RAT, null, null, null, {fill: .3, thickness: .25});
        case 2:
            return createLegalMap(forest, 21, 31, UnitType.RAT, UnitType.RAT, null, null, {fill: .4, thickness: .5});
        case 3:
            return createLegalMap(forest, 26, 51, UnitType.RAT, UnitType.RAT, UnitType.QUILL_BOAR, null, {fill: .5, thickness: .75});
        case 4:
            return createLegalMap(forest, 26, 51, UnitType.SKELETON, UnitType.SKELETON, UnitType.NECROMANCER, UnitType.NECROMANCER, {fill: .6, thickness: 1});
        case 5:
            return createLegalMap(sewer, 26, 51, UnitType.RAT, null, null, null, {fill: .5});
        case 6:
            return createLegalMap(sewer, 26, 51, UnitType.RAT, UnitType.RAT, null, null, {fill: .4});
        case 7:
            return createLegalMap(sewer, 26, 51, UnitType.SKELETON, null, UnitType.SKELETON, null, {fill: .3});
        case 8:
            return createLegalMap(sewer, 26, 51, UnitType.SKELETON, UnitType.SKELETON, UnitType.NECROMANCER, UnitType.NECROMANCER, {fill: .2});
        default:
            throw Error("no adventure level "+ level);
    }
};

module.exports = AdventureMapFactory;