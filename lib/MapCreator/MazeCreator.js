var generateMaze = require('generate-maze-by-clustering');

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

    exit = new MapLocation(1, 1);
    start = new MapLocation(width - 2, height - 2);

    // how dense the forest is [0,1]
    map = new Map(height, width, start, exit, roundLimit, TerrainType.GRASS);


    var maze = generateMaze([width, height]);
    var matrixLines = maze.toText().split('\n');
    console.log("height", height);
    console.log("magtrixlines.length", matrixLines.length);
    for (j = 0; j < height; j++) {
        var line = matrixLines[j];
        for (i = 0; i < width; i++) {
            var loc = new MapLocation(i, j);
            if (line[i] === "#") {
                map.createTile(loc, TerrainType.TREE)
            } else {
                map.createTile(loc, TerrainType.GRASS)
            }
        }
    }


    // spawn the boss at the exit
    if (boss) {
        map.addToSpawnList(boss, exit.add(Direction.SOUTH_EAST));
    }


    return map;
}


module.exports = {
    "create": maze
};