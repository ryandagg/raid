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

PlayerRenderer.prototype.render = function(renderGL, logicLoopSpeedMilli, playerState, mapRenderer, mapID){
	/*if(!!this.lastMapID && mapID != this.lastMapID){
		this.lastPlayerLoc = null;
		this.interpolating = false;
		this.interpolatingLoc = null;
	}
	this.lastMapID = mapID;*/
	var playerLocation = mapRenderer.getCanvasPosFromMapPos(playerState.location);
	/*if(!!this.lastPlayerLoc && !playerLocation.equals(this.lastPlayerLoc)){
		this.interpolating = true;
		this.interpolationOffset = null;
	}
	if(this.interpolating){
		if(!this.interpolationOffset){
			var animationTicks = Math.max(Math.floor(logicLoopSpeedMilli / 16.667), 1);
			this.interpolationOffset = playerLocation.subtract(this.lastPlayerLoc);
			this.interpolationOffset.x(this.interpolationOffset.x() / animationTicks);
			this.interpolationOffset.y(this.interpolationOffset.y() / animationTicks);
			this.interpolatingLoc = clone(this.lastPlayerLoc);
			this.targetLoc = clone(playerLocation);
		}
		this.interpolatingLoc = this.interpolatingLoc.add(this.interpolationOffset);
		if(this.interpolatingLoc.approxEquals(this.targetLoc)){
			this.interpolating = false;
			this.interpolatingLoc = null;
		}
	}*/
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