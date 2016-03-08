var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapLocation = require('../GameObjects/MapLocation');
var MapOptions = require('./MapOptions');
var MapUtils = require('../Utils/MapUtils');
var TerrainType = require('../GameObjects/TerrainType');

function walk(height, width, mapOptions) {
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

    var type = Math.random();
    if (type < .25) {
        console.log("straight");
        MapUtils.connectLocationsStraightLine(map, start, exit, 1, TerrainType.CEMENT, {});
    } else if (type < .5) {
        console.log("curve");
        MapUtils.connectLocationsCurve(map, start, exit, 1, TerrainType.CEMENT, {});
    } else if (type < .75) {
        console.log("elbow");
        MapUtils.connectLocationsElbow(map, start, exit, 1, TerrainType.CEMENT, {});
    } else {
        console.log("drunk");
        MapUtils.connectLocationsDrunkWalk(map, start, exit, 1, TerrainType.CEMENT, {});
    }

    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.NORTH_WEST));
    }

    return map;
}

module.exports = {
    "create": walk
};