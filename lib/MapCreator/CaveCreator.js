var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapUtils = require('../Utils/MapUtils');
var MapLocation = require('../GameObjects/MapLocation');
var MapOptions = require('./MapOptions');
var TerrainType = require('../GameObjects/TerrainType');

function cave(height, width, mapOptions) {
    var start, exit, map;
    var primaryEnemy = mapOptions[MapOptions.PRIMARY_ENEMY];
    var secondaryEnemy = mapOptions[MapOptions.SECONDARY_ENEMY];
    var rareEnemy = mapOptions[MapOptions.RARE_ENEMY];
    var boss = mapOptions[MapOptions.BOSS_ENEMY];
    var fill = mapOptions[MapOptions.TERRAIN_FILL] || 1;
    var roundLimit = mapOptions[MapOptions.ROUND_LIMIT] || 1000;

    start = new MapLocation(1, 1);
    exit = new MapLocation(width - 2, height - 2);

    // Approximately the % of open space, must be in [.1,.6]
    map = new Map(height, width, start, exit, roundLimit, TerrainType.ROCK);
    map.fillWithTiles(TerrainType.ROCK);


    // create a few rooms
    var centers = MapUtils.createSpacedOutLocations(width, height, .5, 64, start, exit);

    // grow clearings around each room
    centers.forEach(function(center) {
        MapUtils.createClearingAroundLocation(map, center, 2, 4, TerrainType.CEMENT);
    });

    MapUtils.drunkConnectLocationList(map, centers, 1, TerrainType.CEMENT, {drunkness: .5});

    // Add creeps and pools of water
    var checkLoc;
    for (var i = 2; i < centers.length; i++) {
        var center = centers[i];
        if (Math.random() < .5) {
            map.addToSpawnList(primaryEnemy, center);
        } else if (Math.random() < .75) {
            MapUtils.createClearingAroundLocation(map, center, 0, 1, TerrainType.WATER);
        }
    }

    // Spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.NORTH_WEST));
    }

    return map;
}

module.exports = {
    "create": cave
};