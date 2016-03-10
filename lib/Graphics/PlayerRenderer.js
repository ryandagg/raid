var GraphicsConstants = require('./GraphicsConstants');
var graphicsUtil = require('./GraphicsUtilities');

function PlayerRenderer(){
	this.currPlayerPos = null;
}

PlayerRenderer.prototype.render = function(renderGL, playerState, mapRenderer, currAnimationFrame, isPlayerTurn){
	if(isPlayerTurn){
		// Animate action
		switch(playerState.action){
			case "move":
				var targetPlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.target),
					sourcePlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.source);
				
				this.currPlayerPos = graphicsUtil.animateGlyphMove(
					renderGL, sourcePlayerPos, targetPlayerPos, currAnimationFrame, 
					GraphicsConstants.FX_PLAYER_FONT_CHARACTER, GraphicsConstants.FX_PLAYER_FONT_STYLE, GraphicsConstants.FX_PLAYER_FONT_COLOR);
				break;
			default:
				this.currPlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.location);
				
				graphicsUtil.drawGlyph(
					renderGL, this.currPlayerPos, GraphicsConstants.FX_PLAYER_FONT_CHARACTER, 
					GraphicsConstants.FX_PLAYER_FONT_STYLE, GraphicsConstants.FX_PLAYER_FONT_COLOR);
		}
	}else{
		// Not player turn, so ignore last seen action and just draw glyph at current location
		this.currPlayerPos = mapRenderer.getCanvasPosFromMapPos(playerState.location);
		graphicsUtil.drawGlyph(
			renderGL, this.currPlayerPos, GraphicsConstants.FX_PLAYER_FONT_CHARACTER, 
			GraphicsConstants.FX_PLAYER_FONT_STYLE, GraphicsConstants.FX_PLAYER_FONT_COLOR);
	}
};

PlayerRenderer.prototype.getPlayerLocInCanvas = function(){
	return this.currPlayerPos;
};

PlayerRenderer.prototype.isTileVisibleToPlayer = function(tileRow, tileCol, playerState){
	return Math.pow(tileRow - playerState.location.y, 2) + Math.pow(tileCol - playerState.location.x, 2) <= playerState.sensorRadiusSquared;
};

module.exports = PlayerRenderer;