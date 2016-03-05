var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapLocation = require('../GameObjects/MapLocation');
var MapOptions = require('./MapOptions');
var TerrainType = require('../GameObjects/TerrainType');

function sewer(height, width, mapOptions) {
    var start, exit, map, i, j;
    var primaryEnemy = mapOptions[MapOptions.PRIMARY_ENEMY];
    var secondaryEnemy = mapOptions[MapOptions.SECONDARY_ENEMY];
    var rareEnemy = mapOptions[MapOptions.RARE_ENEMY];
    var boss = mapOptions[MapOptions.BOSS_ENEMY];
    var fill = mapOptions[MapOptions.TERRAIN_FILL] || .5;
    var roundLimit = mapOptions[MapOptions.ROUND_LIMIT] || 1000;

    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);
    // approximately the % of open space, must be in [.1,.6]
    map = new Map(height, width, start, exit, roundLimit);
    map.fillWithTiles(TerrainType.WATER);

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
    map.clearArea(start, start.add(Direction.SOUTH_EAST), TerrainType.CEMENT);
    map.clearArea(exit.add(Direction.NORTH_WEST), exit, TerrainType.CEMENT);
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
        map.clearArea(upLeft, botRight, TerrainType.CEMENT);
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
            map.clearArea(current, midPoint, TerrainType.CEMENT);
            map.clearArea(midPoint, closest, TerrainType.CEMENT);
            if (rareEnemy && Math.random() < .10 && !map.getUnitAtLoc(midPoint)) {
                map.addToSpawnList(rareEnemy, midPoint);
            }
        }


        if (closest2nd && Math.random() < .25) {
            midPoint = new MapLocation(current.x, closest2nd.y);
            if (Math.random() < .5) {
                midPoint = new MapLocation(closest2nd.x, current.y);
            }
            map.clearArea(current, midPoint, TerrainType.CEMENT);
            map.clearArea(midPoint, closest2nd, TerrainType.CEMENT);
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

module.exports = {
    "create": sewer
};