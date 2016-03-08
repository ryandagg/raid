var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');
var ImageManager = require('./ImageManager');

function MapRenderer(){
	// Build image metadata obj for tile textures to initialize new ImageManager instance with
	var tileTextureFileNames = GraphicsConstants.FX_TILE_TEXTURE_FILE_LIST.split(",");
	var tileTextureFileNamesWithoutExt = tileTextureFileNames.map(function(fileName){ return fileName.split(".")[0]; });
	var imageMetadata = [];
	for(var i = 0; i < tileTextureFileNames.length; i++){
		imageMetadata.push({
			name: tileTextureFileNamesWithoutExt[i],
			path: GraphicsConstants.FX_TEXTURES_ROOT_DIR + tileTextureFileNames[i]
		});
	}
	this.tileTextureMgr = new ImageManager(imageMetadata, true);
}

MapRenderer.prototype.render = function(renderGL, mapState){
	// Block rendering until all tile texture images have been loaded or 
	// GraphicsConstants.FX_TILE_TEX_MAX_ALLOWED_LOAD_TIME_MILLI has elapsed, whichever comes first
	var then = (new Date()).getTime();
	while(
		!this.tileTextureMgr.allImagesLoaded() && (new Date()).getTime() - then < GraphicsConstants.FX_TILE_TEX_MAX_ALLOWED_LOAD_TIME_MILLI
	){
		// Stall while tile textures are loading
	}

	// Render tiles
	var tileHeight = GraphicsConstants.FX_TILE_WIDTH,
		tileWidth = GraphicsConstants.FX_TILE_HEIGHT; 
	for(var rowi = 0; rowi < mapState.height; rowi++){
		for(var coli = 0; coli < mapState.width; coli++){
			var tile = mapState.terrain[rowi][coli],
				tileX = coli * tileWidth,
				tileY = rowi * tileHeight,
				tileImg = this.tileTextureMgr.get(tile.name.toLowerCase());
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

MapRenderer.prototype.allTileTexturesLoaded = function(){
	return this.tileTextureMgr.allImagesLoaded();
};

module.exports = MapRenderer;