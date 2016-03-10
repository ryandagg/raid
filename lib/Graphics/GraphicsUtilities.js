var Point = require('./Point');
var GameConstants = require('../GameConstants');

module.exports = {
	linearlyInterpolate: function(startPoint, endPoint, step, totalSteps){
		var offset = endPoint.subtract(startPoint),
			fraction = step/totalSteps;
		offset.x(offset.x() * fraction);
		offset.y(offset.y() * fraction);
		return startPoint.add(offset);
	},
	animateGlyphMove: function(renderGL, startPoint, endPoint, currAnimationFrame, glyph, fontStyle, color){
		var glyphAnimatedPos = this.linearlyInterpolate(startPoint, endPoint, currAnimationFrame, GameConstants.GAMERUNNER_ANIMATION_FRAME_CNT);
		this.drawGlyph(renderGL, glyphAnimatedPos, glyph, fontStyle, color);
		return glyphAnimatedPos;
	},
	drawGlyph: function(renderGL, position, glyph, fontStyle, color){
		renderGL.drawText({
			text: glyph,
			pos: position,
			fontStyle: fontStyle,
			style: color
		});
	}
};