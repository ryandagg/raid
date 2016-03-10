var GraphicsConstants = require('./GraphicsConstants');
var graphicsUtil = require('./GraphicsUtilities');
var GameConstants = require('../GameConstants');

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
					var currUnitPos = graphicsUtil.linearlyInterpolate(sourceUnitPos, targetUnitPos, currAnimationFrame, GameConstants.GAMERUNNER_ANIMATION_FRAME_CNT);
					this.drawGlyph(renderGL, unit.type, currUnitPos);
					break;
				default:
					var currUnitPos = mapRenderer.getCanvasPosFromMapPos(unit.location);
					this.drawGlyph(renderGL, unit.type, currUnitPos);
			}
		}
	}
};

UnitRenderer.prototype.drawGlyph = function(renderGL, type, location){
	renderGL.drawText({
		text: type,
		pos: location,
		fontStyle: GraphicsConstants.FX_UNIT_GLYPH_STYLE,
		style: GraphicsConstants.FX_UNIT_GLYPH_COLOR
	});
};

module.exports = UnitRenderer;