var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapLocation = require('../GameObjects/MapLocation');
var MapOptions = require('./MapOptions');
var MapUtils = require('../Utils/MapUtils');
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
    map = new Map(height, width, start, exit, roundLimit, TerrainType.WATER);
    map.fillWithTiles(TerrainType.WATER);

    // choose a few room centers
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
        var box = MapUtils.createBoxAroundLocation(map, centers[i], 2, 5, 2, 5, TerrainType.CEMENT);
        var upLeft = box[0];
        var botRight = box[1];

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


    MapUtils.elbowConnectLocationList(map, centers, 1, TerrainType.CEMENT, {});


    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.NORTH_WEST));
    }

    return map;
}

module.exports = {
    "create": sewer
};