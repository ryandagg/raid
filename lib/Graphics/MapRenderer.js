var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');

function _getTileImg(tileName){
	var tileImgSrc = null;
	var path = GraphicsConstants.FX_TEXTURES_ROOT_DIR;
	tileImgSrc = path + tileName.toLowerCase() + ".png";
	var img = new Image();
	img.src = tileImgSrc;
	return img;
}

function MapRenderer(){

}

MapRenderer.prototype.render = function(renderGL, mapState){
	// Render tiles
	var tileHeight = GraphicsConstants.FX_TILE_WIDTH,
		tileWidth = GraphicsConstants.FX_TILE_HEIGHT; 
	for(var rowi = 0; rowi < mapState.height; rowi++){
		for(var coli = 0; coli < mapState.width; coli++){
			var tile = mapState.terrain[rowi][coli],
				tileX = coli * tileWidth,
				tileY = rowi * tileHeight,
				tileImg = _getTileImg.call(this, tile.name);
			// Calculate scale factor in x and y axis that will scale tile img to fit target
			var scaleX = tileWidth / tileImg.width;
			var scaleY = tileHeight / tileImg.height;
			renderGL.drawImage({
				img: tileImg,
				centerPoint: new Point(0,0),
				target: new Point(tileX, tileY),
				scaleX: scaleX,
				scaleY: scaleY
			});
		}
	}
	// Render map exit
	var exitPos = this.getCanvasPosFromMapPos(mapState.exit, mapState);
	renderGL.drawText({
		text: GraphicsConstants.FX_MAP_EXIT_GLYPH,
		pos: exitPos,
		fontStyle: GraphicsConstants.FX_MAP_EXIT_GLYPH_STYLE,
		style: GraphicsConstants.FX_MAP_EXIT_GLYPH_COLOR
	});
};

MapRenderer.prototype.getCanvasPosFromMapPos = function(mapPos){
	var tileHeight = GraphicsConstants.FX_TILE_HEIGHT,
		tileWidth = GraphicsConstants.FX_TILE_WIDTH,
		tileHalfHeight = tileHeight / 2,
		tileHalfWidth = tileWidth / 2;
	return new Point(mapPos.x * tileWidth + tileHalfWidth, mapPos.y * tileHeight + tileHalfHeight);
};

module.exports = MapRenderer;