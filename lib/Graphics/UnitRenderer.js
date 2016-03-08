var GraphicsConstants = require('./GraphicsConstants');

function UnitRenderer(){

}

UnitRenderer.prototype.render = function(renderGL, unitState, mapRenderer){
	unitState.forEach(function(unit){
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