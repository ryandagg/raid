var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');
var clone = require('clone');
var graphicsUtil = require('./GraphicsUtilities');
var GameConstants = require('../GameConstants');

function PlayerRenderer(){
	this.currPlayerPos = null;
}

PlayerRenderer.prototype.render = function(renderGL, playerState, mapRenderer, currAnimationFrame){
	switch(playerState.action){
		case "move":
			var targetPlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.target),
				sourcePlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.source);
			this.currPlayerPos = graphicsUtil.linearlyInterpolate(sourcePlayerPos, targetPlayerPos, currAnimationFrame, GameConstants.GAMERUNNER_ANIMATION_FRAME_CNT);
			this.drawGlyph(renderGL, this.currPlayerPos);
			break;
		default:
			this.currPlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.location);
			this.drawGlyph(renderGL, this.currPlayerPos);
	}
};

PlayerRenderer.prototype.drawGlyph = function(renderGL, location){
	renderGL.drawText({
		text: GraphicsConstants.FX_PLAYER_FONT_CHARACTER,
		pos: this.currPlayerPos,
		fontStyle: GraphicsConstants.FX_PLAYER_FONT_STYLE,
		style: GraphicsConstants.FX_PLAYER_FONT_COLOR
	});
};

PlayerRenderer.prototype.getPlayerLocInCanvas = function(){
	return this.currPlayerPos;
};

PlayerRenderer.prototype.isTileVisibleToPlayer = function(tileRow, tileCol, playerState){
	return Math.pow(tileRow - playerState.location.y, 2) + Math.pow(tileCol - playerState.location.x, 2) <= playerState.sensorRadiusSquared;
};

module.exports = PlayerRenderer;