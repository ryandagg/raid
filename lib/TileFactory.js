var Tile = require('./GameObjects/Tile');
var TerrainType = require('./GameObjects/TerrainType');

function TileFactory() {

}

TileFactory.createTile = function(terrain) {
    var props;

    switch(terrain) {
        case TerrainType.GRASS:
            props = {
                "name": "Grass",
                "passable": true,
                "cssClass": "grass"
            };
            break;
        case TerrainType.DIRT:
            props = {
                "name": "Dirt",
                "passable": true,
                "cssClass": "dirt"
            };
            break;
        case TerrainType.SAND:
            props = {
                "name": "Sand",
                "passable": true,
                "cssClass": "sand"
            };
            break;
        case TerrainType.CEMENT:
            props = {
                "name": "Cement",
                "passable": true,
                "cssClass": "cement"
            };
            break;
        case TerrainType.WALL:
            props = {
                "name": "Wall",
                "passable": false,
                "cssClass": "wall"
            };
            break;
            return new Tile(props);
        case TerrainType.TREE:
            props = {
                "name": "Tree",
                "passable": false,
                "cssClass": "tree"
            };
            break;
        case TerrainType.WATER:
            props = {
                "name": "Water",
                "passable": false,
                "cssClass": "water"
            };
            break;
        case TerrainType.ROCK:
            props = {
                "name": "Rock",
                "passable": false,
                "cssClass": "rock"
            };
            break;
        default:
            throw Error(terrain + " not recognized!");
    }

    return new Tile(props);

};

module.exports = TileFactory;