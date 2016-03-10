var GraphicsConstants = require('./GraphicsConstants');
var graphicsUtil = require('./GraphicsUtilities');

function UnitRenderer(){

}

UnitRenderer.prototype.render = function(renderGL, units, mapRenderer, playerState, playerRenderer, currAnimationFrame){
	for(var i = 0; i < units.length; i++){
		var unit = units[i];
		if(playerRenderer.isTileVisibleToPlayer(unit.location.y, unit.location.x, playerState)){
			switch(unit.action){
				case "move":
					var targetUnitPos = mapRenderer.getCanvasPosFromMapPos(unit.target),
						sourceUnitPos = mapRenderer.getCanvasPosFromMapPos(unit.source);
					
					graphicsUtil.animateGlyphMove(
						renderGL, sourceUnitPos, targetUnitPos, currAnimationFrame, 
						unit.type, GraphicsConstants.FX_UNIT_GLYPH_STYLE, GraphicsConstants.FX_UNIT_GLYPH_COLOR);
					break;
				default:
					var currUnitPos = mapRenderer.getCanvasPosFromMapPos(unit.location);
					
					graphicsUtil.drawGlyph(
						renderGL, currUnitPos, unit.type,
						GraphicsConstants.FX_UNIT_GLYPH_STYLE, GraphicsConstants.FX_UNIT_GLYPH_COLOR);
			}
		}
	}
};

module.exports = UnitRenderer;