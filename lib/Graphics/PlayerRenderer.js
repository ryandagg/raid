var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');

function _getCanvasPosFromMapPos(mapPos, mapWidth, mapHeight){
	var tileHeight = this.fx.getCanvasHeight() / mapHeight,
		tileWidth = this.fx.getCanvasWidth() / mapWidth,
		tileHalfHeight = tileHeight / 2,
		tileHalfWidth = tileWidth / 2;
	return new Point(mapPos.x * tileWidth + tileHalfWidth, mapPos.y * tileHeight + tileHalfHeight);
}

/*******************
	Constructor
********************/
function PlayerRenderer(fx){
	this.fx = fx;
}

PlayerRenderer.prototype.render = function(playerState, mapState, mapRenderer){
	var canvasPos = mapRenderer.getCanvasPosFromMapPos(playerState.location, mapState);
	this.fx.drawText({
		text: GraphicsConstants.FX_PLAYER_FONT_CHARACTER,
		pos: canvasPos,
		fontStyle: GraphicsConstants.FX_PLAYER_FONT_STYLE,
		style: GraphicsConstants.FX_PLAYER_FONT_COLOR
	});
};

module.exports = PlayerRenderer;