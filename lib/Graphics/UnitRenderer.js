var GraphicsConstants = require('./GraphicsConstants');

function UnitRenderer(){

}

UnitRenderer.prototype.render = function(renderGL, unitState, mapRenderer, playerState, playerRenderer){
	unitState.forEach(function(unit){
		if(!playerRenderer.isTileVisibleToPlayer(unit.location.x, unit.location.y, playerState, playerRenderer)) return;
		var unitPos = mapRenderer.getCanvasPosFromMapPos(unit.location);
		renderGL.drawText({
			text: unit.type,
			pos: unitPos,
			fontStyle: GraphicsConstants.FX_UNIT_GLYPH_STYLE,
			style: GraphicsConstants.FX_UNIT_GLYPH_COLOR
		});
	}, this);
};

module.exports = UnitRenderer;