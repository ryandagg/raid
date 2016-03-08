var GraphicsConstants = require('./GraphicsConstants');

function PlayerRenderer(){

}

PlayerRenderer.prototype.render = function(renderGL, playerState, mapRenderer){
	var canvasPos = mapRenderer.getCanvasPosFromMapPos(playerState.location);
	renderGL.drawText({
		text: GraphicsConstants.FX_PLAYER_FONT_CHARACTER,
		pos: canvasPos,
		fontStyle: GraphicsConstants.FX_PLAYER_FONT_STYLE,
		style: GraphicsConstants.FX_PLAYER_FONT_COLOR
	});
};

module.exports = PlayerRenderer;