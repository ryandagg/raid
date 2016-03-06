var MapRenderer = require('./MapRenderer');
var PlayerRenderer = require('./PlayerRenderer');
var UnitRenderer = require('./UnitRenderer');
var GraphicsLibrary = require('./GraphicsLibrary');

function GameRenderer(canvas){
	this.fx = new GraphicsLibrary(canvas);
	this.mapRenderer = new MapRenderer(this.fx);
	this.playerRenderer = new PlayerRenderer(this.fx);
	this.unitRenderer = new UnitRenderer(this.fx);
}

GameRenderer.prototype.render = function(gameState){
	this.mapRenderer.render(gameState.map);
	this.playerRenderer.render(gameState.player, gameState.map, this.mapRenderer);
	this.unitRenderer.render(gameState.unitManager.units, gameState.map, this.mapRenderer);
};

module.exports = GameRenderer;