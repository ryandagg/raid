var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');
var clone = require('clone');

function PlayerRenderer(){
	this.lastPlayerLoc = null;
	this.lastMapID = null;
	this.interpolating = false;
	this.interpolatingLoc = null;
	this.interpolationOffset = null;
	this.targetLoc = null;
}

PlayerRenderer.prototype.render = function(renderGL, playerState, mapRenderer, mapID){
	var playerLocation = mapRenderer.getCanvasPosFromMapPos(playerState.location);
	renderGL.drawText({
		text: GraphicsConstants.FX_PLAYER_FONT_CHARACTER,
		pos: playerLocation,
		fontStyle: GraphicsConstants.FX_PLAYER_FONT_STYLE,
		style: GraphicsConstants.FX_PLAYER_FONT_COLOR
	});
	this.lastPlayerLoc = playerLocation;
};

PlayerRenderer.prototype.getPlayerLocInCanvas = function(){
	return this.lastPlayerLoc;
};

PlayerRenderer.prototype.isTileVisibleToPlayer = function(tileRow, tileCol, playerState){
	return Math.pow(tileRow - playerState.location.y, 2) + Math.pow(tileCol - playerState.location.x, 2) <= playerState.sensorRadiusSquared;
};

module.exports = PlayerRenderer;