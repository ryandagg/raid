var GraphicsConstants = require('./GraphicsConstants');

function UnitRenderer(fx){
	this.fx = fx;
}

UnitRenderer.prototype.render = function(unitState, mapState, mapRenderer){
	unitState.forEach(function(unit){
		var unitPos = mapRenderer.getCanvasPosFromMapPos(unit.location, mapState);
		this.fx.drawText({
			text: unit.type,
			pos: unitPos,
			fontStyle: GraphicsConstants.FX_UNIT_GLYPH_STYLE,
			style: GraphicsConstants.FX_UNIT_GLYPH_COLOR
		});
	}, this);
};

module.exports = UnitRenderer;