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

    // Grow large rooms around the start and exit
    MapUtils.createClearingAroundLocation(map, exit.add(Direction.NORTH_WEST), 1, 4, TerrainType.CEMENT);
    MapUtils.createClearingAroundLocation(map, exit.add(Direction.SOUTH_EAST), 1, 4, TerrainType.CEMENT);
    MapUtils.connectLocationsDrunkWalk(map, start, exit, 2, TerrainType.CEMENT);
    MapUtils.connectLocationsDrunkWalk(map, start, exit, 2, TerrainType.CEMENT);

    // Add creeps and pools of water
    var checkLoc;
    for (var i = 0; i < 11; i++) {
        checkLoc = new MapLocation(
            MapUtils.getRandomFromRange(0, map.width - 1),
            MapUtils.getRandomFromRange(0, map.height - 1)
        );
        if (map.isMoveSafe(checkLoc)) {
            if (Math.random() < .5) {
                map.addToSpawnList(primaryEnemy, checkLoc);
            }
            else if (Math.random() < .75) {
                MapUtils.createClearingAroundLocation(map, checkLoc, 1, 2, TerrainType.WATER);
            }
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