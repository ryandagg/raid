var Map = require('../Map');
var UnitType = require('../UnitType');
var MapOptions = require('./MapOptions');
var TerrainType = require('../GameObjects/TerrainType');

var CaveCreator = require('./CaveCreator');
var CampCreator = require('./CampCreator');
var ForestCreator = require('./ForestCreator');
var MazeCreator = require('./MazeCreator');
var SewerCreator = require('./SewerCreator');
var WalkCreator = require('./WalkCreator');

function AdventureMapFactory() {

}

function createLegalMap(mapCreationFunction, height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options) {
    var i = 0;
    do {
        map = mapCreationFunction(height, width, primaryEnemy, secondaryEnemy, rareEnemy, boss, options);
        i++;
    } while (!map.isLegal() && i < 100);

    if (i == 100) {
        throw Error("Error generating legal map!");
    }
    return map;
}

// static functions
AdventureMapFactory.createAdventureMap = function(level) {
    var mapOptions;
    switch(level) {
        case 1:
            mapOptions = {};
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.NUM_PRIMARY_ENEMIES] = 10;
            mapOptions[MapOptions.SWARM_ENEMY] = UnitType.GNAT;
            mapOptions[MapOptions.NUM_SWARM_ENEMIES] = 20;
            mapOptions[MapOptions.TERRAIN_FILL] = .3;
            mapOptions[MapOptions.TERRAIN_DENSITY] = .25;
            return createLegalMap(CampCreator.create, 16, 21, mapOptions);
        case 2:
            mapOptions = {};
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.SWARM_ENEMY] = UnitType.GNAT;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.TERRAIN_FILL] = .4;
            mapOptions[MapOptions.TERRAIN_DENSITY] = .5;
            return createLegalMap(CaveCreator.create, 21, 31, mapOptions);
        case 3:
            mapOptions = {};
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.SWARM_ENEMY] = UnitType.GNAT;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.RARE_ENEMY] = UnitType.QUILL_BOAR;
            mapOptions[MapOptions.TERRAIN_FILL] = .5;
            mapOptions[MapOptions.TERRAIN_DENSITY] = .75;
            return createLegalMap(SewerCreator.create, 26, 51, mapOptions);
        case 4:
            mapOptions = {};
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.SWARM_ENEMY] = UnitType.GNAT;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.RARE_ENEMY] = UnitType.QUILL_BOAR;
            mapOptions[MapOptions.BOSS_ENEMY] = UnitType.NECROMANCER;
            mapOptions[MapOptions.TERRAIN_FILL] = .5;
            mapOptions[MapOptions.TERRAIN_DENSITY] = .75;
            return createLegalMap(ForestCreator.create, 26, 51, mapOptions);
        case 5:
            mapOptions = {};
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.TERRAIN_FILL] = .5;
            return createLegalMap(SewerCreator.create, 26, 51, mapOptions);
        case 6:
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.GIANT_FROG;
            mapOptions[MapOptions.TERRAIN_FILL] = .5;
            return createLegalMap(SewerCreator.create, 26, 51, mapOptions);
        case 7:
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.SKELETON;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.SKELETON;
            mapOptions[MapOptions.TERRAIN_FILL] = .3;
            return createLegalMap(SewerCreator.create, 26, 51, mapOptions);
        case 8:
            mapOptions[MapOptions.PRIMARY_ENEMY] = UnitType.SKELETON;
            mapOptions[MapOptions.SECONDARY_ENEMY] = UnitType.SKELETON;
            mapOptions[MapOptions.RARE_ENEMY] = UnitType.NECROMANCER;
            mapOptions[MapOptions.BOSS_ENEMY] = UnitType.NECROMANCER;
            mapOptions[MapOptions.TERRAIN_FILL] = .3;
            return createLegalMap(SewerCreator.create, 26, 51, mapOptions);
        default:
            throw Error("no adventure level "+ level);
    }
};

module.exports = AdventureMapFactory;