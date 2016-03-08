var Direction = require('../GameObjects/Direction');
var Map = require('../Map');
var MapLocation = require('../GameObjects/MapLocation');
var MapUtils = require('../Utils/MapUtils');
var MapOptions = require('./MapOptions');
var OpenSpaceFinder = require('./OpenSpaceFinder');
var TerrainType = require('../GameObjects/TerrainType');


function maze(height, width, mapOptions) {
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
    map = new Map(height, width, start, exit, roundLimit, TerrainType.GRASS);


    var maze = require('simple-maze-generator')(cols, rows, density);
    maze.makeWay(from, to);
    maze.toMatriz();
    maze.toString();


    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.SOUTH_EAST));
    }


    return map;
}


module.exports = {
    "create": maze
};