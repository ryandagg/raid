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

    var centers = MapUtils.createSpacedOutLocations(width, height, fill, 49, start, exit);

    // grow rooms randomly around centers
    centers.forEach(function(center) {
        var box = MapUtils.createBoxAroundLocation(map, center, 2, 5, 2, 5, TerrainType.CEMENT);
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
    });

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