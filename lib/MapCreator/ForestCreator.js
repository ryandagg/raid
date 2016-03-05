var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapLocation = require('../GameObjects/MapLocation');
var MapOptions = require('./MapOptions');
var OpenSpaceFinder = require('./OpenSpaceFinder');


function forest(height, width, mapOptions) {
    var start, exit, map, i, j, x, y;
    var primaryEnemy = mapOptions[MapOptions.PRIMARY_ENEMY];
    var secondaryEnemy = mapOptions[MapOptions.SECONDARY_ENEMY];
    var swarmEnemy = mapOptions[MapOptions.SWARM_ENEMY];
    var rareEnemy = mapOptions[MapOptions.RARE_ENEMY];
    var boss = mapOptions[MapOptions.BOSS_ENEMY];
    var fill = mapOptions[MapOptions.TERRAIN_FILL] || 1;
    var roundLimit = mapOptions[MapOptions.ROUND_LIMIT] || 1000;
    var terrainDensity = mapOptions[MapOptions.TERRAIN_DENSITY] || .5;

    exit = new MapLocation(0, 0);
    start = new MapLocation(width - 1, height - 1);

    // how dense the forest is [0,1]
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
                if (Math.random() < .9 * terrainDensity) {
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
                if (Math.random() < .4 * terrainDensity) {
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
                if (Math.random() < .3 * terrainDensity) {
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
                if (Math.random() < .2 * terrainDensity) {
                    map.createWall(loc);
                }
            }
        }
    }

    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.SOUTH_EAST));
    }


    if (swarmEnemy) {
        var openSpaces = OpenSpaceFinder.findOpenSpaces(map);
        for (i = 0; i < Math.min(1, openSpaces.length); i++) {
            center = openSpaces[i].center;
            radius = openSpaces[i].radius;
            radius = Math.min(radius, 2);
            for (x = -radius; x <= radius; x++) {
                for (y = -radius; y <= radius; y++) {
                    loc = new MapLocation(center.x + x, center.y + y);
                    if (loc.distanceSquaredTo(center) > radius * radius) {
                        continue;
                    }
                    if (map.isOnMap(loc) && !map.isWall(loc) && !map.spawnListContains(loc)) {
                        map.addToSpawnList(swarmEnemy, loc);
                    }
                }
            }
        }

    }


    return map;
}


module.exports = {
    "create": forest
};