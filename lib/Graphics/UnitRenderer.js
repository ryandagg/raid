var GraphicsConstants = require('./GraphicsConstants');

function UnitRenderer(){

}

UnitRenderer.prototype.render = function(renderGL, units, mapRenderer, playerState, playerRenderer){
	for(var i = 0; i < units.length; i++){
		var unit = units[i];
		if(playerRenderer.isTileVisibleToPlayer(unit.location.y, unit.location.x, playerState)){
			var unitPos = mapRenderer.getCanvasPosFromMapPos(unit.location);
			renderGL.drawText({
				text: unit.type,
				pos: unitPos,
				fontStyle: GraphicsConstants.FX_UNIT_GLYPH_STYLE,
				style: GraphicsConstants.FX_UNIT_GLYPH_COLOR
			});
		}
	}
};

module.exports = UnitRenderer;