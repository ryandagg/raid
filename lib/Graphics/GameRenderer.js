var MapRenderer = require('./MapRenderer');
var UnitRenderer = require('./UnitRenderer');
var GraphicsLibrary = require('./GraphicsLibrary');

function GameRenderer(canvas){
	this.fx = new GraphicsLibrary(canvas);
	this.mapRenderer = new MapRenderer(this.fx);
	this.unitRenderer = new UnitRenderer(this.fx);
}

GameRenderer.prototype.render = function(gameState){
	this.mapRenderer.render();
	this.unitRenderer.render();
};

module.exports = GameRenderer;